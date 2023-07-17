<script lang="ts">
	import '$scss/components/testimonial.scss';
	import { onMount } from 'svelte';
	import type { TestimonialDto, Pagination } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	import Carousel from './carousel.svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['testimonial'];

	export let locale: Locales;

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
		await loadNamespaceAsync(locale, 'testimonial');
		setLocale(locale);

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
	<h1>{i18n.title()}</h1>
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
