import type { PageServerLoad } from './$types'
import { listLoad, contactAction } from '$utils'
import { DEPENDENCY_URLS } from '$constants'
import type { Actions } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, url, depends }) => {
	depends(DEPENDENCY_URLS.listLoad)

	url.searchParams.set('itemsPerPage', '10')
	return {
		searchFieldSubRoute: 'offeror-families',
		...(await listLoad('field', fetch, url))
	}
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
