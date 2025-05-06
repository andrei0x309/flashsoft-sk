<script lang="ts">
import { certBackRoute } from '@/stores/client-route';
import { onMount } from 'svelte';
import CertImg from '@/routes/(app)/certs/components/CertImg.svelte';
import type { CertData } from '@/routes/(app)/certs/types/cert'
import GoBack from '@/routes/(app)/components/GoBack.svelte';

let backRoute: string = $state('');
interface Props {
  data: CertData
  class: string
}

let { data, class: classname = '' }: Props = $props();

onMount(() => {
  console.log('data', data);

  certBackRoute.subscribe((val) => {
    backRoute = val || '/certs';
  });
});

const cert = data.res?.data?.[0];

</script>

<div class="{`text-center md:mx-4 mb-2 flex ${classname}`}">
	<div class="card flex-col justify-start mx-auto min-w-[70%]">
		<h1 class="card-title header-card-title cursor-default">
			{cert?.cert_name}
		</h1>

		<div class="card-body">
			<CertImg
				propData={{
					imageSource: `/res/cert_pic_opt/${cert.cert_feature_image}`,
					certName: cert.cert_name
				}}
				lazy={false}
			/>

			<div class="card-text">
				<h2 class="headings mt-4">Issued by</h2>
				<p class="text-muted my-2">
					{cert.cat?.cat_name}
					<img class="cat-icon w-8 inline-block" src="/res/cert/cat_icons/{cert['cat']?.cat_icon_name}.svg" alt="{cert['cat']?.cat_name}" />

				</p>
				{#if cert?.cert_description}
					<h2 class="headings mt-4 mb-2">Description</h2>
					<p>
						{cert.cert_description}
					</p>
				{/if}
				{#if cert?.tags?.length}
					<h2 class="headings mt-4 mb-2">Tags</h2>
					<ul class="tags">
						{#each cert.tags as tag}
							<li>
								<a href={`/certs/filter/tags/${tag.id}/tags`}>{tag.name}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div class="card-footer" style="margin-top: 1rem;">
				<GoBack class="button raise btn-11 px-4 pt-2 pb-3 inline-block text-[1.2rem] mt-8" backRoute={'/certs'} />

				<a  href="{`${cert['cert_file_name']}`}" target="_blank" rel="external" >
					<button type="button" class="btn-11 raise cursor-pointer">
					  <span class="icon-file-pdf-o" style="color:#f11154;"></span>&nbsp;&nbsp;&nbsp;View PDF</button>
				   </a> 
			  </div>

		</div>
	</div>
</div>

<style lang="scss">
	.headings {
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
