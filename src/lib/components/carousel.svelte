<script lang="ts">
	// @ts-ignore
	import Carousel from 'svelte-carousel'
	import { browser } from '$app/environment'
	import '$scss/components/carousel.scss'
</script>

{#if browser}
	<Carousel let:showPrevPage let:showNextPage autoplay={true} pauseOnFocus={true} dots={false}>
		<slot />

		<!-- Custom Arrows -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div slot="prev" on:click={showPrevPage} class="custom-arrow left" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div slot="next" on:click={showNextPage} class="custom-arrow right" />
	</Carousel>
{/if}
