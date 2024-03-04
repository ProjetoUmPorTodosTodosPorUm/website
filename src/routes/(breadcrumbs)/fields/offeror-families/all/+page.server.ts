import type { PageServerLoad } from './$types'
import { listLoad, contactAction } from '$utils'
import { DEPENDENCY_URLS } from '$constants'
import type { Actions } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
	depends(DEPENDENCY_URLS.listLoad)

	url.searchParams.set('itemsPerPage', '10')
	url.searchParams.set('orderKey', 'representative')
	url.searchParams.set('orderValue', 'asc')

	return await listLoad('offeror-family', fetch, url)
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
