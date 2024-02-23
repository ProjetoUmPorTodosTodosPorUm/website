import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        searchFieldSubRoute: 'churches-in-unity'
    }
}