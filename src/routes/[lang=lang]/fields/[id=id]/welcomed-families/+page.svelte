<script lang="ts">
	import '$lib/scss/routes/fields/welcomed-families.scss';
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import type { Pagination, WelcomedFamilyDto } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].welcomedFamilies;

	export let data: PageData;

	let isLoading = false;
	let welcomedFamilies: WelcomedFamilyDto[] = [];
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
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{i18n.title()}</h1>
	<h2>{i18n.subTitle({ designation: data.field.designation })}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="welcomed-families centered">
		<table>
			<thead>
				<tr>
					<th>{i18n.representative()}</th>
					<th>{i18n.observation()}</th>
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
<Footer locale={data.locale} />
