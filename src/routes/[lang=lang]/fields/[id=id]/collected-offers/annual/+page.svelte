<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import type { MonthlyOfferDto } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
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
	const namespaces: Namespaces[] = ['components', 'routes', 'utils'];
	let months: string[] = [];

	let isLoading = false;
	let foodChart: Chart<'line'>;
	let monetaryChart: Chart<'bar'>;
	let othersChart: Chart<'bar'>;
	let annualOffer: MonthlyOfferDto[];
	let annualQuery = {
		searchSpecificField: 'fieldId,year',
		searchSpecificValue: data.field.id,
		year: 2020
	};
	$: annualQueryString = fromPaginationToQuery({
		searchSpecificField: annualQuery.searchSpecificField,
		searchSpecificValue: `${annualQuery.searchSpecificValue},${annualQuery.year}`,
		orderKey: 'month',
		orderValue: 'asc'
	});
	$: annualQueryString, loadAnnualData();

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

		namespaces.forEach(async (ns) => {
			await loadNamespaceAsync(data.locale, ns);
		});
		setLocale(data.locale);

		months = Object.keys($LL.utils.months).map((m) => $LL.utils.months[m]());
	});

	async function loadAnnualData() {
		try {
			isLoading = true;
			annualOffer = (await axios.get(`/monthly-offer?${annualQueryString}`)).data.data;
			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
	}

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

	function onSwitchLocale(event: any) {
		months = Object.keys($LL.utils.months).map((m) => $LL.utils.months[m]());
		annualOffer = annualOffer;
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
			<a href="/{data.locale}/fields/{data.field.id}/collected-offers"
				>{$LL.breadcrumbs.home.fields.collectedOffers.text()}</a
			>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/collected-offers/annual"
				>{$LL.breadcrumbs.home.fields.collectedOffers.annual.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Ofertas Coletadas</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="date-picker">
		<div class="years">
			{#each Object.keys(data.period) as year}
				<button on:click={() => (annualQuery.year = Number(year))}>{year}</button>
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
</section>
<Footer locale={data.locale} {namespaces} on:switchLocale={onSwitchLocale} />

<style lang="scss">
	h1,
	h2 {
		margin: 0 0 0rem;
	}

	h2 {
		font-size: 1.2rem !important;
	}

	.annual-offers {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.graph-block {
			height: 500px !important;
			width: 50% !important;
			margin-bottom: 2rem;
		}
	}

	.date-picker {
		display: flex;
		justify-content: center;

		select {
			margin-right: 0.5rem;
			height: 2.5rem;
			padding: 0.5rem;
		}
	}

	.observation {
		width: 50%;
		margin: 6rem auto 0rem;
	}
</style>
