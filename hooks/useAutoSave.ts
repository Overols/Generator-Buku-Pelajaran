
import { useEffect } from 'react';
import { State } from '../models/StateTypes';
import { STORAGE_KEY } from '../utils/storageUtils';

// Fields we want to persist across sessions
const PERSISTENT_FIELDS: (keyof State)[] = [
    'prompt',
    'chapterFocus', // Added
    'existingDraft',
    'previousContext',
    'targetAudience',
    'targetRegion',
    'tone',
    'writingStyle',
    'paragraphLength',
    'syntaxComplexity',
    'eduSubject',
    'customEduSubject',
    'eduCurriculum',
    'eduChapter',
    'eduCompetency',
    'includeBibliography' // Added to persistence
];

export const useAutoSave = (state: State) => {
    useEffect(() => {
        const saveState = () => {
            const dataToSave: Partial<State> = {};
            PERSISTENT_FIELDS.forEach(field => {
                // @ts-ignore
                dataToSave[field] = state[field];
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        };

        const timeoutId = setTimeout(saveState, 1000);

        return () => clearTimeout(timeoutId);
    }, [
        state.prompt,
        state.chapterFocus,
        state.existingDraft, 
        state.previousContext,
        state.targetAudience,
        state.writingStyle,
        state.tone,
        state.paragraphLength,
        state.syntaxComplexity,
        state.eduSubject,
        state.customEduSubject,
        state.eduCurriculum,
        state.eduChapter,
        state.eduCompetency,
        state.includeBibliography
    ]);
};
