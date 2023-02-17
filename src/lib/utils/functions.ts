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