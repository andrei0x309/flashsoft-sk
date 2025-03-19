<script lang="ts">
    import TipIcon from '../icons/TipIcon.svelte'

import ScoutIcon from '../icons/ScoutIcon.svelte';

let { sideMenu = $bindable(), closeMenu } = $props<{ sideMenu: HTMLElement | undefined, closeMenu: () => void }>();
let close: HTMLElement | undefined; // document.getElementById('menu-close');

</script>


<nav bind:this={sideMenu} id="side-menu" class="fixed w-11/12 h-full top-0 left-0 overflow-auto bg-white">
    <button onclick={closeMenu} bind:this={close} aria-label="Close Side Menu" id="menu-close">×</button>

    <ul class="sidebar-menu-nav">
        <li class="sidemenu">
            <a id="lsm-projects" href="#section-projects"
                ><i class="icon-home text-custom-v" aria-hidden="true"></i>Projects</a
            >
        </li>
        <li class="sidemenu">
            <a id="lsm-skills" href="#section-skills"
                ><i class="icon-user-circle-o text-custom-v" aria-hidden="true"></i>Skills</a
            >
        </li>
        <li class="sidemenu">
            <a id="lsm-tech" href="#section-tech"
                ><i class="icon-server text-custom-v" aria-hidden="true"></i>Technology</a
            >
        </li>
        <li class="sidemenu">
            <a id="lsm-interests" href="#section-interests"
                ><i class="icon-tags text-custom-v" aria-hidden="true"></i>Interests</a
            >
        </li>
        <li class="sidemenu">
            <a id="lsm-contact" href="#section-contact"
                ><i class="icon-envelope text-custom-v"></i>Contact</a
            >
        </li>

        <li class="sidemenu">
            <a id="lsm-tip"
            rel="external" href="https://blog.flashsoft.eu/tip-me"><TipIcon />Tip</a></li>
    </ul>
    <div class="rst-sb text-2xl mt-16 mb-2">
        <p class="text-gray-200 ">
            <span class="ml-8">Andrei O.</span>
            <span class="rst-s block ml-4">(andrei0x309)</span>
        </p>
    </div>
    <div class="rsd-sb">
        <p class="text-gray-300">Web Developer</p>
        <p class="text-gray-300">Software Developer</p>
    </div>

    <div class="flex pl-16">
        <ul>
            <li>
                <a
                    rel="noopener noreferrer external"
                    class="text-gray-200 p-2 inline-block"
                    href="https://blog.flashsoft.eu"
                    target="_blank">My Blog <i class="icon-my-blog text-custom-v"></i></a
                >
            </li>
            <li>
                <a
                    rel="noopener nofollow noreferrer external"
                    class="text-gray-200 p-2 inline-block"
                    href="https://github.com/andrei0x309"
                    target="_blank">GitHub <i class="icon-linkedin text-custom-v"></i></a
                >
            </li>
            <li>
                <a
                    rel="noopener noreferrer external"
                    class="text-gray-200 p-2 inline-block"
                    href="https://gitea.flashsoft.eu/explore/repos"
                    target="_blank">BuilderScout<i class="text-custom-v"><ScoutIcon class="w-6 h-6 inline relative top-[-0.2rem] left-[0.2rem]"/></i></a
                >
            </li>
        </ul>

        <ul>
            <li>
                <a
                    rel="noopener nofollow noreferrer external"
                    class="text-gray-200 p-2 inline-block"
                    href="https://www.goodreads.com/user/show/52338687-andrei"
                    target="_blank">Goodreads <i class="icon-goodreads text-custom-v"></i></a
                >
            </li>
            <li>
                <a
                    rel="noopener nofollow noreferrer external"
                    class="text-gray-200 p-2 inline-block"
                    href="https://pinterest.com/andrei0x309/"
                    target="_blank">Pinterest <i class="icon-pinterest-square text-custom-v"></i></a
                >
            </li>
            <li>
                <a
                    rel="noopener nofollow noreferrer external"
                    class="text-gray-200 p-2 inline-block"
                    href="https://www.reddit.com/user/andrei0x309"
                    target="_blank">Reddit <i class="icon-reddit text-custom-v"></i></a
                >
            </li>
        </ul>
    </div>
</nav>
