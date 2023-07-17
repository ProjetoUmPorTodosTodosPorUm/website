<script lang="ts">
	import '$lib/scss/routes/fields/oferror-families.scss';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SearchBox from '$lib/components/search-box.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import SearchField from '$lib/components/search-field.svelte';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { SearchOption } from '$lib/enums';
	import type { OfferorFamilyDto, Pagination as PaginationType } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].offerorFamilies;

	// Component Specifics
	export let data: PageData;

	let option: SearchOption | null;
	let isLoading = false;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'fields');
		setLocale(data.locale);

		await loadData();
	});

	function onSpecifOption() {
		option = SearchOption.SPECIFIC;
	}

	function onAllOption() {
		option = SearchOption.ALL;
	}

	function resetOption() {
		option = null;
	}

	function onFieldSelection(id: string) {
		goto(`/${data.locale}/fields/${id}/offeror-families`);
	}

	// SearcBox Offeror Families
	const DEFAULT_PAGINATION = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'representative',
		orderValue: 'asc',
		search: ''
	} as PaginationType;
	const ofSearchPlaceholder = 'Pesquise pelo representante da família';

	let searchInput = '';
	let offerorFamilies: OfferorFamilyDto[] = [];
	let totalCount = 1;
	let totalPages = 1;
	let pagination = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'representative',
		orderValue: 'asc',
		search: ''
	} as PaginationType;
	$: queryString = fromPaginationToQuery(pagination);
	$: pagination.search = searchInput;

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
	<Breadcrumbs locale={data.locale} />

	<h1>{i18n.title()}</h1>

	{#if option === SearchOption.ALL}
		<div class="reset-option">
			<button on:click={resetOption}>{i18n.backButton()}</button>
		</div>

		<div class="centered">
			<SearchBox
				bind:searchInput
				searchPlaceholder={ofSearchPlaceholder}
				{loadData}
				showDropdown={false}
			/>
			<div class="data-items">
				{#each offerorFamilies as offerorFamily (offerorFamily.id)}
					<div class="data-item">
						<ul class="simple-ulist">
							<li>{offerorFamily.representative}</li>
							<li>{i18n.commitment()}: {offerorFamily.commitment}</li>
							<li>{i18n.group()}: {offerorFamily.group}</li>
							{#if offerorFamily.chuchDenomination}
								<li>{i18n.churchDenomination()}: {offerorFamily.chuchDenomination}</li>
							{/if}
						</ul>
					</div>
				{/each}
			</div>

			<Pagination bind:page={pagination.page} maxPage={totalPages} on:pageChange={loadData} />
		</div>
	{:else if option === SearchOption.SPECIFIC}
		<div class="reset-option">
			<button on:click={resetOption}>{i18n.backButton()}</button>
		</div>
		<SearchField locale={data.locale} {onFieldSelection} />
	{:else}
		<div class="option-container">
			<button class="option" on:click={onSpecifOption}>{i18n.specificOption()}</button>
			<button class="option" on:click={onAllOption}>{i18n.allOption()}</button>
		</div>
	{/if}
</section>
<Footer locale={data.locale} />
