<script lang="ts">
  import { getPrjFeatureImage } from "@/lib/utils/common";
  import type { ProjectData } from "@/routes/(app)/projects/types/projects";
  interface Props {
    data: ProjectData;
    class?: string;
  }

  let { data, class: className = '' }: Props = $props();

</script>

<div class={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
  {#each data.res.data as project}
    <div class="card mb-6">
      <div class="row no-gutters">
        <div class="flex flex-col md:flex-row justify-center">
          <figure class="project-card block md:inline max-w-[16rem] mx-auto w-full">
            <a href={`/projects/view/${project.slug}`}>
              <img
                class="project-img-feature"
                src={getPrjFeatureImage(project.feature_image)}
                alt={"Project " + project.title + "image"}
                width="800"
                height="600"
              />
            </a>
          </figure>
          <div class="card-body text-left grow">
            <a href={`/projects/view/${project.slug}`}>
              <h2 class="card-title header-card-title">
                {project.title}
              </h2>
            </a>
            <p class="card-text">{project.short_description}</p>
            <p class="card-text mt-4"><b>Category:</b></p>
            <p class="mt-1 mb-4">
              <a href={`/projects/category/${project.cat.slug}`} class="cat">{project.cat.cat_name}</a>
            </p>
            <p class="card-text mt-2">
              <a
                href={`/projects/view/${project.slug}`}
                class="button center btn-pagination btn-projects px-2 pt-1 pb-2"
              >
                <small class="text-muted">Details</small>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="row no-gutters">
        <p class="project-tags my-3">
          <span>Technology</span>
          {#each project.techs as tech}
            <a href={`/projects/technology/${tech.slug}`} class="tag">{tech.name}</a>
          {/each}
        </p>
      </div>
    </div>
  {/each}
</div>

<style scoped>
  .cat {
    font-weight: 700;
    background: linear-gradient(to left, var(--color-orange-300), var(--color-amber-500));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .cat:hover{
      background: linear-gradient(to left, var(--color-amber-500), var(--color-yellow-500));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
  }
</style>
