import type { PageServerLoad } from './$types';
import { checkData, extractPage, error, appendToData } from '@/lib/utils/page';
import { loadCerts, loadFilteredCerts, loadCert } from '@/lib/certs/certs';

export const load: PageServerLoad = async (rest) => {
    if (!rest.params?.slug) {
        throw error(404, 'Not found');
    }

    const restPath = '/certs/view' + (rest.params.slug ?? '/');
    const slug = rest.params.slug;
    const data = (await loadCert(slug)) as { res: Record<string, unknown> };

    const certName = data?.res?.data?.[0]?.cert_name
    const id = data?.res?.data?.[0]?.id
    const certDescription = data?.res?.data?.[0]?.cert_description

    if(data.error || !id) {
        throw error(404, 'Not found');
    }

    return appendToData(checkData(data), {
        rest: restPath,
        pageTitle: certName ? `${certName} | flashsoft.eu` : 'Courses and Certs | flashsoft.eu',
        pageDescription: certDescription || `Course details ${certName ? 'for ' + certName : ''}`
    });
};
