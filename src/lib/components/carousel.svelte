<script lang="ts">
	// @ts-ignore
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import '$scss/components/carousel.scss';
</script>

{#if browser}
	<Carousel let:showPrevPage let:showNextPage autoplay={true} pauseOnFocus={true} dots={false}>
		<slot />

		<!-- Custom Arrows -->
		<div slot="prev" on:click={showPrevPage} class="custom-arrow left" />
		<div slot="next" on:click={showNextPage} class="custom-arrow right" />
	</Carousel>
{/if}
