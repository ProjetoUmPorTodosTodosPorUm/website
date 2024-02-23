import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { ApiResponseDto, AnnouncementDto, TestimonialDto, Pagination } from '$types'
import { easyFetch, fromPaginationToQuery, generateMessages, actionErrorHandler } from '$utils'
import { PUBLIC_API_URL } from '$env/static/public'
import * as yup from 'yup';
import { CONTACT_INPUT_LABELS, SHARED } from "$constants";
import { ApiError } from "$classes/api-error";


export const load: PageServerLoad = async ({ fetch }) => {
    let announcements = [] as AnnouncementDto[]

    const DAYS_BEFORE = 30
    const currentDate = new Date()
    const endDate = currentDate.toISOString()
    currentDate.setDate(currentDate.getDate() - DAYS_BEFORE)
    const fromDate = currentDate.toISOString()

    const announcementsPagination = {
        lte: endDate,
        gte: fromDate
    }
    const announcementsQueryString = fromPaginationToQuery(announcementsPagination)

    const resAnnouncements = await easyFetch(fetch, 
        { url: `${PUBLIC_API_URL}/announcement/range?${announcementsQueryString}`}
    )

    if(resAnnouncements && resAnnouncements.status == 200) {
        const resAnnouncementsJson = await resAnnouncements.json() as ApiResponseDto
        announcements = resAnnouncementsJson.data
    }

    // Testimonials
    let testimonials = [] as TestimonialDto[]
    const testimonialsPagination = {
		itemsPerPage: 20,
		page: 1,
		deleted: false,
		orderKey: 'createdAt',
		orderValue: 'desc'
	} as Pagination;
    const testimonialsQueryString = fromPaginationToQuery(testimonialsPagination)

    const resTestimonials = await easyFetch(fetch, 
        {url: `${PUBLIC_API_URL}/testimonial?${testimonialsQueryString}`}
    )

    if(resTestimonials && resTestimonials.status == 200) {
        const resTestimonialsJson = await resTestimonials.json() as ApiResponseDto
        testimonials = resTestimonialsJson.data
    }

    return {
        announcements,
        testimonials
    }
}

export const actions = {
    contact: async ({ fetch, request }) => {
        const schema = yup.object().shape({
            name: yup.string().required(SHARED.yup.required(CONTACT_INPUT_LABELS.name)),
            email: yup.string().required().email(SHARED.yup.required(CONTACT_INPUT_LABELS.email)),
            message: yup
                .string()
                .required(SHARED.yup.required(CONTACT_INPUT_LABELS.message))
                .min(20, SHARED.yup.minString(CONTACT_INPUT_LABELS.message, 20))
        })

        const data = await request.formData()
        const name = data.get('name')
        const email = data.get('email')
        const message = data.get('message')

        try {
            schema.validateSync({ name, email, message }, {abortEarly: false })

            const res = await easyFetch(fetch, {
                url: `${PUBLIC_API_URL}/contact`,
                method: 'POST',
                body: {
                    name, email, message
                }
            })

            if(res && res.status !== 200) {
                throw new ApiError(await res.json(), res.status)
            }

            return {
                messages: generateMessages([{ message: 'Mensagem enviada! Aguarde o retorno.', variant: 'success' }])
            }
        } catch (error) {
            return actionErrorHandler(error)
        }

    }
} satisfies Actions