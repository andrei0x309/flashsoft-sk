import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';
import { loadCerts } from '@/lib/certs/certs';

export const load: PageServerLoad = async (req) => {
  let restPath = '/certs/search'
  const searchTerms = req.url.searchParams.getAll('q');
  restPath += '?q=' + searchTerms.join(' ')
  let page = Number(req.params.num) || 1;

  if(req.params.num) {
    restPath += '/page/' + page
  }
  
  if(page < 1) {
    page = 1;
  }
  return appendToData(checkData(await loadCerts(page, true, searchTerms)), {
    rest: restPath,
    searchInput: searchTerms.join(' '),
    pageTitle: 'Searching cert for ' + searchTerms.join(' ').substring(0, 20) + '...',
    pageDescription: 'Searching cert for ' + searchTerms.join(' ').substring(0, 170) + '...'
  });

};
