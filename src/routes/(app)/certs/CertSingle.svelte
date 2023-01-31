<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { certBackRoute } from '@/stores/client-route';
	import { onMount } from 'svelte';
	import CertImg from './CertImg.svelte';

	let backRoute: string;
	let showSpinner = false;
	export let data: {
		res: {
			cert_name: string;
			cert_description: string;
			cert_feature_image: string;
			cert_file_name: string;
			cat: {
				cat_name: string;
				cat_icon_name: string;
			};
			tags: {
				id: number;
				name: string;
			}[];
		};
	};

	beforeNavigate(() => {
		showSpinner = true;
	});

	afterNavigate(() => {
		showSpinner = false;
	});

	onMount(() => {
		certBackRoute.subscribe((val) => {
			backRoute = val || '/certs';
		});
		console.log(data);
	});
</script>

<div class="{`text-center md:mx-4 mb-2 flex ${showSpinner ? 'blink-loading' : ''}`}">
	<div class="card flex-col justify-start mx-auto min-w-[70%]">
		<h1 class="card-title header-card-title">
			{data.res.cert_name}
		</h1>

		<div class="card-body">
			<CertImg
				propData={{
					imageSource: `/res/cert_pic/${data.res.cert_feature_image}`,
					certName: data.res.cert_name
				}}
				lazy={false}
			/>

			<div class="card-text">
				<!-- {#if data?.res?.data?.[0]?.open_source === true}
            <h2 class="headings mt-4">Open Source</h2>
            <p> YES </p>
            {:else if data?.res?.data?.[0]?.open_source === false}
            <h2 class="headings mt-4">Open Source</h2>
            <p> NO </p>
            {/if} -->
				<h2 class="headings mt-4">Issued by</h2>
				<p class="text-muted">
					{data?.res?.cat?.cat_name}
                    <svg class="cat-icon"
								><use
                                href="/res/cert/cat_icons/{data?.res?.cat?.cat_icon_name}.svg#icon"
								/></svg>
				</p>
				{#if data?.res?.cert_description}
					<h2 class="headings mt-4">Description</h2>
					<p>
						{data.res.cert_description}
					</p>
				{/if}
				{#if data.res?.tags?.length}
					<h2 class="headings mt-4">Tags</h2>
					<ul class="tags">
						{#each data.res.tags as tag}
							<li>
								<a href={`/certs/filter/tags/${tag.id}/tags`}>{tag.name}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<a
				href={backRoute}
				class="button raise btn-11 px-4 pt-2 pb-3 inline-block text-[1.2rem] mt-8"
			>
				<small class="text-muted">Back</small>
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.headings {
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
