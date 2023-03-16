<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { fromPaginationToQuery, sortVolunteersByOccupations } from '$lib/utils/functions';
	import type { Pagination, VolunteerDto } from '$lib/types';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import { Occupation } from '$lib/enums';

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
	$: firstSectionVols = volunteers.filter((vol) => firstSectionOccs.includes(vol.occupation));
	$: secondSectionVols = volunteers.filter((vol) => secondSectionOccs.includes(vol.occupation));
	$: thirdSectionVols = volunteers.filter((vol) => thirdSectionOccs.includes(vol.occupation));

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);

		await loadData();
	});

	const firstSectionOccs = [
		Occupation.PRESIDENT,
		Occupation.VICE_PRESIDENT,
		Occupation.GENERAL_COORDINATOR,
		Occupation.COORDINATOR_01,
		Occupation.COUNSELOR_01,
		Occupation.COUNSELOR_02,
		Occupation.COUNSELOR_03,
		Occupation.WEB_MASTER,
		Occupation.TREASURER_01,
		Occupation.TREASURER_02,
		Occupation.ACADEMIC_INSTRUCTOR_01,
		Occupation.ACADEMIC_INSTRUCTOR_02,
		Occupation.EXECUTIVE_SECRETARY,
		Occupation.AUXILIARY_SECRETARY
	];

	const secondSectionOccs = [
		Occupation.COORDINATOR_02,
		Occupation.INFIELD_COORDINATOR,
		Occupation.OUTFIELD_COORDINATOR
	];

	const thirdSectionOccs = [Occupation.COLLECTOR, Occupation.SUPPORT_SERVICE];

	async function loadData() {
		try {
			isLoading = true;
			const res = (await axios.get(`/volunteer?${queryString}`)).data.data;
			volunteers = sortVolunteersByOccupations(res, [
				...firstSectionOccs,
				...secondSectionOccs,
				...thirdSectionOccs
			]);
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
		
	</ul>

	<h1>Voluntários</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="volunteers">
		<h3>Setor Operacional de Missões</h3>
		{#each firstSectionVols as volunteer}
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
		<h3>Serviço Interno e Externo</h3>
		{#each secondSectionVols as volunteer}
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
		<h3>Serviço de Apoio</h3>
		{#each thirdSectionVols as volunteer}
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
