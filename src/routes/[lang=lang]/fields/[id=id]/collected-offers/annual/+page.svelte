<script lang="ts">
	import '$lib/scss/routes/fields/collected-offers.scss';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import type { MonthlyOfferDto } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
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

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].collectedOffers;
	$: i18nUtils = $LL['utils'];

	$: i18nUtils, onSwitchLocale(null);

	export let data: PageData;
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

		await loadNamespaceAsync(data.locale, 'fields');
		await loadNamespaceAsync(data.locale, 'utils');
		setLocale(data.locale);

		months = Object.keys(i18nUtils.months).map((m) => i18nUtils.months[m]());
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
								label: i18n.foodGraph.title(),
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
								label: i18n.monetaryGraph.title(),
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
								label: i18n.othersGraph.title(),
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
		months = Object.keys(i18nUtils.months).map((m) => i18nUtils.months[m]());
		annualOffer = annualOffer;
	}
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{i18n.title()}</h1>
	<h2>{i18n.subTitle({ designation: data.field.designation })}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="date-picker">
		<div class="years">
			{#each Object.keys(data.period) as year}
				<button
					class={annualQuery.year == Number(year) ? 'active' : ''}
					on:click={() => (annualQuery.year = Number(year))}>{year}</button
				>
			{/each}
		</div>
	</div>

	<div class="annual-offers">
		<div class="graph-block">
			<h3>{i18n.foodGraph.title()}</h3>
			<canvas class="graph" use:foodGraph={annualOffer} />
			<div class="text">
				<p>
					{i18n.foodGraph.text()}
				</p>
			</div>
		</div>
		<div class="graph-block">
			<h3>{i18n.monetaryGraph.title()}</h3>
			<canvas class="graph" use:monetaryGraph={annualOffer} />
			<div class="text">
				<p>
					{i18n.monetaryGraph.text()}
				</p>
			</div>
		</div>
		<div class="graph-block">
			<h3>{i18n.othersGraph.title()}</h3>
			<canvas class="graph" use:othersGraph={annualOffer} />
			<div class="text">
				<p>
					{i18n.othersGraph.text()}
				</p>
			</div>
		</div>
	</div>

	<div class="observation">
		<p>
			{i18n.annualObservation()}
		</p>
	</div>
</section>
<Footer locale={data.locale} />
