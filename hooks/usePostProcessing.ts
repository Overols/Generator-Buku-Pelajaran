
import { useCallback } from 'react';
import { ContentProcessor, ProcessedContent } from '../services/processing/ContentProcessor';
import { ArticleGenerationOptions } from '../types';

/**
 * Controller Hook for Post-Processing
 * Responsibility: Connects the React view layer to the ContentProcessor service.
 */
export const usePostProcessing = () => {
    
    const processContent = useCallback(async (
        articleText: string,
        params: ArticleGenerationOptions
    ): Promise<ProcessedContent> => {
        
        return await ContentProcessor.process(articleText, params);
        
    }, []);

    return { processContent };
};
