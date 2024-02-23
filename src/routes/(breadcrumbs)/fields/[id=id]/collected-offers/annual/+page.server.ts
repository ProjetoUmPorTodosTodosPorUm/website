import type { PageServerLoad } from "./$types";
import { listLoad } from "$utils";
import { DEPENDENCY_URLS } from '$constants'
import type { FieldDto, PeriodDto } from '$types'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
    depends(DEPENDENCY_URLS.listLoad)

    const parentData = await parent()
    const years = Object.keys((parentData.period as PeriodDto))
    let year = url.searchParams.get('year') || '0'

    // Validate user input
    if (years.length > 0 && !years.includes(year)){
        url.searchParams.set('year', years[0])
    } else if (years.length <= 0) {
        url.searchParams.set('year', '0')
    }

    url.searchParams.set('orderKey', 'month')
    url.searchParams.set('orderValue', 'asc')
    url.searchParams.set('searchSpecificField', 'fieldId,year')
    url.searchParams.set('searchSpecificValue', `${(parentData.apiData as FieldDto).id},${year}`)

    return {
        ...await listLoad('monthly-offer', fetch, url)
    }
}