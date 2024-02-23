import type { PageServerLoad } from "./$types";
import { listLoad } from "$utils";
import { DEPENDENCY_URLS } from '$constants'
import type { FieldDto } from '$types'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
    depends(DEPENDENCY_URLS.listLoad)

    const parentData = await parent()

    url.searchParams.set('itemsPerPage', '100')
    url.searchParams.set('searchSpecificField', 'fieldId')
    url.searchParams.set('searchSpecificValue', (parentData.apiData as FieldDto).id)

    return {
        pageTitle: 'Colaboradores',
        field: parentData.apiData,
        ...await listLoad('collaborator', fetch, url)
    }
}