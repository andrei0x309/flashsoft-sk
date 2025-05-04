import { supabase } from '@/lib/db-client/supaClientFS';
import { error } from '@/lib/utils/page';

export const loadProjects = async (page = 1) => {
  try {
    const countDb = supabase.from('fsk_prj').select('*', { count: 'exact', head: true });

    const resDb = supabase
      .from('fsk_prj')
      .select(`
    *,
    cat:fsk_prj_cat(
      cat_name,
      cat_description,
      slug
    ),
    techs:fsk_prj_tech_type!inner(
        id,
        name,
        slug
    )
    `)
      .order('id', { ascending: false })
      .range((page - 1) * 12, page * 12 - 1);

    const [count, res] = await Promise.all([countDb, resDb]);
    (res as unknown as { page: number }).page = page;
    (res as unknown as { totalPages: number }).totalPages = Math.ceil((count?.count ?? 0) / 12);

    if (page > (res as unknown as { totalPages: number }).totalPages) {
      throw error(404, 'Not found');
    }

    return {
      res
    };
  } catch (e) {
    conssole.error(e);
    return null;
  }
};

export const loadAllProjects = async () => {
  try {
    const res = await supabase
      .from('fsk_prj')
      .select(`
  *,
    cat:fsk_prj_cat(
      cat_name,
      cat_description,
      slug
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name,
      slug
  )`)
      .order('id', { ascending: false });

    return {
      res
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const loadProject = async (slug: string) => {
  try {
    const res = await supabase
      .from('fsk_prj')
      .select(`
  *,
    cat:fsk_prj_cat(
      cat_name,
      cat_description,
      slug
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name,
      slug
  )`)
      .eq('slug', slug)
      .limit(1);
    return {
      res
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const loadProjectByCat = async (catSlug: string, page: number) => {
  try {
    if(!page){
      page = 1;
    }

    page = Number(page);

    if(page < 1) {
      throw error(404, 'Not found');
    }

    const catDb = await supabase.from('fsk_prj_cat').select('*').eq('slug', catSlug);

    const catId = catDb?.data?.[0]?.id;

    if  (catDb.error || !catId) {
      throw error(404, 'Not found');
    }

    const countDb = supabase.from('fsk_prj').select('*', { count: 'exact', head: true }).eq('cat_id', catId);

    const resDb = supabase.from('fsk_prj')
    .select(`*, cat:fsk_prj_cat(
      cat_name,
      cat_description,
      slug
    ),
    techs:fsk_prj_tech_type!inner(
        id,
        name,
        slug
    )`)
    .eq('cat_id', catId)
    .order('id', { ascending: false })
    .range(0, 12);

    const [count, res] = await Promise.all
    ([countDb, resDb]);
    (res as unknown as { page: number }).page = page;
    (res as unknown as { totalPages: number }).totalPages = Math.ceil((count?.count ?? 0) / 12);
    (res as unknown as { cat: { name: string } }).cat =  catDb.data[0];

    if (page > (res as unknown as { totalPages: number }).totalPages) {
      throw error(404, 'Not found');
    }
    return {
      res
    };
  }
  catch (e) {
    conssole.error(e);
    return null;
  }
}

export const loadProjectsByTech = async (techSlug: string, page: number) => {
  try {    
    if(!page){
      page = 1;
    }

    page = Number(page);

    if(page < 1) {
      throw error(404, 'Not found');
    }

    const techDb = await supabase.from('fsk_prj_tech_type').select('*').eq('slug', techSlug);
    const techId = techDb?.data?.[0]?.id;

    if  (techDb.error || !techId) {
      throw error(404, 'Not found');
    }

    const countDb = supabase.from('fsk_prj_techs').select('*', { count: 'exact', head: true }).eq('tech_id', techId);

    const resDb = supabase.from('fsk_prj').select(`*, 
    cat:fsk_prj_cat(
          cat_name,
          cat_description,
          slug
    ),
    techs:fsk_prj_tech_type!inner(
        id,
        name,
        slug
    ),
    tech_rel:fsk_prj_techs!inner(
        tech_id
    )`)
    .eq('tech_rel.tech_id', techId)
    .order('id', { ascending: false })
    .range((page - 1) * 12, page * 12 - 1);

    const [count, res] = await Promise.all([countDb, resDb]);
    (res as unknown as { page: number }).page = page;
    (res as unknown as { totalPages: number }).totalPages = Math.ceil((count?.count ?? 0) / 12);
    (res as unknown as { tech: { name: string } }).tech =  techDb.data[0];
    if (page > (res as unknown as { totalPages: number }).totalPages) {
      throw error(404, 'Not found');
    }
    return {
      res
     };
  }
  catch (e) {
    console.error(e);
    return null;
  }
}
