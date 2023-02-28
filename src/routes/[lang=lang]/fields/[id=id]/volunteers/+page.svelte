<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import type { Pagination, VolunteerDto } from '$lib/types';
	import axios from '$lib/axios';
	import Axios from 'axios';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	let isLoading = false;
	let volunteers: VolunteerDto[] = [];
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
			volunteers = (await axios.get(`/volunteer?${queryString}`)).data.data;
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
			<a href="/{data.locale}/fields/{data.field.id}/volunteers"
				>{$LL.breadcrumbs.home.fields.volunteers.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Voluntários</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="volunteers">
		{#each volunteers as volunteer}
			<div class="volunteer">
				<div class="head">
					<img src="https://via.placeholder.com/300x300.webp" alt="Profile" />
					<h3>{`${volunteer.firstName} ${volunteer.lastName}`}</h3>
					<p>{volunteer.occupation}</p>
				</div>
				<div class="body">
					<li>{volunteer.joinedDate}</li>
					<li>{volunteer.church}</li>
					<li>{volunteer.priest}</li>
				</div>
				<div class="footer">
					<p>{volunteer.observation}</p>
				</div>
			</div>
		{/each}
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
