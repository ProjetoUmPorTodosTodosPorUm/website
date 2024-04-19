<script lang="ts">
	import '$scss/components/messages-container.scss'
	import { page } from '$app/stores'
	import { Toast } from '$components'
	import type { Message } from '$types'
	import { generateMessages } from '../utils'
	import { afterNavigate } from '$app/navigation'

	$: base_messages = ($page.form?.messages as Message[]) ?? []
	let messages: Message[] = []

	const delay_period = 100 // in ms
	let accumulated_period = 0

	$: base_messages, delayed()

	function delayed() {
		base_messages.forEach((msg) => {
			messages.push({
				...msg,
				delay: accumulated_period,
				duration:  msg.duration + accumulated_period
			})
			accumulated_period += delay_period
		})
		messages = [...messages]
	}

	// remove this code when real data comes in
	afterNavigate(() => {
		const nilUUID = '00000000-0000-0000-0000-000000000000'
		const fictitiousDataAlertMessage = generateMessages([
			{
				id: 0,
				message: 'Os dados deste campo missionário são fictícios e apenas para demonstração',
				variant: 'info',
				duration: 60 * 60 * 1000 // 1 hour in ms
			}
		])

		const isFictitiousDataPage = $page.params?.id ? $page.params?.id == nilUUID : false
		if (isFictitiousDataPage && !messages.some((msg) => msg.id == 0)) {
			messages = [...messages, ...fictitiousDataAlertMessage]
		} else if (!isFictitiousDataPage) {
			messages = []
		}
	})
</script>

<div class="messages-container">
	{#each messages as message (message.id)}
		<Toast {...message} />
	{/each}
</div>
