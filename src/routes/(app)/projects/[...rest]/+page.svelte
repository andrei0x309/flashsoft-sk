<script lang="ts">
    import '@/routes/(app)/projects.scss'
    // import { page } from '$app/stores';
    import Header from "../../Header.svelte"
    // import type { PageServerLoad } from './$types';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { page as SveltePage } from '$app/stores';
    import { projectBackRoute } from '@/stores/client-route'
    import ProjectSingle  from '../ProjectSingle.svelte';
    import { getPrjFeatureImage } from '@/lib/utils/common';

    export let data: any;
    let showSpinner = false

    //history.pushState({}, null, newUrl);
    let viewKey = 0
    let isView = false
    beforeNavigate(() => {
        showSpinner = true
    })

    afterNavigate(() => {
        showSpinner = false
    })

    const setBackRoute = () => {
        projectBackRoute.set($SveltePage.url.toString())
    }

    let page: number
   
    $:{
        page = data.res.page
        isView = data.rest?.includes('/view/') || false
        if(isView) {
            viewKey = viewKey + 1
        }
    }
    
    </script>

<svelte:head>
    <title>{ data.pageTitle }</title>
    <meta name="description" content="{data.pageDescription}">
    <meta property="og:title" content="{data.pageTitle}" />
    <meta property="og:description" content="{data.pageDescription}">
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${$SveltePage.url}`} />
    {#if !isView}
	<meta property="og:image" content="https://flashsoft.eu/res/og-flashsoft.png" />
    {:else}
    <meta property="og:image" content="{getPrjFeatureImage(data?.res?.data?.[0]?.feature_image)}" />
    {/if}


{#if page > 1}
<link rel="prev" href="/projects/page/{page - 1}" />
{/if}
{#if page < data.res.totalPages}
<link rel="next" href="/projects/page/{page + 1}" />
{/if}
</svelte:head>

<Header segment="projects" />

{#if !isView}
<main class="{`project-main md:mx-4 mb-2 ${showSpinner? 'blink-loading': ''}`}" id="app">
    <!-- v-if='isLoading' -->
    {#if showSpinner}
    <div class="project-spinner"></div>
    {/if}
    <!-- v-bind:class="{ 'project-main-loading':isLoading }" -->
    <div >
        <!-- v-for="projects in dataProject"  -->
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- v-for="project in projects" -->
      {#each data.res.data as project}
      <div  class="card mb-6">
      <div class="row no-gutters">
    
        <div class="flex flex-col md:flex-row justify-center">
        <figure class="project-card block md:inline max-w-[16rem] mx-auto w-full">

                        <!-- v-bind:src="getImgFilePath(project.feature_image)" v-bind:alt="'Project ' + project.feature_image + 'image'" -->

        <img class="project-img-feature" 
        src={getPrjFeatureImage(project.feature_image)} alt="{'Project ' + project.title + 'image'}"
        width="800" height="600" />
                <!-- <figcaption >
                <span class="info" >
                    <span>Git Repo</span>
                    <span>gitlab/repo </span>
                </span>
            </figcaption> -->
        </figure>
            <div class="card-body text-left grow">
                <!-- {{ project.title }} -->
            <h2 class="card-title header-card-title">
                {project.title}
            </h2>
            <!-- {{ project.short_description }} -->
            <p class="card-text">{project.short_description}</p>
            <!-- {{ JSON.parse(project.cat).cat_name }} -->
            <p class="card-text my-4" ><b>Category:</b><br> {project.cat.cat_name}<p>
            <p class="card-text mt-2">
            <a on:click={setBackRoute} href={`/projects/view/${project.id}/${(project.title).replace(/ /gms, '-')}`} class="button center btn-pagination btn-projects px-2 pt-1 pb-2">
                <small class="text-muted">Details</small>
            </a>
           </p>
          </div>
        </div>
      </div>
          <div class="row no-gutters">
                    <!--           @if(count($project['techs_data']))
                     
                    -->
                    <!-- v-show='Array.isArray(JSON.parse(project.techs_data)) && JSON.parse(project.techs_data).length' -->
                 <p class="project-tags my-3"  ><span>Technology</span>
                    <!-- v-for="tech in JSON.parse(project.techs_data)"  {{ tech.name }}  -->
                    {#each project.techs as tech}
                    <button class="tag">{ tech.name }</button>
                    {/each}
                 </p>
    
          </div>
    </div>
    {/each}
       
    </div>
    <!-- v-show='showPrevious' -->
    <div class="flex justify-center">
    {#if page > 1}
    <a href={`/projects/page/${page-1}`} class="btn-projects p-2 mx-2 my-1" >&#8249; Previous </a>
    {/if}
    <!-- v-show='showNext' -->
    {#if page < data.res.totalPages}
    <a href={`/projects/page/${page+1}`} class=" btn-projects p-2 mx-2 my-1">Next &#8250;</a>
    {/if}
    </div>
    </div>
     </main>
    {:else}
    {#key viewKey}
    <ProjectSingle data={data} />
    {/key}
{/if}