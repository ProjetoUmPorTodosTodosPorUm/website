import type { Handle, HandleFetch } from '@sveltejs/kit'
import { PUBLIC_API_URL } from '$env/static/public'

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.match(PUBLIC_API_URL)) {
		// See package.json script.dev for MODE
		// See API's docker-compose.yml for api's container_name
		//const MODE = import.meta.env.MODE
		let localApiURL = 'http://localhost:3000'

		/*if (MODE == 'preview') {
			localApiURL = 'http://preview-api:3000'
		} else if (MODE == 'production') {
			localApiURL = 'https://api:3000'
		}*/

		// clone the original request, but change the URL
		request = new Request(request.url.replace(PUBLIC_API_URL, localApiURL), request)
	}
	return fetch(request)
}