<script lang="ts">
import { onMount } from 'svelte';
import { Lightbox } from 'svelte-lightbox';
import { browser } from '$app/environment';

interface CertImgProps {
  imageSource: string;
  certName: string;
}

let loaded = $state(false);
let isError = $state(false);
interface Props {
  propData: CertImgProps;
  lazy?: boolean;
}

let { propData, lazy = true }: Props = $props();
let imgSrc: string = $state('');
let altContent: string = $state('');
let srcset: string = $state('');

const createImgSet = () => {
  const lastIndex = imgSrc.lastIndexOf('/');
  const picName = imgSrc.substring(lastIndex + 1);
  const filePath = imgSrc.substring(0, lastIndex + 1);
  return [
    filePath + '25/' + encodeURI(picName) + ' 256w, ',
    filePath + '50/' + encodeURI(picName) + ' 528w, ',
    filePath + '75/' + encodeURI(picName) + ' 792w, ',
    encodeURI(imgSrc) + ' 1056w'
  ].join('');
};

onMount(() => {
  imgSrc = propData.imageSource;
  altContent = `Certificate ${propData.certName} image`;
  // srcset = createImgSet();
});
</script>

<template>
	<div class="relative">
		{#if !loaded}
			<div class="spinner size"></div>
		{/if}
		{#if browser && !isError}
		<Lightbox>
		<img
			loading={lazy ? 'lazy' : 'eager'}
			class="{`mx-auto card-img-top aspect-ratio-image  ${loaded ? '' : 'hidden'}`}"
			width="800"
			height="600"
			src={imgSrc}
			alt={altContent}
			onload={() => {
				loaded = true;
			}}
			onerror={() => {
				loaded = true;
				isError = true;
			}}	
		/>
		</Lightbox>
		{:else}
		<img
		loading={lazy ? 'lazy' : 'eager'}
		class="{`card-img-top ${loaded ? '' : 'hidden'}}`}"
		width="800"
		height="600"
		src={imgSrc}
		{srcset}
		alt={altContent}
		onload={() => {
			loaded = true;
		}}
		onerror={() => {
			loaded = true;
			isError = true;
		}}
		/>
		{/if}
		
	</div>
</template>

<style lang="scss">
 

.aspect-ratio-image {
  aspect-ratio: 16 / 9; /* Or 4 / 3, 1 / 1, etc. */
  width: 100%;
  object-fit: contain;
}

</style>
