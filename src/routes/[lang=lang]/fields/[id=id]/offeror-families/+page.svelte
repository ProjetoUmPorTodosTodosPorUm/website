<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import type { OfferorFamilyDto, Pagination as PaginationType } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import Pagination from '$lib/components/public/pagination.svelte';
	import SearchBox from '$lib/components/public/search-box.svelte';
	import axios from '$lib/axios';
	import Axios from 'axios';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];
	const DEFAULT_PAGINATION = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'representative',
		orderValue: 'asc',
		search: '',
		searchSpecificField: 'fieldId',
		searchSpecificValue: data.field.id
	} as PaginationType;

	const showDropdown = false;
	const searchPlaceholder = 'Pesquise pelo representante da família';

	let searchInput = '';
	let isLoading = false;
	let offerorFamilies: OfferorFamilyDto[] = [];
	let totalCount = 1;
	let totalPages = 1;
	let pagination = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'representative',
		orderValue: 'asc',
		search: '',
		searchSpecificField: 'fieldId',
		searchSpecificValue: data.field.id
	} as PaginationType;
	$: queryString = fromPaginationToQuery(pagination);
	$: pagination.search = searchInput;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);

		await loadData();
	});

	const loadData = async () => {
		if (searchInput.length < 3) {
			pagination = { ...DEFAULT_PAGINATION };
		}

		try {
			isLoading = true;

			const res = await axios.get(`/offeror-family?${queryString}`);
			offerorFamilies = res.data.data;
			totalCount = res.headers.get('x-total-count');
			totalPages = res.headers.get('x-total-pages');

			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
	};
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
			<a href="/{data.locale}/fields/{data.field.id}/offeror-families"
				>{$LL.breadcrumbs.home.fields.offerorFamilies.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Famílias Ofertantes</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="centered">
		<SearchBox bind:searchInput {showDropdown} {searchPlaceholder} {loadData} />
		<div class="data-items">
			{#each offerorFamilies as offerorFamily (offerorFamily.id)}
				<div class="data-item">
					<ul class="simple-ulist">
						<li>{offerorFamily.representative}</li>
						<li>Compromisso: {offerorFamily.commitment}</li>
						<li>Grupo: {offerorFamily.group}</li>
						{#if offerorFamily.chuchDenomination}
							<li>Igreja: {offerorFamily.chuchDenomination}</li>
						{/if}
					</ul>
				</div>
			{/each}
		</div>

		<Pagination bind:page={pagination.page} maxPage={totalPages} on:pageChange={loadData} />
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
</style>
