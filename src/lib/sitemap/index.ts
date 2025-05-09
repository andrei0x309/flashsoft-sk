import { supabase } from '@/lib/db-client/supaClientFS';

const CERT_PATH = 'certs';
const PROJECT_PATH = 'projects';

export const generatePaths = async () => {
  const paths = [];

  // Front page
  paths.push({
    url: '/',
    priority: 1,
    changefreq: 'weekly'
  });

  // Cert
  paths.push({
    url: CERT_PATH,
    priority: 0.7
  });

  // Single
  let { data } = await supabase.from('fsk_cert').select('id, cert_name, cert_slug');
  for (const cert of data ?? []) {
    paths.push({
      url: `${CERT_PATH}/view/${cert.cert_slug}`,
      priority: 0.6
    });
  }
  // Default pages
  let count = await supabase.from('fsk_cert').select('*', { count: 'exact', head: true });
  let page = Math.ceil((count?.count ?? 0) / 9);
  for (let i = 1; i <= page; i++) {
    paths.push({
      url: `${CERT_PATH}/page/${i}`,
      priority: 0.5
    });
  }
  // Top 3 tags
  const topTags = [
    {
      count: 86,
      tag_id: 4,
      name: 'BackEnd'
    },
    {
      count: 77,
      tag_id: 9,
      name: 'Vanilla Javascript'
    },
    {
      count: 43,
      tag_id: 31,
      name: 'Programming Patterns'
    }
  ];
  for (const tag of topTags) {
    count = await supabase
      .from('fsk_cert')
      .select(
        `tags:fsk_cert_tag_type!inner(
            id
        )`,
        { count: 'exact', head: true }
      )
      .in('fsk_cert_tag_type.id', [tag.tag_id]);
    page = Math.ceil((count?.count ?? 0) / 9);
    for (let i = 1; i <= page; i++) {
      paths.push({
        url: `${CERT_PATH}/filter/tags/${tag.tag_id}/tags/page/${i}`,
        priority: 0.5
      });
    }
  }

  // Projects
  paths.push({
    url: PROJECT_PATH,
    priority: 0.8
  });
  // Single
  const { data: projectData } = await supabase.from('fsk_prj').select('id, title, slug');

  for (const project of projectData ?? []) {
    paths.push({
      url: `${PROJECT_PATH}/view/${project.slug}`,
      priority: 0.7
    });
  }

  // Category
  const { data: categories } = await supabase.from('fsk_prj_cat').select('id, name, slug');
  for (const category of categories ?? []) {
    paths.push({
      url: `${PROJECT_PATH}/category/${category.slug}`,
      priority: 0.6
    });
  }

  // Tags
  const { data: techs } = await supabase.from('fsk_prj_tech_type').select('slug');
  for (const tech of techs ?? []) {
    paths.push({
      url: `${PROJECT_PATH}/technology/${tech.slug}`,
      priority: 0.5
    });
  }


  // Default pages
  count = await supabase.from('fsk_prj').select('*', { count: 'exact', head: true });
  page = Math.ceil((count?.count ?? 0) / 12);
  for (let i = 1; i <= page; i++) {
    paths.push({
      url: `${PROJECT_PATH}/page/${i}`,
      priority: 0.4
    });
  }

  return paths;
};
