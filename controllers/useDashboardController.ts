
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
 * Responsibility: Root Orchestrator (Main Controller).
 * Pattern: Facade for Sub-Controllers.
 * 
 * Prinsip: Controller ini menghubungkan State (Model) ke View,
 * namun mendelegasikan logika perubahan data kompleks ke ConfigRulesEngine.
 */
export const useDashboardController = () => {
  const { state, dispatch } = useAppContext();
  
  // 1. Infrastructure (Sync)
  const config = useUrlSync(state);

  // 2. Sub-Controllers (Use Cases)
  const generateArticle = useArticleGenerator({ dispatch });
  const reviseArticle = useReadabilityReviser({ dispatch });
  const humanizeArticle = useHumanizer({ dispatch });
  const summarizeForContinuation = useSummarizer({ dispatch });

  // 3. Command Handlers

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
    
    // Pastikan menggunakan 'eduChapter' agar fitur auto-increment bekerja
    summarizeForContinuation(
        state.finalizedData.article, 
        state.eduChapter, 
        state.chapterRoadmap
    );
  }, [state.finalizedData, state.eduChapter, state.chapterRoadmap, summarizeForContinuation]);

  /**
   * Smart Field Setter
   * Menggunakan Rules Engine untuk menangani side-effects (misal: ganti kurikulum otomatis).
   */
  const handleSetField = useCallback((field: string, value: any) => {
      // Delegasi logika bisnis ke Rules Engine (Clean Code)
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
