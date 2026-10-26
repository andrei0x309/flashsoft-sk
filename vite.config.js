import adapter from '@sveltejs/adapter-netlify';

// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import { join } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
// import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import tailwindcss from '@tailwindcss/vite';

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
      adapter: adapter({ edge: true, split: false }),
    })
  ]
};

// 	  SvelteKitPWA({
// 		manifest: {
// 			"$schema": "https://json.schemastore.org/web-manifest-combined.json",
// 			"name": "flashsoft.eu",
// 			"short_name": "flashsoft.eu",
// 			"description": "PWA for domain flashsoft.eu.",
// 			"categories": ["programming", "personal", "portfolio"],
// 			"orientation": "portrait-primary",
// 			"icons": [
// 				{
// 					"src": "/images/icons/icon-512x512.png",
// 					"sizes": "512x512",
// 					"type": "image/png"
// 				},
// 					"src": "/images/icons/icon-384x384.png",
// 					"sizes": "384x384",
// 					"src": "/images/icons/icon-192x192.png",
// 					"sizes": "192x192",
// 					"src": "/images/icons/icon-152x152.png",
// 					"sizes": "152x152",
// 					"src": "/images/icons/icon-128x128.png",
// 					"sizes": "128x128",
// 					"src": "/images/icons/icon-96x96.png",
// 					"sizes": "96x96",
// 				}
// 			],
// 			"theme_color": "#ffffff",
// 			"background_color": "#ffffff",
// 			"display": "standalone"
// 		},
// 		devOptions: {
// 			enabled: true,
// 			type: 'classic',
// 			navigateFallback: '/',
// 		// if you have shared info in svelte config file put in a separate module and use it also here
// 		kit: {}
// 	}
// ),
export default config;
