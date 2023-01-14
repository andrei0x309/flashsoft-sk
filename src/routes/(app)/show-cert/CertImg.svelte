<script lang="ts">
	import { onMount } from 'svelte'
	interface CertImgProps {
		imageSource: string;
		certName: string;
	}
	let loaded = false;
	export let propData: CertImgProps;
	let imgSrc: string;
	let altContent: string;
	let srcset: string;

	const createImgSet = () => {
		const lastIndex = imgSrc.lastIndexOf('/');
		const picName = imgSrc.substring(lastIndex + 1);
		const filePath = imgSrc.substring(0, lastIndex + 1);
		return [
			filePath + '25/' + picName + ' 256w',
			filePath + '50/' + picName + ' 528w',
			filePath + '75/' + picName + ' 792w',
			imgSrc + ' 1056w'
		].join();
	};
	
	onMount(() => {
	 imgSrc = propData.imageSource;
	 altContent = `Certificate ${propData.certName} image`;
	 srcset = createImgSet();
		 
	});

</script>

<template>
	<div>
		{#if !loaded}
			<div class="spinner" />
		{/if}
		<img
			loading="lazy"
			class="card-img-top"
			src={imgSrc}
			{srcset}
			alt={altContent}
			on:load={() => {
				loaded = true;
                console.log('loaded')
			}}
		/>
	</div>
</template>
