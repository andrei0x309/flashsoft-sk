import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';
import { loadProjects } from '@/lib/projects/projects';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/projects' + (rest.params?.rest ? `/${rest.params.rest}` : '');
  if (!rest.params.rest) {
    const data = await loadProjects(1);
    return appendToData(checkData(data), {
      rest: restPath,
      pageTitle: 'Projects andrei0x309 | flashsoft.eu',
      pageDescription: 'Dev projects using React, Svelte, Deno, Node, Android etc.'
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
          pageDescription: 'Dev projects using React, Svelte, Deno, Node, Android etc.' + pageText
        });
      }
      default: {
        throw error(404, 'Not found');
      }
    }
  }
};
