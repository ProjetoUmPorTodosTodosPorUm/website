<script lang="ts">
	import '$lib/scss/components/public/testimonial.scss';
	import type { TestimonialDto, Pagination } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import { onMount } from 'svelte';

	import Carousel from './carousel.svelte';

	let isLoading = false;
	let testimonials: TestimonialDto[] = [];
	let pagination = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'createdAt',
		orderValue: 'desc'
	} as Pagination;
	$: queryString = fromPaginationToQuery(pagination);

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		try {
			isLoading = true;
			testimonials = (await axios.get(`/testimonial?${queryString}`)).data.data;
			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
	}
</script>

<section id="testimonials">
	<h1>Testimonials</h1>
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
