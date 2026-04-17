
import { useEffect, useMemo } from 'react';
import { DEFAULT_STATE } from '../state/initialState';
import { State } from '../models/StateTypes';
import { PromptConfig } from '../models/PromptConfig';
import { stringifyStateToUrl } from '../utils/urlUtils';

/**
 * Hook: URL Synchronizer
 * Responsibility: Menjaga state aplikasi tetap sinkron dengan URL Browser.
 * Principle: Interface Segregation (Memisahkan UI State dari Config State).
 */
export const useUrlSync = (state: State): PromptConfig => {
    
    // 1. Filter: Hanya ambil data konfigurasi (Domain State)
    // Memisahkan state "Ephemeral" (Loading, Error) dari state "Persistent" (Config).
    const config: PromptConfig = useMemo(() => {
        // Blacklist keys yang tidak boleh masuk URL
        const excludedKeys = new Set([
            'article', 'finalizedData', 'isLoading', 'loadingState', 'error',
            'isTranslating', 'isRevising', 'isHumanizing', 'isSummarizing', 
            'translatedArticle'
        ]);

        // Menggunakan Partial untuk type safety saat konstruksi objek
        const cleanConfig: Partial<PromptConfig> = {};
        
        (Object.keys(state) as Array<keyof State>).forEach(key => {
            if (!excludedKeys.has(key as string)) {
                // Type assertion aman karena kita tahu strukturnya match dengan PromptConfig
                // @ts-ignore - Ignore karena State extends PromptConfig tapi TS strictness kadang rewel dengan dynamic keys
                cleanConfig[key] = state[key];
            }
        });

        return cleanConfig as PromptConfig;
    }, [state]);

    // 2. Side Effect: Update Browser URL
    useEffect(() => {
        if (typeof window === 'undefined' || window.location.protocol === 'blob:') return;
        
        const queryParams = stringifyStateToUrl(config, DEFAULT_STATE);
        const newUrl = `${window.location.pathname}${queryParams ? `?${queryParams}` : ''}`;
        
        window.history.replaceState({ path: newUrl }, '', newUrl);
    }, [config]);

    return config;
};