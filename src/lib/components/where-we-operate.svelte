<script lang="ts">
	import { PUBLIC_GOOGLE_MAP_API } from '$env/static/public'
	import '$scss/components/where-we-operate.scss'
	import { Loader } from '@googlemaps/js-api-loader'
	import { onMount } from 'svelte'

	// Map
	let googleMapRef: HTMLDivElement
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

	onMount(async () => {
		const google = await loader.load()
		const map = new google.maps.Map(googleMapRef, mapOptions)

		// Create the search box and link it to the UI element.
		const input = document.getElementById('pac-input') as HTMLInputElement
		const searchBox = new google.maps.places.SearchBox(input)
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', () => {
			searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
		})
	})
</script>

<section id="where-we-operate">
	<div bind:this={googleMapRef} id="map" />
</section>
