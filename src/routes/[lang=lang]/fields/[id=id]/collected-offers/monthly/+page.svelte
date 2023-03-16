<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import type { MonthlyOfferDto } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import type { Namespaces } from '$i18n/i18n-types';
	import { CountUp } from 'countup.js';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiBox from 'svelte-icons-pack/fi/FiBox';
	import FiDollarSign from 'svelte-icons-pack/fi/FiDollarSign';
	import FiPackage from 'svelte-icons-pack/fi/FiPackage';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes', 'utils'];
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
		namespaces.forEach(async (ns) => {
			await loadNamespaceAsync(data.locale, ns);
		});
		setLocale(data.locale);

		onSwitchLocale(null);
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
		months = Object.keys($LL.utils.months).map((m) => $LL.utils.months[m]());
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
			<a href="/{data.locale}/fields/{data.field.id}/collected-offers/monthly"
				>{$LL.breadcrumbs.home.fields.collectedOffers.monthly.text()}</a
			>
		</li>
	</ul>

	<h1>Ofertas Coletadas</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
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
	@import '$lib/scss/_shared';

	h1,
	h2 {
		margin-bottom: 0.2rem;
	}

	h2 {
		margin-top: 0;
		font-size: calc(var(--h1-font-size) - 0.6rem) !important;
	}

	.monthly-offers {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		@include for-lg-devices {
			flex-direction: row;
			flex-wrap: wrap;
		}

		.number {
			width: fit-content;
			background-color: var(--primary-background);
			color: var(--contrast-primary-background);

			display: flex;
			align-items: center;
			margin-bottom: 0.5rem;
			padding: 1rem;

			.icon,
			.value {
				font-size: 4rem;
			}

			&:not(:nth-child(2)) > .icon {
				margin-bottom: -1rem;
			}

			@include for-lg-devices {
				margin-right: 1rem;
			}
		}

		.text {
			margin-top: 2rem;

			@include for-xl-devices {
				margin: 2rem auto 0;
				width: 70% !important;
			}
		}
	}

	.date-picker {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;

		@include for-lg-devices {
			margin-bottom: 2rem;
		}

		@include for-xl-devices {
			margin-bottom: 4rem;
		}

		button {
			font-size: 1.4rem;
			margin-right: 0.2rem;
			margin-bottom: 0.2rem;
			padding: 0.2rem 0.5rem;

			background-color: var(--primary-background);
			color: var(--contrast-primary-background);

			border-radius: 0.3rem;
			border: 0.2rem solid rgba(0, 0, 0, 0);

			outline: none;

			&.active {
				color: var(--link-font-color);
			}

			@include for-md-devices {
				padding: 0.4rem 1rem;
			}

			@include for-lg-devices {
				cursor: pointer;

				&:hover {
					color: var(--link-font-color);
				}
			}
		}
	}

	.observation {
		margin-top: 2rem;

		@include for-xl-devices {
			margin: 2rem auto 0;
			width: 70% !important;
		}
	}
</style>
