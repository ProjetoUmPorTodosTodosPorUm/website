<script lang="ts">
	import '$lib/scss/routes/fields/collected-offers.scss';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].collectedOffers;

	export let data: PageData;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'fields');
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
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{i18n.title()}</h1>
	<h2>{i18n.subTitle({ designation: data.field.designation })}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="option-container">
		<button class="option" on:click={onMontlyOption}>{i18n.monthlyOption()}</button>
		<button class="option" on:click={onAnnualOption}>{i18n.annualOption()}</button>
	</div>
</section>
<Footer locale={data.locale} />
