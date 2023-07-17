<script lang="ts">
	import '$lib/scss/components/breadcrumbs.scss';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import type { Navigation } from '@sveltejs/kit';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import type { FieldDto } from '$lib/types';
	$: i18n = $LL['breadcrumbs'];

	export let locale: Locales;
	export let field: FieldDto | null = null;

	let routeIdLevels: number;
	let routeLevelTwo: string;
	let selectFieldPage: string;
	let specificFieldRoute: string;
	let collectedOffersOption: string;

	onMount(async () => {
		await loadNamespaceAsync(locale, 'breadcrumbs');
		setLocale(locale);
	});

	afterNavigate(async (navigation: Navigation) => {
		const routeId = navigation.to?.route.id;
		// -2 discounts '' & '[lang=lang]' items from routeId array
		routeIdLevels = (routeId?.split('/').length || 0) - 2;
		routeLevelTwo = routeId?.split('/')[2] || '';

		// field page, may or not be seeing detailed info
		if (routeIdLevels >= 2) {
			selectFieldPage = routeId?.split('/')[3] || '';
			specificFieldRoute = routeId?.split('/')[4] || '';
			collectedOffersOption = routeId?.split('/')[5] || '';
		}
	});
</script>

<ul class="breadcrumb">
	<li><a href="/{locale}/">{i18n.home.text()}</a></li>
	<li><a href="/{locale}/{routeLevelTwo}">{i18n[routeLevelTwo].text()}</a></li>
	{#if routeIdLevels >= 2}
		{#if field}
			<li><a href="/{locale}/{routeLevelTwo}/{field?.id}">{field?.designation}</a></li>
		{:else}
			<li><a href="/{locale}/{routeLevelTwo}/{selectFieldPage}">{i18n[routeLevelTwo][selectFieldPage].text()}</a></li>
		{/if}

		{#if specificFieldRoute}
			<li>
				<a href="/{locale}/{routeLevelTwo}/{field?.id}/{specificFieldRoute}"
					>{i18n[routeLevelTwo][specificFieldRoute].text()}</a
				>
			</li>
		{/if}

		{#if collectedOffersOption}
			<li>
				<a
					href="/{locale}/{routeLevelTwo}/{field?.id}/{specificFieldRoute}/{collectedOffersOption}"
				>
					{i18n[routeLevelTwo][specificFieldRoute][collectedOffersOption].text()}
				</a>
			</li>
		{/if}
	{/if}
</ul>
