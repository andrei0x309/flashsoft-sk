import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const baseSiteUrl = 'https://flashsoft.eu'

export const handle = (async ({ event, resolve }) => {
    const path = event.url.pathname.startsWith('/') ? event.url.pathname.slice(1) : event.url.pathname
    const hostname = event.request.headers.get('host') || ''
    if (hostname.startsWith('www.')) {
      return redirect(301, `${baseSiteUrl}${path}`, )
    } else if (['fsk.netlify.app'].includes(hostname)) {
      return redirect(301, `https://flashsoft.eu${path}`, )
    }

    return resolve(event, {
      transformPageChunk: ({ html }) => html
    });
  }) satisfies Handle;