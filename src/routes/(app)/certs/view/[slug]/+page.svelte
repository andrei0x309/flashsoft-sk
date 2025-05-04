<script lang="ts">
    import '@/routes/(app)/cert.scss';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import Header from '@/routes/(app)/components/Header.svelte';
    import CertFilter from '@/routes/(app)/certs/components/CertFilter.svelte'
    import CertSearch from '@/routes/(app)/certs/components/CertSearch.svelte';
    import { page as SveltePage } from '$app/state';
    import CertSingle from '@/routes/(app)/certs/components/CertSingle.svelte';
    import { config } from '@/lib/config/config';
    import { onMount } from 'svelte';
    import type { CertData } from '@/routes/(app)/certs/types/cert'
    
    interface Props {
      data: CertData
    }
    
    let { data }: Props = $props();
    let isLoading = $state(false);
    
    beforeNavigate(() => {
      isLoading = true;
    });
    
    afterNavigate(() => {
      isLoading = false;
    });
    
    
    const pageUrl = SveltePage.url.href.replace('http://', 'https://');
    
    onMount(() => {
        isLoading = false;
    });
    </script>
    
    <svelte:head>
    <title>{ data.pageTitle }</title>
    <meta name="description" content="{data.pageDescription}">
    <meta property="og:title" content="{data.pageTitle}" />
    <meta property="og:description" content="{data.pageDescription}">
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:image" content={config.defaultOpenGraphImageCerts} />
    
 
    </svelte:head>
    
    <main id="app">
    
    <Header segment="cert">
        {#snippet filter()}
                    <CertFilter  selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
                {/snippet}
        {#snippet search()}
                    <CertSearch  searchInput={data?.searchInput ?? ''} expanded={(data?.searchInput ?? '').length > 0} />
                {/snippet}
    </Header>
    
    <CertSingle class={isLoading? 'blink-loading': ''} data={data ?? {}} />
    </main>
    