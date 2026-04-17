
import React, { useCallback } from 'react';
import { generateContextSummary } from '../services/summarizeService';
import { Action } from '../state/appReducer';

interface UseSummarizerProps {
    dispatch: React.Dispatch<Action>;
}

/**
 * Hook: Summarizer (Continuity Controller)
 * Responsibility: Mengelola transisi antar-bab.
 * 
 * Flow:
 * 1. Menganalisis teks bab saat ini (Forensic Audit).
 * 2. Membuat "Jembatan Konteks" (State Vector).
 * 3. Mengupdate Roadmap (Story Bible).
 * 4. Menaikkan nomor bab (Auto-Increment).
 */
export const useSummarizer = ({ dispatch }: UseSummarizerProps) => {
    
    const summarizeForContinuation = useCallback(async (
        articleText: string, 
        currentChapterNumber: number, 
        currentRoadmap: string
    ) => {
        dispatch({ type: 'SUMMARIZE_START' });
        
        try {
            // 1. Generate Context Bridge (AI Service Call)
            const { stateVector, memoryLog, roadmapEntry } = await generateContextSummary(articleText, currentChapterNumber);
            
            // 2. Construct the "Super Context"
            const fullBridge = `${stateVector}\n\n${memoryLog}`;

            dispatch({
                type: 'SUMMARIZE_SUCCESS',
                payload: fullBridge
            });

            // 3. Update Roadmap (Long-term Memory)
            let newRoadmap = currentRoadmap;
            if (roadmapEntry) {
                const separator = "\n--- AUTO-GENERATED HISTORY ---\n";
                const entryLabel = `Chapter ${currentChapterNumber} (ACTUAL): ${roadmapEntry}`;
                
                if (!currentRoadmap) {
                    newRoadmap = entryLabel;
                } else if (currentRoadmap.includes(separator)) {
                    newRoadmap = `${currentRoadmap}\n${entryLabel}`;
                } else {
                    newRoadmap = `${currentRoadmap}\n${separator}${entryLabel}`;
                }
                
                dispatch({ type: 'SET_FIELD', field: 'chapterRoadmap', payload: newRoadmap });
            }

            // 4. Auto-Increment Chapter (Workflow Automation)
            // Menggunakan nama field yang benar: 'eduChapter'
            const nextChapter = currentChapterNumber + 1;
            dispatch({ type: 'SET_FIELD', field: 'eduChapter', payload: nextChapter });
            
            // UX: Scroll ke atas untuk menandakan kesiapan bab baru
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Gagal merangkum konteks.';
            dispatch({ type: 'SUMMARIZE_ERROR', payload: errorMessage });
        }
    }, [dispatch]);

    return summarizeForContinuation;
};
