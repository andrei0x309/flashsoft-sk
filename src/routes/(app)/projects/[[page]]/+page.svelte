<script lang="ts">
    import Header from "../../Header.svelte"
    // import type { PageServerLoad } from './$types';

    export let data: any;
    let showSpinner = false

    const getImgFilePath =  (fileName: string) => {
        return `/res/project/feature-img/${fileName}`
    }

    </script>
    
<Header segment="projects" />

<main class="project-main text-center">
    <!-- v-if='isLoading' -->
    <div class="project-spinner"></div>
    <!-- v-bind:class="{ 'project-main-loading':isLoading }" -->
    <div >
        <!-- v-for="projects in dataProject"  -->
    
    <div style="margin-bottom: 1.5rem;" class="card-deck">
        <!-- v-for="project in projects" -->
      {#each data.res.data as project}
      <div  class="card mb-6">
      <div class="row no-gutters">
    
        <div class="col-lg-12">
                    <figure class="project-card col-lg-4 align-center">

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
    <button class="button center btn-pagination btn-5">&#8249; Previous </button>
    <!-- v-show='showNext' -->
    <button class="button center btn-pagination btn-5">Next &#8250;</button>
    </div>
    
     </main>   