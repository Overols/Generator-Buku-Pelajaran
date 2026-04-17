
import { generateSeoData } from '../seoService';
import { generateImagePrompts } from '../imagePromptService';
import { StructureAnalyzer } from '../analysis/StructureAnalyzer';
import { ArticleGenerationOptions, SeoData, ImagePlaceholderData, ArticleStats } from '../../types';

export interface ProcessedContent {
    seoData: SeoData | null;
    imagePlaceholders: ImagePlaceholderData[] | null;
    stats: ArticleStats;
}

/**
 * ContentProcessor
 * Domain: Application Logic
 * Responsibility: Orchestrator for all post-generation analysis tasks.
 * Pattern: Facade
 */
export class ContentProcessor {
    
    public static async process(
        text: string, 
        options: ArticleGenerationOptions
    ): Promise<ProcessedContent> {
        
        // 1. Parallel Execution of External API Calls
        const [seoData, detailedPrompts] = await Promise.all([
            this.fetchSeoData(text, options),
            this.fetchImagePrompts(text, options)
        ]);

        // 2. Synchronous Analysis
        const stats = StructureAnalyzer.analyze(text);

        // 3. Data Merging
        const imagePlaceholders = this.mergePromptsWithText(text, detailedPrompts);

        return { seoData, imagePlaceholders, stats };
    }

    private static async fetchSeoData(text: string, options: ArticleGenerationOptions) {
        return generateSeoData(text, options.targetRegion).catch(err => {
            console.error("SEO Generation Failed:", err);
            return null;
        });
    }

    private static async fetchImagePrompts(text: string, options: ArticleGenerationOptions) {
        if (options.imagePlaceholderCount === 0) return null;
        
        const descriptions = this.extractPlaceholders(text);
        if (descriptions.length === 0) return null;

        return generateImagePrompts(descriptions, options.prompt).catch(err => {
            console.error("Image Prompt Generation Failed:", err);
            return null;
        });
    }

    private static extractPlaceholders(text: string): string[] {
        const matches = text.match(/\[Image Placeholder: (.*?)\]/g);
        return matches ? matches.map(m => m.replace('[Image Placeholder: ', '').replace(']', '')) : [];
    }

    private static mergePromptsWithText(text: string, detailedPrompts: any[] | null): ImagePlaceholderData[] | null {
        if (!detailedPrompts) return null;
        
        const descriptions = this.extractPlaceholders(text);
        return descriptions.map((desc, idx) => ({
            description: desc,
            detailedPrompt: detailedPrompts[idx] || null
        }));
    }
}
