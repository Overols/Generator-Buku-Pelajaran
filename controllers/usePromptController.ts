
import { useMemo } from 'react';
import { InputMode } from '../models/PromptConfig';

interface PromptControllerParams {
    config: {
        inputMode: InputMode;
        prompt: string;
        chapterFocus?: string;
        existingDraft: string;
        eduChapter: number;
    };
}

/**
 * PromptController
 * Responsibility: View Logic for the Input Form.
 * Decouples validation rules from the UI component.
 */
export const usePromptController = ({ config }: PromptControllerParams) => {
    const isGenerate = config.inputMode === 'generate';

    // Pure validation logic
    const isFormValid = useMemo(() => {
        const hasMainPrompt = config.prompt.trim().length > 0;
        
        if (isGenerate) {
            // Jika Bab 1: Wajib isi Topik Utama
            // Jika Bab > 1: Wajib isi Topik Utama ATAU Fokus Bab (ideally both, but main prompt persists)
            if (config.eduChapter > 1) {
                // Untuk bab lanjutan, kita butuh main prompt (konteks) DAN sebaiknya ada fokus bab.
                // Tapi secara teknis, main prompt saja cukup (fallback ke generik).
                return hasMainPrompt; 
            }
            return hasMainPrompt;
        } else {
            // Refine mode requires both instructions (prompt) and the draft itself
            const hasDraft = config.existingDraft?.trim().length > 0;
            return hasMainPrompt && hasDraft;
        }
    }, [isGenerate, config.prompt, config.existingDraft, config.eduChapter, config.chapterFocus]);

    return {
        isGenerate,
        isFormValid
    };
};
