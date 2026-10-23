import { SECRET_SUPA_TOKEN } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', SECRET_SUPA_TOKEN);
