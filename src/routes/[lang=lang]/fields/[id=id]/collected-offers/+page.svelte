<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});

	async function onMontlyOption() {
		await goto(`/${data.locale}/fields/${data.field.id}/collected-offers/monthly`);
	}

	async function onAnnualOption() {
		await goto(`/${data.locale}/fields/${data.field.id}/collected-offers/annual`);
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
		<hr class="title-separator" />
	</ul>

	<h1>Ofertas Coletadas</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="option-container">
		<button class="option" on:click={onMontlyOption}>Mensal</button>
		<button class="option" on:click={onAnnualOption}>Anual</button>
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

	.option-container {
		display: flex;
		justify-content: center;
		align-items: center;

		.option {
			height: 2.5rem;
			margin-right: 0.5rem;
		}
	}
</style>
