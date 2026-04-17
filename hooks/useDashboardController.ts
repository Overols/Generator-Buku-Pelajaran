
import { useCallback } from 'react';
import { useAppContext } from '../state/AppContext';
import { useUrlSync } from '../hooks/useUrlSync';
import { useArticleGenerator } from '../hooks/useArticleGenerator';
import { useReadabilityReviser } from '../hooks/useReadabilityReviser';
import { useHumanizer } from '../hooks/useHumanizer';
import { useSummarizer } from '../hooks/useSummarizer';
import { ConfigRulesEngine } from '../services/logic/ConfigRulesEngine';

/**
 * DashboardController
 * Responsibility: Root Orchestrator.
 * Pattern: Facade for Sub-Controllers (Hooks).
 * Keeps the View (DashboardView) dumb and the logic centralized.
 */
export const useDashboardController = () => {
  const { state, dispatch } = useAppContext();
  
  // 1. Sync & Persistence
  const config = useUrlSync(state);

  // 2. Use Cases (Sub-Controllers)
  const generateArticle = useArticleGenerator({ dispatch });
  const reviseArticle = useReadabilityReviser({ dispatch });
  const humanizeArticle = useHumanizer({ dispatch });
  const summarizeForContinuation = useSummarizer({ dispatch });

  // 3. Action Handlers (Wrapped)

  const handleGenerateArticle = useCallback(() => {
    generateArticle(config);
  }, [generateArticle, config]);

  const handleRevise = useCallback(() => {
    if (!state.finalizedData?.article) return;
    reviseArticle(state.finalizedData.article, state.finalizedData.readabilityScores!);
  }, [state.finalizedData, reviseArticle]);

  const handleHumanize = useCallback(() => {
    if (!state.finalizedData?.article) return;
    humanizeArticle(state.finalizedData.article);
  }, [state.finalizedData, humanizeArticle]);

  const handleSummarize = useCallback(() => {
    if (!state.finalizedData?.article) return;
    summarizeForContinuation(
        state.finalizedData.article, 
        state.currentChapter, 
        state.chapterRoadmap
    );
  }, [state.finalizedData, state.currentChapter, state.chapterRoadmap, summarizeForContinuation]);

  /**
   * Field Setter with Business Logic Injection
   * Delegates "Side Effects" calculation to the Rules Engine.
   */
  const handleSetField = useCallback((field: string, value: any) => {
      const updates = ConfigRulesEngine.normalizeFieldUpdate(state, field, value);
      
      Object.entries(updates).forEach(([key, val]) => {
          dispatch({ type: 'SET_FIELD', field: key as any, payload: val });
      });
  }, [dispatch, state]);

  return {
    state,
    config,
    actions: {
        generate: handleGenerateArticle,
        revise: handleRevise,
        humanize: handleHumanize,
        summarize: handleSummarize,
        setField: handleSetField
    }
  };
};
