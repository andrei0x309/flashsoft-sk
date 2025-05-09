import type { RequestHandler } from './$types';
import fs from 'node:fs';

export const prerender = true;

export const GET: RequestHandler = async () => {
 
  const contnet = fs.readFileSync('_redirects', 'utf8');

  return new Response(contnet, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': '	text/plain'
    },
    status: 200
  });
};
