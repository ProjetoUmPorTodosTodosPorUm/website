type easyFetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type easyFetchOptions = {
	url: RequestInfo
	method?: easyFetchMethod
	headers?: HeadersInit
	body?: any
	isJson?: boolean
}

// Only Server Side
export async function easyFetch(svelteKitFetch: typeof fetch, options: easyFetchOptions) {
	// Seting defaults if empty
	options.method = options.method ?? 'GET'
	options.isJson = options.isJson ?? true

	const fetchOptions: Omit<easyFetchOptions, 'url'> = {
		method: options.method,
		headers: {
			Accept: 'application/json',
			...options.headers
		}
	}

	if (['POST', 'PUT', 'DELETE'].includes(options.method)) {
		if (options.body) {
			if (options.isJson) {
				fetchOptions.headers = {
					...fetchOptions.headers,
					'Content-Type': 'application/json'
				}
				fetchOptions.body = JSON.stringify(options.body)
			} else {
				fetchOptions.headers = {
					...fetchOptions.headers
				}
				fetchOptions.body = options.body
			}
		}
	}

	return await svelteKitFetch(options.url, fetchOptions)
}
