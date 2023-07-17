<script lang="ts">
	import '$lib/scss/routes/fields/reports.scss';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import type { ReportDto } from '$lib/types';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import { ReportType } from '$lib/enums';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiPaperclip from 'svelte-icons-pack/fi/FiPaperclip';
	import FiChevronDown from 'svelte-icons-pack/fi/FiChevronDown';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].reports;

	export let data: PageData;

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
		await loadNamespaceAsync(data.locale, 'fields');
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
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{i18n.title()}</h1>
	<h2>{i18n.subTitle({ designation: data.field.designation })}</h2>
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
			<h3>{i18n.monthly()}</h3>
		{/if}

		{#each monthlyReports as report}
			<div class="report">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="head" on:click={onToggleReport}>
					<h4>
						{report.title} | {i18n.posted()}
						{new Date(report.createdAt).toLocaleDateString()}
					</h4>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="body">
					<p class="text">{report.shortDescription}</p>

					<ul class="data">
						<li>{i18n.month()}: {report.month}</li>
						<li>{i18n.year()}: {report.year}</li>
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
			<h3>{i18n.semester()}</h3>
		{/if}
		{#each semesterReports as report}
			<div class="report">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="head" on:click={onToggleReport}>
					<h4>
						{report.title} | {i18n.posted()}
						{new Date(report.createdAt).toLocaleDateString()}
					</h4>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="body">
					<p class="text">{report.shortDescription}</p>

					<ul class="data">
						<li>{i18n.month()}: {report.month}</li>
						<li>{i18n.year()}: {report.year}</li>
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
			<h3>{i18n.annual()}</h3>
		{/if}
		{#each annualReports as report}
			<div class="report">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="head" on:click={onToggleReport}>
					<h4>
						{report.title} | {i18n.posted()}
						{new Date(report.createdAt).toLocaleDateString()}
					</h4>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="body">
					<p class="text">{report.shortDescription}</p>

					<ul class="data">
						<li>{i18n.month()}: {report.month}</li>
						<li>{i18n.year()}: {report.year}</li>
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
<Footer locale={data.locale} />
