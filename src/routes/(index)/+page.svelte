<script lang="ts">
import { config } from '$lib/config';
import MainSection from './left-side/MainSection.svelte';
import ContactForm from './left-side/ContactForm.svelte';
import Interests from './left-side/Interests.svelte';
import Skills from './left-side/Skills.svelte';
import Techs from './left-side/Techs.svelte';
import Footer from './left-side/Footer.svelte';
import SideMenu from './mobile/SideMenu.svelte';

import PaperWeight from './right-side/PaperWeight.svelte';
import RightSideMenu from './right-side/RightSideMenu.svelte'
import RightSideLogo from './right-side/RightSideLogo.svelte';
import RightSideName from './right-side/RightSideName.svelte';
import RightSideLinks from './right-side/RightSideLinks.svelte';


const { indexPageDescription, indexPageTitle } = config;

let sideMenu: HTMLElement | undefined = $state();

const closeMenu = () => {
  sideMenu?.classList.remove('sideMenuToggle');
};

let { data } = $props<{ data: { html: string } }>();

const html = data?.html;
</script>

<svelte:head>
	<title>{indexPageTitle}</title>
	<meta name="description" content={indexPageDescription} />
	<meta property="og:title" content={indexPageTitle} />
	<meta property="og:description" content={indexPageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://flashsoft.eu" />
	<meta property="og:image" content={config.defaultOpenGraphImage} />

	<!-- Schema  -->
	<script type="application/ld+json">
	{
	"@context": "http://schema.org",
	"@type": "Organization",
	"name": "FlashSoft",
	"url": "https://flashsoft.eu",
	"logo": "https://flashsoft.eu/res/android-chrome-256x256.png",
	"sameAs": [
		"https://twitter.com/andrei0x309"
	]
	}
	</script>
</svelte:head>

<main id="main" class="relative top-0 right-0 w-full overflow-visible">
	<div id="left-side" class="lfc h-full mt-14 overflow-y-scroll overflow-x-hidden w-full md:w-3/5 ">

		<MainSection html={html} closeMenu={closeMenu} sideMenu={sideMenu} />
		<Skills />
		<Techs />
		<Interests />
		<ContactForm />
		<Footer />
	</div>
  
	<SideMenu  bind:sideMenu={sideMenu} closeMenu={closeMenu} />

	<aside class="rsb ml-8 overflow-y-scroll overflow-x-visible fixed w-[35%] h-full hidden md:block">
		<PaperWeight />
		<div class="nav-and-logo">
			<RightSideMenu />
			<RightSideLogo />
		</div>

		<RightSideName />

		<RightSideLinks />
		
		
	</aside>
	<!--
	<a href="#0" class="cd-top">Top</a> -->
	</main>
