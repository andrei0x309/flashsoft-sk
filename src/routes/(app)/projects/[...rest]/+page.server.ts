import type { PageServerLoad } from './$types';
// import { supabase } from '@/lib/deno/supaClientEdge'
import { supabase } from '@/lib/node/supaClientFS'
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page'


const loadProjects = async (page = 1) => {
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
    `).order('id', { ascending: false })
    .range((page-1)*4, (page*4)-1);
  
    const [count, res] = await Promise.all([countDb, resDb])

    ;(res as unknown as {page: number}).page = page
    ;(res as unknown as {totalPages: number}).totalPages = Math.ceil((count?.count ?? 0) / 4)
  
    if(page > (res as unknown as {totalPages: number}).totalPages) {
      throw error(404, 'Not found')
    }
    
    return {
        res
      }; 
    } catch (e) {
      return null
    }
}

const loadProject = async (id: number) => {
  try {
    const res = await supabase.from('fsk_prj').select(`
  *,
    cat:fsk_prj_cat(
      cat_name,
      cat_description
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name
  )`).eq('id', id)
    return {
        res
    }
  }
  catch (e) {
    return null
  }
}


export const load: PageServerLoad = async (rest) => {
  const restPath = '/projects/' + (rest.params.rest ?? '/')
  if(!rest.params.rest) {
    const data = await loadProjects(1)
    return appendToData(checkData(data), {rest: restPath, pageTitle: 'Projects andrei0x309 | flashsoft.eu', pageDescription: 'Dev projects using React, Svelte, Deno, Node, Android etc.'})
  } else {
    const params = rest.params.rest.split('/')

    switch(params[0]){
      case 'page': {
      const page = extractPage(rest.params.rest)

      const data = await loadProjects(page)
      return appendToData(checkData(data), {rest: restPath, pageTitle: `Projects andrei0x309 | flashsoft.eu | Page ${page}`, pageDescription: 'Dev projects using React, Svelte, Deno, Node, Android etc.'})
    }
    case 'view': {
      const id = Number(params[1])
      const data = await loadProject(id)
      return appendToData(checkData(data), {rest: restPath, pageTitle: `${data?.res?.data?.[0]?.title ?? 'N\\A'} | andrei0x309`, pageDescription: `${data?.res?.data?.[0]?.short_description ?? 'Description of this project is missing'}`})
    }
    default: {
      throw error(404, 'Not found')
    }
  }
 }
}
