<script lang="ts">
	import '$scss/components/messages-container.scss'
	import { page } from '$app/stores'
	import { Toast } from '$components'
	import type { Message } from '$types'

	$: base_messages = ($page.form?.messages as Message[]) ?? []
	let messages: Message[] = []

	const delay_period = 100 // in ms
	let accumulated_period = 0

	$: base_messages, delayed()

	function delayed() {
		base_messages.forEach((msg) => {
			messages.push({
				...msg,
				delay: accumulated_period
			})
			accumulated_period += delay_period
		})
		messages = [...messages]
	}
</script>

<div class="messages-container">
	{#each messages as message (message.id)}
		<Toast {...message} />
	{/each}
</div>
