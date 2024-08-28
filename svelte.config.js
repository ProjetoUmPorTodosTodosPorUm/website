import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import * as child_process from 'node:child_process'

const csrf = process.env.NODE_ENV == 'development' ? false : { checkOrigin: true }
const baseDirectives = {
	'default-src': ['self', '*.projetoumportodostodosporum.org', '*.localhost'],
	'script-src': ['self', 'https:', 'unsafe-eval', 'blob:', '*.projetoumportodostodosporum.org', '*.localhost'],
	'frame-src': ['self', 'youtube.com', 'www.youtube.com', '*.google.com'],
	'style-src': ['self', 'fonts.googleapis.com', 'unsafe-inline', '*.projetoumportodostodosporum.org', '*.localhost'],
	'font-src': ['self', 'fonts.gstatic.com'],
	'img-src': [
		'self',
		'data:',
		'placehold.co',
		'https://*.googleapis.com',
		'https://*.gstatic.com',
		'*.google.com',
		'*.googleusercontent.com',
		'www.googletagmanager.com',
		'*.projetoumportodostodosporum.org',
		'*.localhost'
	],
	'connect-src': [
		'self',
		'data:',
		'blob:',
		'https://*.googleapis.com',
		'*.google.com',
		'https://*.gstatic.com',
		'www.google-analytics.com',
		'www.googletagmanager.com',
		'*.projetoumportodostodosporum.org',
		'*.localhost',
		'wss://localhost'
	],
	'worker-src': ['self', 'blob:']
}
const cspDirectives = Object.keys(baseDirectives).reduce((acc, curr) => {
	if (['development', 'preview'].includes(process.env.NODE_ENV)) {
		return { ...acc, [curr]: baseDirectives[curr] }
	} else {
		return { ...acc, [curr]: baseDirectives[curr].filter((val) => val.indexOf('localhost') < 0) }
	}
}, {})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			polyfill: false
		}),
		csrf,
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
			directives: cspDirectives,
			reportOnly: {
				...cspDirectives,
				'report-to': ['api.projetoumportodostodosporum.org/csp-report']
			}
		},
		version: {
			name: child_process.execSync('git rev-parse HEAD').toString().trim()
		}
	}
}

export default config
