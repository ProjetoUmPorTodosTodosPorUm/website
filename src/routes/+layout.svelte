<script lang="ts">
	import '$scss/global.scss'
	import { Footer, MessagesContainer } from '$components'
	import { page } from '$app/stores'

	let isSendingContact = false
	$: messages = $page.form?.messages ?? []
	$: messages, postActionCallback()

	function postActionCallback() {
		// ignore first loading triggering
		if (isSendingContact && messages.length > 0) {
			isSendingContact = false
		}
	}
</script>

<slot />
<Footer bind:isSendingContact />
<MessagesContainer />
