import type { PageServerLoad } from "./$types";
import { listLoad } from "$utils";
import { DEPENDENCY_URLS } from '$constants'
import type { FieldDto, PeriodDto } from '$types'

export const load: PageServerLoad = async ({ fetch, url, depends, parent }) => {
    depends(DEPENDENCY_URLS.listLoad)

    const parentData = await parent()
    const period = parentData.period as PeriodDto
    const years = Object.keys(period)
    let year = url.searchParams.get('year') || '0'

    // Validate user input
    if (years.length > 0 && !years.includes(year)){
        url.searchParams.set('year', years[0])
        year = years[0]
    } else if (years.length <= 0) {
        url.searchParams.set('year', '0')
    }

    let months = years.length > 0 && year != '0' ? period[year] : []
    let month = url.searchParams.get('month') || '0'
    if (years.length > 0 && months.length > 0 && !months.includes(month)) {
        url.searchParams.set('month', months[0])
    } else if (years.length <= 0) {
        url.searchParams.set('month', '0')
    }

    url.searchParams.set('orderKey', 'month')
    url.searchParams.set('orderValue', 'asc')
    url.searchParams.set('searchSpecificField', 'fieldId,year,month')
    url.searchParams.set('searchSpecificValue', `${(parentData.apiData as FieldDto).id},${year},${month}`)

    return {
        years,
        months,
        ...await listLoad('monthly-offer', fetch, url)
    }
}