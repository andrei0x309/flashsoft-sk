import { loadProject } from '#/lib/projects/projects.ts';
import { appendToData, checkData } from '#/lib/utils/page.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (rest) => {
  const slug = rest.params.slug;
  const data = await loadProject(slug);
  return appendToData(checkData(data), {
    rest: '/projects/' + slug,
    pageTitle: `${data?.res?.data?.[0]?.title ?? 'N\\A'} | andrei0x309`,
    pageDescription: `${data?.res?.data?.[0]?.short_description ?? 'Description of this project is missing'}`
  });
};
