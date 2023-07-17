<script lang="ts">
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';

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
	<Breadcrumbs locale={data.locale} field={data.field} />

	<h1>{data.field.designation}</h1>
	<h2>{data.field.country} - {data.field.state}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<h3>{i18n.pages()}</h3>
	<ul class="pages">
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/collaborators">{i18n.collaborators.title()}</a>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/welcomed-families"
				>{i18n.welcomedFamilies.title()}</a
			>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/offeror-families"
				>{i18n.offerorFamilies.title()}</a
			>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/churches-in-unity"
				>{i18n.churchesInUnity.title()}</a
			>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/collected-offers"
				>{i18n.collectedOffers.title()}</a
			>
		</li>
		<li><a href="/{data.locale}/fields/{data.field.id}/reports">{i18n.reports.title()}</a></li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/volunteers">{i18n.volunteers.title()}</a>
		</li>
	</ul>
</section>
<Footer locale={data.locale} />

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

	h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	ul.pages {
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			margin-bottom: 0.2rem;
			a {
				color: var(--font-color);

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	#main {
		min-height: 300px;

		@include for-xl-devices {
			min-height: 60vh;
		}
	}
</style>
