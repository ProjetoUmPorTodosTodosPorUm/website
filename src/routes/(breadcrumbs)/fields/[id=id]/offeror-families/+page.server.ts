import type { PageServerLoad } from './$types'
import { listLoad, contactAction } from '$utils'
import { DEPENDENCY_URLS } from '$constants'
import type { FieldDto } from '$types'
import type { Actions } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
	depends(DEPENDENCY_URLS.listLoad)

	const parentData = await parent()

	url.searchParams.set('itemsPerPage', '10')
	url.searchParams.set('orderKey', 'representative')
	url.searchParams.set('orderValue', 'asc')
	url.searchParams.set('searchSpecificField', 'fieldId')
	url.searchParams.set('searchSpecificValue', (parentData.apiData as FieldDto).id)

	return {
		pageTitle: 'Famílias Ofertantes',
		field: parentData.apiData,
		...(await listLoad('offeror-family', fetch, url))
	}
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	}
} satisfies Actions
