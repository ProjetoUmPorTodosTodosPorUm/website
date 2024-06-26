export type Message = {
	id: number
	message: string
	variant: 'danger' | 'success' | 'info'
	silent?: boolean
	duration: number
	delay?: number
}
