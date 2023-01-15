import type { PageServerLoad } from './$types';
import { supabase } from '@/lib/deno/supaClientEdge'
// import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@sveltejs/kit';

const loadFilteredCerts = async (page = 1, tag_ids: number[]) => {
  try {
    const countDb = supabase.from('fsk_cert').select(`tags:fsk_cert_tag_type!inner(
      id
  )`,  { count: 'exact', head: true })
    .in('fsk_cert_tag_type.id', tag_ids)

    const resDb = supabase.from('fsk_cert').select(`
    id,
    tags:fsk_cert_tag_type!inner(
        id,
        name
    )
    `)
    .in('fsk_cert_tag_type.id', tag_ids)
    .range((page-1)*9, (page*9)-1);
    // eslint-disable-next-line prefer-const
    let [count, res] = await Promise.all([countDb, resDb])
    const ids = res.data?.map((r: { id: number; }) => r.id)
    if (!ids) {
      return -1
    }

    res = await supabase.from('fsk_cert').select(`
    id,
    cert_name,
    cert_file_name,
    cert_feature_image,
    cat:fsk_cert_cat(
        cat_name,
        cat_icon_name
    ),
    tags:fsk_cert_tag_type!inner(
        id,
        name
    )
    `)
    .in('id', ids)
          
    ;(res as unknown as {page: number}).page = page
    ;(res as unknown as {totalPages: number}).totalPages = Math.ceil((count?.count ?? 0) / 9)
    ;(res as unknown as {tag_ids: number[]}).tag_ids = tag_ids
  
    if(page > (res as unknown as {totalPages: number}).totalPages) {
      return -1
    }
    
    
    return {
        res
      }; 
    } catch (e) {
     return null
    }
  }

const loadCerts = async (page: number) => {
  try {
    const countDb = supabase
    .from('fsk_cert')
    .select('*', { count: 'exact', head: true });
  
    const resDb = supabase.from('fsk_cert').select(`
  id,
  cert_name,
  cert_file_name,
  cert_feature_image,
  cat:fsk_cert_cat(
      cat_name,
      cat_icon_name
  ),
  tags:fsk_cert_tag_type!inner(
      id,
      name
  )
  `).range((page-1)*9, (page*9)-1);
  
    const [count, res] = await Promise.all([countDb, resDb])
      
    ;(res as unknown as {page: number}).page = page
    ;(res as unknown as {totalPages: number}).totalPages = Math.ceil((count?.count ?? 0) / 9)
  
    if(page > (res as unknown as {totalPages: number}).totalPages) {
      return -1
    }
    
    return {
        res
      }; 
    } catch (e) {
     return null
    }
  }

const checkData = (data: unknown) => {
  if(!data) {
    if(data === -1) {
      throw error(404, 'Not found')
    }
    throw error(500, 'Error loading data')
  }
  return data
}

const addRestPath = (data: Record<string, unknown> | number, rest: string) => {
   if(data === -1) {
    return data
   }
  ;(data as unknown as {rest: string}).rest = rest
  return data
}

export const load: PageServerLoad = async (rest) => {
  const restPath = '/show-cert/' + (rest.params.rest ?? '/')
  if(!rest.params.rest) {
    const data = await loadCerts(1)
    return addRestPath(checkData(data) as  Record<string, unknown>, restPath)
  } else {
    const params = rest.params.rest.split('/')

    switch(params[0]){
      case 'page': {
        let page = Number(params[1])
        if(page < 1) {
          throw error(404, 'Not found')
        }
      if (page < 1) {
        page = 1;
      }
      const data = await loadCerts(page)
      return addRestPath(checkData(data) as  Record<string, unknown>, restPath)
    }
    case 'filter': {
      let page = 1
      if(rest.params.rest.includes('/page')) {
        page = Number(rest.params.rest.split('/page')[1].replace('/', ''))
        if(page < 1) {
          throw error(404, 'Not found')
        }
      }
      const tag_ids = rest.params.rest.split('/tags/')[1].split('/').map((t) => Number(t)).filter((t) => !isNaN(t))
      const data =  await loadFilteredCerts(page, tag_ids)
      return addRestPath(checkData(data) as  Record<string, unknown>, restPath)
    }
    default: {
      throw error(404, 'Not found')
    }
  }
 }
}