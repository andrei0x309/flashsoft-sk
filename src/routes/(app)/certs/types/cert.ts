export interface CertData {
        pageTitle: string;
        pageDescription: string;
        searchInput: string;
        rest: string;
        res:{
            page: number;
            per_page: number;
            tag_ids: number[];
            totalPages: number;
            data: {
                id: number;
                cert_name: string;
                cert_file_name: string;
                cert_description: string;
                cert_feature_image: string;
                cert_slug: string;
                weight: number;
                cat_id: number;
                created_at: string;
                updated_at: string;
                cat: {
                    cat_icon_name: string;
                    cat_name: string;
                }
                tags: {
                    id: number;
                    name: string;
                }[]
            }[];
        }
}