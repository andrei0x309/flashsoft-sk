// export const prerender = true;
import type { RequestHandler } from './$types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const respond = (body: any, type = 'application/javascript', status = 200) => {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': type
    }
  });
};

export const GET: RequestHandler = async ({ url }) => {
  if (url.href.includes('/pt/gtm')) {
    const fethUrl = 'https://www.googletagmanager.com/gtag/js' + url.href.replace(/.*?\/pt\/gtm.*?(\??)/gim, '$1');
    const response = await fetch(fethUrl);
    const body = await response.text();
    return respond(body.replace(/https:\/\/.*?google-analytics\.com/gim, '/pt/ga'));
  }
  if (url.href.includes('/pt/hcaptcha')) {
    const fethUrl = 'https://js.hcaptcha.com/1/api.js' + url.href.replace(/.*?\/pt\/hcaptcha.*?(\??)/gim, '$1');
    const response = await fetch(fethUrl);
    return respond(response.body);
  }

  return new Response('Not found', { status: 404 });
};

export const POST: RequestHandler = async ({ url }) => {
  if (url.href.includes('/pt/ga')) {
    const fethUrl = 'https://www.google-analytics.com' + url.href.replace(/.*?\/pt\/ga/gim, '');
    const response = await fetch(fethUrl, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'User-Agent': 'Desktop'
      }
    });
    return respond(response.body);
  }
  return new Response('Not found', { status: 404 });
};
