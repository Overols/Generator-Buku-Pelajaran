
import { DetailedImagePrompt } from '../types';
import { generateStructuredContent } from '../lib/geminiClient';
import { AI_MODELS } from '../constants/models';
import { IMAGE_PROMPT_SCHEMA } from '../models/schemas/geminiSchemas';

async function generateSingleImagePrompt(description: string, topic: string): Promise<DetailedImagePrompt> {
    return generateStructuredContent<DetailedImagePrompt>(
        AI_MODELS.VISION_PROMPT,
        `Topic: "${topic}".\nGenerate detailed prompt for visual: "${description}"`,
        {
            systemInstruction: `You are an expert Image Prompt Engineer for Midjourney/DALL-E. Output PURE JSON.`,
            responseMimeType: "application/json",
            responseSchema: IMAGE_PROMPT_SCHEMA,
        },
        `generating prompt for "${description}"`
    );
}

export async function generateImagePrompts(descriptions: string[], topic: string): Promise<DetailedImagePrompt[] | null> {
    if (!descriptions?.length) return null;

    try {
        const results = await Promise.allSettled(descriptions.map(desc => generateSingleImagePrompt(desc, topic)));
        const valid = results
            .filter((r): r is PromiseFulfilledResult<DetailedImagePrompt> => r.status === 'fulfilled')
            .map(r => r.value);
        
        return valid.length ? valid : null;
    } catch (e) {
        console.error("Image prompt generation failed:", e);
        return null;
    }
}
