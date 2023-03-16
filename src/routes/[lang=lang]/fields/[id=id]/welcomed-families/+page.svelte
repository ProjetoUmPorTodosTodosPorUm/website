<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import type { Pagination, WelcomedFamilyDto } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	let isLoading = false;
	let welcomedFamilies: WelcomedFamilyDto[] = [];
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
			welcomedFamilies = (await axios.get(`/welcomed-family?${queryString}`)).data.data;
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
			<a href="/{data.locale}/fields/{data.field.id}/welcomed-families"
				>{$LL.breadcrumbs.home.fields.welcomedFamilies.text()}</a
			>
		</li>
		
	</ul>

	<h1>Famílias Acolhidas</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="welcomed-families centered">
		<table>
			<thead>
				<tr>
					<th>Representante</th>
					<th>Observações</th>
				</tr>
			</thead>
			<tbody>
				{#each welcomedFamilies as welcomedFamily (welcomedFamily.id)}
					<tr>
						<td class="rep">{welcomedFamily.representative}</td>
						{#if welcomedFamily.observation}
							<td>{welcomedFamily.observation}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	@import "$lib/scss/_shared";

	h1,
	h2 {
		margin-bottom: 0.2rem;
	}

	h2 {
		margin-top: 0;
		font-size: calc(var(--h1-font-size) - 0.6rem) !important;
	}

	.welcomed-families table {
		width: 100%;
		
		color: var(--contrast-primary-background);
		background-color: var(--primary-background);
		border-collapse: collapse;

		@include for-lg-devices {
			margin-top: 2rem;
			width: 80%;
		}

		@include for-xl-devices {
			width: 60%;
		}

		td, th {
			border: .1rem solid var(--link-font-color);
			padding: .2rem .4rem;
			text-align: left;
		}

		th {
			font-size: 1.2rem;
			padding: .4rem !important;
		}

		.rep {
			white-space: nowrap;
		}
	}
</style>
