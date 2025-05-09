import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';
import { loadCerts, loadFilteredCerts, loadCert } from '@/lib/certs/certs';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/certs/' + (rest.params.rest ?? '/');

  let pageText = '';

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
      case 'page':
      case 'filter':
      {
        const page = extractPage(rest.params.rest);

        if (page > 1) {
          pageText = 'Page ' + page;
        }
        let data: Awaited<ReturnType<typeof loadCerts>>;
        let pageTitle: string = '';
        let pageDescription: string = '';
        if(params[0] === 'filter') {
          const tag_ids = rest?.params?.rest
          .split('/tags/')[1]
          .split('/')
          .map((t) => Number(t))
          .filter((t) => !isNaN(t));
          
          if (!tag_ids || tag_ids.length === 0) {
            throw error(404, 'Not found');
          }
          data = await loadFilteredCerts(page, tag_ids);
          pageTitle = `Courses and Certs | flashsoft.eu | Filter tag: ${tag_ids.slice(0,3).filter((e) => !!e).join(' ')}${pageText}`;
          pageDescription = `Filter for courses and Certsfrom various places, Linkedin, PluralSight, Google, Microsoft, FCC, etc.${pageText}`;
        } else {
          data = await loadCerts(page);
          pageTitle = `Courses and Certs | flashsoft.eu |${pageText}`;
          pageDescription = `Courses and Certs from various places, Linkedin, PluralSight, Google, Microsoft, FCC, etc.${pageText}`;
        }
        return appendToData(checkData(data), {
          rest: restPath,
          pageTitle,
          pageDescription,
        });
      }
      default: {
        throw error(404, 'Not found');
      }
    }
  }
};
