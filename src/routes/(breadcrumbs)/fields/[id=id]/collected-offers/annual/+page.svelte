<script lang="ts">
	import '$scss/routes/fields/collected-offers.scss';
	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto, invalidate } from '$app/navigation'

	import type { FieldDto, PeriodDto, MonthlyOfferDto } from '$types';
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
		Filler
	} from 'chart.js';

	export let data: PageData;

	$: field = data.field as FieldDto
	$: years = Object.keys((data.period as PeriodDto))
	$: annualOffer = data.apiData as MonthlyOfferDto[]
	let currentYear = '0'

	let months: string[] = [];
	let foodChart: Chart<'line'>;
	let monetaryChart: Chart<'bar'>;
	let othersChart: Chart<'bar'>;

	onMount(async () => {
		Chart.register(
			LineController,
			CategoryScale,
			LinearScale,
			PointElement,
			LineElement,
			BarController,
			BarElement,
			Filler
		);

		months = Object.keys(MONTHS_LABELS).map((m) => MONTHS_LABELS[m]);

		// Validate user input
		currentYear = $page.url.searchParams.get('year') || '0'

		if(years.length > 0 && !years.includes(currentYear)) {
			$page.url.searchParams.set('year', years[0])
			currentYear = String(years[0])
		} else if (years.length <= 0) {
			$page.url.searchParams.set('year', '0')
		}
		goto(`/fields/${field.id}/collected-offers/annual?year=${currentYear}`)
	});

	function foodGraph(node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) {
		return {
			update(annualOffer: MonthlyOfferDto[]) {
				let labels = [];
				let foodQnt = [];
				for (let i = 0; i < annualOffer.length; i++) {
					const monthlyOffer = annualOffer[i];
					labels.push(months[monthlyOffer.month - 1]);
					foodQnt.push(monthlyOffer.foodQnt);
				}

				if (foodChart) {
					foodChart.destroy();
				}

				foodChart = new Chart(node, {
					type: 'line',
					data: {
						labels,
						datasets: [
							{
								label: 'Alimentos Recolhidos',
								data: foodQnt,
								tension: 0.1,
								fill: true
							}
						]
					}
				});
			}
		};
	}

	function monetaryGraph(node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) {
		return {
			update(annualOffer: MonthlyOfferDto[]) {
				let labels = [];
				let monetaryValue = [];
				for (let i = 0; i < annualOffer.length; i++) {
					const monthlyOffer = annualOffer[i];
					labels.push(months[monthlyOffer.month - 1]);
					monetaryValue.push(monthlyOffer.monetaryValue);
				}

				if (monetaryChart) {
					monetaryChart.destroy();
				}

				monetaryChart = new Chart(node, {
					type: 'bar',
					data: {
						labels,
						datasets: [
							{
								label: 'Recursos Recolhidos',
								data: monetaryValue
							}
						]
					},
					options: {
						scales: {
							y: {
								ticks: {
									callback(tickValue, index, ticks) {
										return 'R$ ' + tickValue;
									}
								}
							}
						}
					}
				});
			}
		};
	}

	function othersGraph(node: HTMLCanvasElement, annualOffer: MonthlyOfferDto[]) {
		return {
			update(annualOffer: MonthlyOfferDto[]) {
				let labels = [];
				let othersQnt = [];
				for (let i = 0; i < annualOffer.length; i++) {
					const monthlyOffer = annualOffer[i];
					labels.push(months[monthlyOffer.month - 1]);
					othersQnt.push(monthlyOffer.othersQnt);
				}

				if (othersChart) {
					othersChart.destroy();
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
				});
			}
		};
	}

	async function onYearChange(year: string) {
		await goto(`/fields/${field.id}/collected-offers/annual?year=${year}`)
		await invalidate(DEPENDENCY_URLS.listLoad)
	}
</script>

<div class="date-picker">
	<div class="years">
		{#each years as year}
		<button class:active={currentYear == year} on:click|preventDefault={() => onYearChange(year)} >
			<a href={`/fields/${field.id}/collected-offers/annual?year=${year}`}>{year}</a>
		</button>
		{/each}
	</div>
</div>

<div class="annual-offers">
	<div class="graph-block">
		<h3>Alimentos Recolhidos</h3>
		<canvas class="graph" use:foodGraph={annualOffer} />

		<div class="text">
			<p>
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
        		interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
        		are also reproduced in their exact original form, accompanied by English versions from the
        		1914 translation by H. Rackham.
			</p>
		</div>
	</div>
	<div class="graph-block">
		<h3>Recursos Recolhidos</h3>
		<canvas class="graph" use:monetaryGraph={annualOffer} />

		<div class="text">
			<p>
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
        		interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
        		are also reproduced in their exact original form, accompanied by English versions from the
        		1914 translation by H. Rackham.
			</p>
		</div>
	</div>
	<div class="graph-block">
		<h3>Outros</h3>
		<canvas class="graph" use:othersGraph={annualOffer} />
		
		<div class="text">
			<p>
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
        		interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
        		are also reproduced in their exact original form, accompanied by English versions from the
        		1914 translation by H. Rackham.
			</p>
		</div>
	</div>
</div>

<div class="observation">
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    	labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    	laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    	voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    	non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</p>
</div>
