import { response } from 'super-sitemap'
import type { RequestHandler } from '@sveltejs/kit'
import { WEBSITE_URL } from '$constants'

export const GET: RequestHandler = async () => {
    return await response({
        origin: WEBSITE_URL,
        // remove any page with slug for now
        excludePatterns: [
            '.*\\[id=id\\].*'
        ],
        changefreq: 'daily', // excluded by default b/c ignored by modern search engines
        priority: 0.7,
    });
};