<script lang="ts">
	import { Navbar, Landing, Values, HowToParticipate, Faq, AgendaAnnouncement, Testimonial } from '$components'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData
	let isSendingParticipate = false
	$: messages = form?.messages ?? []
	$: messages, postActionCallback()

	function postActionCallback() {
		// ignore first loading triggering
		if (isSendingParticipate && messages.length > 0) {
			isSendingParticipate = false
		}
	}
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um"</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot;" />
	<meta name="description"
		content="Website oficial do projeto &quot;Um Por Todos! Todos Por Um&quot;. Saiba como funciona esta nova ferramenta missionária e como participar." />
	<meta name="keywords" content="projeto, institucional, evangelho, ferramenta missionária, unidade e união">
</svelte:head>

<Navbar announcementsCount={data.announcements.length} />
<Landing />
<Values />
<HowToParticipate bind:isSendingParticipate />
<Faq />
<AgendaAnnouncement announcements={data.announcements} />
<Testimonial testimonials={data.testimonials} />
