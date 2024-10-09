import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: ["**/*.sql"],
	optimizeDeps: {
		exclude: ["@electric-sql/pglite"],
	},
});
