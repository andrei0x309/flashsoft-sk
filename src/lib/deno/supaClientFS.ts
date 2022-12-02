import { config } from "https://deno.land/x/dotenv/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const env = config()

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

export const supabase = createClient(
  "https://lcspcmmpolegvalxkfsu.supabase.co",
  env.TOKEN,
  options,
);
