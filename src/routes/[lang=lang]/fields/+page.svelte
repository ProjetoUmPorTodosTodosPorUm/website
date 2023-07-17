<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import SearchField from '$lib/components/search-field.svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['fields'];

	export let data: PageData;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'fields');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<Breadcrumbs locale={data.locale} />

	<h1>{i18n.title()}</h1>

	<SearchField locale={data.locale} />
</section>
<Footer locale={data.locale} namespaces={['search-field']}/>
