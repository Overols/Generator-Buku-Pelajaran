
export const STORAGE_KEY = 'gemini_architect_autosave_v1';

/**
 * Loads the auto-saved state from local storage.
 * Returns 'any' to avoid circular dependency with State type definitions.
 * The consumer should cast this to Partial<State>.
 */
export const loadAutoSave = (): any => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        console.warn("Failed to load auto-save data", e);
        return {};
    }
};
