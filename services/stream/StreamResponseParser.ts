
import { GenerateContentResponse, FinishReason } from '@google/genai';

export interface ParsedStreamChunk {
    text: string | null;
    groundingMetadata?: {
        chunks?: any[];
        queries?: string[];
    };
}

/**
 * StreamResponseParser
 * Domain: Infrastructure / Data Transformation
 * Responsibility: Pure function to extract usable data from raw API chunks.
 */
export class StreamResponseParser {
    
    /**
     * Extracts text and grounding metadata from a raw response chunk.
     * Throws explicit errors for Safety Blocks or Refusals.
     */
    public static parse(chunk: GenerateContentResponse): ParsedStreamChunk {
        const candidate = chunk.candidates?.[0];
        
        // 1. Check for Safety/Finish Reasons that blocked generation
        if (candidate?.finishReason) {
            const reason = candidate.finishReason;
            if (reason !== FinishReason.STOP && reason !== FinishReason.MAX_TOKENS) {
                // If it's simply "STOP" or "MAX_TOKENS", it's fine. 
                // But SAFETY, RECITATION, OTHER are blocking issues if no text exists.
                if (!candidate.content?.parts?.[0]?.text) {
                    throw new Error(`Generation stopped: ${reason} (Safety/Policy)`);
                }
            }
        }

        // 2. Extract Data
        return {
            text: chunk.text || null,
            groundingMetadata: candidate?.groundingMetadata ? {
                chunks: candidate.groundingMetadata.groundingChunks,
                queries: candidate.groundingMetadata.webSearchQueries
            } : undefined
        };
    }

    /**
     * Aggregates sources from grounding chunks into a Map to prevent duplicates.
     */
    public static aggregateSources(
        existingMap: Map<string, any>, 
        newChunks?: any[]
    ): Map<string, any> {
        if (!newChunks) return existingMap;

        newChunks.forEach(chunk => {
            if (chunk.web?.uri) {
                existingMap.set(chunk.web.uri, chunk);
            }
        });
        
        return existingMap;
    }
}
