
import { generateSeoData } from '../seoService';
import { generateImagePrompts } from '../imagePromptService';
import { StructureAnalyzer } from '../analysis/StructureAnalyzer';
import { ReadabilityMetrics } from '../analysis/ReadabilityMetrics';
import { ArticleGenerationOptions, SeoData, ImagePlaceholderData, ArticleStats, ReadabilityScores } from '../../types';

export interface PostProcessingResult {
    seoData: SeoData | null;
    imagePlaceholders: ImagePlaceholderData[] | null;
    stats: ArticleStats;
    readabilityScores: ReadabilityScores;
}

/**
 * Service: Post-Processing Pipeline
 * Domain: Application Logic
 * Responsibility: Mengelola tugas-tugas analisis yang berjalan setelah teks utama dihasilkan.
 * Principle: Parallel Execution (Promise.all) untuk efisiensi waktu.
 */
export class PostProcessingPipeline {
    
    /**
     * Executes all analysis tasks concurrently.
     * Failures in sub-tasks (like SEO) do NOT fail the whole process (Graceful Degradation).
     */
    public static async execute(
        articleText: string, 
        options: ArticleGenerationOptions
    ): Promise<PostProcessingResult> {
        
        // 1. Define Independent Tasks
        const seoTask = this.safeExecute(
            () => generateSeoData(articleText, options.targetRegion),
            "SEO Generation",
            null
        );

        const imageTask = this.safeExecute(
            () => this.fetchImagePrompts(articleText, options),
            "Image Prompt Generation",
            null
        );

        // 2. Execute CPU-bound tasks synchronously (Fast)
        const stats = StructureAnalyzer.analyze(articleText);
        const readabilityScores = ReadabilityMetrics.calculate(articleText);

        // 3. Await IO-bound tasks concurrently
        const [seoData, imagePlaceholders] = await Promise.all([seoTask, imageTask]);

        return { 
            seoData, 
            imagePlaceholders, 
            stats,
            readabilityScores
        };
    }

    /**
     * Wrapper untuk menangani kegagalan pada sub-task tanpa mematikan aplikasi.
     */
    private static async safeExecute<T>(
        task: () => Promise<T>, 
        context: string, 
        fallback: T
    ): Promise<T> {
        try {
            return await task();
        } catch (error) {
            console.warn(`[Pipeline Warning] ${context} failed:`, error);
            return fallback;
        }
    }

    private static async fetchImagePrompts(text: string, options: ArticleGenerationOptions) {
        if (options.imagePlaceholderCount === 0) return null;
        
        const descriptions = this.extractPlaceholders(text);
        if (descriptions.length === 0) return null;

        const detailedPrompts = await generateImagePrompts(descriptions, options.prompt);

        return descriptions.map((desc, idx) => ({
            description: desc,
            detailedPrompt: detailedPrompts ? detailedPrompts[idx] : null
        }));
    }

    private static extractPlaceholders(text: string): string[] {
        const matches = text.match(/\[Image Placeholder: (.*?)\]/g);
        return matches ? matches.map(m => m.replace('[Image Placeholder: ', '').replace(']', '')) : [];
    }
}