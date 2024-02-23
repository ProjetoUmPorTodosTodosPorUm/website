<script lang="ts">
	import { Navbar, Landing, HowToParticipate, Faq, AgendaAnnouncement, WhereWeOperate, Testimonial, Footer, MessagesContainer } from '$components'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData
	let isSending = false
	$: messages = form?.messages ?? []
	$: messages, postActionCallback()

	async function postActionCallback() {
		// ignore first loading triggering
		if (isSending && messages.length > 0) {
			isSending = false
		}
	}
</script>

<Navbar />
<Landing />
<HowToParticipate />
<Faq />
<AgendaAnnouncement announcements={data.announcements} />
<WhereWeOperate />
<Testimonial testimonials={data.testimonials} />
<Footer {isSending} />
<MessagesContainer />