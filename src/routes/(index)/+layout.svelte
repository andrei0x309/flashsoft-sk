<script lang="ts">
// @ts-nocheck

	// import Header from './Header.svelte';
	// import './styles.css';
  import './style.scss'
  import { analyticsCode } from '$lib/utils/analytics'
  import { onMount } from 'svelte'
  import { partytownSnippet } from 'https://cdn.jsdelivr.net/npm/@builder.io/partytown@0.7.5/integration/index.mjs'

  let scriptEl
	onMount(
	  () => {
		if (scriptEl) {
		  scriptEl.textContent = partytownSnippet()
		}
	  }
	)
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
			  const proxyUrl = new URL(`${siteUrl}/gtm`)
	
			  const gtmId = new URL(url).searchParams.get('id')
			  gtmId && proxyUrl.searchParams.append('id', gtmId)
	
			  return proxyUrl
			} else if (
			  url.hostname === 'js.hcaptcha.com'
			) {
			  const proxyUrl = new URL(`${siteUrl}/hcaptcha`)
	
			  return proxyUrl
			}
	
			return url
		  }
		}
	  </script>
	
	  <!-- `partytownSnippet` is inserted here -->
	  <script bind:this={scriptEl}></script>

</svelte:head>

<slot />

{#if analyticsCode}
 {@html analyticsCode}
{/if}

<style windi:preflights:global windi:safelist:global windi:global>
</style>

 
