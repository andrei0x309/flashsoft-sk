
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPA_TOKEN = Deno.env.get('TOKEN')

const options = {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };
  
  const supabase = createClient(
    "https://lcspcmmpolegvalxkfsu.supabase.co",
    SUPA_TOKEN,
    options,
  );

  export default async (request: Request) => {
    try{
      const url = new URL(request.url)
      const allTags = !!(url.searchParams.get('all') ?? '')
      console.info('allTags', allTags, { allTags })
        const { data, error } = await supabase.rpc('get_tags', { allTags })
        if(error) {
            return Response.json({error: JSON.stringify(error)}, {status: 500})
        }
        return Response.json({data})
    } catch (e) {
      return Response.json({error: `Internal Server Error: ${JSON.stringify(e)}`}, {status: 500})
    }
}
