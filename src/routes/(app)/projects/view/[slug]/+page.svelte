<script lang="ts">
import '@/routes/(app)/projects.scss';
import Header from '@/routes/(app)/projects/components/Header.svelte';
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { page as SveltePage } from '$app/state';
import { projectBackRoute } from '@/stores/client-route';
import ProjectSingle from '@/routes/(app)/projects/components/ProjectSingle.svelte';
import { getPrjFeatureImage } from '@/lib/utils/common';
import { config } from '@/lib/config/config';

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
	<title>{data.pageTitle}</title>
	<meta name="description" content={data.pageDescription} />
	<meta property="og:title" content={data.pageTitle} />
	<meta property="og:description" content={data.pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta
		property="og:image"
		content={isView ? data?.res?.data?.[0]?.og_image : config.defaultOpenGraphImage}
	/>
</svelte:head>

<Header segment="projects" />

<ProjectSingle {data} />
