<script lang="ts">
	import type { PageData } from "./$types";
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
    const namespaces: Namespaces[] = ['components', 'routes'];
    const COUNT_UP_DURATION = 5; // in seconds
	const months = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Setembro',
		'Agosto',
		'Outubro',
		'Novembro',
		'Dezembro'
	];
    let isLoading = false;
	let monthlyOffer: MonthlyOfferDto;
	let monthlyQuery = {
		month: 1,
		year: 2020,
		field: data.field.id
	};
	$: monthlyQueryString = fromPaginationToQuery(monthlyQuery);
	$: monthlyQueryString, loadMonthlyData();

    onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);

	});

    async function loadMonthlyData() {
		try {
			isLoading = true;
			monthlyOffer = (await axios.get(`/monthly-offer/date?${monthlyQueryString}`)).data.data;
			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
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
		<hr class="title-separator" />
	</ul>

	<h1>Ofertas Coletadas</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>
		<div class="date-picker">
			<select class="month" on:change={(v) => (monthlyQuery.month = Number(v.currentTarget.value))}>
				{#each months as month, index}
					<option value={index + 1}>{month}</option>
				{/each}
			</select>
			<select class="year" on:change={(v) => (monthlyQuery.year = Number(v.currentTarget.value))}>
				<option value="2020">2020</option>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
			</select>
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
					It is a long established fact that a reader will be distracted by the readable content of
					a page when looking at its layout. The point of using Lorem Ipsum is that it has a
					more-or-less normal distribution of letters, as opposed to using 'Content here, content
					here', making it look like readable English. Many desktop publishing packages and web page
					editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
					will uncover many web sites still in their infancy. Various versions have evolved over the
					years, sometimes by accident, sometimes on purpose (injected humour and the like).
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
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
    h1,
	h2 {
		margin: 0 0 0rem;
	}

	h2 {
		font-size: 1.2rem !important;
	}

	.monthly-offers {
		display: flex;
		justify-content: center;
		margin: 2rem 0;
		flex-wrap: wrap;

		.number {
			background-color: red;

			display: flex;
			align-items: center;
			margin-right: 1rem;
			padding: 1rem;

			.icon,
			.value {
				font-size: 5rem;
			}

			&:not(:nth-child(2)) > .icon {
				margin-bottom: -1rem;
			}
		}

		.text {
			flex-basis: 100%;
			p {
				margin: 3rem auto 0rem;
				width: 50%;
			}
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