
import { getGeminiClient } from '../lib/geminiClient';
import { getApiErrorMessage } from './apiUtils';
import { GenerateContentConfig } from '@google/genai';
import { AI_MODELS } from '../constants/models';
import { executeWithRetry } from '../utils/retryUtils';

export interface StreamArticleParams {
    systemInstruction: string;
    contentPrompt: string;
    generationConfig: GenerateContentConfig;
}

/**
 * Service: Stream Service
 * Responsibility: Handles the specific protocol for streaming content from the LLM.
 * 
 * Improvement: Added execution retry wrapper for the connection phase.
 */
export async function streamArticle({ systemInstruction, contentPrompt, generationConfig }: StreamArticleParams) {
    // We wrap the stream INITIALIZATION in a retry block.
    // Once the stream starts yielding, we cannot easily retry without restarting generation.
    return executeWithRetry(async () => {
        try {
            const ai = getGeminiClient();
            
            // Construct strict Content object to avoid ambiguity with Tools
            const userContent = {
                role: 'user',
                parts: [{ text: contentPrompt }]
            };

            const streamResult = await ai.models.generateContentStream({
                model: AI_MODELS.GENERATION,
                contents: [userContent], 
                config: {
                    ...generationConfig,
                    systemInstruction: { parts: [{ text: systemInstruction }] } 
                },
            });

            return streamResult;

        } catch (error) {
            console.error("Stream Connection Error:", error);
            throw new Error(getApiErrorMessage(error, 'initiating article stream'));
        }
    }, 2, 1000); // Max 2 retries for stream init (heavy operation)
}
