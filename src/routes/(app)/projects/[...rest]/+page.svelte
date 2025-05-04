<script lang="ts">
import '@/routes/(app)/projects.scss';
import Header from '@/routes/(app)/components/Header.svelte';
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { page as SveltePage } from '$app/state';
import { config } from '@/lib/config/config';
import ProjectList from '../components/ProjectList.svelte';
import Pagination from '../components/Pagination.svelte';
import { onMount } from "svelte";
import type { ProjectDataPage } from '@/routes/(app)/projects/types/projects'

interface Props {
  data: ProjectDataPage;
}

let { data }: Props = $props();
let showSpinner = $state(false);

beforeNavigate(() => {
  showSpinner = true;
});

afterNavigate(() => {
  showSpinner = false;
});

let page: number = $state(0);

$effect(() => {
  page = data.res.page;
});

onMount(() => {
	showSpinner = false;
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
    <meta property="og:image" content="{config.defaultOpenGraphImageProjects}" />

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

