<script lang="ts">
	import '$scss/global.scss'
	import { Footer, MessagesContainer } from '$components'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let isSendingContact = false
	$: messages = $page.form?.messages ?? []
	$: messages, postActionCallback()

	function postActionCallback() {
		// ignore first loading triggering
		if (isSendingContact && messages.length > 0) {
			isSendingContact = false
		}
	}

	onMount(() => {
		// https://github.com/sveltejs/kit/issues/2664
		// TODO: this shouldn't be necessary
		const id = decodeURI(window.location.hash).replace(/^#/, '')
		const element = id && document.getElementById(id)
		if (id && element) {
			element.scrollIntoView()
		}
	})
</script>

<slot />
<Footer bind:isSendingContact />
<MessagesContainer />
