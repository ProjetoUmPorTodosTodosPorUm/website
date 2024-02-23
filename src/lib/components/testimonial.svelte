<script lang="ts">
	import '$scss/components/testimonial.scss';
	import type { TestimonialDto } from '../types'
	import Carousel from './carousel.svelte';
	
	export let testimonials: TestimonialDto[];
</script>

<section id="testimonials">
	<h1>Testemunhos</h1>
	{#if testimonials?.length > 0}
		<Carousel>
			{#each testimonials as testimonial (testimonial.id)}
				<div class="testimonial">
					<div class="avatar">
						<img src="https://via.placeholder.com/350x350.webp" alt="Avatar" />
					</div>
					<div class="content">
						<p class="text">{testimonial.text}</p>
						<p class="name">–{testimonial.name}</p>
					</div>
				</div>
			{/each}
		</Carousel>
	{/if}
</section>
