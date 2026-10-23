import { supabase } from '@/lib/db-client/supaClientFS';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const alltags = !!(url.searchParams.get('all') ?? '');
  try {
    const { data, error } = await supabase.rpc('get_tags', { alltags });

    if (error) {
      return json({ error: JSON.stringify(error) }, { status: 500 });
    }
    return json({ data });
  } catch (e) {
    console.error(e);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
