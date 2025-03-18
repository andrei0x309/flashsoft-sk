<script lang="ts">
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
    </ul>
    <div class="rst-sb text-2xl mt-16 ">
        <p class="text-gray-200 ">
            andrei<svg width="142mm" height="142mm" viewBox="0 0 142 142" class="at-sign-sidebar">
                <g id="at-sign-path">
                    <path
                        d="m 129.94822,123.8006 -2.13934,-4.91613 -6.60045,-14.47527 c -2.31276,0.18272 -4.77602,2.20598 -6.82795,3.23181 -4.64383,2.32205 -9.35403,4.5567 -14.20215,6.5095 -10.871204,4.37863 -23.546354,7.23572 -35.232264,6.09955 -1.63571,-0.15896 -3.28261,-0.11417 -4.91613,-0.27312 -6.61383,-0.64292 -13.75287,-3.31702 -19.11828,-7.19202 -11.972,-8.64665 -15.5664,-23.020874 -14.20215,-37.053144 0.85347,-8.77856 2.51651,-17.3299 6.32733,-25.39999 7.01778,-14.86146 21.88251,-26.792215 38.46407,-28.404295 14.79181,-1.43808 30.259594,3.40922 39.238084,15.840855 2.74839,3.80563 4.33329,8.32109 5.46236,12.83655 2.17703,8.70865 0.86579,19.29827 -3.14086,27.31183 -2.14971,4.29915 -5.73521,8.2845 -10.87939,8.2845 -5.783824,0 -3.465054,-7.21934 -2.731184,-10.74256 1.607854,-7.71696 3.022334,-15.51176 4.734234,-23.21506 0.92259,-4.15194 1.36805,-8.4836 2.54901,-12.56344 -1.46801,-0.61806 -3.57539,-0.27311 -5.18924,-0.27311 H 90.619186 c -12.76883,0 -27.56665,1.14627 -37.96344,9.37696 -5.38781,4.26557 -9.05469,10.28018 -12.06282,16.29615 -4.48597,8.97194 -7.91551,22.52843 -1.50215,31.4086 7.07813,9.800304 21.14099,11.703124 32.13701,8.648844 2.47664,-0.68799 4.86314,-1.77773 7.10107,-2.95897 1.04796,-0.55306 2.64734,-2.194237 3.82366,-2.275897 1.15447,-0.0803 2.89587,1.897907 3.82366,2.503677 2.02981,1.3249 4.45537,2.41109 6.82795,3.0043 8.765464,2.19123 18.807754,0.96793 26.765594,-3.23208 8.30498,-4.383004 14.14452,-12.478504 17.57052,-20.984494 8.04688,-19.9786 5.27337,-43.03852 -9.37697,-59.266655 C 122.94,16.584831 116.63097,12.492121 110.2837,9.3185216 89.842436,-0.90203883 63.484886,-1.3509608 43.096606,9.4096216 24.308576,19.325531 10.859856,37.417696 5.2241957,57.706016 c -1.76538,6.35546 -2.46282,12.61233 -3.09533,19.11828 -1.50597998,15.49017 3.13602,31.772934 13.6559103,43.425804 4.6822,5.18651 10.53821,9.28684 16.66022,12.51783 7.4482,3.93099 16.21066,6.33306 24.58064,7.14668 3.88811,0.378 7.86553,0.92342 11.74408,0.54624 1.98421,-0.19282 4.0244,0.19282 6.00861,0 4.09622,-0.39821 8.24298,-0.76063 12.29032,-1.54776 6.5715,-1.27765 13.372694,-2.37832 19.664514,-4.82491 4.37946,-1.70316 8.86761,-3.14059 13.10968,-5.14391 3.36263,-1.58791 6.62448,-3.86107 10.10538,-5.14363 M 78.328856,60.437196 c -0.13027,1.64882 -0.83137,3.32057 -1.27464,4.91613 -1.71081,6.15882 -3.92061,12.15404 -7.92043,17.20645 -1.51143,1.90937 -3.66934,3.31429 -6.09955,3.55054 -0.79204,0.077 -1.75478,0.31408 -2.41245,-0.31873 -0.8819,-0.84831 -0.41596,-1.95771 -0.31873,-2.95869 0.195,-2.00605 0.53995,-3.80481 1.18342,-5.73548 1.62533,-4.87571 4.45019,-10.63059 8.64884,-13.83809 2.19942,-1.67995 5.45144,-2.60555 8.19354,-2.82213 z"
                    />
                </g>
            </svg>flashsoft.eu<span class="rst-s block ml-8">(andrei0x309)</span>
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
