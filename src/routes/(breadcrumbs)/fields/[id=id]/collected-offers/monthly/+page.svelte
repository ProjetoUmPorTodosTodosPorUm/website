<script lang="ts">
	import '$scss/routes/fields/collected-offers.scss';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'
	import { goto, invalidate } from '$app/navigation'

	import { CountUp } from 'countup.js';
	import type { FieldDto, MonthlyOfferDto } from '$types';
	import { MONTHS_LABELS, DEPENDENCY_URLS } from '$constants'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiBox from 'svelte-icons-pack/fi/FiBox';
	import FiDollarSign from 'svelte-icons-pack/fi/FiDollarSign';
	import FiPackage from 'svelte-icons-pack/fi/FiPackage';

	export let data: PageData;

	$: field = data.field as FieldDto
	$: years = data.years
	$: months = data.months
	$: monthlyOffer = data.apiData[0] as MonthlyOfferDto
	
	const monthLabels = Object.keys(MONTHS_LABELS).map((m) => MONTHS_LABELS[m]);
	const COUNT_UP_DURATION = 1.5 // in seconds
	let currentYear = '0'
	let currentMonth = '0'
	
	onMount(() => {
		// Validate user input
		currentYear = $page.url.searchParams.get('year') || '0'
		if(years.length > 0 && !years.includes(currentYear)) {
			$page.url.searchParams.set('year', years[0])
			currentYear = years[0]
		} else if (years.length <= 0) {
			$page.url.searchParams.set('year', '0')
		}

		currentMonth = $page.url.searchParams.get('month') || '0'
		if (years.length > 0 && months.length > 0 && !months.includes(currentMonth)) {
    	    $page.url.searchParams.set('month', months[0])
			currentMonth = months[0]
    	} else if (years.length <= 0) {
    	    $page.url.searchParams.set('month', '0')
    	}
		goto(`/fields/${field.id}/collected-offers/monthly?year=${currentYear}&month=${currentMonth}`)
	});

	function foodCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		return {
			update(monthlyOffer: MonthlyOfferDto) {
				const countUp = new CountUp(node, monthlyOffer.foodQnt, {
					duration: COUNT_UP_DURATION
				});
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
				countUp.start();
			}
		};
	}

	async function onYearChange(year: string) {
		await goto(`/fields/${field.id}/collected-offers/monthly?year=${year}&month=${currentMonth}`)
		await invalidate(DEPENDENCY_URLS.listLoad)
	}

	async function onMonthChange(month: string) {
		await goto(`/fields/${field.id}/collected-offers/monthly?year=${currentYear}&month=${month}`)
		await invalidate(DEPENDENCY_URLS.listLoad)	
	}
</script>

<div class="date-picker">
	<div class="years">
		{#each years as year}
		<button class:active={currentYear == year} on:click|preventDefault={() => onYearChange(year)} >
			<a href="/fields/{field.id}/collected-offers/monthly?year={year}&month={currentMonth}">{year}</a>
		</button>
		{/each}
	</div>
	<div class="months">
		{#if currentYear !== '0'}
			{#each months as month}
			<button class:active={currentMonth == month} on:click|preventDefault={() => onMonthChange(month)} >
				<a href="/fields/{field.id}/collected-offers/monthly?year={currentYear}&month={month}">{monthLabels[Number(month) - 1]}</a>
			</button>
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
		It is a long established fact that a reader will be distracted by the readable content of a
    	page when looking at its layout. The point of using Lorem Ipsum is that it has a
    	more-or-less normal distribution of letters, as opposed to using 'Content here, content
    	here', making it look like readable English. Many desktop publishing packages and web page
    	editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
    	uncover many web sites still in their infancy. Various versions have evolved over the years,
    	sometimes by accident, sometimes on purpose (injected humour and the like).
	</p>
</div>
