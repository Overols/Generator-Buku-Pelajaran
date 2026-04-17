
import { ReadabilityScores } from '../types';
import { getGeminiClient } from '../lib/geminiClient';
import { getApiErrorMessage } from './apiUtils';
import { AI_MODELS } from '../constants/models';
import { READABILITY_REVISION_TEMPLATE } from '../constants/promptTemplates';

/**
 * Service: Readability Reviser
 * Responsibility: Executing the "Optimize Readability" transformation pipeline.
 */
export async function reviseArticleForReadability(articleText: string, scores: ReadabilityScores): Promise<{ text: string }> {
  try {
    const ai = getGeminiClient();
    
    const contextPrompt = `Current Flesch: ${scores.fleschReadingEase.toFixed(1)}, Grade: ${scores.gradeLevel.toFixed(1)}.\n\n---\n\n${articleText}`;

    const response = await ai.models.generateContent({
      model: AI_MODELS.GENERATION, 
      contents: contextPrompt,
      config: { 
          systemInstruction: READABILITY_REVISION_TEMPLATE 
      },
    });

    return { text: response.text || "" };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'revising article for readability'));
  }
}
