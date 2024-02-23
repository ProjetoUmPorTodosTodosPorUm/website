import type { PageServerLoad } from "./$types";
import { listLoad } from '$utils'
import { DEPENDENCY_URLS } from '$constants'

export const load: PageServerLoad = async ({ fetch, url, depends }) => {
    depends(DEPENDENCY_URLS.listLoad)

    return {
        searchFieldSubRoute: 'offeror-families',
        ...await listLoad('field', fetch, url)
    }
}