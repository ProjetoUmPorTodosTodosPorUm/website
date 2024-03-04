import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { ApiResponseDto, AnnouncementDto, TestimonialDto, Pagination } from '$types'
import { easyFetch, fromPaginationToQuery, contactAction } from '$utils'
import { PUBLIC_API_URL } from '$env/static/public'

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

	const resAnnouncements = await easyFetch(fetch, {
		url: `${PUBLIC_API_URL}/announcement/range?${announcementsQueryString}`
	})

	if (resAnnouncements && resAnnouncements.status == 200) {
		const resAnnouncementsJson = (await resAnnouncements.json()) as ApiResponseDto
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
	} as Pagination
	const testimonialsQueryString = fromPaginationToQuery(testimonialsPagination)

	const resTestimonials = await easyFetch(fetch, {
		url: `${PUBLIC_API_URL}/testimonial?${testimonialsQueryString}`
	})

	if (resTestimonials && resTestimonials.status == 200) {
		const resTestimonialsJson = (await resTestimonials.json()) as ApiResponseDto
		testimonials = resTestimonialsJson.data
	}

	return {
		announcements,
		testimonials
	}
}

export const actions = {
	contact: async ({ fetch, request }) => {
		return await contactAction(fetch, request)
	},

	contactParticipate: async ({ fetch, request }) => {
		const data = await request.formData()
		const name = data.get('name') || ''
		const email = data.get('email') || ''

		const newFormData = new FormData()
		newFormData.append('name', name)
		newFormData.append('email', email)
		newFormData.append('message', 'Quero participar do Projeto!')

		request = new Request(request.url, {
			...request,
			body: newFormData,
			method: 'POST'
		})
		return await contactAction(fetch, request)
	}
} satisfies Actions
