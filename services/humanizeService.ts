
import { getGeminiClient } from '../lib/geminiClient';
import { getApiErrorMessage } from './apiUtils';
import { AI_MODELS } from '../constants/models';
import { HUMANIZE_TEMPLATE } from '../constants/promptTemplates';

/**
 * Service: Humanizer
 * Responsibility: Executing the "Humanize" transformation pipeline.
 */
export async function humanizeArticleText(articleText: string): Promise<string> {
  try {
    const ai = getGeminiClient();
    
    // Using high temperature for maximum creativity and "burstiness"
    const response = await ai.models.generateContent({
      model: AI_MODELS.GENERATION, 
      contents: `Please humanize this text:\n\n---\n\n${articleText}`,
      config: { 
          systemInstruction: HUMANIZE_TEMPLATE,
          temperature: 1, 
          topK: 40,
      },
    });
    
    return response.text?.trim() || "";
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'humanizing article'));
  }
}
