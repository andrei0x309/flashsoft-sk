import type { PageServerLoad } from './$types';
// import { supabase } from '@/lib/deno/supaClientEdge'
import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@sveltejs/kit';


export const load: PageServerLoad = async (rest) => {
  let page
  if(!rest.params.rest) {
    page = 1
  } else {
    const params = rest.params.rest.split('/')
    if(params[0] !== 'page') {
      throw error(404, 'Not found')
    }
    page = Number(params[1])
    if(page < 1) {
      throw error(404, 'Not found')
    }
  if (page < 1) {
    page = 1;
  }
}

  try {
  const countDb = supabase
  .from('fsk_prj')
  .select('*', { count: 'exact', head: true });

  const resDb = supabase.from('fsk_prj').select(`
  *,
  cat:fsk_prj_cat(
      cat_name
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name
  )
  `).range((page-1)*4, (page*4)-1);

  const [count, res] = await Promise.all([countDb, resDb])
    
  ;(res as unknown as {page: number}).page = page
  ;(res as unknown as {totalPages: number}).totalPages = (count?.count ?? 0) / 4

  if(page > (res as unknown as {totalPages: number}).totalPages) {
    throw error(404, 'Not found')
  }
  
  return {
      res
    }; 
  } catch (e) {
    console.log(e)
    throw error(500, 'Internal Server Error')
  }

}