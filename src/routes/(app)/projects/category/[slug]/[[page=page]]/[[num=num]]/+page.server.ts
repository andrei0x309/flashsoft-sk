import type { PageServerLoad } from './$types';
import { checkData, error, appendToData } from '@/lib/utils/page';
import { loadProjectByCat } from '@/lib/projects/projects';

export const load: PageServerLoad = async (rest) => {
  const restPath = '/projects/category' + (rest.params.num ?? '/page/' + (rest.params.num ?? '1'));
  const catSlug = rest.params.slug;
  const page = Number(rest.params.num) || 1;
  const data = await loadProjectByCat(catSlug, page);
  
  if(data?.res?.error) {
    return error(404);
  }

  const catName = data?.res?.data?.[0]?.cat?.name;

  return appendToData(checkData(data), {
    rest: restPath,
    pageTitle: 'Projects in category ' + catName + ' | flashsoft.eu',
    pageDescription: 'Projects in category ' + catName +' by andrei0x309'
  });
};
