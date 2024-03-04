<script lang="ts">
	import '$scss/components/testimonial.scss'
	import type { TestimonialDto } from '../types'
	import Carousel from './carousel.svelte'

	export let testimonials: TestimonialDto[]
</script>

<section id="testimonials">
	<h1>Testemunhos</h1>
	{#if testimonials?.length > 0}
		<Carousel>
			{#each testimonials as testimonial (testimonial.id)}
				<div class="testimonial">
					<div class="content">
						<div class="text">{@html testimonial.text}</div>
						<p class="name">–{testimonial.name}</p>
					</div>
				</div>
			{/each}
		</Carousel>
	{:else}
		<div class="testimonial-placeholder">
			<div class="content">
				<div class="text">Ainda não foi registrado nenhum testemunho.</div>
			</div>
		</div>
	{/if}
</section>
