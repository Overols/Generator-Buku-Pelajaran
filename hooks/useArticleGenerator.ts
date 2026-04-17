
import React, { useCallback, useRef, useEffect } from 'react';
import { Action } from '../state/appReducer';
import { GenerationRequest } from '../models/PromptConfig';
import { GenerationOrchestrator } from '../services/orchestrator/GenerationOrchestrator';

interface UseArticleGeneratorProps {
  dispatch: React.Dispatch<Action>;
}

/**
 * Controller Hook: Article Generator
 * Responsibility: Bridge between React View and Logic Layer.
 */
export const useArticleGenerator = ({ dispatch }: UseArticleGeneratorProps) => {
  const isMounted = useRef(true);
  
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const executeContentGenerationPipeline = useCallback(async (request: GenerationRequest) => {
    try {
        // 1. Validation & Init
        GenerationOrchestrator.validateRequest(request);
        dispatch({ type: 'GENERATE_START' });

        // 2. Consume Logic Stream
        const pipeline = GenerationOrchestrator.executePipeline(request);

        for await (const event of pipeline) {
            if (!isMounted.current) break;

            switch (event.type) {
                case 'STREAM_CHUNK':
                    dispatch({ type: 'STREAM_UPDATE', payload: event.payload });
                    break;
                case 'PHASE_CHANGE':
                    dispatch({ 
                        type: 'UPDATE_LOADING_STEP', 
                        payload: { completedStep: 'Draft Generated', currentStep: event.step }
                    });
                    break;
                case 'COMPLETE':
                    dispatch({ 
                        type: 'FINALIZE_DATA', 
                        payload: {
                            article: event.payload.text,
                            sources: event.payload.sources,
                            searchQueries: event.payload.queries,
                            readabilityScores: event.payload.data.readabilityScores,
                            seoData: event.payload.data.seoData,
                            imagePlaceholders: event.payload.data.imagePlaceholders,
                            stats: event.payload.data.stats,
                        } 
                    });
                    break;
            }
        }

    } catch (err: any) {
        if (isMounted.current) {
            console.error("Pipeline Error:", err);
            const msg = err instanceof Error ? err.message : String(err);
            dispatch({ type: 'GENERATE_ERROR', payload: msg });
        }
    }
  }, [dispatch]);

  return executeContentGenerationPipeline;
};
