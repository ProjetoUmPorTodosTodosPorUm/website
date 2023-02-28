<script lang="ts">
	import '$lib/scss/components/public/agenda-announcement.scss';
	import LL from '$i18n/i18n-svelte';
	import Agenda from './agenda.svelte';
	import Announcement from './announcement.svelte';

	export let locale: Locales;
</script>

<section id="agenda-announcement">
	<div class="container">
		<h1>{$LL.components.public.agendaAnnouncement.agendaTitle()}</h1>
		<Agenda {locale} />
	</div>

	<div class="container">
		<h1>{$LL.components.public.agendaAnnouncement.announcementTitle()}</h1>
		<Announcement />
	</div>
</section>
