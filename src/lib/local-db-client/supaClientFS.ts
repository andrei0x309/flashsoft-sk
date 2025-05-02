import { createClient } from '@supabase/supabase-js';
const SECRET_SUPA_TOKEN = process.env.SECRET_SUPA_TOKEN;

export const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', SECRET_SUPA_TOKEN);
