<script lang="ts">
import '@/routes/(app)/projects.scss';
import Header from '../components/Header.svelte';
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { page as SveltePage } from '$app/state';
import { config } from '@/lib/config/config';
import ProjectList from '../components/ProjectList.svelte';
import Pagination from '../components/Pagination.svelte';

interface Props {
  data: any;
}

let { data }: Props = $props();
let showSpinner = $state(false);

//history.pushState({}, null, newUrl);
let viewKey = $state(0);
let isView = $state(data.rest?.includes('/view/') || false);
beforeNavigate(() => {
  showSpinner = true;
});

afterNavigate(() => {
  showSpinner = false;
});

let page: number = $state(0);

$effect(() => {
  page = data.res.page;
  if (isView) {
    viewKey = viewKey + 1;
  }
});

const pageUrl = SveltePage.url.href.replace('http://', 'https://');
</script>

<svelte:head>
    <title>{ data.pageTitle }</title>
    <meta name="description" content="{data.pageDescription}">
    <meta property="og:title" content="{data.pageTitle}" />
    <meta property="og:description" content="{data.pageDescription}">
    <meta property="og:type" content="website" />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:image" content="{isView ? data?.res?.data?.[0]?.og_image : config.defaultOpenGraphImage}" />

{#if page > 1}
<link rel="prev" href="/projects/page/{page - 1}" />
{/if}
{#if page < data.res.totalPages}
<link rel="next" href="/projects/page/{page + 1}" />
{/if}
</svelte:head>

<Header segment="projects" />

<main class="{`project-main md:mx-4 mb-2 ${showSpinner? 'blink-loading': ''}`}" id="app">
    {#if showSpinner}
    <div class="project-spinner"></div>
    {/if}
    <div>
    <h1 class="text-left text-1xl font-bold p-4 cursor-default -mt-4">Projects page {page} of {data.res.totalPages}</h1>
    <ProjectList data={data} />

		<Pagination {page} totalPages={data.res.totalPages} />

    </div>
</main>

