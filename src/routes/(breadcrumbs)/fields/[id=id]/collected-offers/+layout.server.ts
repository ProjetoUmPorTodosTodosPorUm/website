import type { LayoutServerLoad } from '../$types'
import { getLoad, listLoad } from '$utils'

export const load: LayoutServerLoad = async ({ fetch, url, params }) => {
	url.searchParams.set('field', params.id)

	return {
		pageTitle: 'Ofertas Coletadas',
		field: (await getLoad('field', fetch, params)).apiData,
		period: (await listLoad('monthly-offer/period', fetch, url)).apiData
	}
}
