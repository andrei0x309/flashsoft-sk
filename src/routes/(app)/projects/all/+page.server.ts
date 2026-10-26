import { loadAllProjects } from '#/lib/projects/projects.ts';
import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const restPath = '/projects/all';
  const data = await loadAllProjects();

  if (data?.res?.error) {
    return error(404);
  }

  return appendToData(checkData(data), {
    rest: restPath,
    pageTitle: 'All Projects andrei0x309 | flashsoft.eu',
    pageDescription: 'Dev projects TS, Android, Rust, Go, Chrome API, Svelte, Vue, React, SvelteKit'
  });
};
