import type { PageServerLoad } from "./$types";
import { listLoad } from "$utils";
import { DEPENDENCY_URLS } from '$constants'
import type { FieldDto } from '$types'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
    depends(DEPENDENCY_URLS.listLoad)

    const parentData = await parent()
    // see +layout.server.ts for user data validation
    const year = url.searchParams.get('year')

    url.searchParams.set('orderKey', 'month')
    url.searchParams.set('orderValue', 'asc')
    url.searchParams.set('searchSpecificField', 'fieldId,year')
    url.searchParams.set('searchSpecificValue', `${(parentData.apiData as FieldDto).id},${year}`)

    return {
        pageTitle: 'Relatórios',
        field: parentData.apiData,
        years: parentData.years,
        ...await listLoad('report', fetch, url)
    }
}