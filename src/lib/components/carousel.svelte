<script lang="ts">
	// @ts-ignore
	import Carousel from 'svelte-carousel'
	import { browser } from '$app/environment'
	import '$scss/components/carousel.scss'

	export let autoplayDuration = 5 * 1000 // ms
	const duration = 1 * 1000 // ms
</script>

{#if browser}
	<Carousel
		let:showPrevPage
		let:showNextPage
		autoplay={true}
		pauseOnFocus={true}
		dots={true}
		{autoplayDuration}
		{duration}
	>
		<slot />

		<!-- Custom Arrows -->
		<button slot="prev" let:showPrevPage on:click={showPrevPage} class="custom-arrow left"></button>
		<button slot="next" let:showNextPage on:click={showNextPage} class="custom-arrow right"></button>
	</Carousel>
{/if}
