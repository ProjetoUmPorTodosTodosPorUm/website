import type { NamespaceComponentsTranslation } from '../../i18n-types'
import navbar from './public/navbar'
import landing from './public/landing'
import howToParticipate from './public/how-to-participate'
import faq from './public/faq'
import agendaAnnouncement from './public/agenda-announcement'
import footer from './public/footer'

const pt_BR_components = {
	public: {
		navbar,
		landing,
		howToParticipate,
		faq,
		agendaAnnouncement,
		footer,
	}
} satisfies NamespaceComponentsTranslation

export default pt_BR_components
