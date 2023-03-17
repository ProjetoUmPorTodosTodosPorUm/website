import type { NamespaceRoutesTranslation } from '../../i18n-types'
import meetTheAuthor from './about-us/meet-the-author'
import talkingAbout from './about-us/talking-about-the-project'
import services from './about-us/services'

const pt_BR_routes = {
	aboutUs: {
		meetTheAuthor,
		talkingAbout,
		services
	}

} satisfies NamespaceRoutesTranslation

export default pt_BR_routes
