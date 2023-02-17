import type { BaseTranslation } from '../../i18n-types'
import meetTheAuthor from './about-us/meet-the-author'
import talkingAbout from './about-us/talking-about-the-project';
import services from './about-us/services';

const en_routes = {
    aboutUs: {
        meetTheAuthor,
        talkingAbout,
        services
    },
} as BaseTranslation

export default en_routes;