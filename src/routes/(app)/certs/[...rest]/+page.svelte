<script lang="ts">
import { afterNavigate, beforeNavigate } from '$app/navigation';
import '@/routes/(app)/cert.scss';
import Header from '../../projects/components/Header.svelte';
import CertFilter from '../CertFilter.svelte';
import CertSearch from '../CertSearch.svelte';
import CertList from '../CertList.svelte';
import { page as SveltePage } from '$app/state';
import CertSingle from '../CertSingle.svelte';
import { config } from '$lib/config';
import { onMount } from 'svelte';


interface Props {
  data: any;
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

let isView = $state(data.rest?.includes('/view/') || false);
 

const pageUrl = SveltePage.url.href.replace('http://', 'https://');

onMount(()=> {
  if (isView) {
    pagKey = pagKey + 1;
    isLoading = false;
  }
})

</script>

<svelte:head>
<title>{ data.pageTitle }</title>
<meta name="description" content="{data.pageDescription}">
<meta property="og:title" content="{data.pageTitle}" />
<meta property="og:description" content="{data.pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content={pageUrl} />
<meta property="og:image" content={config.defaultOpenGraphImage} />

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
    {#snippet filter()}
                <CertFilter  selectedTags={ data?.res?.tag_ids ?? []} expanded={(data?.res?.tag_ids ?? []).length > 0} />
            {/snippet}
    {#snippet search()}
                <CertSearch  searchInput={data?.searchInput ?? ''} expanded={(data?.searchInput ?? '').length > 0} />
            {/snippet}
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

<a rel="nofollow external" href="https://status.flashsoft.eu">
  <img class="mx-auto mt-2 mb-6" src="https://uptime.betterstack.com/status-badges/v1/monitor/1u13o.svg" alt="flashsoft.eu Status" />
</a>
