import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { config } from '#/lib/config/config.ts'

export const handle = (({ event, resolve }) => {
  const path = event.url.pathname.startsWith('/') ? event.url.pathname.slice(1) : event.url.pathname;
  const hostname = event.request.headers.get('host') || '';
  const doRedirect = () => redirect(301, `${config.baseSiteUrl}/${path}`);
  if (hostname.startsWith('www.') || ['fsk.netlify.app', 'andrei0x309.is-a.dev'].includes(hostname)) {
    return doRedirect();
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html
  });
}) satisfies Handle;
