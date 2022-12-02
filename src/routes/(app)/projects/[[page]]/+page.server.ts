import type { PageServerLoad } from './$types';
import { supabase } from '@/lib/deno/supaClientEdge'
 
export const load: PageServerLoad = async ({ params }) => {
  let page = Number(params?.page ?? 0)
  if (page < 1) {
    page = 1;
  }

  const res = await supabase.from('fsk_prj').select(`
  *,
  cat:fsk_prj_cat(
      cat_name
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name
  )
  `).range((page-1)*4, page*4)
    return {
      res
    };

}