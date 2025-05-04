import type { PageServerLoad } from './$types';
import { checkData, error, appendToData } from '@/lib/utils/page';
import { loadAllProjects } from '@/lib/projects/projects';

export const load: PageServerLoad = async () => {
  const restPath = '/projects/all';
  const data = await loadAllProjects();

  if(data?.res?.error) {
    return error(404);
  }

  return appendToData(checkData(data), {
    rest: restPath,
    pageTitle: 'All Projects andrei0x309 | flashsoft.eu',
    pageDescription: 'All dev projects using React, Svelte, Deno, Node, Android etc.'
  });
};
