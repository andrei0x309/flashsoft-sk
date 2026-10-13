import type { PageServerLoad } from './$types';
import { supabase } from '@/lib/db-client/supaClientFS';
import { error } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

 
const prepareHtml = (html: string) => {
  let graph = '';
  let activity = '';
  const githubHtml =  cheerio.load(html);
  const githubGraph = githubHtml('.graph-before-activity-overview');
  const githubActivity = githubHtml('#user-activity-overview');

  if (githubGraph.length > 0) {
    // remove 'How we count contributions
    githubGraph.find('.Link--muted').remove();
    // add h2
    githubHtml('h2').prependTo(githubGraph);

    graph = githubGraph.html() as string;
  } else {
    return '';
  }
  
  if(githubActivity.length > 0) {
    // remove . js-activity-overview-graph-container
    githubActivity.find('.js-activity-overview-graph-container').remove();
    activity = githubActivity.html() as string;
  }

  
  return activity ? `${graph}|||${activity}` : graph;
};

const updateContributions = async () => {
  let html = await (await fetch('https://github.com/users/andrei0x309/contributions')).text();
  const updated_at = new Date().toISOString();
  // console.log('-------------------------------------------------');
  // console.log(html);
  // console.log('-------------------------------------------------');

  html = prepareHtml(html);
  if(html === '') {}
  // await supabase.from('fsk_github_contributions').upsert([{ id: 1, html, updated_at }]);
  return { html, updated_at };
};

export const load: PageServerLoad = async () => {
  try {
    const res = await supabase.from('fsk_github_contributions').select(`html, updated_at`).eq('id', 1);
    let updated_at = res.data?.[0]?.updated_at;
    let html = res.data?.[0]?.html;

    if (!html) {
      ({ html, updated_at } = await updateContributions());
    }
    setTimeout(async () => {
      // if (Date.now() - new Date(updated_at).getTime() > 1000 * 60 * 60 * 6) {
        await updateContributions();
      // }
    }, 100);
    return {
      html
    };
  } catch (e) {
    console.error(e);
    error(500, 'Internal Server Error');
  }
};
