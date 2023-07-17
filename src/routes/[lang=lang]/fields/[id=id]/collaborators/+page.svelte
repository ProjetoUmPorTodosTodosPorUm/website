<script lang="ts">
	import '$lib/scss/routes/fields/collaborators.scss';
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import Carousel from '$lib/components/carousel.svelte';
	import type { CollaboratorDto, Pagination } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].collaborators;

	export let data: PageData;

	let isLoading = false;
	let collaborators: CollaboratorDto[] = [];
	let query = {
		itemsPerPage: 100,
		searchSpecificField: 'fieldId',
		searchSpecificValue: data.field.id
	} as Pagination;
	$: queryString = fromPaginationToQuery(query);

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'fields');
		setLocale(data.locale);

		await loadData();
	});

	async function loadData() {
		try {
			isLoading = true;
			collaborators = (await axios.get(`/collaborator?${queryString}`)).data.data;
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

<MainNavbar locale={data.locale} />
<section id="main">
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{i18n.title()}</h1>
	<h2>{i18n.subTitle({ designation: data.field.designation })}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="collaborators">
		{#if collaborators.length > 0}
			<Carousel>
				{#each collaborators as collaborator (collaborator.id)}
					<div class="collaborator">
						<div class="image">
							<img
								src={collaborator.image ?? 'https://via.placeholder.com/500x500.webp'}
								alt="Collaborator Logo"
							/>
						</div>
						<div class="content">
							<h3 class="title">{collaborator.title}</h3>
							<p class="text">{collaborator.description}</p>
						</div>
					</div>
				{/each}
			</Carousel>
		{/if}
	</div>
</section>
<Footer locale={data.locale} />
