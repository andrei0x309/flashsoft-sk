<script lang="ts">
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { projectBackRoute } from '@/stores/client-route';
import { onMount } from 'svelte';
import { getPrjFeatureImage } from '@/lib/utils/common';
import type { ProjectData } from '@/routes/(app)/projects/types/projects';

// import { Lightbox } from 'svelte-lightbox';
// import { browser } from '$app/environment';

let backRoute: string = $state('');

let showSpinner = $state(false);
interface Props {
  data: ProjectData;
}

let { data }: Props = $props();

beforeNavigate(() => {
  showSpinner = true;
});

afterNavigate(() => {
  showSpinner = false;
});

onMount(() => {
  projectBackRoute.subscribe((val) => {
    backRoute = val || '/projects';
  });
  console.log(data);
});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- v-for="project in projects" -->
  {#each data.res.data as project}
  <div  class="card mb-6">
  <div class="row no-gutters">

    <div class="flex flex-col md:flex-row justify-center">
    <figure class="project-card block md:inline max-w-[16rem] mx-auto w-full">

                    <!-- v-bind:src="getImgFilePath(project.feature_image)" v-bind:alt="'Project ' + project.feature_image + 'image'" -->
    
    <a href={`/projects/view/${project.slug}`}>
    <img class="project-img-feature" 
    src={getPrjFeatureImage(project.feature_image)} alt="{'Project ' + project.title + 'image'}"
    width="800" height="600" />
    </a>
            <!-- <figcaption >
            <span class="info" >
                <span>Git Repo</span>
                <span>gitlab/repo </span>
            </span>
        </figcaption> -->
    </figure>
        <div class="card-body text-left grow">
            <!-- {{ project.title }} -->
        <a href={`/projects/view/${project.slug}`}>
        <h2 class="card-title header-card-title">
            {project.title}
        </h2>
        </a>
        <!-- {{ project.short_description }} -->
        <p class="card-text">{project.short_description}</p>
        <!-- {{ JSON.parse(project.cat).cat_name }} -->
        <p class="card-text mt-4" ><b>Category:</b><p>
        <p class="cat mt-1 mb-4" >{project.cat.cat_name}</p>
          
        <p class="card-text mt-2">
        <a href={`/projects/view/${project.slug}`} class="button center btn-pagination btn-projects px-2 pt-1 pb-2">
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

<style scoped>
.cat {
  margin-top: 0.2rem;
  margin-left: 1rem;
  font-weight: 700;
  background: linear-gradient(to left, var(--color-orange-50), var(--color-amber-500));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>