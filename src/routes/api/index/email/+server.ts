import { supabase } from '@/lib/db-client/supaClientFS';
import { SECRET_EMAIL_ID as EMAIL_ID, SECRET_EMAIL_KEY as EMAIL_SECRET } from '$env/static/private';
import { validateEmail } from '@/lib/utils/server/email';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getCapInstanceAndState, getCapChallengeConfig } from '@/lib/index/cap';

const EMAIL_API_AUTH = 'https://api.sendpulse.com/oauth/access_token';
const EMAIL_API_ENDPOINT = 'https://api.sendpulse.com/smtp/emails';

export const POST: RequestHandler = async ({ request }) => {
  let name, email, message, capToken;
  try {
    ({ name, email, message, capToken } = await request.json());
  } catch (_error) {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!email || !message) {
    return json({ error: 'Missing required fields, emai or message' }, { status: 400 });
  }
  if (!capToken) {
    return json({ error: 'Missing required fields, capToken' }, { status: 400 });
  }
  if (message.length > 2000) {
    return json({ error: 'Message too long' }, { status: 400 });
  }
  if (message.length < 10) {
    return json({ error: 'Message too short' }, { status: 400 });
  }
  if (name?.length > 150) {
    return json({ error: 'Name too long' }, { status: 400 });
  }
  if (!validateEmail(email)) {
    return json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const { cap } = await getCapInstanceAndState();

    const validate = await cap.validateToken(capToken, getCapChallengeConfig());

    const { success } = validate;

    if (!success) {
      return json({ error: 'Invalid captcha' }, { status: 400 });
    }
  } catch (_error) {
    return json({ error: 'Error validating captcha' }, { status: 500 });
  }

  try {
    const { data, error } = await supabase.from('fsk_email_token').select('*').eq('id', 1).limit(1);

    if (error) {
      return json({ error: 'Error accesing auth doken email DB' }, { status: 500 });
    }

    if (!data || !data[0]) {
      return json({ error: 'Access token not found in DB' }, { status: 500 });
    }

    let { token } = data[0];
    const expiration = Date.now() + 3600000;
    const oldExpiration = new Date(data[0]?.expiration ?? 0).getTime();
    if (oldExpiration <= expiration || !token?.access_token) {
      const response = await fetch(EMAIL_API_AUTH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: EMAIL_ID,
          client_secret: EMAIL_SECRET
        })
      });

      if (response.status !== 200) {
        return json({ error: 'Error Getting Auth Token' }, { status: 500 });
      }

      token = await response.json();

      const { error } = await supabase
        .from('fsk_email_token')
        .upsert({ id: 1, token: JSON.stringify(token), expiration: new Date(expiration).toISOString() });
      if (error) {
        console.error('Error updating token in DB', JSON.stringify(error));
      }
    }

    const emailMessage = {
      email: {
        text: message,
        subject: `New message from ${name || 'anonymous'} (${email})`,
        from: {
          name: 'Flashsoft Website',
          email: 'website@flashsoft.eu'
        },
        to: [
          {
            name: 'Andrei O.',
            email: 'andrei@flashsoft.eu'
          }
        ]
      }
    };

    const response = await fetch(EMAIL_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.access_token}`
      },
      body: JSON.stringify(emailMessage)
    });

    if (response.status !== 200) {
      return json({ error: 'Error Sending email to API' }, { status: 500 });
    }

    setTimeout(async () => {
      await supabase.from('fsk_email_copy').insert({ json: JSON.stringify(emailMessage) });
    }, 50);

    return json({ data: 'ok' }, { status: 200 });
  } catch (e) {
    return json({ error: `Internal Server Error: ${String(e)}` }, { status: 500 });
  }
};
