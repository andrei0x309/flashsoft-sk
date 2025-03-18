<script lang="ts">
	import { Swipe } from '$lib/utils/swipe';
	import { onMount } from 'svelte';

	let { sideMenu, closeMenu } = $props();
	let toggle: HTMLElement | undefined; // document.getElementById('menu_toggle');

	const toggeleMenu = () => {
		console.log('Element reference in Child B:', sideMenu);
		sideMenu?.classList.add('sideMenuToggle');
		const menuLinks = sideMenu?.querySelector('.sidebar-menu-nav')?.querySelectorAll('.sidemenu');
		if (menuLinks) {
			let i = 1;
			for (const menuLink of menuLinks as unknown as HTMLElement[]) {
				const timeout = 130 * i;
				setTimeout(() => {
					menuLink.style.animation = 'menuLinkSlideLeft 0.8s ease-in forwards;';
				}, timeout);
				i++;
			}
		}
	};

	onMount(() => {
		$effect(() => {
			if (sideMenu) {
				new Swipe(sideMenu, function (event: unknown, direction: string) {
					if (direction === 'left') {
						closeMenu();
					}
				});
			}
		});
	});
</script>

<button
	bind:this={toggle}
	aria-label="Open Side Menu"
	id="menu_toggle"
	class="icon-bars menu-phone inline md:hidden"
	onclick={toggeleMenu}
></button>
