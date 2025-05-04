<script lang="ts">
    import '@/routes/(app)/cert.scss';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import Header from '@/routes/(app)/components/Header.svelte';
    import CertFilter from '@/routes/(app)/certs/components/CertFilter.svelte';
    import CertSearch from '@/routes/(app)/certs/components/CertSearch.svelte';
    import CertList from '@/routes/(app)/certs/components/CertList.svelte';
    import { page as SveltePage } from '$app/state';
    import { config } from '@/lib/config/config';
    import type { CertData } from '@/routes/(app)/certs/types/cert'
    import { onMount } from 'svelte';
    
    interface Props {
      data: CertData;
    }
    
    let { data }: Props = $props();
    let isLoading = $state(false);
    
    let pagKey = $state(0);
    beforeNavigate(() => {
        isLoading = true;
    });
    
    afterNavigate(() => {
      pagKey = pagKey + 1;
      isLoading = false;
    });

    onMount(() => {
        isLoading = false;
    })
    

    const pageUrl = SveltePage.url.href.replace('http://', 'https://');
    
</script>


<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={pageUrl} />
<meta property="og:image" content={config.defaultOpenGraphImageCerts} />

{#if (data?.res?.page ?? 1) > 1}
<link rel="prev" href="/{data?.rest}/page/{(data?.res?.page ?? 1) - 1}" />
{/if}
{#if (data?.res?.page ?? 1) < data.res?.totalPages}
<link rel="next" href="/{data?.rest}/page/{(data?.res?.page ?? 1) + 1}" />
{/if}
</svelte:head>

<Header segment="cert">
    {#snippet filter()}
                <CertFilter  selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
            {/snippet}
    {#snippet search()}
                <CertSearch  searchInput={data?.searchInput ?? ''} expanded={(data?.searchInput ?? '').length > 0} />
            {/snippet}
</Header>

{#key pagKey}
<CertList class={isLoading? 'blink-loading': ''} data={data} />
{/key}