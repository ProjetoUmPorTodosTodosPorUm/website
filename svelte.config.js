import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import * as child_process from 'node:child_process'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			polyfill: false
		}),
		alias: {
			$src: 'src',
			$assets: 'src/lib/assets',
			$classes: 'src/lib/classes',
			$components: 'src/lib/components',
			$constants: 'src/lib/constants',
			$scss: 'src/lib/scss',
			$enums: 'src/lib/enums',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils'
		},
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'strict-dynamic', 'https:', 'unsafe-eval', 'blob:'],
				'frame-src': ['self', 'youtube.com', 'www.youtube.com', '*.google.com'],
				'style-src': ['self', 'fonts.googleapis.com', 'unsafe-inline'],
				'font-src': ['self', 'fonts.gstatic.com'],
				'img-src': ['self', 'data:', 'via.placeholder.com', 'https://*.googleapis.com', 'https://*.gstatic.com', '*.google.com', '*.googleusercontent.com'],
				'connect-src': [
					'self',
					'data:',
					'blob:',
					'https://api.localhost',
					'*.projetoumportodostodosporum.org',
					'projetoumportodostodosporum.org',
					'https://*.googleapis.com',
					'*.google.com',
					'https://*.gstatic.com',
				],
				'worker-src': ['self', 'blob:']
			},
			reportOnly: {
				'default-src': ['self'],
				'script-src': ['self', 'strict-dynamic', 'https:', 'unsafe-eval', 'blob:'],
				'frame-src': ['self', 'youtube.com', 'www.youtube.com', '*.google.com'],
				'style-src': ['self', 'fonts.googleapis.com', 'unsafe-inline'],
				'font-src': ['self', 'fonts.gstatic.com'],
				'img-src': ['self', 'data:', 'via.placeholder.com', 'https://*.googleapis.com', 'https://*.gstatic.com', '*.google.com', '*.googleusercontent.com'],
				'connect-src': [
					'self',
					'data:',
					'blob:',
					'https://api.localhost',
					'*.projetoumportodostodosporum.org',
					'projetoumportodostodosporum.org',
					'https://*.googleapis.com',
					'*.google.com',
					'https://*.gstatic.com',
				],
				'worker-src': ['self', 'blob:'],
				'report-to': ['api.projetoumportodostodosporum.org/csp-report']
			}
		},
		version: {
			name: child_process.execSync('git rev-parse HEAD').toString().trim()
		}
	}
};

export default config;
