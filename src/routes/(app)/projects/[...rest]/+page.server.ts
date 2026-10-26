import { loadProjects } from '#/lib/projects/projects.ts';
import { appendToData, checkData, error, extractPage } from '#/lib/utils/page.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/projects' + (rest.params?.rest ? `/${rest.params.rest}` : '');
  if (!rest.params.rest) {
    const data = await loadProjects(1);
    return appendToData(checkData(data), {
      rest: restPath,
      pageTitle: 'Projects andrei0x309 | flashsoft.eu',
      pageDescription: 'Dev projects TS, Android, Rust, Go, Chrome API, Svelte, Vue, React, SvelteKit'
    });
  } else {
    const params = rest.params.rest.split('/');

    switch (params[0]) {
      case 'page': {
        const page = extractPage(rest.params.rest);

        const pageText = page > 1 ? ' Page ' + page : '';

        const data = await loadProjects(page);
        return appendToData(checkData(data), {
          rest: restPath,
          pageTitle: `Projects andrei0x309 | flashsoft.eu |${pageText}`,
          pageDescription: 'Dev projects TS, Amdroid' + pageText
        });
      }
      default: {
        throw error(404, 'Not found');
      }
    }
  }
};
