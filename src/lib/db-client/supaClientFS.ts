import { SECRET_SUPA_TOKEN } from '$app/env/private';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', SECRET_SUPA_TOKEN);
