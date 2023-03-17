import { BaseStore } from '$lib/store/base';
import { saveToLocalStorage, getFromLocalStorage, delay } from '$lib/utils/functions';
import type { SettingsStore as SettingsStoreType } from '$lib/types'
import { browser } from '$app/environment';

export class SettingsStore extends BaseStore<SettingsStoreType> {
    static storeDefault = {
        language: 'pt-BR',
        isReady: false
    } as SettingsStoreType;

    constructor() {
        super(SettingsStore.storeDefault);
        this.init();
    }

    async init() {
        while (!browser) {
            await delay(100);
        }

        const language = getFromLocalStorage('settings.language');
        this.updateLanguage(language);

        this.store.update(data => ({
            ...data,
            isReady: true
        }));
    }

    updateLanguage(language: Locales) {
        this.store.update(data => ({
            ...data,
            language: language ?? 'pt-BR'
        }));
        saveToLocalStorage('settings.language', language || 'pt-BR');
    }
}