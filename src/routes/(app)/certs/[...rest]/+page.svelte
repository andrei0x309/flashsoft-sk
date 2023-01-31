<script lang="ts">
    import { afterNavigate, beforeNavigate }  from '$app/navigation'
    import '@/routes/(app)/cert.scss'
    import Header from "../../Header.svelte"
    import CertFilter from "../CertFilter.svelte";
    import CertSearch from "../CertSearch.svelte";
    import CertList from "../CertList.svelte";
    import { page as SveltePage } from '$app/stores';
    import CertSingle from '../CertSingle.svelte';


    export let data: any;
    let isLoading = false

    let pagKey = 0
    beforeNavigate(() => {
        isLoading = true
    })

    afterNavigate(() => {
        pagKey = pagKey + 1
        isLoading = false 
    })


    let isView = false
    $:{
        isView = data.rest?.includes('/view/') || false
    }

    console.log(data)



</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={`${$SveltePage.url}`} />
<meta property="og:image" content="https://flashsoft.eu/res/flashsoftLogo.png" />

{#if !isView}
{#if (data?.res?.page ?? 1) > 1}
<link rel="prev" href="/projects/page/{(data?.res?.page ?? 1) - 1}" />
{/if}
{#if (data?.res?.page ?? 1) < data.res.totalPages}
<link rel="next" href="/projects/page/{(data?.res?.page ?? 1) + 1}" />
{/if}
{/if}
</svelte:head>

<main id="app">

<Header segment="cert">
    <CertFilter slot="filter" selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
    <CertSearch slot="search" searchInput={data?.searchInput ?? ''} expanded={(data?.searchInput ?? '').length > 0} />
</Header>

{#if !isView}
{#key pagKey}
{#if isLoading}
<div class="blink-loading">
<CertList data={data?.res?.data ?? []} maxPage={data?.res?.totalPages ?? 1} currentPage={data?.res?.page ?? 1} rest={data?.rest?.replace(/page.*?\/?$/gm, '') ?? '/'} />
</div>
{:else}
<CertList data={data?.res?.data ?? []} maxPage={data?.res?.totalPages ?? 1} currentPage={data?.res?.page ?? 1} rest={data?.rest?.replace(/page.*?\/?$/gm, '') ?? '/'} />
{/if}
{/key}
{:else}
<CertSingle data={data ?? {}} />
{/if}
</main>