<script lang="ts">
import '../tailwind.css';
import { analyticsCode } from '$lib/utils/analytics';
import BackToTop from '@/routes/(index)/right-side/BackToTop.svelte'
import Status from '@/routes/(index)/left-side/Status.svelte'

interface Props {
  children?: import('svelte').Snippet;
}

let { children }: Props = $props();
</script>

<svelte:head>
	<meta content="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="andrei0x309">
	<!-- FavIcon  -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="mask-icon" href="/fs-icon-mask.svg" color="#5bbad5">
	<meta name="theme-color" content="#ffffff">
	<link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com"/>

</svelte:head>

{@render children?.()}

<Status class="mb-4" />

<BackToTop />

{#if analyticsCode}
 {@html analyticsCode}
{/if}
