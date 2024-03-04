import { easyFetch, generateMessages, actionErrorHandler } from '$utils'
import { PUBLIC_API_URL } from '$env/static/public'
import * as yup from 'yup'
import { CONTACT_INPUT_LABELS, SHARED } from '$constants'
import { ApiError } from '$classes/api-error'

export async function contactAction(svelteKitFetch: typeof fetch, request: Request) {
	const schema = yup.object().shape({
		name: yup.string().required(SHARED.yup.required(CONTACT_INPUT_LABELS.name)),
		email: yup
			.string()
			.required(SHARED.yup.required(CONTACT_INPUT_LABELS.email))
			.email(SHARED.yup.email(CONTACT_INPUT_LABELS.email)),
		message: yup
			.string()
			.required(SHARED.yup.required(CONTACT_INPUT_LABELS.message))
			.min(20, SHARED.yup.minString(CONTACT_INPUT_LABELS.message, 20))
	})

	const data = await request.formData()
	const name = data.get('name')
	const email = data.get('email')
	const message = data.get('message')
	const page = data.get('page')

	try {
		schema.validateSync({ name, email, message }, { abortEarly: false })

		const res = await easyFetch(svelteKitFetch, {
			url: `${PUBLIC_API_URL}/contact`,
			method: 'POST',
			body: {
				name,
				email,
				message
			}
		})

		if (res && res.status !== 201) {
			throw new ApiError(await res.json(), res.status)
		}

		return {
			messages: generateMessages([{ message: 'Mensagem enviada! Aguarde o retorno.', variant: 'success' }])
		}
	} catch (error) {
		return actionErrorHandler(error)
	}
}
