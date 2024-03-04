<script lang="ts">
	import { onMount } from 'svelte'

	const visualizerID = 'welcomed-families-visualizer'

	onMount(() => {
		const svg = createCircle({ width: 50, height: 50, x: 40, y: 40, r: 20, fill: 'var(--accent)' })
		appendTextToSvg(svg, { x: 0, y: 0, text: 'Hello World!', fill: 'var(--dominant)' })

		appendElementToVisualizer(svg)
	})

	function createSvg(width = 100, height = 100) {
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		svg.setAttribute('width', String(width))
		svg.setAttribute('height', String(height))
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
		return svg
	}

	type CreateCircleOptions = {
		width: number
		height: number
		x: number
		y: number
		r: number
		fill: string
	}

	const defaultCreateCircleOptions = {
		width: 0,
		height: 0,
		x: 0,
		y: 0,
		r: 10,
		fill: '#000'
	}

	function createCircle(options: CreateCircleOptions) {
		const mergedOptions = {
			...defaultCreateCircleOptions,
			...options
		}
		const { width, height } = mergedOptions

		let svg = createSvg(mergedOptions.width, mergedOptions.height)
		let circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		svg.setAttribute('viewBox', `${-(width / 2)} ${-(height / 2)} ${width} ${height}`)

		Object.keys(mergedOptions).forEach((key) => {
			if (!['width', 'height'].includes(key)) {
				circleElement.setAttribute(key, String(mergedOptions[key as keyof CreateCircleOptions]))
			}
		})
		svg.appendChild(circleElement)
		return svg
	}

	type AppendTextToSgvOptions = {
		x: number
		y: number
		dx?: number
		dy?: number
		rotate?: number
		text: string
		fill: string
		centered?: boolean
	}

	const defaultAppendTextTOSvgOptions = {
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		rotate: 0,
		text: '',
		fill: '#000',
		centered: false
	}

	function appendTextToSvg(svg: SVGSVGElement, options: AppendTextToSgvOptions) {
		const mergedOptions = {
			...defaultAppendTextTOSvgOptions,
			...options
		} as AppendTextToSgvOptions

		let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
		text.innerHTML = mergedOptions.text
		Object.keys(mergedOptions).forEach((key) => {
			if (!['centered'].includes(key)) {
				text.setAttribute(key, String(mergedOptions[key as keyof AppendTextToSgvOptions]))
			}
		})
		svg.appendChild(text)
		return svg
	}

	function appendElementToVisualizer(element: SVGSVGElement) {
		document.getElementById(visualizerID)?.appendChild(element)
	}
</script>

<div id={visualizerID} />

<style>
	#welcomed-families-visualizer {
		width: 100%;
		height: 300px;
	}
</style>
