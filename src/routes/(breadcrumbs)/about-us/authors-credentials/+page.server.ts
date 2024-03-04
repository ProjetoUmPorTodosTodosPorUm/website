import type { Actions } from '@sveltejs/kit'
import { contactAction } from '$utils'

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
