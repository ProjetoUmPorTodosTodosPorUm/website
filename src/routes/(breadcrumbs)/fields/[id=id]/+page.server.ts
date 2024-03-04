import type { PageServerLoad } from './$types'
import { getLoad, contactAction } from '$utils'
import type { Actions } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, params }) => {
	return {
		field: (await getLoad('field', fetch, params)).apiData
	}
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
