<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import type { OfferorFamilyDto, Pagination as PaginationType } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import SearchBox from '$lib/components/search-box.svelte';
	import axios from '$lib/axios';
	import Axios from 'axios';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].offerorFamilies;

	export let data: PageData;
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
		await loadNamespaceAsync(data.locale, 'fields');
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
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{i18n.title()}</h1>
	<h2>{i18n.subTitle({ designation: data.field.designation })}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="centered">
		<SearchBox bind:searchInput {showDropdown} searchPlaceholder={i18n.searchPlaceholder()} {loadData} />
		<div class="data-items">
			{#each offerorFamilies as offerorFamily (offerorFamily.id)}
				<div class="data-item">
					<ul class="simple-ulist">
						<li>{offerorFamily.representative}</li>
						<li>{i18n.commitment()}: {offerorFamily.commitment}</li>
						<li>{i18n.group()}: {offerorFamily.group}</li>
						{#if offerorFamily.chuchDenomination}
							<li>{i18n.chuchDenomination()}: {offerorFamily.chuchDenomination}</li>
						{/if}
					</ul>
				</div>
			{/each}
		</div>

		<Pagination bind:page={pagination.page} maxPage={totalPages} on:pageChange={loadData} />
	</div>
</section>
<Footer locale={data.locale} />
