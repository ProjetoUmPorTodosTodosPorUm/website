<script lang="ts">
	import '$scss/routes/fields/collected-offers.scss'
	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto, invalidate } from '$app/navigation'

	import type { FieldDto, MonthlyOfferDto } from '$types'
	import { MONTHS_LABELS, DEPENDENCY_URLS } from '$constants'

	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		BarController,
		BarElement,
		Filler,
		Tooltip
	} from 'chart.js'

	Chart.register(
		LineController,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		BarController,
		BarElement,
		Filler,
		Tooltip
	)

	Chart.defaults.borderColor = '#4371DE' // accent

	export let data: PageData

	$: field = data.field as FieldDto
	$: years = data.years
	$: annualOffer = data.apiData as MonthlyOfferDto[]
	let currentYear = '0'

	let months: string[] = []
	let foodChart: Chart<'line'>
	let monetaryChart: Chart<'bar'>
	let othersChart: Chart<'bar'>

	onMount(async () => {
		months = Object.keys(MONTHS_LABELS).map((m) => MONTHS_LABELS[m])

		// Validate user input
		currentYear = $page.url.searchParams.get('year') || '0'

		if (years.length > 0 && !years.includes(currentYear)) {
			$page.url.searchParams.set('year', years[0])
			currentYear = String(years[0])
		} else if (years.length <= 0) {
			$page.url.searchParams.set('year', '0')
		}
		goto(`/fields/${field.id}/collected-offers/annual?year=${currentYear}`)

		// retrigger annualOffer so chart can work properly on first run
		// Chart.register takes a while
		annualOffer = [...annualOffer]
	})

	async function onYearChange(year: string) {
		await goto(`/fields/${field.id}/collected-offers/annual?year=${year}`)
		await invalidate(DEPENDENCY_URLS.listLoad)
		currentYear = year
	}

	function foodGraph(node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) {
		const _foodGraph = (node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) => {
			let labels = []
			let foodQnt = []
			for (let i = 0; i < annualOffer.length; i++) {
				const monthlyOffer = annualOffer[i]
				labels.push(months[monthlyOffer.month - 1])
				foodQnt.push(monthlyOffer.foodQnt)
			}

			if (foodChart) {
				foodChart.destroy()
			}

			foodChart = new Chart(node, {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: 'Alimentos',
							data: foodQnt,
							tension: 0.1,
							fill: true
						}
					]
				}
			})
		}

		if (annualOffer.length > 0) {
			_foodGraph(node, annualOffer)
		}

		return {
			update(annualOffer: MonthlyOfferDto[]) {
				_foodGraph(node, annualOffer)
			}
		}
	}

	function monetaryGraph(node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) {
		const _monetaryCountUp = (node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) => {
			let labels = []
			let monetaryValue = []
			for (let i = 0; i < annualOffer.length; i++) {
				const monthlyOffer = annualOffer[i]
				labels.push(months[monthlyOffer.month - 1])
				monetaryValue.push(monthlyOffer.monetaryValue)
			}

			if (monetaryChart) {
				monetaryChart.destroy()
			}

			monetaryChart = new Chart(node, {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: 'Valor',
							data: monetaryValue
						}
					]
				},
				options: {
					scales: {
						y: {
							ticks: {
								callback(tickValue, index, ticks) {
									return 'R$ ' + tickValue
								}
							}
						}
					},
					plugins: {
						tooltip: {
							callbacks: {
								label: function (context) {
									return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y)
								}
							}
						}
					}
				}
			})
		}

		if (annualOffer.length > 0) {
			_monetaryCountUp(node, annualOffer)
		}

		return {
			update(annualOffer: MonthlyOfferDto[]) {
				_monetaryCountUp(node, annualOffer)
			}
		}
	}

	function othersGraph(node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) {
		const _othersCountUp = (node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) => {
			let labels = []
			let othersQnt = []
			for (let i = 0; i < annualOffer.length; i++) {
				const monthlyOffer = annualOffer[i]
				labels.push(months[monthlyOffer.month - 1])
				othersQnt.push(monthlyOffer.othersQnt)
			}

			if (othersChart) {
				othersChart.destroy()
			}

			othersChart = new Chart(node, {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: 'Outros',
							data: othersQnt
						}
					]
				},
				options: {
					indexAxis: 'y'
				}
			})
		}

		if (annualOffer.length > 0) {
			_othersCountUp(node, annualOffer)
		}

		return {
			update(annualOffer: MonthlyOfferDto[]) {
				_othersCountUp(node, annualOffer)
			}
		}
	}
</script>

<div class="date-picker">
	<div class="years">
		{#each years as year}
			<button class:active={currentYear == year} on:click|preventDefault={() => onYearChange(year)}>
				<a href={`/fields/${field.id}/collected-offers/annual?year=${year}`}>{year}</a>
			</button>
		{/each}
	</div>
</div>

<div class="annual-offers">
	{#if currentYear != '0'}
		<div class="graph-block">
			<h3>Alimentos</h3>
			<canvas class="graph" use:foodGraph={annualOffer} />
		</div>
		<div class="graph-block">
			<h3>Valores</h3>
			<canvas class="graph" use:monetaryGraph={annualOffer} />
		</div>
		<div class="graph-block">
			<h3>Outros</h3>
			<canvas class="graph" use:othersGraph={annualOffer} />
		</div>

		<div class="observation">
			<p>
				Você pode ver o relatório dessas ofertas <a href="/fields/{field.id}/reports">aqui</a>.
			</p>
		</div>
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma coleta de oferta anual.</p>
		</div>
	{/if}
</div>
