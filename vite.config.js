import { join } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
// import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { partytownVite } from '@builder.io/partytown/utils';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
const config = {
  build: {
    minify: false
  },
  define: {
    __DATE__: `'${new Date().toISOString()}'`,
    __RELOAD_SW__: false
  },
  plugins: [
    tailwindcss(),
    partytownVite({
      // `dest` specifies where files are copied to in production
      dest: join(process.cwd(), 'static', '~partytown')
    }),
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
    // 				{
    // 					"src": "/images/icons/icon-384x384.png",
    // 					"sizes": "384x384",
    // 					"type": "image/png"
    // 				},
    // 				{
    // 					"src": "/images/icons/icon-192x192.png",
    // 					"sizes": "192x192",
    // 					"type": "image/png"
    // 				},
    // 				{
    // 					"src": "/images/icons/icon-152x152.png",
    // 					"sizes": "152x152",
    // 					"type": "image/png"
    // 				},
    // 				{
    // 					"src": "/images/icons/icon-128x128.png",
    // 					"sizes": "128x128",
    // 					"type": "image/png"
    // 				},
    // 				{
    // 					"src": "/images/icons/icon-96x96.png",
    // 					"sizes": "96x96",
    // 					"type": "image/png"
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
    // 		},
    // 		// if you have shared info in svelte config file put in a separate module and use it also here
    // 		kit: {}
    // 	}
    // ),
    sveltekit()
  ]
};

export default config;
