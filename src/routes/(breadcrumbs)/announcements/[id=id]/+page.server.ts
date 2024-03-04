import type { PageServerLoad } from './$types'
import type { Actions } from '@sveltejs/kit'
import { getLoad, contactAction } from '$utils'

export const load: PageServerLoad = async ({ fetch, params }) => {
	return await getLoad('announcement', fetch, params)
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
