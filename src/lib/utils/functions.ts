import type { Occupation } from "$lib/enums";
import type { Pagination, VolunteerDto } from "$lib/types";

export function delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export function saveToLocalStorage(key: string, data: any) {
    if (data !== null) {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        localStorage.removeItem(key);
    }
}

export function getFromLocalStorage(key: string, stringify = true) {
    const data = localStorage.getItem(key)
    if (data && data.length && stringify) {
        return JSON.parse(data);
    } else if (data && data.length) {
        return data;
    } else {
        return '';
    }
}

// Replaces the locale slug in a URL.
//
// If the `full` argument is set to `true`, the full URL is returned as a string.
// e.g. https://mywebsite.com/en/blog/article-1 => https://mywebsite.com/de/blog/article-1
//
// Otherwise (default) the URL relative to the base is returned.
// e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
    const [, , ...rest] = url.pathname.split('/')
    const new_pathname = `/${[locale, ...rest].join('/')}`
    if (!full) {
        return `${new_pathname}${url.search}`
    }
    const newUrl = new URL(url.toString())
    newUrl.pathname = new_pathname
    return newUrl.toString()
}

// Actually from object to query
export function fromPaginationToQuery(pagination: any) {
    const urlSearchParams = new URLSearchParams();
    for (const key of Object.keys(pagination)) {
        if (pagination[key]) {
            urlSearchParams.set(key, pagination[key]);
        }
    }
    return urlSearchParams.toString();
}

export function getDays(year: number, month: number) {
    return new Date(year, month, 0).getDate()
}

// based on simple bubble sort
export function sortVolunteersByOccupations(volunteers: VolunteerDto[], occupations: Occupation[]) {
    let swapped = false;

    for (var i = 0; i <= volunteers.length - 1; i++) {
        swapped = false;
        for (var j = 0; j < (volunteers.length - i - 1); j++) {
            let currOccIndex = occupations.indexOf(volunteers[j].occupation);
            let lastOccIndex = occupations.indexOf(volunteers[j + 1].occupation);
            if (currOccIndex > lastOccIndex) {
                // Swap them if the condition is true 
                var temp = volunteers[j]
                volunteers[j] = volunteers[j + 1]
                volunteers[j + 1] = temp
                swapped = true;
            }
        }

        if (!swapped) {
            return volunteers;
        }
    }
    return volunteers;
}
