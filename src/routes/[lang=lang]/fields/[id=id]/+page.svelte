<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});
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
		
	</ul>

	<h1>{data.field.designation}</h1>
	<h2>{data.field.country} - {data.field.state}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<ul class="simple-ulist">
		<li>Páginas</li>
		<li><a href="/{data.locale}/fields/{data.field.id}/collaborators">Colaboradores</a></li>
		<li><a href="/{data.locale}/fields/{data.field.id}/welcomed-families">Famílias Acolhidas</a></li>
		<li><a href="/{data.locale}/fields/{data.field.id}/offeror-families">Famílias Ofertantes</a></li>
		<li><a href="/{data.locale}/fields/{data.field.id}/churches-in-unity">Igrejas Em unidade</a></li>
		<li><a href="/{data.locale}/fields/{data.field.id}/collected-offers">Ofertas Coletadas</a></li>
		<li><a href="/{data.locale}/fields/{data.field.id}/reports">Relatórios</a></li>
		<li><a href="/{data.locale}/fields/{data.field.id}/volunteers">Voluntários</a></li>
	</ul>
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
</style>
