// import { error } from '@sveltejs/kit';
// import { supabase } from '@/lib/deno/supaClientEdge'
import { supabase } from '@/lib/node/supaClientFS'
// import { client } from '@/lib/deno/smtpClient'

import type { RequestHandler } from  './$types';
import { json } from '@sveltejs/kit';
 
export const GET: RequestHandler = async ({ url }) => {
  const alltags =  !!(url.searchParams.get('all') ?? '')
  try {
const { data, error } = await supabase.rpc('get_tags', { alltags })

if(error) {
    return json({error: String(error)}, {status: 500})
}
return json({data})

    } catch (e) {
      console.log(e)
      return json({error: 'Internal Server Error'}, {status: 500})
    }
  
  
}
