<script lang="ts">
	import '$lib/scss/components/public/search-field.scss';
	import { onMount } from 'svelte';
	import type { FieldDto, Pagination as PaginationType } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import { goto } from '$app/navigation';
	import SearchBox from '$lib/components/public/search-box.svelte';
	import Pagination from '$lib/components/public/pagination.svelte';

	export let locale: Locales;

	export let onFieldSelection = (id: string) => {
		goto(`/${locale}/fields/${id}`);
	};

	const showDropdown = false;
	const searchPlaceholder = 'Pesquise Pelo Nome do Campo Missionário';
	const DEFAULT_PAGINATION = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'designation',
		orderValue: 'asc',
		search: ''
	} as PaginationType;

	let searchInput = '';
	let isLoading = false;
	let fields: FieldDto[] = [];
	let totalCount = 1;
	let totalPages = 1;
	let pagination = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'designation',
		orderValue: 'asc',
		search: ''
	} as PaginationType;
	$: queryString = fromPaginationToQuery(pagination);
	$: pagination.search = searchInput;

	onMount(async () => {
		await loadData();
	});

	const loadData = async () => {
		if (searchInput.length < 3) {
			pagination = { ...DEFAULT_PAGINATION };
		}

		try {
			isLoading = true;

			const res = await axios.get(`/field?${queryString}`);
			fields = res.data.data;
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

<div class="centered">
	<SearchBox bind:searchInput {showDropdown} {searchPlaceholder} {loadData} />

	<div class="data-items">
		{#each fields as field (field.id)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="data-item" on:click={() => onFieldSelection(field.id)}>
				{field.designation}<br />
				{field.country} - {field.state}<br />
				Código: {field.abbreviation}
			</div>
		{/each}
	</div>

	<Pagination bind:page={pagination.page} maxPage={totalPages} on:pageChange={loadData} />
</div>
