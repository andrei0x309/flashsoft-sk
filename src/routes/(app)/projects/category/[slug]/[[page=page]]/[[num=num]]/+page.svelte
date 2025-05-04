<script lang="ts">
    import '@/routes/(app)/projects.scss';
    import Header from '@/routes/(app)/components/Header.svelte';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { page as SveltePage } from '$app/state';
    import { config } from '@/lib/config/config';
    import ProjectList from '@/routes/(app)/projects/components/ProjectList.svelte';
    import GoBack from '@/routes/(app)/components/GoBack.svelte';
    import type { ProjectDataPage } from '@/routes/(app)/projects/types/projects';
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
    let catName = $state(data.res.cat?.cat_name || '')
    
    $effect(() => {
      page = data.res.page;
      if (data.res.cat) {
        catName = data.res.cat.cat_name;
      }
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
            content={config.defaultOpenGraphImageProjects}
        />
    </svelte:head>
    
    <Header segment="projects" />
    
    <main class={`project-main md:mx-4 mb-2 ${showSpinner ? 'blink-loading' : ''}`} id="app">
        {#if showSpinner}
            <div class="project-spinner"></div>
        {/if}
        <div>
            <GoBack backRoute="/projects"/>
    
            {#if data.res.totalPages > 1}
            <h1 class="text-left text-1xl font-bold p-4 cursor-default -mt-4">Projects {catName ? 'in ' + catName: ''}: page {page} of {data.res.totalPages}</h1>
            {:else}
            <h1 class="text-left text-1xl font-bold p-4 cursor-default -mt-4">Projects {catName ? 'in ' + catName: ''}</h1>
            {/if}
    
            <ProjectList {data} />
        </div>
    </main>
    