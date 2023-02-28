<script lang="ts">
	import '$lib/scss/components/public/agenda.scss';
	import type { AgendaDto } from '$lib/types';
	import { fromPaginationToQuery } from '$lib/utils/functions';
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import Modal from './modal.svelte';
	import axios from '$lib/axios';
	import Axios from 'axios';

	export let locale: Locales;

	// https://github.com/vkurko/calendar
	let calendar: any;

	let isLoading = false;
	let events: AgendaDto[] = [];
	let plugins = [DayGrid];
	let options = {
		locale,
		height: '90%',
		view: 'dayGridMonth',
		events: [],
		eventSources: [
			{
				events: async (fetchInfo: any, successCallback: any, failureCallback: any) => {
					const queryString = fromPaginationToQuery({
						lte: fetchInfo.endStr,
						gte: fetchInfo.startStr
					});

					try {
						isLoading = true;
						events = (await axios.get(`/agenda/range?${queryString}`)).data.data;
						isLoading = false;

						return events.length > 0
							? events.map((e) => ({
									id: e.id,
									allDay: true,
									title: e.title,
									start: new Date(e.date),
									end: new Date(e.date)
							  }))
							: [];
					} catch (error) {
						isLoading = false;

						if (error instanceof Axios.AxiosError) {
							console.warn(error);
						}
						console.warn(error);

						return [];
					}
				}
			}
		],
		eventContent: (info: any) => {
			const event = info.event;
			return { html: `<div class="ec-event-title" title="${event.title}">${event.title}</div>` };
		},
		eventClick: onEventClick
	};

	let showModal = false;
	let currentEvent = {
		title: '',
		message: '',
		date: new Date()
	} as AgendaDto;

	function onEventClick(info: any) {
		const event = info.event;
		currentEvent = events.filter((e) => e.id === event.id)[0];
		showModal = true;
	}
</script>

<Calendar bind:this={calendar} {plugins} {options} />
<Modal show={showModal} on:close={() => (showModal = false)}>
	<h3>{currentEvent.title}</h3>
	<p>{new Date(currentEvent.date).toLocaleDateString()}</p>

	<p>{currentEvent.message}</p>

	{#if currentEvent.attachments?.length > 0}
		<ul class="simple-ulist">
			<li>Anexos</li>
			{#each currentEvent.attachments as attachment}
				<li>
					<a href={`/static/${{ attachment }}`} target="_blank" rel="noreferrer">{attachment}</a>
				</li>
			{/each}
		</ul>
	{/if}
</Modal>
