import type { PageServerLoad } from './$types';
// import { supabase } from '@/lib/deno/supaClientEdge'
import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@sveltejs/kit';
import { optionalChain } from '@/lib/utils/index'


type SupaClient = typeof supabase
type PostgesQueryBuilder = ReturnType<SupaClient['from']>
type PostgesQueryBuilderSelect = ReturnType<PostgesQueryBuilder['select']>

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
    cert_description,
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

const loadCerts = async (page: number, search = false, searchTerms: string[] = []) => {
  try {
    const countDb = optionalChain(supabase
    .from('fsk_cert')
    .select('*', { count: 'exact', head: true }))
    .if(search, 
      (chain: PostgesQueryBuilderSelect) => 
      chain.or(searchTerms.map( t => `cert_name.ilike.%${t}%,cert_description.ilike.%${t}%`).join(','))).end()

  
    const resDb = optionalChain(supabase.from('fsk_cert').select(`
  id,
  cert_name,
  cert_file_name,
  cert_description,
  cert_feature_image,
  cat:fsk_cert_cat(
      cat_name,
      cat_icon_name
  ),
  tags:fsk_cert_tag_type!inner(
      id,
      name
  )
  `)).if(search, 
  (chain: PostgesQueryBuilderSelect) => 
  
  
  chain.or(searchTerms.map( t => `cert_name.ilike.%${t}%,cert_description.ilike.%${t}%`).join(',')))
  .end()
  .range((page-1)*9, (page*9)-1);
  
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

const extractPage = (rest: string) => {
  if(rest.includes('page/')) {
    const page = Number(rest.split('page/')[1].replace('/', ''))
    if(page < 1) {
      throw error(404, 'Not found')
    }
    return page
  }
  return 1
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
      const page = extractPage(rest.params.rest)

      const data = await loadCerts(page)
      return addRestPath(checkData(data) as  Record<string, unknown>, restPath)
    }
    case 'filter': {
      const page = extractPage(rest.params.rest)

      const tag_ids = rest.params.rest.split('/tags/')[1].split('/').map((t) => Number(t)).filter((t) => !isNaN(t))
      const data =  await loadFilteredCerts(page, tag_ids)
      return addRestPath(checkData(data) as  Record<string, unknown>, restPath)
    }
    case 'search': {
      const page = extractPage(rest.params.rest)
      const restWithoutPage = rest.params.rest.replace(/\/page\/\d+\/?/, '')
      const searchTerms = restWithoutPage.split('search')[1].split('/').filter((t) => t !== '' && t !== 'page' && t.length > 1)
      console.log(searchTerms)
      let data = await loadCerts(page, true, searchTerms)
      data = (addRestPath(checkData(data) as  Record<string, unknown>, restPath)) as { res: Record<string, unknown>}
      if((data as unknown as number) === -1) {
        return data
      }
      ;(data as unknown as {searchInput: string}).searchInput = searchTerms.join(' ')
      return data
    }
    default: {
      throw error(404, 'Not found')
    }
  }
 }
}