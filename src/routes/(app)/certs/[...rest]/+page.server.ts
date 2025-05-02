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
    console.log(params);
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

        const tag_ids = rest.params.rest
          .split('/tags/')[1]
          .split('/')
          .map((t) => Number(t))
          .filter((t) => !isNaN(t));
        const data = await loadFilteredCerts(page, tag_ids);
        return appendToData(checkData(data), {
          rest: restPath,
          pageTitle: `Courses and Certs | flashsoft.eu | Filter tag: ${[tag_ids[0], tag_ids[1], tag_ids[2]].filter((e) => !!e).join(' ')}`,
          pageDescription: 'Filter for courses and Certs from Linkedin, PluralSight, Udemy, Udacity, Coursera, Edx, etc.'
        });
      }
      case 'view': {
        console.log(params[1], params[2]);
        const id = Number(params[1]);
        if (isNaN(id)) {
          throw error(404, 'Not found');
        }
        const title = params[2];
        if (!title) {
          throw error(404, 'Not found');
        }

        const data = (await loadCert(id, title)) as { res: Record<string, unknown> };

        console.log(data);

        return appendToData(checkData(data), {
          rest: restPath,
          pageTitle: data?.res?.cert_name ?? 'Courses and Certs | flashsoft.eu',
          pageDescription: data?.res?.cert_description || `Course details ${data?.res?.cert_name ? 'for ' + data?.res?.cert_name : ''}`
        });
      }
      case 'search': {
        const page = extractPage(rest.params.rest);
        const searchTerms = rest.url.searchParams.getAll('q');
        console.log(searchTerms);
        return appendToData(checkData(await loadCerts(page, true, searchTerms)), {
          rest: restPath,
          searchInput: searchTerms.join(' '),
          pageTitle: 'Searching cert for ' + searchTerms.join(' ').substring(0, 20) + '...',
          pageDescription: 'Searching cert for ' + searchTerms.join(' ').substring(0, 170) + '...'
        });
      }
      default: {
        throw error(404, 'Not found');
      }
    }
  }
};
