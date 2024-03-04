<script lang="ts">
	// @ts-ignore
	import Carousel from 'svelte-carousel'
	import { browser } from '$app/environment'
	import '$scss/components/carousel.scss'

	const autoplayDuration = 7 * 1000 // ms
	const duration = 1 * 1000 // ms
	const MEDIUM_DEVICE_WIDTH = 768 // _shared.scss

	let innerWidth: number = 0
	$: isMediumDevice = innerWidth <= MEDIUM_DEVICE_WIDTH ? true : false
</script>

<svelte:window bind:innerWidth />

{#if browser}
	<Carousel
		let:showPrevPage
		let:showNextPage
		autoplay={true}
		pauseOnFocus={true}
		dots={isMediumDevice}
		{autoplayDuration}
		{duration}
	>
		<slot />

		<!-- Custom Arrows -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div slot="prev" on:click={showPrevPage} class="custom-arrow left" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div slot="next" on:click={showNextPage} class="custom-arrow right" />
	</Carousel>
{/if}
