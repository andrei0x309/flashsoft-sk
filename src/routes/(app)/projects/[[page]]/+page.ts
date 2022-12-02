import type { PageLoad } from './$types';
 
export const load: PageLoad = async ({ params }) => {
    const token = Deno.env.get('TOKEN')
    return {
      token
    }
}