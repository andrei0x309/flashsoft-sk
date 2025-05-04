import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';
import { loadCerts, loadFilteredCerts, loadCert } from '@/lib/certs/certs';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/certs/' + (rest.params.rest ?? '/');
  if (!rest.params.rest) {
    const data = await loadCerts(1);
    return appendToData(checkData(data), {
      rest: restPath,
      pageTitle: 'Courses and Certs | flashsoft.eu',
      pageDescription: 'Courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'
    });
  } else {
    const params = rest.params.rest.split('/');
    switch (params[0]) {
      case 'page': {
        const page = extractPage(rest.params.rest);

        const data = await loadCerts(page);
        return appendToData(checkData(data), {
          rest: restPath,
          pageTitle: `Courses and Certs | flashsoft.eu | Page ${page}`,
          pageDescription: 'Courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'
        });
      }
      case 'filter': {
        const page = extractPage(rest.params.rest);

        const tag_ids = rest?.params?.rest
          .split('/tags/')[1]
          .split('/')
          .map((t) => Number(t))
          .filter((t) => !isNaN(t));
          
          if (!tag_ids || tag_ids.length === 0) {
            throw error(404, 'Not found');
          }
        const data = await loadFilteredCerts(page, tag_ids);
        return appendToData(checkData(data), {
          rest: restPath,
          pageTitle: `Courses and Certs | flashsoft.eu | Filter tag: ${[tag_ids[0], tag_ids[1], tag_ids[2]].filter((e) => !!e).join(' ')}`,
          pageDescription: 'Filter for courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'
        });
      }
      default: {
        throw error(404, 'Not found');
      }
    }
  }
};
