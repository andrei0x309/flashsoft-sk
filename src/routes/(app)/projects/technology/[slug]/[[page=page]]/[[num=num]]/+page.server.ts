import type { PageServerLoad } from './$types';
import { checkData, error, appendToData } from '@/lib/utils/page';
import { loadProjectsByTech } from '@/lib/projects/projects';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/projects/techonology' + (rest.params.num ?? '/page/' + (rest.params.num ?? '1'));
  const techname = rest.params.slug;
  const page = Number(rest.params.num) || 1;
  const data = await loadProjectsByTech(techname, page);
  
  if(data?.res?.error) {
    return error(404);
  }

  const techName = data?.res?.tech?.name;
  const pageText = page > 1 ? ' Page ' + page : '';

  return appendToData(checkData(data), {
    rest: restPath,
    pageTitle: 'Projects with technology ' + techName + ' | flashsoft.eu' + pageText,
    pageDescription: 'Projects using ' + techName +' by andrei0x309' + pageText
  });
};
