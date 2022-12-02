import type { PageLoad } from './$types';
import { createClient } from '@supabase/supabase-js'
import { SUPA_PUBLIC_TOKEN  } from '@/lib/config'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://lcspcmmpolegvalxkfsu.supabase.co', SUPA_PUBLIC_TOKEN) 

export const load: PageLoad = async ({ params }) => {

  const res = await supabase.from('fsk_prj').select('*').range(0, 4)

    return {
      res
    }
}