<script lang="ts">
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import SearchField from '$lib/components/search-field.svelte';
	import { goto } from '$app/navigation';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'].volunteers;

	export let data: PageData;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'fields');
		setLocale(data.locale);
	});

	function onFieldSelection(id: string) {
		goto(`/${data.locale}/fields/${id}/volunteers`);
	}
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<Breadcrumbs locale={data.locale} />

	<h1>{i18n.title()}</h1>
	<SearchField locale={data.locale} {onFieldSelection} />
</section>
<Footer locale={data.locale} />
