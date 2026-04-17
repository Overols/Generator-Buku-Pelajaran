
import { getGeminiClient } from '../../lib/geminiClient';
import { getApiErrorMessage } from '../apiUtils';
import { AI_MODELS } from '../../constants/models';
import { CONTINUITY_ANALYSIS_SYSTEM_PROMPT } from '../../constants/templates/continuityTemplates';
import { TemplateEngine } from '../core/TemplateEngine';

export interface ContinuityResult {
    stateVector: string;
    memoryLog: string;
    roadmapEntry: string;
}

/**
 * ContinuityAnalyzer
 * Responsibility: Forensic analysis of existing text to extract the "State Vector".
 * Principle: Single Responsibility (Analysis only).
 */
export class ContinuityAnalyzer {
    
    /**
     * Scans the end of a chapter and returns an XML State Vector AND a Roadmap Summary.
     * @param articleText Full text of the chapter
     * @param chapterNumber The chapter number being analyzed
     * @returns Object containing the XML string and the Summary string
     */
    public static async analyzeState(articleText: string, chapterNumber: number): Promise<ContinuityResult> {
        if (!articleText) return { stateVector: "", memoryLog: "", roadmapEntry: "" };

        try {
            const ai = getGeminiClient();
            
            // We need a decent context window to catch inventory changes that might have happened mid-chapter
            const contextWindow = articleText.slice(-15000); 
            
            const systemInstruction = TemplateEngine.hydrate(CONTINUITY_ANALYSIS_SYSTEM_PROMPT, {
                chapter: chapterNumber
            });

            const response = await ai.models.generateContent({
                model: AI_MODELS.ANALYSIS, 
                contents: `PERFORM FORENSIC AUDIT ON THIS CHAPTER ENDING:\n\n${contextWindow}`, 
                config: { 
                    systemInstruction: systemInstruction,
                    temperature: 0.1 // Near zero for strict factual extraction
                },
            });

            const text = response.text || "";
            
            // Extract the XML blocks
            const stateVectorMatch = text.match(/<CONTINUITY_STATE>[\s\S]*?<\/CONTINUITY_STATE>/);
            const memoryLogMatch = text.match(/<CRITICAL_MEMORY_LOG>[\s\S]*?<\/CRITICAL_MEMORY_LOG>/);
            const deviationMatch = text.match(/<ROADMAP_DEVIATION_CHECK>([\s\S]*?)<\/ROADMAP_DEVIATION_CHECK>/);

            return {
                stateVector: stateVectorMatch ? stateVectorMatch[0] : "",
                memoryLog: memoryLogMatch ? memoryLogMatch[0] : "",
                roadmapEntry: deviationMatch ? deviationMatch[1].trim() : ""
            };

        } catch (error) {
            throw new Error(getApiErrorMessage(error, 'analyzing continuity state'));
        }
    }
}
