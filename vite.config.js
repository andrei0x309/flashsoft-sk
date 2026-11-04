import adapter from '@sveltejs/adapter-netlify';
// import { join } from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
// import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import tailwindcss from '@tailwindcss/vite';
// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('vite').UserConfig} */
const config = {
  build: {},
  define: {
    __DATE__: `'${new Date().toISOString()}'`,
    __RELOAD_SW__: false
  },
  plugins: [
    tailwindcss(),
    sveltekit({
      // Consult https://github.com/sveltejs/svelte-preprocess
      // for more information about preprocessors
      preprocess: [preprocess({ preserve: ['ld+json'] })],
      serviceWorker: { register: false },
      adapter: adapter({ edge: true, split: false })
    })
  ]
};

export default config;
