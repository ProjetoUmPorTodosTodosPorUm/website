<script lang="ts">
	import '$scss/routes/fields/reports.scss'
	import type { PageData } from './$types'
	import { onMount } from 'svelte';
	import { page } from '$app/stores'
	import { goto, invalidate } from '$app/navigation'

	import type { FieldDto,ReportDto } from '$types';
	import { ReportType } from '$enums';
	import { DEPENDENCY_URLS } from '$constants'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiPaperclip from 'svelte-icons-pack/fi/FiPaperclip';
	import FiChevronDown from 'svelte-icons-pack/fi/FiChevronDown';
	
	export let data: PageData;

	$: field = data.field as FieldDto
	$: years = data.years as number[]
	$: reports = data.apiData as ReportDto[];
	let currentYear = '0'

	onMount(() => {
		// Validate user input
		currentYear = $page.url.searchParams.get('year') || '0'

		if(years.length > 0 && !years.includes(Number(currentYear))) {
			$page.url.searchParams.set('year', String(years[0]))
			currentYear = String(years[0])
		} else if (years.length <= 0) {
			$page.url.searchParams.set('year', '0')
		}
		goto(`/fields/${field.id}/reports?year=${currentYear}`)
	})

	$: monthlyReports = reports
		? reports.filter((report) => report.type === ReportType.ORDINARY)
		: [];
	$: annualReports = reports ? reports.filter((report) => report.type === ReportType.ANNUAL) : [];
	$: semesterReports = reports
		? reports?.filter((report) => report.type === ReportType.SEMESTER)
		: [];


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

	async function onYearChange(year: number) {
		await goto(`/fields/${field.id}/reports?year=${year}`)
		await invalidate(DEPENDENCY_URLS.listLoad)
	}
</script>

<div class="date-picker">
	{#each years as year}
		<button class:active={currentYear == String(year)} on:click|preventDefault={() => onYearChange(year)} >
			<a href={`/fields/${field.id}/reports?year=${year}`}>{year}</a>
		</button>
	{/each}
</div>

{#if reports?.length > 0}
	{#if monthlyReports.length > 0}
		<h3>Mensal</h3>
	{/if}

	{#each monthlyReports as report}
		<div class="report">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="head" on:click={onToggleReport}>
				<h4>
					{report.title} | Postado em 
					{new Date(report.createdAt).toLocaleDateString()}
				</h4>
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
				<h4>
					{report.title} | Postado em 
					{new Date(report.createdAt).toLocaleDateString()}
				</h4>
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
				<h4>
					{report.title} | Postado em 
					{new Date(report.createdAt).toLocaleDateString()}
				</h4>
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