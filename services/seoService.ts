
import { SeoData, TitleAnalysis } from '../types';
import { TargetRegion } from '../models/PromptConfig';
import { generateStructuredContent } from '../lib/geminiClient';
import { SEO_CONTEXTS, SeoRegionContext } from '../constants/seoConstants';
import { AI_MODELS } from '../constants/models';
import { SEO_SCHEMA, TITLE_ANALYSIS_SCHEMA } from '../models/schemas/geminiSchemas';

const getContext = (r: TargetRegion): SeoRegionContext => SEO_CONTEXTS[r === 'Indonesia' || r === 'Europe' ? r : 'default'];

/**
 * Service: SEO Generator
 * Responsibility: Orchestrates the generation of SEO metadata.
 * Refactored to delegate Schema definitions to the Model layer.
 */
export async function generateSeoData(articleText: string, region: TargetRegion): Promise<SeoData | null> {
    if (!articleText) return null;
    const ctx = getContext(region);

    const systemInstruction = `${ctx.role} Generate JSON. strictly in ${ctx.lang}. Meta desc: ${ctx.descLen}. Titles: ${ctx.titleLen}.`;
    
    const seoData = await generateStructuredContent<SeoData>(
        AI_MODELS.ANALYSIS,
        `Article:\n\n${articleText.slice(0, 15000)}...`, 
        { 
            systemInstruction, 
            responseMimeType: "application/json", 
            responseSchema: SEO_SCHEMA 
        },
        'generating SEO data'
    ).catch(e => { console.warn(e); return null; });

    if (!seoData) return null;

    if (seoData.metaDescriptions) {
        // SMART TRUNCATION LOGIC
        // Ensures description is <= 135 chars AND ends with a complete sentence.
        seoData.metaDescriptions = seoData.metaDescriptions.map(d => {
            const limit = 135;
            if (d.length <= limit) return d;

            // Take substring up to limit
            const cut = d.substring(0, limit);
            
            // Find the last sentence terminator
            const lastPeriod = cut.lastIndexOf('.');
            const lastExclaim = cut.lastIndexOf('!');
            const lastQuestion = cut.lastIndexOf('?');
            
            const end = Math.max(lastPeriod, lastExclaim, lastQuestion);

            // If a valid sentence end is found (and it's not at the very beginning)
            if (end > 10) {
                return cut.substring(0, end + 1);
            }

            // Fallback: If no sentence end found (run-on), cut at last space and add ellipsis
            const lastSpace = cut.lastIndexOf(' ');
            if (lastSpace > 10) {
                return cut.substring(0, lastSpace) + '...';
            }

            return cut + '...';
        });
    }

    if (seoData.suggestedTitles?.length) {
        seoData.titleAnalysis = await analyzeTitles(seoData.suggestedTitles, seoData.focusKeyphrase, region);
    }

    return seoData;
}

async function analyzeTitles(titles: string[], keyword: string, region: TargetRegion): Promise<TitleAnalysis[] | null> {
    const ctx = getContext(region);
    
    return generateStructuredContent<TitleAnalysis[]>(
        AI_MODELS.ANALYSIS,
        `Analyze:\n- ${titles.join('\n- ')}`,
        { 
            systemInstruction: `Analyze titles against keyword "${keyword}". ${ctx.feedback}`, 
            responseMimeType: "application/json", 
            responseSchema: TITLE_ANALYSIS_SCHEMA 
        },
        'analyzing titles'
    ).catch(e => { console.warn(e); return null; });
}
