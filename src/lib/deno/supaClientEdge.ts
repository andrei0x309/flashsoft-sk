import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { TOKEN } from "$env/static/private"

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

export const supabase = createClient(
  "https://lcspcmmpolegvalxkfsu.supabase.co",
  TOKEN,
  options,
);
