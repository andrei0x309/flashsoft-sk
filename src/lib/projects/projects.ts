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
        cat_name
    ),
    techs:fsk_prj_tech_type!inner(
        id,
        name
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
      cat_description
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name
  )`)
      .order('id', { ascending: false });

    return {
      res
    };
  } catch (e) {
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
      cat_description
  ),
  techs:fsk_prj_tech_type!inner(
      id,
      name
  )`)
      .eq('slug', slug);
    return {
      res
    };
  } catch (e) {
    return null;
  }
};
