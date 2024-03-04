import type { LayoutServerLoad } from './$types'
import { getLoad } from '$utils'

export const load: LayoutServerLoad = async ({ fetch, params }) => {
	return await getLoad('field', fetch, params)
}
