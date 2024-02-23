import type { LayoutServerLoad } from "./$types";
import { listLoad } from "$utils";
import type { ReportDto } from '$types'

export const load: LayoutServerLoad = async ({ fetch, url, params }) => {
    url.searchParams.set('field', params.id)

    const years = (await listLoad('report/years', fetch, url)).apiData as ReportDto['year'][]
    let year = url.searchParams.get('year') || '0'

    // Validate user input
    if (years.length > 0 && !years.includes(Number(year))){
        url.searchParams.set('year', String(years[0]))
    } else if (years.length <= 0) {
        url.searchParams.set('year', '0')
    }

    return { years }
}
