import { loadAllProjects } from '#/lib/projects/projects.ts';
import { appendToData, checkData, error } from '#/lib/utils/page.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
  const host = request.headers.get('host');

  if (host && !host.startsWith('localhost') && !host.startsWith('127.0.0.1')) {
    error(404, 'Not Found');
  }

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
