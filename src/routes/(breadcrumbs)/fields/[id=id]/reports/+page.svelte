<script lang="ts">
	import '$scss/routes/fields/reports.scss'
	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto, invalidate } from '$app/navigation'

	import type { FieldDto, ReportDto } from '$types'
	import { ReportType } from '$enums'
	import { DEPENDENCY_URLS } from '$constants'
	import { Report } from '$components'

	export let data: PageData

	$: field = data.field as FieldDto
	$: years = data.years as number[]
	$: reports = data.apiData as ReportDto[]
	let currentYear = '0'

	onMount(() => {
		// Validate user input
		currentYear = $page.url.searchParams.get('year') || '0'

		if (years.length > 0 && !years.includes(Number(currentYear))) {
			$page.url.searchParams.set('year', String(years[0]))
			currentYear = String(years[0])
		} else if (years.length <= 0) {
			$page.url.searchParams.set('year', '0')
		}
		goto(`/fields/${field.id}/reports?year=${currentYear}`)
	})

	$: monthlyReports = reports ? reports.filter((report) => report.type === ReportType.ORDINARY) : []
	$: annualReports = reports ? reports.filter((report) => report.type === ReportType.ANNUAL) : []
	$: semesterReports = reports ? reports?.filter((report) => report.type === ReportType.SEMESTER) : []

	async function onYearChange(year: string) {
		await goto(`/fields/${field.id}/reports?year=${year}`)
		await invalidate(DEPENDENCY_URLS.listLoad)
		currentYear = year
	}
</script>

<div class="date-picker">
	{#each years as year}
		<button class:active={currentYear == String(year)} on:click|preventDefault={() => onYearChange(String(year))}>
			<a href={`/fields/${field.id}/reports?year=${year}`}>{year}</a>
		</button>
	{/each}
</div>

{#if reports?.length > 0}
	{#if monthlyReports.length > 0}
		<h3>Mensal</h3>
	{/if}

	{#each monthlyReports as report}
		<Report {report} />
	{/each}

	{#if semesterReports.length > 0}
		<h3>Semestral</h3>
	{/if}
	{#each semesterReports as report}
		<Report {report} />
	{/each}

	{#if annualReports.length > 0}
		<h3>Anual</h3>
	{/if}
	{#each annualReports as report}
		<Report {report} />
	{/each}
{:else}
	<div class="text-placeholder">
		<p>Ainda não foi registrada nenhum relatório.</p>
	</div>
{/if}
