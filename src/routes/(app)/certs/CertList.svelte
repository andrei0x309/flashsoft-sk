<script lang="ts">
	import CertImg from './CertImg.svelte';
	import CertPagination from './CertPagination.svelte';
	import { makeTitle } from '@/lib/utils/page';
	import { certBackRoute } from '@/stores/client-route'
	import { page as SveltePage } from '$app/stores';
	interface Cert {
		id: number;
		cert_name: string;
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
		weight: number;
	}
	interface Props {
		currentPage: number;
		maxPage: number;
		rest: string;
		data?: any;
	}

	let {
		currentPage,
		maxPage,
		rest,
		data = [] as Cert[]
	}: Props = $props();

	const setBackRoute = () => {
		certBackRoute.set($SveltePage.url.toString())
	}

</script>

{#if data.length > 0}
	<div
		class="card-deck certbottommagin mx-2 md:mx-4 lg:mx-6 grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3  gap-2 md:gap-4"
	>
		{#each data as cert, i (i)}
			<div class="card">
				<CertImg
					propData={{
						imageSource: `/res/cert_pic/${cert['cert_feature_image']}`,
						certName: cert['cert_name']
					}}
					lazy={i > 3}
				/>

				<div class="card-body">
					<h2 class="card-title cert-card-title">{cert['cert_name']}</h2>

					{#if cert['tags']?.length}
						<p style="margin-bottom: 0.5em;">Tags:</p>
						<ul class="tags">
							{#each cert['tags'] as tag}
								<li><a href={`/certs/filter/tags/${tag['id']}/tags`}>{tag['name']}</a></li>
							{/each}
						</ul>
					{/if}
					<p class="card-text"></p>

					{#if cert['cat']?.cat_name}
						<p class="text-right mt-auto py-4">
							<small class="text-muted text-right">
								Issued by: {cert['cat']?.cat_name}
							</small>&nbsp;
							<img class="cat-icon" src="/res/cert/cat_icons/{cert['cat']?.cat_icon_name}.svg" alt="{cert['cat']?.cat_name}" />
						</p>
					{/if}
				</div>
				<div class="card-footer">
      <small class="text-muted"> 
       
          <a onclick={setBackRoute} href="{`/certs/view/${cert['id']}/${makeTitle(cert['cert_name'])}`}" ><button type="button" class="btn-11 raise"><span class="icon-expand" style="color:#f11154;"></span>&nbsp;&nbsp;&nbsp;View Details</button></a>
          <a href="{`${cert['cert_file_name']}`}" rel="external" >
            <button type="button" class="btn-11 raise">
              <span class="icon-file-pdf-o" style="color:#f11154;"></span>&nbsp;&nbsp;&nbsp;View PDF</button>
           </a> 
           </small>
    </div>
			</div>
		{/each}
	</div>

	<CertPagination {maxPage} {currentPage} {rest} />
{:else}
	<div class="card-deck certbottommagin mx-2 md:mx-4 lg:mx-6 grid-cols-1 grid cert-error-box" style="grid-auto-rows: min-content;">
		<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 mx-auto"
			><defs
				><style>
					.cls-1 {
						fill: none;
						stroke: #224;
						stroke-linejoin: round;
						stroke-width: 2px;
					}
				</style></defs
			><title></title><g data-name="36-404 error" id="_36-404_error"
				><polyline class="cls-1" points="12 25 1 25 1 21 1 1 31 1 31 21 31 25 20 25" /><line
					class="cls-1"
					x1="22"
					x2="25"
					y1="31"
					y2="31"
				/><line class="cls-1" x1="7" x2="10" y1="31" y2="31" /><polygon
					class="cls-1"
					points="22 31 10 31 12 25 20 25 22 31"
				/><line class="cls-1" x1="1" x2="31" y1="21" y2="21" /><polyline
					class="cls-1"
					points="6 8 6 12 9 12 11 12"
				/><polyline class="cls-1" points="9 8 9 12 9 15" /><polyline
					class="cls-1"
					points="21 8 21 12 24 12 26 12"
				/><polyline class="cls-1" points="24 8 24 12 24 15" /><rect
					class="cls-1"
					height="5"
					width="5"
					x="13"
					y="9"
				/></g
			></svg
		>
    <p class="mt-4">No Courses Found</p>
		<a href="{`${ $certBackRoute ? $certBackRoute : '/certs' } `}" class="backButton">Back</a>
	</div>
{/if}

<style scoped lang="scss">
  .backButton {
    background-color: #343434;
    width: 8rem;
    height: 2.5rem;
    margin-top: 1rem;
    border-radius: 2rem;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    box-shadow: 2px 2px 2px #d3d2d7;
    color: #f0fffff2;
  }
</style>