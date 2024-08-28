<script lang="ts">
	import '$scss/routes/fields/collected-offers.scss'
	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { goto, invalidate } from '$app/navigation'

	import { CountUp } from 'countup.js'
	import type { FieldDto, MonthlyOfferDto } from '$types'
	import { MONTHS_LABELS, DEPENDENCY_URLS } from '$constants'

	// icon
	import { Icon } from 'svelte-icons-pack'
	import { BiDonateHeart } from 'svelte-icons-pack/bi'
	import { FiPackage } from 'svelte-icons-pack/fi'

	export let data: PageData

	$: field = data.field as FieldDto
	$: years = data.years
	$: months = data.months
	$: monthlyOffer = data.apiData[0] as MonthlyOfferDto

	const monthLabels = Object.keys(MONTHS_LABELS).map((m) => MONTHS_LABELS[m])
	const COUNT_UP_DURATION = 1.5 // in seconds
	let currentYear = '0'
	let currentMonth = '0'

	onMount(() => {
		currentYear = $page.url.searchParams.get('year') || '0'
		if (years.length > 0 && !years.includes(currentYear)) {
			$page.url.searchParams.set('year', years[0])
			currentYear = years[0]
		} else if (years.length <= 0) {
			$page.url.searchParams.set('year', '0')
		}

		currentMonth = $page.url.searchParams.get('month') || '0'
		if (years.length > 0 && months.length > 0 && !months.includes(Number(currentMonth))) {
			$page.url.searchParams.set('month', String(months[0]))
			currentMonth = String(months[0])
		} else if (years.length <= 0) {
			$page.url.searchParams.set('month', '0')
		}

		goto(`/fields/${field.id}/collected-offers/monthly?year=${currentYear}&month=${currentMonth}`)
	})

	async function onYearChange(year: string) {
		await goto(`/fields/${field.id}/collected-offers/monthly?year=${year}&month=1`)
		await invalidate(DEPENDENCY_URLS.listLoad)
		currentYear = year
		currentMonth = '1'
	}

	async function onMonthChange(month: string) {
		await goto(`/fields/${field.id}/collected-offers/monthly?year=${currentYear}&month=${month}`)
		await invalidate(DEPENDENCY_URLS.listLoad)
		currentMonth = month
	}

	function foodCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		const _foodCountUp = (node: HTMLElement, monthlyOffer: MonthlyOfferDto) => {
			const countUp = new CountUp(node, monthlyOffer.foodQnt, {
				duration: COUNT_UP_DURATION
			})
			countUp.start()
		}

		if (monthlyOffer?.foodQnt) {
			_foodCountUp(node, monthlyOffer)
		}

		return {
			update(monthlyOffer: MonthlyOfferDto) {
				_foodCountUp(node, monthlyOffer)
			}
		}
	}

	function monetaryCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		const _monetaryCountUp = (node: HTMLElement, monthlyOffer: MonthlyOfferDto) => {
			const countUp = new CountUp(node, monthlyOffer.monetaryValue, {
				duration: COUNT_UP_DURATION,
				decimalPlaces: 2,
				decimal: ','
			})
			countUp.start()
		}

		if (monthlyOffer?.monetaryValue) {
			_monetaryCountUp(node, monthlyOffer)
		}

		return {
			update(monthlyOffer: MonthlyOfferDto) {
				_monetaryCountUp(node, monthlyOffer)
			}
		}
	}

	function othersCountUp(node: HTMLElement, monthlyOffer: MonthlyOfferDto) {
		const _othersCountUp = (node: HTMLElement, monthlyOffer: MonthlyOfferDto) => {
			const countUp = new CountUp(node, monthlyOffer.othersQnt, {
				duration: COUNT_UP_DURATION
			})
			countUp.start()
		}

		if (monthlyOffer?.othersQnt) {
			_othersCountUp(node, monthlyOffer)
		}

		return {
			update(monthlyOffer: MonthlyOfferDto) {
				_othersCountUp(node, monthlyOffer)
			}
		}
	}
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Ofertas Coletadas Mensal ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Ofertas Coletadas Mensal ({field.designation})" />
	<meta name="description" content="Encontre as ofertas coletadas mensais do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, ofertas coletadas, dados, gráfico, alimentos, valores, mensal, relatório, projeto">
</svelte:head>

<div class="date-picker">
	<div class="years">
		{#each years as year}
			<button class:active={currentYear == year} on:click|preventDefault={() => onYearChange(year)}>
				<a href="/fields/{field.id}/collected-offers/monthly?year={year}&month={currentMonth}">{year}</a>
			</button>
		{/each}
	</div>
	<div class="months">
		{#if currentYear !== '0'}
			{#each months as month}
				<button
					class:active={currentMonth == String(month)}
					on:click|preventDefault={() => onMonthChange(String(month))}
				>
					<a href="/fields/{field.id}/collected-offers/monthly?year={currentYear}&month={month}"
						>{monthLabels[Number(month) - 1]}</a
					>
				</button>
			{/each}
		{/if}
	</div>
</div>

<div class="monthly-offers">
	{#if currentMonth != '0' && currentYear != '0'}
		<div class="number">
			<div class="wrap">
				<div class="icon">
					<Icon src={BiDonateHeart} color="var(--dominant)" viewBox="0 0 24 24" />
				</div>
				<div class="value" use:foodCountUp={monthlyOffer}>0</div>
			</div>
			<div class="title">Alimentícia</div>
		</div>
		<div class="number">
			<div class="wrap">
				<div class="icon">R$</div>
				<div class="value" use:monetaryCountUp={monthlyOffer}>0,00</div>
			</div>
			<div class="title">Monetária</div>
		</div>
		<div class="number">
			<div class="wrap">
				<div class="icon">
					<Icon src={FiPackage} />
				</div>
				<div class="value" use:othersCountUp={monthlyOffer}>0</div>
			</div>
			<div class="title">Outros</div>
		</div>
		<div class="text">
			<p />
		</div>

		<div class="observation">
			<p>
				Você pode ver o relatório dessas ofertas <a href="/fields/{field.id}/reports">aqui</a>.
			</p>
		</div>
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma coleta de oferta mensal.</p>
		</div>
	{/if}
</div>
