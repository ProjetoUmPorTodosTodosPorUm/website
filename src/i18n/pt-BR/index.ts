import type { Translation } from '../i18n-types'

import breadcrumbs from './breadcrumbs'

const pt_BR = {
	yup: {
		messages: {
			email: 'Email deve ser um email válido',
			confirmPassword: 'As senhas devem ser iguais',
			tokenMatch: 'Apenas dígitos alfanuméricos são válidos'
		},
		templates: {
			REQUIRED: '{0} é um campo obrigatório.',
			ONE_OF: 'Você deve escoher um dentre os valores: {0}.',
			MIN: '{0} deve ter no mínimo {1} caracteres.'
		}
	},
	breadcrumbs,
} satisfies Translation

export default pt_BR
