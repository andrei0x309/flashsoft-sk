import type { RequestHandler, EntryGenerator } from './$types';
import { generateFcWellKnown } from '$lib/farcaster/mini-app';

export const entries: EntryGenerator = () => {
  return [{ dotwn: '.well-known' }];
};

export const prerender = true;

export const GET: RequestHandler = async () => {
  const contnet = await generateFcWellKnown();

  return new Response(contnet, {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=3600',
      'Content-Type': 'application/json'
    },
    status: 200
  });
};
