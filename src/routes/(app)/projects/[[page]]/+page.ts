import type { PageLoad } from './$types';
import { API_BASE } from "@/lib/config"
 
export const load: PageLoad = async ({ params }) => {
    let req
    if(params.page) {
      req = fetch(API_BASE+'/api/projects/get?page='+params.page)
    } else {
      req = fetch(API_BASE+'/api/projects/get')
    }
    const data = await (await req).json()
    return data
}