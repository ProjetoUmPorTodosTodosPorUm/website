import type { PageServerLoad } from './$types'
import { listLoad } from '$utils'
import { DEPENDENCY_URLS } from '$constants'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
    depends(DEPENDENCY_URLS.listLoad)

    url.searchParams.set('orderKey', 'representative')
    url.searchParams.set('orderValue', 'asc')

    return await listLoad('offeror-family', fetch, url)
}
