<script lang="ts">
    import '@/routes/(app)/projects.scss'

    import Header from "../../Header.svelte"
    // import type { PageServerLoad } from './$types';

    export let data: any;
    let showSpinner = false

    const getImgFilePath =  (fileName: string) => {
        return `/res/project/feature-img/${fileName}`
    }
    let page = data.res.page

    const pageTitle = "test"
    const pageDescription = "This is a test page"
    //history.pushState({}, null, newUrl);

    const getPage = async (page: number) => {
        const req = await fetch('/api/projects/get?page=' + page)
        if(req.ok) {
            return await req.json()
        }
    }

    const goBack = async () => {
        page = page - 1
        history.pushState({}, '', `/projects/page/${page}`)
        showSpinner = true
        const res = await getPage(page)
        data.res = res
        page = res.page
        showSpinner = false
    }

    const goForward = async () => {
        page = page + 1
        history.pushState({}, '', `/projects/page/${page}`)
        showSpinner = true
        const res = await getPage(page)
        data.res = res
        page = res.page
        showSpinner = false
    }


    </script>

<svelte:head>
<title>{ pageTitle }</title>
<meta name="description" content="{pageDescription}">
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{pageDescription}">
<meta property="og:type" content="website" />
<meta property="og:url" content="https://flashsoft.eu" />
<meta property="og:image" content="https://flashsoft.eu/res/flashsoftLogo.png" />

<!-- Schema  -->
<script type="application/ld+json">
	{
	"@context": "http://schema.org",
	"@type": "Organization",
	"name": "FlashSoft",
	"url": "https://flashsoft.eu",
	"logo": "https://flashsoft.eu/res/android-chrome-256x256.png",
	"sameAs": [
		"https://twitter.com/andrei0x309"
	]
	}
</script>
</svelte:head>

<Header segment="projects" />

<main class="project-main text-center md:w-[98.5vw]">
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
    
        <div class="col-lg-12">
        <figure class="project-card block md:inline">

                        <!-- v-bind:src="getImgFilePath(project.feature_image)" v-bind:alt="'Project ' + project.feature_image + 'image'" -->

        <img class="project-img-feature" src={getImgFilePath(project.feature_image)} alt="{'Project ' + project.title + 'image'}">	
                <figcaption >
                <span class="info" >
                    <span>Git Repo</span>
                    <span>gitlab/repo </span>
                </span>
            </figcaption>
        </figure>
            <div class="card-body text-left" style="display:inline">
                <!-- {{ project.title }} -->
            <h3 class="card-title project-card-title">
                {project.title}
            </h3>
            <!-- {{ project.short_description }} -->
            <p class="card-text">{project.short_description}</p>
            <!-- {{ JSON.parse(project.cat).cat_name }} -->
            <p class="card-text" ><b>Category:</b><br> {project.cat.cat_name}<p>
         
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
          <div class="row no-gutters">
                    <!--           @if(count($project['techs_data']))
                     
                    -->
                    <!-- v-show='Array.isArray(JSON.parse(project.techs_data)) && JSON.parse(project.techs_data).length' -->
                 <p class="project-tags"  ><span>Technology</span>
                    <!-- v-for="tech in JSON.parse(project.techs_data)"  {{ tech.name }}  -->
                    {#each project.techs as tech}
                    <button   class="tag">{ tech.name }</button>
                    {/each}
                 </p>
    
          </div>
    </div>
    {/each}
       
    </div>
    <!-- v-show='showPrevious' -->
    {#if page > 1}
    <button class="button center btn-pagination btn-5" on:click={goBack}>&#8249; Previous </button>
    {/if}
    <!-- v-show='showNext' -->
    {#if page < data.res.totalPages}
    <button class="button center btn-pagination btn-5" on:click={goForward}>Next &#8250;</button>
    {/if}
    </div>
    
     </main>   