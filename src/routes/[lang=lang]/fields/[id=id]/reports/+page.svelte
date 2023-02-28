<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import type { ReportDto } from '$lib/types';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import { ReportType } from '$lib/enums';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiPaperclip from 'svelte-icons-pack/fi/FiPaperclip';
	import FiChevronDown from 'svelte-icons-pack/fi/FiChevronDown';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	let isLoading = false;
	let years: number[] = [];
	let reports: ReportDto[];
	let query = {
		searchSpecificField: 'fieldId,year',
		searchSpecificValue: data.field.id,
		year: 0
	};
	$: queryString = fromPaginationToQuery({
		searchSpecificField: query.searchSpecificField,
		searchSpecificValue: `${query.searchSpecificValue},${query.year}`,
		orderKey: 'month',
		orderValue: 'asc'
	});
	$: queryString, loadData();

	$: monthlyReports = reports
		? reports.filter((report) => report.type === ReportType.ORDINARY)
		: [];
	$: annualReports = reports ? reports.filter((report) => report.type === ReportType.ANNUAL) : [];
	$: semesterReports = reports
		? reports?.filter((report) => report.type === ReportType.SEMESTER)
		: [];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);

		await loadYears();
	});

	async function loadData() {
		if (query.year === 0) {
			return;
		}

		try {
			isLoading = true;
			reports = (await axios.get(`/report?${queryString}`)).data.data;
			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
	}

	async function loadYears() {
		try {
			isLoading = true;
			years = (await axios.get('/report/years')).data.data;
			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
	}

	function onYearSelect(year: number) {
		query.year = year;
	}

	function onToggleReport(event: Event) {
		console.log(event.currentTarget.parentNode);
		// @ts-ignore
		const reportElement = event.currentTarget.parentNode;
		const bodyElement = reportElement.querySelector('.body');
		const iconElem = reportElement.querySelector('.head .icon');
		toggleReport(bodyElement, iconElem);
	}

	function toggleReport(bodyElement: HTMLDivElement, iconElem: SVGElement) {
		iconElem.classList.toggle('open');
		bodyElement.classList.toggle('open');
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
			<a href="/{data.locale}/fields/{data.field.id}/reports"
				>{$LL.breadcrumbs.home.fields.reports.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Relatórios</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="date-picker">
		{#each years as year}
			<button class="year" on:click={() => onYearSelect(year)}>{year}</button>
		{/each}
	</div>

	{#if reports?.length > 0}
		<h3>Mensais</h3>

		{#each monthlyReports as report}
			<div class="report">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="head" on:click={onToggleReport}>
					<h4>{report.title} . Postado em {new Date(report.createdAt).toLocaleDateString()}</h4>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="body">
					<p class="text">{report.shortDescription}</p>

					<ul class="data">
						<li>Mês: {report.month}</li>
						<li>Ano: {report.year}</li>
					</ul>

					<div class="attachments">
						<Icon src={FiPaperclip} />
						{#each report.attachments as attachment}
							<li>
								<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a>
							</li>
						{/each}
					</div>
				</div>
			</div>
		{/each}

		<h3>Semestral</h3>
		{#each semesterReports as report}
			<div class="report">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="head" on:click={onToggleReport}>
					<h4>{report.title} . Postado em {new Date(report.createdAt).toLocaleDateString()}</h4>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="body">
					<p class="text">{report.shortDescription}</p>

					<ul class="data">
						<li>Mês: {report.month}</li>
						<li>Ano: {report.year}</li>
					</ul>

					<div class="attachments">
						<Icon src={FiPaperclip} />
						{#each report.attachments as attachment}
							<li>
								<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a>
							</li>
						{/each}
					</div>
				</div>
			</div>
		{/each}

		<h3>Anual</h3>
		{#each annualReports as report}
			<div class="report">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="head" on:click={onToggleReport}>
					<h4>{report.title} . Postado em {new Date(report.createdAt).toLocaleDateString()}</h4>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="body">
					<p class="text">{report.shortDescription}</p>

					<ul class="data">
						<li>Mês: {report.month}</li>
						<li>Ano: {report.year}</li>
					</ul>

					<div class="attachments">
						<Icon src={FiPaperclip} />
						{#each report.attachments as attachment}
							<li>
								<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a>
							</li>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	{/if}
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

	.date-picker {
		display: flex;
		justify-content: center;

		.year {
			cursor: pointer;
			margin-right: 0.5rem;
			height: 2.5rem;
			padding: 0.5rem;
		}
	}

	.report {
		width: 40%;
		background-color: #fff;
		margin-bottom: .2rem;

		.head {
			display: flex;
			justify-content: space-between;
			cursor: pointer;
			padding: 0.5rem;

			h4 {
				margin: 0;
				display: inline-block;
			}

			.icon {
				transition: transform 0.2s ease-out;
			}
		}

		.body {
			max-height: 0px;
			transition: all 0.6s ease-in-out;
			overflow-y: hidden;
			padding: 0;

			.text {
				margin: 0;
			}
		}
	}

	:global(.report .body.open) {
		padding: 1rem .5rem 1rem !important;
		max-height: 500px !important;
	}

	:global(.report .head .icon.open) {
		transform: rotate(-180deg);
	}
</style>
