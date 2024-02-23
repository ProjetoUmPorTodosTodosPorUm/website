import type { PageServerLoad } from "./$types"
import { getLoad } from '$utils'

export const load: PageServerLoad = async ({ fetch, params}) => {
  return {
    field: (await getLoad('field', fetch, params)).apiData,
  }
}