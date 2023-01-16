import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		VERSION: JSON.stringify(process.env.npm_package_version),
		SK_VERSION: JSON.stringify(process.env['npm_package_devDependencies__sveltejs_kit'])
	},
	build: {
		rollupOptions: {
			external: ['smtp-lib']
		}
	}
};

export default config;
