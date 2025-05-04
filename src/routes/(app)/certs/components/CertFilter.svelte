<script lang="ts">
import { goto } from '$app/navigation';
import { slide } from 'svelte/transition';

import { PUBLIC_HTTP_ROOT, PUBLIC_RUN_ENV } from '$env/static/public';

let tags: any[] = $state([]);

interface Props {
  expanded?: boolean;
  selectedTags?: number[];
}

let { expanded = $bindable(false), selectedTags = $bindable([]) }: Props = $props();
let allTags = $state(false);

let loadingTags = $state(false);

const fetchTags = async (all = false) => {
  const response = await fetch(`${PUBLIC_HTTP_ROOT}/api/cert/get/tags${all ? '?all=true' : ''}`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const setTags = (all = false) => {
  loadingTags = true;
  allTags = all;
  fetchTags(all)
    .then((data) => {
      tags = data?.data ?? [];
      loadingTags = false;
    })
    .catch((err) => {
      loadingTags = false;
    });
};

const submitForm = (e: Event) => {
  e.preventDefault();
  if (selectedTags.length > 0) {
    goto(`/certs/filter/tags/${selectedTags.join('/')}/tags`);
  } else {
    goto(`/certs`);
  }
};

$effect(() => {
  if (expanded) {
    if (tags.length < 1) {
      if (selectedTags.length > 0) {
        loadingTags = true;
        fetchTags()
          .then((data) => {
            const popularTags = selectedTags.every((tag: any) => {
              return data.data.includes(tag.tag_id);
            });
            if (popularTags) {
              tags = data?.data ?? [];
              loadingTags = false;
            } else {
              setTags(true);
            }
            expanded = true;
          })
          .catch((err) => {
            loadingTags = false;
          });
      } else {
        setTags(false);
      }
    }
  }
});

</script>
<div class="container-fluid ml-2">    
 
            <button class="row filterLink focus:ring-transparent"
            onclick={() => expanded = !expanded}
            aria-expanded={expanded}
            aria-controls="collapse-filter"
            >
            <span class="icon-caret-down">&nbsp;Filter by tag
                      </span>
            </button>
            {#if expanded}
            <div class="filtercard mt-2 p-2" transition:slide|global id="collapse-filter">
               {#if loadingTags}
                <div class="spinner-small"></div>
               {:else}
                <!-- v-if="this.tags.length > 0 && !showTagLoading" -->

                <form method='get' class='container-fluid' > 
                    <div class="row"> 
               <ul class="tagFilter">

                <!-- v-for="tag in tags" -->
                {#each tags as tag}
                <li>
                          <div class="rkmd-checkbox checkbox-rotate checkbox-ripple">
                  <label class="input-checkbox checkbox-lightBlue">

                    <!-- v-bind:id="'checkbox-'+tag.tag_id" name="tag[]"  v-bind:value="tag.tag_id"  v-model="checkboxes[tag.tag_id]" -->

                    <input id={`tag${tag.tag_id}`} value={tag.tag_id} type="checkbox" name="tag[]" bind:group={selectedTags} >
                    <span class="checkbox"></span>
                  </label>
                  <!-- v-bind:for="'checkbox-'+tag.tag_id" -->
                  <label for={`tag${tag.tag_id}`}  class="label"> { tag.name } ({tag.count })</label>
                </div>    
                   </li>
                    {/each}
           </ul>
                    </div>
                    <div class="row"> 
                    {#if !allTags}
                    <button class="filterLink" onclick={() => setTags(true)}> Show all tags …</button>
                    {:else}
                    <button class="filterLink" onclick={() => setTags(false)} > Show only popular tags …</button>
                    &nbsp;&nbsp;&nbsp;
                    {/if}
                     <input onclick={submitForm} style="border-radius: .125rem; font-size: 0.9em;" type="submit" value="Filter" class="button btn-search-box bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5" />
                    </div>
                </form>
                {/if}
            </div>
            {/if}
    </div>

