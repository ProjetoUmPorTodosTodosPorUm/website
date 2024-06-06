<script lang="ts">
	import { PUBLIC_GOOGLE_MAP_API } from '$env/static/public'
	import '$scss/components/where-we-operate.scss'
	import { Loader } from '@googlemaps/js-api-loader'
	import { onMount } from 'svelte'

	// Map
	let googleMapRef: HTMLDivElement

	onMount(async () => {
		const loader = new Loader({
			apiKey: PUBLIC_GOOGLE_MAP_API,
			version: 'weekly',
			libraries: ['places']
		})

		const mapOptions = {
			center: {
				lat: 0,
				lng: 0
			},
			zoom: 4
		}

		const Core = await loader.importLibrary('core')
		const Maps = await loader.importLibrary('maps')
		const Places = await loader.importLibrary('places')

		const map = new Maps.Map(googleMapRef, mapOptions)

		// Create the search box and link it to the UI element.
		const input = document.getElementById('pac-input') as HTMLInputElement
		const searchBox = new Places.SearchBox(input)
		map.controls[Core.ControlPosition.TOP_LEFT].push(input)

		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', () => {
			// @ts-ignore as Core.LatLngBounds
			searchBox.setBounds(map.getBounds())
		})
	})
</script>

<section id="where-we-operate">
	<div bind:this={googleMapRef} id="map" />
</section>
