
import { createClient, SupabaseClientOptions } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const SUPA_TOKEN = Deno.env.get('SECRET_SUPA_TOKEN') as string

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
} as SupabaseClientOptions<"public">;

const supabase = createClient(
  "https://lcspcmmpolegvalxkfsu.supabase.co",
  SUPA_TOKEN,
  options,
);

export default async (request: Request) => {
    setTimeout(async () => { 
        await supabase.from('fsk_email_copy').insert({json: JSON.stringify(
            {
                name: 'test',
                email: 'test',
                message: 'test',
            }
        )})
        }, 7000);
    return Response.json('Hello world', {status: 200})
}
