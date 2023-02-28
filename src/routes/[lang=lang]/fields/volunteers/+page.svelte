<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import SearchField from '$lib/components/public/search-field.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});

	function onFieldSelection(id: string) {
		goto(`/${data.locale}/fields/${id}/volunteers`);
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
			<a href="/{data.locale}/fields/volunteers"
				>{$LL.breadcrumbs.home.fields.volunteers.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Voluntários</h1>
	<SearchField locale={data.locale} {onFieldSelection} />
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	h1 {
		margin: 0 0 1rem;
	}
</style>
