<script lang="ts">
    // import { afterNavigate }  from '$app/navigation'
    import '@/routes/(app)/cert.scss'
    import Header from "../../Header.svelte"
    import CertFilter from "../CertFilter.svelte";
    import CertSearch from "../CertSearch.svelte";
    import CertList from "../CertList.svelte";

    export let data: any;
    let showSpinner = false

    const getImgFilePath =  (fileName: string) => {
        return `/res/project/feature-img/${fileName}`
    }
 
    const pageTitle = "test"
    const pageDescription = "This is a test page"
    //history.pushState({}, null, newUrl);

    const getPage = async (page: number) => {
        const req = await fetch('/api/projects/get?page=' + page)
        if(req.ok) {
            return await req.json()
        }
    }

    // const goBack = async () => {
    //     page = page - 1
    //     history.pushState({}, '', `/projects/page/${page}`)
    //     showSpinner = true
    //     const res = await getPage(page)
    //     data.res = res
    //     page = res.page
    //     showSpinner = false
    // }

    // const goForward = async () => {
    //     page = page + 1
    //     history.pushState({}, '', `/projects/page/${page}`)
    //     showSpinner = true
    //     const res = await getPage(page)
    //     data.res = res
    //     page = res.page
    //     showSpinner = false
    // }


    console.log(data)



</script>

<Header segment="cert">
    <CertFilter slot="filter" selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
    <CertSearch slot="search" />
</Header>

{#key data?.res?.page ?? 1}
<CertList data={data?.res?.data ?? []} maxPage={data?.res?.totalPages ?? 1} currentPage={data?.res?.page ?? 1} rest={data?.rest?.replace(/page.*?\/?$/gm, '') ?? '/'} />
{/key}
