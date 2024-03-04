import type { PageServerLoad } from './$types'
import type { Actions } from '@sveltejs/kit'
import { contactAction } from '$utils'

export const load: PageServerLoad = async () => {
	return {
		searchFieldSubRoute: 'reports'
	}
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
