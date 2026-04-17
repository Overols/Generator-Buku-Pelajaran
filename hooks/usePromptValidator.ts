
import { useMemo } from 'react';
import { InputMode } from '../types';

interface ValidatorParams {
    inputMode: InputMode;
    prompt: string;
    existingDraft: string;
}

/**
 * Controller: Prompt Validator
 * Responsibility: Determines if the current input state allows for generation.
 */
export const usePromptValidator = ({ inputMode, prompt, existingDraft }: ValidatorParams) => {
    
    const isFormValid = useMemo(() => {
        if (inputMode === 'generate') {
            return prompt.trim().length > 0;
        } else {
            // Refine mode requires both instructions (prompt) and the draft itself
            return prompt.trim().length > 0 && existingDraft?.trim().length > 0;
        }
    }, [inputMode, prompt, existingDraft]);

    return { isFormValid };
};
