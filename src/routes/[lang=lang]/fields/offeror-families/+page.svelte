<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import SearchBox from '$lib/components/public/search-box.svelte';
	import Pagination from '$lib/components/public/pagination.svelte';
	import SearchField from '$lib/components/public/search-field.svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { SearchOption } from '$lib/enums';
	import type { OfferorFamilyDto, Pagination as PaginationType } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	// Component Specifics
	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	let option: SearchOption | null;
	let isLoading = false;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
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
	<ul class="breadcrumb">
		<li><a href="/{data.locale}/">{$LL.breadcrumbs.home.text()}</a></li>
		<li>
			<a href="/{data.locale}/fields">{$LL.breadcrumbs.home.fields.text()}</a>
		</li>
		<li>
			<a href="/{data.locale}/fields/offeror-families"
				>{$LL.breadcrumbs.home.fields.offerorFamilies.text()}</a
			>
		</li>
		
	</ul>

	<h1>Famílias Ofertantes</h1>

	{#if option === SearchOption.ALL}
		<div class="reset-option">
			<button on:click={resetOption}>Voltar</button>
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
	{:else if option === SearchOption.SPECIFIC}
		<div class="reset-option">
			<button on:click={resetOption}>Voltar</button>
		</div>
		<SearchField locale={data.locale} {onFieldSelection} />
	{:else}
		<div class="option-container">
			<button class="option" on:click={onSpecifOption}>Pesquisar Por Campo Missionário</button>
			<button class="option" on:click={onAllOption}
				>Pesquisar em Todos os Campos Missionários</button
			>
		</div>
	{/if}
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	@import '$lib/scss/_shared';

	.reset-option {
		@include for-lg-devices {
			margin: 0 auto;
			width: 60%;
		}

		@include for-xl-devices {
			width: 50%;
		}

		button {
			margin-bottom: 0.5rem;
			padding: 0.2rem 0.5rem;

			background-color: var(--primary-background);
			color: var(--contrast-primary-background);

			border-radius: 0.3rem;
			border: 0.2rem solid rgba(0, 0, 0, 0);

			@include for-lg-devices {
				cursor: pointer;

				&:hover {
					color: var(--link-font-color);
				}
			}
		}
	}

	.option-container {
		min-height: 200px;

		display: flex;
		justify-content: center;
		align-items: center;

		.option {
			font-size: 1rem;
			margin-right: 0.5rem;
			padding: 0.2rem 0.5rem;

			background-color: var(--primary-background);
			color: var(--contrast-primary-background);

			border-radius: 0.3rem;
			border: 0.2rem solid rgba(0, 0, 0, 0);

			@include for-md-devices {
				padding: 0.4rem 1rem;
			}

			@include for-lg-devices {
				cursor: pointer;

				&:hover {
					color: var(--link-font-color);
				}
			}
		}
	}

	#main {
		min-height: 300px;

		@include for-xl-devices {
			min-height: 60vh;
		}
	}
</style>
