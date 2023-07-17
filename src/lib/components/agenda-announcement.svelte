<script lang="ts">
	import '$scss/components/agenda-announcement.scss';
	import Agenda from './agenda.svelte';
	import Announcement from './announcement.svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	$: i18n = $LL['agenda-announcement'];

	export let locale: Locales;

	onMount(async () => {
		await loadNamespaceAsync(locale, 'agenda-announcement');
		setLocale(locale);
	});
</script>

<section id="agenda-announcement">
	<div class="container">
		<h1>{i18n.agenda.title()}</h1>
		<Agenda {locale} />
	</div>

	<div class="container">
		<h1>{i18n.announcement.title()}</h1>
		<Announcement />
	</div>
</section>
