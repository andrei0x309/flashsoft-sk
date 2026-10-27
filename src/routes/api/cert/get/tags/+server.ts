import { supabase } from '#/lib/db-client/supaClientFS';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const alltags = !!(url.searchParams.get('all') ?? '');
  try {
    const { data, error } = await supabase.rpc('get_tags', { alltags });

    if (error) {
      return Response.json({ error: JSON.stringify(error) }, { status: 500 });
    }
    return Response.json({ data });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
