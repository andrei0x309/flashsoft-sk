import type { PageServerLoad } from './$types';
import { supabase } from '@/lib/node/supaClientFS'
import { error } from '@sveltejs/kit';


const prepareHtml = (html: string) => {
    return html.replace(/<div[^>]+Box-header Box-header--blue.*?(<div class="js-calendar-graph)/gms, '$1') // remove potential github ADS
    .replace(/<div class="js-activity-overview-graph-container.*?<\/div>/gms, '') // remove activity graph
    .replace(/<details.*?<\/details>/gms, '') // remove details
    .replace(/<svg.*?js-calendar-graph-svg.*?>/gms, '<svg class="js-calendar-graph-svg" width="99%" viewBox="0 0 717 112">') // make svg responsive
    .replace(/<div class="float-left.*?<\/div>/gms, '') // remove float left
    .replace(/<a/gms, '<a  rel="noopener noreferrer external" ') // indicate to sveltekit to not preload external links
}

const updateContributions = async () => {
    let html = await (await (fetch('https://github.com/users/andrei0x309/contributions'))).text()
    const updated_at = new Date().toISOString()
    html = prepareHtml(html)
    await supabase.from('fsk_github_contributions').upsert([{id: 1, html, updated_at}])
    return {html, updated_at}
}


export const load: PageServerLoad = async () => {
    try {
        const res = await supabase.from('fsk_github_contributions').select(`html, updated_at`).eq('id', 1);
        let updated_at = res.data?.[0]?.updated_at;
        let html = res.data?.[0]?.html;

        if(!html) {
            ({html, updated_at} = await updateContributions());
        }

        setTimeout(async () => {
            if(Date.now() - new Date(updated_at).getTime() > 1000 * 60 * 60 * 6) {
                await updateContributions()
            }
        }, 100)
        return {
            html
        }; 
    } catch (e) {
        console.log(e)
        throw error(500, 'Internal Server Error')
  }
}