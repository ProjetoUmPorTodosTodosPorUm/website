<script lang="ts">
	import '$scss/components/agenda-announcement.scss'
	import { Agenda, Announcement } from '$components'
	import type { AnnouncementDto } from '$types'

	export let announcements: AnnouncementDto[]
</script>

<section id="agenda-announcement">
	<div id="agenda" class="container">
		<h1>Agenda</h1>
		<Agenda />
	</div>

	<div id="announcements" class="container">
		<h1>Avisos</h1>
		<Announcement {announcements} />
	</div>
</section>
