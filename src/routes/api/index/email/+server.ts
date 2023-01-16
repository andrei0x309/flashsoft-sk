// import { error } from '@sveltejs/kit';
// import { supabase } from '@/lib/deno/supaClientEdge'
// import { supabase } from '@/lib/node/supaClientFS'
import type { RequestHandler } from  '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { client } from '@/lib/deno/smtpClient'


import { SECRET_SMTP_HOST, SECRET_SMTP_PORT, SECRET_SMTP_USERNAME, SECRET_SMTP_PASSWORD  } from '$env/static/private'


// const validateEmail = (email: string) => {
//     return String(email)
//       .toLowerCase()
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//   };

export const POST: RequestHandler = (async ({ request }) => {
  try {
const {
    name,
    email,
    message,
    hCaptcha
} = await request.json()

console.log(name, email, message, hCaptcha)

// if(!email || !message || !hCaptcha) {
//     return json({error: 'Missing required fields, email, hCaptcha, message'}, {status: 400})
// }
// if(message.length > 2000) {
//     return json({error: 'Message too long'}, {status: 400})
// }
// if(message.length < 10) {
//     return json({error: 'Message too short'}, {status: 400})
// }
// if(name?.length > 150) {
//     return json({error: 'Name too long'}, {status: 400})
// }
// if(!validateEmail(email)) {
//     return json({error: 'Invalid email'}, {status: 400})
// }

const emailMessage = {
    from: "website@flashsoft.eu",
    to: "andrei@flashsoft.eu",
    subject: "Message title TEST2",
    content: "Plaintext version of the message",
  };


  client.connect({
    hostname: SECRET_SMTP_HOST,
    port: SECRET_SMTP_PORT,
    username: SECRET_SMTP_USERNAME,
    password: SECRET_SMTP_PASSWORD,
  }).then(() => {
    client.send(emailMessage).then(() => {
      client.close().catch(err => console.error(err))
    }).catch(err => console.error(err))
  }).catch(err => console.error(err))
  
  
return json({data: 'ok'})

    } catch (e) {
      console.log(e)
      return json({error: 'Internal Server Error'}, {status: 500})
    }
  
}) satisfies RequestHandler;
