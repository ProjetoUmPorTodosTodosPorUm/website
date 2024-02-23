import type { LayoutServerLoad } from './$types'
import { listLoad } from '$utils'
import { DEPENDENCY_URLS } from '$constants'

export const load: LayoutServerLoad = async ({ fetch, url, depends}) => {
    depends(DEPENDENCY_URLS.listLoad)

    return await listLoad('field', fetch, url)
}
