
import { useMemo } from 'react';
import { InputMode } from '../../models/PromptConfig';

interface PromptControllerParams {
    config: {
        inputMode: InputMode;
        prompt: string;
        existingDraft: string;
    };
}

/**
 * Controller: Prompt Input Logic
 * Responsibility: Handles validation state and mode checking for the Prompt Input UI.
 * Principle: Separation of Concerns (Logic vs View).
 */
export const usePromptController = ({ config }: PromptControllerParams) => {
    const isGenerate = config.inputMode === 'generate';

    // Validation Logic: Pure function derived from state
    const isFormValid = useMemo(() => {
        if (isGenerate) {
            return config.prompt.trim().length > 0;
        } else {
            // Refine mode requires both instructions (prompt) and the draft itself
            return config.prompt.trim().length > 0 && config.existingDraft?.trim().length > 0;
        }
    }, [isGenerate, config.prompt, config.existingDraft]);

    return {
        isGenerate,
        isFormValid
    };
};
