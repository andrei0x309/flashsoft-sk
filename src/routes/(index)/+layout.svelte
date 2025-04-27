<script lang="ts">
// @ts-nocheck

// import Header from './Header.svelte';
// import './styles.css';

import '../tailwind.css';
import './style.scss';
import { analyticsCode } from '$lib/utils/analytics';
import { onMount } from 'svelte';

import { partytownSnippet } from '@builder.io/partytown/integration';
interface Props {
  children?: import('svelte').Snippet;
}

let { children }: Props = $props();

let scriptEl: HTMLScriptElement = $state();
onMount(async () => {
  if (scriptEl) {
    scriptEl.textContent = partytownSnippet();
  }
});
</script>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="andrei0x309">

	<!-- FavIcon  -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="mask-icon" href="/fs-icon-mask.svg" color="#5bbad5">
	<meta name="theme-color" content="#ffffff">

	<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>
	{#if analyticsCode}
	<link rel="preconnect" href="https://www.googletagmanager.com">
	{/if}

	<!-- Config options -->
  <script>

		partytown = {
		  forward: ['dataLayer.push'],
		  resolveUrl: (url) => {
			const siteUrl = '/pt'
			if (url.hostname === 'www.googletagmanager.com') {
			  const proxyUrl = new URL(siteUrl + '/gtm')
	
			  const gtmId = new URL(url).searchParams.get('id')
			  gtmId && proxyUrl.searchParams.append('id', gtmId)
	
			  return proxyUrl
			} else if (
			  url.hostname === 'js.hcaptcha.com'
			) {
			  const proxyUrl = new URL(siteUrl + 'hcaptcha')
	
			  return proxyUrl
			} else if (
			  url.href.includes('google-analytics.com')
			) {
				 console.log('google-analytics.com 22')
			  const proxyUrl = new URL(url.href.replace(url.hostname, 'flashsoft.eu/pt') + '/ga')
	
			  return proxyUrl
			}
	
			return url
		  }
		}
  </script>
	
	  <!-- `partytownSnippet` is inserted here -->
	  <script bind:this={scriptEl}></script>
	  <!-- {@html webManifest} -->

</svelte:head>

{@render children?.()}

{#if analyticsCode}
 {@html analyticsCode}
{/if}
 
<style>
:global(.border) {
  border: 0px;
}

</style>