<script lang="ts">
	import '$lib/scss/routes/fields/collected-offers.scss';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import type { MonthlyOfferDto } from '$lib/types';
	import { delay, fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { CountUp } from 'countup.js';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiBox from 'svelte-icons-pack/fi/FiBox';
	import FiDollarSign from 'svelte-icons-pack/fi/FiDollarSign';
	import FiPackage from 'svelte-icons-pack/fi/FiPackage';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].collectedOffers;
	$: i18nUtils = $LL['utils'];

	$: i18nUtils, onSwitchLocale(null);

	export let data: PageData;
	const COUNT_UP_DURATION = 5; // in seconds
	let months: string[] = [];

	let isLoading = false;
	let monthlyOffer: MonthlyOfferDto;
	let monthlyQuery = {
		searchSpecificField: 'fieldId,year,month',
		searchSpecificValue: data.field.id,
		month: 0,
		year: 0
	};
	$: monthlyQueryString = fromPaginationToQuery({
		searchSpecificField: monthlyQuery.searchSpecificField,
		searchSpecificValue: `${monthlyQuery.searchSpecificValue},${monthlyQuery.year},${monthlyQuery.month}`
	});
	$: if (monthlyQuery.year !== 0 && monthlyQuery.month !== 0) {
		loadMonthlyData();
	}

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'fields');
		await loadNamespaceAsync(data.locale, 'utils');
		setLocale(data.locale);

		months = Object.keys(i18nUtils.months).map((m) => i18nUtils.months[m]());
	});

	async function loadMonthlyData() {
		try {
			isLoading = true;
			monthlyOffer = (await axios.get(`/monthly-offer?${monthlyQueryString}`)).data.data[0];
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
		monthlyQuery.year = year;
		monthlyQuery.month = 0;
	}

	function onMonthSelect(month: number) {
		monthlyQuery.month = month;
	}

	function foodCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		return {
			update(monthlyOffer: MonthlyOfferDto) {
				const countUp = new CountUp(node, monthlyOffer.foodQnt, {
					duration: COUNT_UP_DURATION
				});

				console.warn(countUp.error);
				countUp.start();
			}
		};
	}

	function monetaryCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		return {
			update(monthlyOffer: MonthlyOfferDto) {
				const countUp = new CountUp(node, monthlyOffer.monetaryValue, {
					duration: COUNT_UP_DURATION,
					prefix: 'R$',
					decimalPlaces: 2,
					decimal: ','
				});

				console.warn(countUp.error);
				countUp.start();
			}
		};
	}

	function othersCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		return {
			update(monthlyOffer: MonthlyOfferDto) {
				const countUp = new CountUp(node, monthlyOffer.othersQnt, {
					duration: COUNT_UP_DURATION
				});

				console.warn(countUp.error);
				countUp.start();
			}
		};
	}

	function onSwitchLocale(event: any) {
		months = Object.keys(i18nUtils.months).map((m) => i18nUtils.months[m]());
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
					class={monthlyQuery.year == Number(year) ? 'active' : ''}
					on:click={() => onYearSelect(Number(year))}>{year}</button
				>
			{/each}
		</div>
		<div class="months">
			{#if monthlyQuery.year !== 0}
				{#each data.period[monthlyQuery.year] as month}
					<button
						class={monthlyQuery.month == Number(month) ? 'active' : ''}
						on:click={() => onMonthSelect(Number(month))}>{months[Number(month) - 1]}</button
					>
				{/each}
			{/if}
		</div>
	</div>

	<div class="monthly-offers">
		<div class="number">
			<div class="icon">
				<Icon src={FiBox} />
			</div>
			<div class="value" use:foodCountUp={monthlyOffer}>0</div>
		</div>

		<div class="number">
			<div class="icon">
				<Icon src={FiDollarSign} />
			</div>
			<div class="value" use:monetaryCountUp={monthlyOffer}>R$ 0,00</div>
		</div>

		<div class="number">
			<div class="icon">
				<Icon src={FiPackage} />
			</div>
			<div class="value" use:othersCountUp={monthlyOffer}>0</div>
		</div>

		<div class="text">
			<p />
		</div>
	</div>

	<div class="observation">
		<p>
			{i18n.monthlyObservation()}
		</p>
	</div>
</section>
<Footer locale={data.locale} />
