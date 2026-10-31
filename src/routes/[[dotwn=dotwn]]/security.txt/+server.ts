import { config } from '#/lib/config/config.ts'
import type { EntryGenerator, RequestHandler } from  './$types';

const content = 
`
Contact: ${config?.baseSiteUrl}#section-contact
Expires: 2034-02-28T12:22:00.000Z
Preferred-Languages: en
`

export const entries: EntryGenerator = () => {
  return [{ dotwn: '.well-known' }];
};

export const prerender = true;

export const GET: RequestHandler = async () => {

  return new Response(content, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/json'
    },
    status: 200
  });
};
