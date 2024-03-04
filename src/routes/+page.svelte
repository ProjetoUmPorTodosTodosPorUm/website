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

<Navbar announcementsCount={data.announcements.length} />
<Landing />
<Values />
<HowToParticipate bind:isSendingParticipate />
<Faq />
<AgendaAnnouncement announcements={data.announcements} />
<Testimonial testimonials={data.testimonials} />
