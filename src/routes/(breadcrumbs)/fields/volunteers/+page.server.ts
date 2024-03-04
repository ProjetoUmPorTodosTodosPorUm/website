import type { PageServerLoad } from './$types'
import type { Actions } from '@sveltejs/kit'
import { contactAction } from '$utils'

export const load: PageServerLoad = async () => {
	return {
		searchFieldSubRoute: 'volunteers'
	}
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
