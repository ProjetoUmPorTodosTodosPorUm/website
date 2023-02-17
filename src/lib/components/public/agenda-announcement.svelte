<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/agenda-announcement.scss';

	// @ts-ignore
	import Calendar from '@event-calendar/core';
	// @ts-ignore
	import DayGrid from '@event-calendar/day-grid';
	import { onMount } from 'svelte';
	import type { Locale } from 'typesafe-i18n/types/runtime/src/core.mjs';

	export let locale: Locale;

	let plugins = [DayGrid];
	let options = {
		locale,
		height: '90%',
		view: 'dayGridMonth',
		events: [{ id: 'mene', allDay: true, title: 'ROLANDL' }],
		eventClick: (info: any) => {
			const event = info.event;
			//@TODO usar o modal para mostrar as informações completas do evento
			console.log(event);
		}
	};
</script>

<section id="agenda-announcement">
	<div class="container">
		<h1>{$LL.components.public.agendaAnnouncement.agendaTitle()}</h1>
		<Calendar {plugins} {options} />
	</div>

	<div class="container">
		<h1>{$LL.components.public.agendaAnnouncement.announcementTitle()}</h1>

		<div class="announcements">
			<div class="announcement">
				<h2 class="title">Título</h2>
				<!-- Usar @html do svelte -->
				<p class="text">
					Estamos com site novo! O projeto agora entra em numa nova fase, documentação disponível
					para aqueles que quiserem ser pioneiros nessa obra evangelística.
				</p>
				<div class="info">
					<p>Anexos: <a href="/static/arquivo.pdf" target="_blank">Arquivo.pdf</a></p>
					<p>{new Date().toLocaleDateString()} | Fixado</p>
				</div>
			</div>

			<div class="announcement">
				<h2 class="title">Título 2</h2>
				<p class="text">
					Estamos com site novo! O projeto agora entra em numa nova fase, documentação disponível
					para aqueles que quiserem ser pioneiros nessa obra evangelística.
				</p>
				<div class="info">
					<p>{new Date().toLocaleDateString()}</p>
				</div>
			</div>

			<div class="announcement">
				<h2 class="title">Lorem</h2>
				<p class="text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium eget eros eget
					congue. Aenean a placerat ante. Aliquam eu mi vel tortor ultricies porttitor. Morbi
					vehicula turpis libero, et feugiat magna lacinia a. Phasellus sed aliquam ante. Etiam
					condimentum aliquet eros, eu cursus sapien suscipit ac. Nam rhoncus libero sed nisi
					auctor, non ultricies augue ullamcorper. Nulla facilisi. Morbi maximus lacus id dolor
					porta finibus. Morbi varius dolor et erat feugiat, et posuere massa scelerisque. Phasellus
					et ante id ante facilisis dignissim et at velit. Vivamus interdum diam sed sem ornare
					sagittis. Suspendisse potenti.
				</p>
				<div class="info">
					<p>{new Date().toLocaleDateString()}</p>
				</div>
			</div>
		</div>
	</div>
</section>
