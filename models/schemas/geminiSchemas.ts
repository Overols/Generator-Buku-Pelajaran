
import { Type, Schema } from '@google/genai';

/**
 * Gemini Response Schemas
 * Acts as the Data Definition Layer. 
 * Separates the "Shape of Data" from the "Service Logic".
 */

export const SEO_SCHEMA: Schema = {
    type: Type.OBJECT,
    properties: {
        focusKeyphrase: { type: Type.STRING },
        suggestedTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
        metaDescriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
        slug: { type: Type.STRING },
    },
    required: ["focusKeyphrase", "tags", "metaDescriptions", "slug", "suggestedTitles"],
};

export const TITLE_ANALYSIS_SCHEMA: Schema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            length: { type: Type.INTEGER },
        },
        required: ["title", "score", "feedback", "length"],
    }
};

export const IMAGE_PROMPT_SCHEMA: Schema = {
    type: Type.OBJECT,
    properties: {
        subject: { type: Type.STRING },
        cameraBrand: { type: Type.STRING },
        cameraType: { type: Type.STRING },
        lens: { type: Type.STRING },
        atmosphere: { type: Type.STRING },
        pointOfView: { type: Type.STRING },
        negativePrompt: { type: Type.STRING },
    },
    required: ["subject", "cameraBrand", "cameraType", "lens", "atmosphere", "pointOfView", "negativePrompt"],
};

export const TRANSLATION_SCHEMA: Schema = {
    type: Type.OBJECT,
    properties: {
        article: { type: Type.STRING },
        seoData: {
            type: Type.OBJECT,
            properties: {
                focusKeyphrase: { type: Type.STRING },
                suggestedTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                metaDescriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                slug: { type: Type.STRING },
            },
            required: ["focusKeyphrase", "tags", "metaDescriptions", "slug", "suggestedTitles"],
        },
    },
    required: ["article", "seoData"]
};
