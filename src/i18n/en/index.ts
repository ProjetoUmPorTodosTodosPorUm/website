import type { BaseTranslation } from '../i18n-types'
import breadcrumbs from './breadcrumbs'

const en = {
	yup: {
		messages: {
			email: 'Email must be a valid email',
			confirmPassword: 'Passwords must be the same',
			tokenMatch: 'Only alphanumeric digits are valid'
		},
		templates: {
			REQUIRED: '{0} it is a mandatory field.',
			ONE_OF: 'You must choose one of the values: {0}.',
			MIN: '{0} must have at least {1} characters.'
		}
	},
	breadcrumbs,
} satisfies BaseTranslation

export default en
