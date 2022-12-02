import type { PageLoad } from './$types';
import { API_BASE } from "@/lib/config"
 
export const load: PageLoad = async ({ params }) => {
    let req
    if(params.page) {
      req = fetch(API_BASE+'/api/projects/get?page='+params.page)
    } else {
      req = fetch(API_BASE+'/api/projects/get')
    }
    const rReq = await req
    let data = { error: ''}
    if(rReq.ok) {
      data = await rReq.json()
    } else {
      data.error = await rReq.text()
    }
    return {
      data
    }
}