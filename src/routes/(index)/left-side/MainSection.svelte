<script lang="ts">
import SideMenuToggle from '../mobile/SideMenuToggle.svelte';

const {sideMenu, closeMenu, html} = $props<{sideMenu: HTMLElement | undefined, closeMenu: () => void, html: string}>();

const htmlPats = html.split('|||');

</script>

<section id="section-projects">
    <div class="ls-h mb-4 relative">
        <SideMenuToggle sideMenu={sideMenu} closeMenu={closeMenu} />
        <p class="inline-block my-1">projects</p>
    </div>
    <div class="ls-pr-ct flex -mr-4 -ml-4 text-center p-6 justify-center flex-col items-center mb-2">
        {#if !(typeof htmlPats?.[0] === 'undefined')}
        <div class="github-contributions">
            {@html  htmlPats[0]}
        </div>
        {/if}

        {#if !(typeof htmlPats?.[1] === 'undefined')}
        <div class="container mb-4">
            {@html  htmlPats[1]}
        </div>
        {/if}

        <div class="container">
                <p>I'm a web2/web3 developer, privacy advocate, and open-source enthusiast, you can check my <a href="/projects">projects page</a>, read  <a rel="external" href="https://blog.flashsoft.eu">my blog</a>, or check out some <a href="/certs">courses I've taken</a>.</p>
        </div>
          

        <!-- <p>
            <a href="/certs" class="gitlab-button">Courses DB</a> || <a href="/projects" class="gitlab-button">Projects</a>
        </p> -->
    </div>
</section>


<style lang="scss">

    .container {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        background-color: oklch(0.21 0 0 / 0.88);
        border: 1px solid oklch(0.56 0 0);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        /* border-radius: 0.7rem; */
        transition: all ease 0.3s;
        color: white;
      position: relative;
      font-family: sans-serif;
      border-radius: 0.5rem;
       
      :global(div) :global(div) {
        font-size: 1.01rem;
      }

        :global(a) {
            color: var(--color-orange-100);
            font-weight: bold;
            text-decoration: underline;
            &:hover {
                color: #f3bf50;
            }
        }

        :global(h3) {
            color: var(--color-orange-100);
            text-align: center;
            overflow: hidden;
            margin: 0;
            margin-top: 0.7rem;
            margin-bottom: 0.7rem;
        }

        :global(svg) {
            display: none;

            :global(path) {
                fill: var(--color-orange-100);
            }
        }
    }
     
    
    </style>