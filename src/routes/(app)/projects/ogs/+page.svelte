<script lang="ts">
    import '@/routes/(app)/projects.scss';
    import Header from '@/routes/(app)/components/Header.svelte';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { page as SveltePage } from '$app/state';
    import { config } from '@/lib/config/config';
    import ProjectList from '@/routes/(app)/projects/components/ProjectList.svelte';
    import GoBack from '@/routes/(app)/components/GoBack.svelte';
    import type { ProjectDataPage } from '@/routes/(app)/projects/types/projects'
    import { onMount } from "svelte";
    
    
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
            content={config.defaultOpenGraphImage}
        />
    </svelte:head>
    
    <Header segment="projects" />
    
    <main class={`project-main md:mx-4 mb-2 ${showSpinner ? 'blink-loading' : ''}`} id="app">
        {#if showSpinner}
            <div class="project-spinner"></div>
        {/if}
        <div>
        <GoBack backRoute="/projects"/><h1 class="text-left text-1xl font-bold p-4 cursor-default -mt-4">List of all projects</h1>
            <ProjectList {data} class="project-list-overide" />
        </div>
    </main>

<style lang="scss">
:global(.project-list-overide) {

  grid-template-columns: repeat(1, minmax(0, 1fr));

  :global(.card) {
    width: 1200px;
    height: 630px;
    font-size: 2rem;
    justify-content: center;

    :global(.header-card-title) {
      font-size: 2.5rem;
    }

    :global(.project-tags a.tag) {
      font-size: 1.6rem;
    }

    :global(.card-text) {
      max-height: 120px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: break-spaces;
      display: inline-block;
    }

    :global(img) {
      max-width: 100%
    }

    :global(figure) {
      max-width: 100%
    }

    :global(.card-body){
      width: 160%;
    }
  }
}
</style>