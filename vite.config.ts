import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)

export default defineConfig(({ mode }) => {
	const serverSettings = mode === 'development' ? { server: { hmr: { path: '/wss' } } } : {}

	return {
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		},
		define: {
			__APP_VERSION__: JSON.stringify(pkg.version)
		},
		optimizeDeps: {
			include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
		},
		...serverSettings
	}
})
