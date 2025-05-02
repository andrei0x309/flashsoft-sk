<script lang="ts">
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { projectBackRoute } from '@/stores/client-route';
import { onMount } from 'svelte';
import { getPrjFeatureImage } from '@/lib/utils/common';
import { Lightbox } from 'svelte-lightbox';
import { browser } from '$app/environment';
import MegaEmbed from './MegaEmbed.svelte';
import type { ProjectData } from '@/routes/(app)/projects/types/projects';

let backRoute: string = $state('');

let showSpinner = $state(false);
interface Props {
  data: ProjectData;
}

let { data }: Props = $props();

const hasMega = data?.res?.data?.[0]?.mega || false;
const hasYoutube = data?.res?.data?.[0]?.youtube || false;
const hasMegaOrYoutube = hasMega || hasYoutube;
const links = data?.res?.data?.[0]?.links;
const screenPics = data?.res?.data?.[0]?.screen_pics;
const techs = data?.res?.data?.[0]?.techs;

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
});
</script>

<main
	class={`project-main text-center md:mx-4 mb-2 flex ${showSpinner ? 'blink-loading' : ''}`}
	id="app"
>
	<div class="card flex-col justify-start mx-auto min-w-[70%]">
		<h1 class="card-title header-card-title">
			{data?.res?.data?.[0]?.title}
		</h1>

		<div class="card-body">
			<img
				class="project-img-feature mx-auto max-w-[16rem]"
				src={getPrjFeatureImage(data?.res?.data?.[0]?.feature_image)}
				alt={'Project ' + data?.res?.data?.[0]?.title + 'image'}
				width="800"
				height="600"
			/>

			<div class="card-text">
        <h2 class="headings mt-4 mb-2">Open Source</h2>
				{#if data?.res?.data?.[0]?.open_source === true}
					<p>YES</p>
				{:else if data?.res?.data?.[0]?.open_source === false}
					<p>NO</p>
				{/if}
				<h2 class="headings mt-4 mb-2">Category</h2>
				<p class="text-muted">
					{data?.res?.data?.[0]?.cat?.cat_name}
				</p>
				<!-- {#if data?.res?.data?.[0]?.cat?.cat_description}
					<small>{data.res.data[0].cat.cat_description}</small>
				{/if} -->
				<h2 class="headings mt-4 mb-2">Description</h2>
				<p>
					{data?.res?.data?.[0]?.short_description}
				</p>
				{#if Object.keys(links ?? {}).length > 0}
					<h2 class="headings mt-4 mb-2">Links</h2>
					<ul class="list-group">
						{#each Object.entries(links) as [name, href]}
							<li class="list-group-item my-1">
								<a class="underline hover:font-bold" {href} target="_blank" rel="noopener noreferrer external">
									{name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
        {#if hasMegaOrYoutube}
        <h2 class="headings mt-4">Demo Video</h2>
        {/if}
        {#if hasMega}
        <MegaEmbed source={data?.res?.data?.[0]?.mega} />
        {:else if hasYoutube}
         <!-- Implement YouTube video here -->
        {/if}

				{#if Object.keys(screenPics).length > 0}
					<h2 class="headings mt-4">Screenshots</h2>
					<small>click to Zoom</small>
					<div
						class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[20rem] mx-auto my-4 gap-2 md:gap-4"
					>
						{#if browser}
							{#each Object.entries(screenPics) as [name, src]}
								<Lightbox>
									<img class="project-img-feature" {src} alt={name} width="800" height="600" />
								</Lightbox>
							{/each}
						{:else}
							{#each Object.entries(screenPics) as [name, src]}
								<img class="project-img-feature" {src} alt={name} width="800" height="600" />
							{/each}
						{/if}
					</div>
				{/if}
				{#if techs?.length > 0}
					<h2 class="headings mt-4 mb-2">Techs</h2>
          <div class="flex flex-wrap gap-2">
					{#each techs as tech}
						<button class="tag inline cursor-pointer">{tech.name}</button>
					{/each}
          </div>
				{/if}
			</div>

			<a
				href={backRoute}
				class="button center btn-pagination btn-projects px-4 pt-2 pb-3 inline-block text-[1.2rem] mt-8"
			>
				<small class="text-muted">Back</small>
			</a>
		</div>
	</div>
</main>

<style lang="scss">
	.headings {
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
