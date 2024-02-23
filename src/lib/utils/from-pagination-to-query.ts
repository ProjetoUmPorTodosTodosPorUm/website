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