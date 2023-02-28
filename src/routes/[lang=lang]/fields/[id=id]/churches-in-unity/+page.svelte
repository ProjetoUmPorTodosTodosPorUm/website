<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import Carousel from '$lib/components/public/carousel.svelte';
	import type { ChurchDto, Pagination } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	let isLoading = false;
	let churches: ChurchDto[] = [];
	let query = {
		itemsPerPage: 100,
		searchSpecificField: 'fieldId',
		searchSpecificValue: data.field.id
	} as Pagination;
	$: queryString = fromPaginationToQuery(query);

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);

		await loadData();
	});

	async function loadData() {
		try {
			isLoading = true;
			churches = (await axios.get(`/church?${queryString}`)).data.data;
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
	<ul class="breadcrumb">
		<li><a href="/{data.locale}/">{$LL.breadcrumbs.home.text()}</a></li>
		<li>
			<a href="/{data.locale}/fields">{$LL.breadcrumbs.home.fields.text()}</a>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}">{data.field.designation}</a>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/churches-in-unity"
				>{$LL.breadcrumbs.home.fields.churchesInUnity.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Igrejas em Unidade</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="churches">
		{#if churches.length > 0}
			<Carousel>
				{#each churches as church (church.id)}
					<div class="church">
						<div class="image">
							<img src="https://via.placeholder.com/500x500.webp" alt="Collaborator Logo" />
						</div>
						<div class="content">
							<h3 class="title">{church.name}</h3>
							<p class="text">{church.description}</p>
						</div>
					</div>
				{/each}
			</Carousel>
		{/if}
	</div>
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	h1,
	h2 {
		margin: 0 0 0rem;
	}

	h2 {
		font-size: 1.2rem !important;
	}

	.churches {
		width: 50%;
		margin: 0 auto;

		.church {
			display: flex;

			.image {
				img {
					width: 250px;
					object-fit: cover;
				}
			}

			.content {
				display: flex;
				flex-direction: column;
				padding-left: 2rem;

				.title {
					font-size: initial;
				}

				.text {
					display: initial;
					width: 100%;
					text-align: justify;
				}
			}
		}
	}
</style>
