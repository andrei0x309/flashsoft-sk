import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';
import { loadAllProjects } from '@/lib/projects/projects';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/projects/' + (rest.params.rest ?? '/');
  const data = await loadAllProjects();
  return appendToData(checkData(data), {
    rest: restPath,
    pageTitle: 'All Projects andrei0x309 | flashsoft.eu',
    pageDescription: 'All dev projects using React, Svelte, Deno, Node, Android etc.'
  });
};
