
import React, { useCallback, useRef } from 'react';
import { streamArticle, StreamArticleParams } from '../services/geminiService';
import { StreamResponseParser } from '../services/stream/StreamResponseParser';
import { Action } from '../state/appReducer';

interface UseGeminiStreamProps {
    dispatch: React.Dispatch<Action>;
}

export const useGeminiStream = ({ dispatch }: UseGeminiStreamProps) => {
    const abortControllerRef = useRef<AbortController | null>(null);

    const startStream = useCallback(async (params: StreamArticleParams) => {
        // 1. Cleanup & Init
        if (abortControllerRef.current) abortControllerRef.current.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        // 2. State Accumulators
        let fullText = '';
        const sourceMap = new Map<string, any>();
        const searchQueriesSet = new Set<string>();
        let hasError = false;

        try {
            // Initiate Stream
            const stream = await streamArticle(params);

            // Iterate Chunks
            for await (const chunk of stream) {
                if (controller.signal.aborted) throw new Error('AbortedByUser');

                try {
                    const { text, groundingMetadata } = StreamResponseParser.parse(chunk);

                    if (text) {
                        fullText += text;
                        dispatch({ type: 'STREAM_UPDATE', payload: text });
                    }

                    if (groundingMetadata) {
                        StreamResponseParser.aggregateSources(sourceMap, groundingMetadata.chunks);
                        groundingMetadata.queries?.forEach(q => searchQueriesSet.add(q));
                    }
                } catch (parseError) {
                    console.warn("Recoverable parsing error in chunk:", parseError);
                }
            }
        } catch (error: any) {
            // IGNORE ABORT ERRORS (User clicked stop)
            if (error.message === 'AbortedByUser' || controller.signal.aborted) {
                return null;
            }

            console.error("CRITICAL STREAM ERROR:", error);
            
            // FAILSAFE LOGIC:
            // If content generation had ALREADY started (we have text), we don't want to wipe the screen.
            // We append the error message to the document so the user can see what happened.
            if (fullText.length > 50) {
                hasError = true;
                const errorMessage = error instanceof Error ? error.message : "Connection interrupted";
                const errorMarker = `\n\n> **⚠️ SYSTEM ALERT: GENERATION INTERRUPTED**\n> The AI connection was lost: ${errorMessage}.\n> Partial content salvaged below.\n`;
                dispatch({ type: 'STREAM_UPDATE', payload: errorMarker });
            } else {
                // If it failed IMMEDIATELY (e.g., 400 Bad Request, 429 Quota), RE-THROW.
                // This ensures 'useArticleGenerator' catches it and displays the Red Error Box.
                throw error; 
            }
        } finally {
            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
        }

        // Return Rescued Content (even if partial)
        return {
            text: fullText,
            sources: sourceMap.size > 0 ? Array.from(sourceMap.values()) : null,
            searchQueries: searchQueriesSet.size > 0 ? Array.from(searchQueriesSet) : undefined,
            isPartial: hasError
        };
    }, [dispatch]);

    const abort = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    return { startStream, abort };
};
