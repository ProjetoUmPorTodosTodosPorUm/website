<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/testimonial.scss';

	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

	let carousel;
</script>

<section id="testimonial">
	{#if browser}
		<Carousel
			bind:this={carousel}
			let:showPrevPage
			let:showNextPage
			autoplay={true}
			pauseOnFocus={true}
			dots={false}
		>
			<div class="testimonial">
				<div class="avatar">
					<img src="https://via.placeholder.com/350x350.webp" alt="Avatar" />
				</div>
				<div class="content">
					<p class="text">
						There are many variations of passages of Lorem Ipsum available, but the majority have
						suffered alteration in some form, by injected humour, or randomised words which don't
						look even slightly believable.
					</p>
					<p class="name">–John Doe</p>    
				</div>
			</div>

			<!-- Custom Arrows -->
			<div slot="prev" on:click={showPrevPage} class="custom-arrow left" />
			<div slot="next" on:click={showNextPage} class="custom-arrow right" />
		</Carousel>
	{/if}
</section>
