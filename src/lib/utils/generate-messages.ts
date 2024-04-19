import type { Message } from '../types'

type generateMessagesOptions = {
	id?: number
	message: string
	variant?: 'danger' | 'success' | 'info'
	silent?: boolean
	duration?: number
}

export function generateMessages(messages: generateMessagesOptions[]) {
	return messages.map(
		(msg) =>
			({
				id: msg.id ?? Math.floor(Math.random() * Date.now()),
				message: msg.message,
				variant: msg.variant ?? 'danger',
				silent: msg.silent ?? false,
				duration: msg.duration ?? 5 * 1000 // default value from toast.svelte
			} as Message)
	)
}
