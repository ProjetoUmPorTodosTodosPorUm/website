<script lang="ts">
	import '$scss/components/agenda.scss';
	import { Modal } from '$components';
	import type { AgendaDto, ApiResponseDto } from '$types';
	import { easyFetch, fromPaginationToQuery } from '$utils'
	import { PUBLIC_API_URL } from '$env/static/public'
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';

	// https://github.com/vkurko/calendar
	let calendar: any;

	let events: AgendaDto[] = [];
	let plugins = [DayGrid];
	let options = {
		locale: 'pt-BR',
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

					const res = await easyFetch(fetch, { url: `${PUBLIC_API_URL}/agenda/range?${queryString}`})
					
					if(res && res.status !== 200 || !res) {
						return []
					} else {
						const resJson = await res.json() as ApiResponseDto
						events = resJson.data

						return resJson.data.length > 0
							? resJson.data.map((event: AgendaDto) => ({
								id: event.id,
								allDay: true,
								title: event.title,
								start: new Date(event.date),
								end: new Date(event.date)
							}))
							: []
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
