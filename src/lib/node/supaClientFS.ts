import { createClient } from '@supabase/supabase-js'
import { TOKEN } from './.env'

export const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', TOKEN)
