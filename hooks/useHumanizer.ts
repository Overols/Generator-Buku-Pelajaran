
import React, { useCallback } from 'react';
import { humanizeArticleText } from '../services/humanizeService';
import { ReadabilityMetrics } from '../services/analysis/ReadabilityMetrics';
import { Action } from '../state/appReducer';

interface UseHumanizerProps {
    dispatch: React.Dispatch<Action>;
}

export const useHumanizer = ({ dispatch }: UseHumanizerProps) => {
    const humanizeArticle = useCallback(async (articleText: string) => {
        dispatch({ type: 'HUMANIZE_START' });
        try {
            const humanizedText = await humanizeArticleText(articleText);
            const newScores = ReadabilityMetrics.calculate(humanizedText);
            dispatch({
                type: 'HUMANIZE_SUCCESS',
                payload: { article: humanizedText, readabilityScores: newScores }
            });
        } catch (err) {
            dispatch({ type: 'HUMANIZE_ERROR', payload: err instanceof Error ? err.message : 'Error.' });
        }
    }, [dispatch]);

    return humanizeArticle;
};
