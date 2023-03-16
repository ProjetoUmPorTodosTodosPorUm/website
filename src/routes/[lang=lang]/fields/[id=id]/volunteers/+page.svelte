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
					<ul>
						<li>{volunteer.church}</li>
						<li>{volunteer.priest}</li>
						<li>Data de Entrada: {new Date(volunteer.joinedDate).toLocaleDateString()}</li>
					</ul>
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
					<ul>
						<li>{new Date(volunteer.joinedDate).toLocaleDateString()}</li>
						<li>{volunteer.church}</li>
						<li>{volunteer.priest}</li>
					</ul>
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
					<ul>
						<li>{new Date(volunteer.joinedDate).toLocaleDateString()}</li>
						<li>{volunteer.church}</li>
						<li>{volunteer.priest}</li>
					</ul>
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
	@import '$lib/scss/_shared';

	h1,
	h2 {
		margin-bottom: 0.2rem;
	}

	h2 {
		margin-top: 0;
		font-size: calc(var(--h1-font-size) - 0.6rem) !important;
	}

	h3:not(:first-of-type) {
		margin-top: 4rem;
	}

	.volunteer {
		display: flex;
		flex-direction: column;
		align-items: center;

		color: var(--contrast-primary-background);
		background-color: var(--primary-background);

		padding: 2rem 1rem;
		margin-bottom: 1rem;

		border-radius: 0.4rem;

		@include for-md-devices {
			display: grid;
			grid-template-areas:
				'img .'
				'img name'
				'img occupation'
				'img body'
				'img footer';
			grid-template-columns: 30% 70%;
		}

		@include for-lg-devices {
			width: 680px;
		}

		.head {
			width: 300px;

			@include for-md-devices {
				width: 100%;
				display: contents;
			}

			img {
				height: 300px;
				width: 200px;
				object-fit: cover;

				padding: 0.5rem;
				background-color: var(--contrast-primary-background);

				display: block;
				margin: 0 auto;

				@include for-md-devices {
					grid-area: img;
					margin: initial;
				}
			}

			h3 {
				margin: 0.5rem 0 0.1rem 0;

				@include for-md-devices {
					grid-area: name;
					margin-left: 1rem;
				}
			}

			p {
				text-indent: 0;
				margin-top: 0;
				font-size: 0.9rem;

				@include for-md-devices {
					grid-area: occupation;
					margin-left: 1rem;
				}
			}
		}

		.body {
			width: 300px;

			@include for-md-devices {
				grid-area: body;
				width: 100%;
				height: 100%;

				margin-left: 1rem;
			}

			ul {
				list-style: none;
				padding: 0;
				margin: 0;
			}
		}

		.footer {
			width: 300px;

			@include for-md-devices {
				grid-area: footer;
				width: 100%;
				height: 100%;

				margin-left: 1rem;
			}

			p {
				text-indent: 0.5rem;
			}
		}
	}
</style>
