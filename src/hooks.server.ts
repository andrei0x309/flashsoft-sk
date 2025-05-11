import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const baseSiteUrl = 'https://flashsoft.eu';

export const handle = (async ({ event, resolve }) => {
  const path = event.url.pathname.startsWith('/') ? event.url.pathname.slice(1) : event.url.pathname;
  const hostname = event.request.headers.get('host') || '';
  const doRedirect = () => redirect(301, `${baseSiteUrl}/${path}`);
  if (hostname.startsWith('www.')) {
    return doRedirect();
  } else if (['fsk.netlify.app', 'andrei0x309.is-a.dev'].includes(hostname)) {
    return doRedirect();
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html
  });
}) satisfies Handle;
