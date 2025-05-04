<script lang="ts">
import '@/routes/(app)/projects.scss';
import Header from '@/routes/(app)/components/Header.svelte';
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { page as SveltePage } from '$app/state';
import ProjectSingle from '@/routes/(app)/projects/components/ProjectSingle.svelte';
import type { ProjectDataPage } from '@/routes/(app)/projects/types/projects'
import { onMount } from 'svelte';


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
	<title>{data.pageTitle}</title>
	<meta name="description" content={data.pageDescription} />
	<meta property="og:title" content={data.pageTitle} />
	<meta property="og:description" content={data.pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta
		property="og:image"
		content={data?.res?.data?.[0]?.og_image}
	/>
</svelte:head>

<Header segment="projects" />

<ProjectSingle {data} />
