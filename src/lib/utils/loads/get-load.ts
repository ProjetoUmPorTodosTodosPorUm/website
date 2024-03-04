import type { ApiResponseDto } from '$types'
import { generateMessages, easyFetch } from '$utils'
import { PUBLIC_API_URL } from '$env/static/public'

// Only Server Side
export async function getLoad(apiPathname: RequestInfo, svelteKitFetch: typeof fetch, params: any) {
	const res = await easyFetch(svelteKitFetch, {
		url: `${PUBLIC_API_URL}/${apiPathname}/${params.id}`
	})

	if (res && res.status !== 200) {
		return {
			apiData: {},
			messages: generateMessages([{ message: ((await res.json()) as ApiResponseDto).message }])
		}
	} else if (res) {
		let resJson = (await res.json()) as ApiResponseDto
		return {
			apiData: resJson.data,
			messages: generateMessages([{ message: resJson.message, variant: 'success', silent: true }])
		}
	}

	// fail safe
	return {
		apiData: {},
		messages: []
	}
}
