import { supabase } from '@/lib/db-client/supaClientFS';
import { optionalChain } from '@/lib/utils/index';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';

type SupaClient = typeof supabase;
type PostgesQueryBuilder = ReturnType<SupaClient['from']>;
type PostgesQueryBuilderSelect = ReturnType<PostgesQueryBuilder['select']>;

export const loadFilteredCerts = async (page = 1, tag_ids: number[]) => {
  try {
    const countDb = supabase.from('fsk_cert_tag_type').select('count').in('id', tag_ids);

    const resDb = supabase
      .from('fsk_cert')
      .select(`
    id,
    tags:fsk_cert_tag_type!inner(
        id,
        name
    )
    `)
      .in('fsk_cert_tag_type.id', tag_ids)
      .order('id', { ascending: false })
      .range((page - 1) * 9, page * 9 - 1);
    let count;
    let res;
    [count, res] = await Promise.all([countDb, resDb]);
    if (count?.data) {
      count = (count.data as unknown as [{ count: number }]).reduce((a, b) => a + b.count, 0);
    } else {
      count = 0;
    }

    const ids = res.data?.map((r: { id: number }) => r.id);
    if (!ids) {
      return -1;
    }

    res = await supabase
      .from('fsk_cert')
      .select(`
    id,
    cert_name,
    cert_description,
    cert_file_name,
    cert_feature_image,
    cert_slug,
    weight,
    cat:fsk_cert_cat(
        cat_name,
        cat_icon_name
    ),
    tags:fsk_cert_tag_type!inner(
        id,
        name
    )
    `)
      .in('id', ids)
      .order('weight', { ascending: false })
      .order('id', { ascending: false });
    (res as unknown as { page: number }).page = page;
    (res as unknown as { totalPages: number }).totalPages = Math.ceil((count ?? 0) / 9);
    (res as unknown as { tag_ids: number[] }).tag_ids = tag_ids;

    if (page > (res as unknown as { totalPages: number }).totalPages) {
      return -1;
    }

    return {
      res
    };
  } catch (e) {
    return null;
  }
};

export const loadCerts = async (page: number, search = false, searchTerms: string[] = []) => {
  try {
    const countDb = optionalChain(supabase.from('fsk_cert').select('*', { count: 'exact', head: true }))
      .if(search, (chain: PostgesQueryBuilderSelect) =>
        chain.or(searchTerms.map((t) => `cert_name.ilike.%${t}%,cert_description.ilike.%${t}%`).join(','))
      )
      .end();

    const resDb = optionalChain(
  supabase.from('fsk_cert').select(`
  id,
  cert_name,
  cert_file_name,
  cert_description,
  cert_feature_image,
  cert_slug,
  weight,
  cat:fsk_cert_cat(
      cat_name,
      cat_icon_name
  ),
  tags:fsk_cert_tag_type!inner(
      id,
      name
  )
  `)
    )
      .if(search, (chain: PostgesQueryBuilderSelect) =>
        chain.or(searchTerms.map((t) => `cert_name.ilike.%${t}%,cert_description.ilike.%${t}%`).join(','))
      )
      .end()
      .order('weight', { ascending: false, nullsFirst: false })
      .order('id', { ascending: false })
      .range((page - 1) * 9, page * 9 - 1);

    const [count, res] = await Promise.all([countDb, resDb]);

    (res as unknown as { page: number }).page = page;
    (res as unknown as { totalPages: number }).totalPages = Math.ceil((count?.count ?? 0) / 9);

    if (page > (res as unknown as { totalPages: number }).totalPages) {
      return -1;
    }

    return {
      res
    };
  } catch (e) {
    return null;
  }
};

export const loadCert = async (slug: string) => {
  try {
    const res = await supabase
      .from('fsk_cert')
      .select(`
      id,
      cert_name,
      cert_file_name,
      cert_description,
      cert_feature_image,
      cert_slug,
      weight,
      cat:fsk_cert_cat(
          cat_name,
          cat_icon_name
      ),
      tags:fsk_cert_tag_type!inner(
          id,
          name
      )
      `)
      .eq('cert_slug', slug)
      .limit(1);
    const { data, error } = res;
    if (error) {
      return null;
    }
    if (data?.length === 0) {
      return -1;
    }

    return {
      res
    };

  } catch (e) {
    return null;
  }
};
