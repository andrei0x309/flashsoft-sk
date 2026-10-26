import { loadCerts } from '#/lib/certs/certs.ts';
import { appendToData, checkData, error, extractPage } from '#/lib/utils/page.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (req) => {
  let restPath = '/certs/search';
  const searchTerms = req.url.searchParams.getAll('q');
  restPath += '?q=' + searchTerms.join(' ');
  let page = Number(req.params.num) || 1;

  if (req.params.num) {
    restPath += '/page/' + page;
  }

  if (page < 1) {
    page = 1;
  }

  const pageText = page > 1 ? 'Page ' + page : '';

  return appendToData(checkData(await loadCerts(page, true, searchTerms)), {
    rest: restPath,
    searchInput: searchTerms.join(' '),
    pageTitle: 'Searching cert for ' + searchTerms.join(' ').substring(0, 20) + '...' + pageText,
    pageDescription: 'Searching cert for ' + searchTerms.join(' ').substring(0, 170) + '...' + pageText
  });
};
