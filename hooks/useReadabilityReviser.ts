
import React, { useCallback } from 'react';
import { reviseArticleForReadability } from '../services/readabilityService';
import { ReadabilityMetrics } from '../services/analysis/ReadabilityMetrics';
import { Action } from '../state/appReducer';
import { ReadabilityScores } from '../types';

interface UseReadabilityReviserProps {
    dispatch: React.Dispatch<Action>;
}

export const useReadabilityReviser = ({ dispatch }: UseReadabilityReviserProps) => {
    const reviseArticle = useCallback(async (articleText: string, scores: ReadabilityScores) => {
        dispatch({ type: 'REVISE_START' });
        try {
            const revisedResult = await reviseArticleForReadability(articleText, scores);
            const newScores = ReadabilityMetrics.calculate(revisedResult.text);
            dispatch({
                type: 'REVISE_SUCCESS',
                payload: { article: revisedResult.text, readabilityScores: newScores }
            });
        } catch (err) {
            dispatch({ type: 'REVISE_ERROR', payload: err instanceof Error ? err.message : 'Error.' });
        }
    }, [dispatch]);

    return reviseArticle;
};
