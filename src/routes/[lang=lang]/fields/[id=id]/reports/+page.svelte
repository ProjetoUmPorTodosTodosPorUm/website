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
	</ul>

	<h1>Relatórios</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="date-picker">
		{#each years as year}
			<button class={query.year == Number(year) ? 'active' : ''} on:click={() => onYearSelect(year)}
				>{year}</button
			>
		{/each}
	</div>

	{#if reports?.length > 0}
		{#if monthlyReports.length > 0}
			<h3>Mensais</h3>
		{/if}

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
						<Icon src={FiPaperclip} className="icon" />
						<ul>
							{#each report.attachments as attachment}
								<li>
									<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}

		{#if semesterReports.length > 0}
			<h3>Semestral</h3>
		{/if}
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
						<Icon src={FiPaperclip} className="icon" />
						<ul>
							{#each report.attachments as attachment}
								<li>
									<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}

		{#if annualReports.length > 0}
			<h3>Anual</h3>
		{/if}
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
						<Icon src={FiPaperclip} className="icon" />
						<ul>
							{#each report.attachments as attachment}
								<li>
									<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	{/if}
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

	.date-picker {
		min-height: 200px;

		display: flex;
		justify-content: center;
		align-items: center;

		button {
			font-size: 1.4rem;
			margin-right: 0.2rem;
			padding: 0.2rem 0.5rem;

			background-color: var(--primary-background);
			color: var(--contrast-primary-background);

			border-radius: 0.3rem;
			border: 0.2rem solid rgba(0, 0, 0, 0);

			outline: none;

			&.active {
				color: var(--link-font-color);
			}

			@include for-md-devices {
				padding: 0.4rem 1rem;
			}

			@include for-lg-devices {
				margin-right: 0.5rem;

				cursor: pointer;

				&:hover {
					color: var(--link-font-color);
				}
			}
		}
	}

	.report {
		background-color: var(--primary-background);
		color: var(--contrast-primary-background);
		padding: 0.2rem 0.4rem;
		border-radius: 0.3rem;

		margin-bottom: 0.5rem;

		@include for-lg-devices {
			width: 80%;
		}

		@include for-xl-devices {
			width: 60%;
		}

		.head {
			display: flex;
			justify-content: space-between;
			cursor: pointer;
			padding: 0.5rem;

			h4 {
				margin: 0;
				display: inline-block;
				font-size: calc(var(--h3-font-size) - 0.7rem);
			}

			.icon {
				transition: transform 0.2s ease-out;
			}
		}

		.body {
			max-height: 0px;
			overflow-y: hidden;
			padding: 0.2rem 0.4rem;

			transition: all 0.6s ease-in-out;

			.text {
				margin: 0;
			}

			.data {
				list-style: none;
				padding: 0;
			}

			.attachments {
				display: flex;

				ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}
			}
		}
	}

	:global(.report .body.open) {
		//padding: 0.2rem 0.4rem !important;
		max-height: 500px !important;
	}

	:global(.report .head .icon.open) {
		transform: rotate(-180deg);
	}

	:global(.report .body .attachments .icon) {
		margin-top: 0.1rem;
		margin-right: 0.2rem;
	}

	#main {
		min-height: 300px;

		@include for-xl-devices {
			min-height: 60vh;
		}
	}
</style>
