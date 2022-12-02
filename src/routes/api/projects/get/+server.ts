// import { error } from '@sveltejs/kit';
import { supabase } from '@/lib/deno/supaClient'
import type { RequestHandler } from  './$types';
 
export const GET: RequestHandler = async ({ url }) => {
  let page =  Number(url.searchParams.get('page') ?? '1');
  if (page < 1) {
    page = 1;
  }

  const res = await supabase.form('fsk_prj').select('*').range((page-1)*4, page*4)
 
  return new Response(res);
}
