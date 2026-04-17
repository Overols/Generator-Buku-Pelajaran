
import { GenerationRequest } from '../../models/PromptConfig';
import { PromptDirector } from '../core/PromptDirector';
import { streamArticle } from '../streamService';
import { PostProcessingPipeline, PostProcessingResult } from '../processing/PostProcessingPipeline';
import { StreamResponseParser } from '../stream/StreamResponseParser';
import { StreamAccumulator } from '../stream/StreamAccumulator';

export type OrchestratorEvent = 
    | { type: 'STREAM_CHUNK'; payload: string }
    | { type: 'PHASE_CHANGE'; step: string }
    | { type: 'COMPLETE'; payload: { text: string; data: PostProcessingResult; sources: any[] | null; queries?: string[] } };

/**
 * GenerationOrchestrator
 * Domain: Application Logic
 * Responsibility: Manages the end-to-end execution pipeline of content generation.
 * Pattern: Generator (Yields events to UI).
 */
export class GenerationOrchestrator {
    
    /**
     * Validates and Sanitizes the request before sending to AI.
     * @throws {Error} if validation fails.
     */
    public static validateRequest(config: GenerationRequest): void {
        // Sanitization: Remove invisible control characters that break tokens/JSON
        // \x00-\x08: Null, Bell, etc. | \x0B-\x1F: Vertical Tab, etc. | \x7F: Delete
        const sanitize = (str: string | undefined) => {
            if (!str) return "";
            return str.trim().replace(/[\x00-\x08\x0B-\x1F\x7F]/g, "");
        };

        if (config.prompt) config.prompt = sanitize(config.prompt);
        if (config.existingDraft) config.existingDraft = sanitize(config.existingDraft);
        if (config.chapterFocus) config.chapterFocus = sanitize(config.chapterFocus);

        // Validation Rules
        if (!config.prompt || config.prompt.length === 0) {
            throw new Error(config.inputMode === 'refine' 
                ? 'Instruksi revisi wajib diisi.' 
                : 'Topik atau Instruksi Utama wajib diisi.');
        }

        // Clamp Word Count to reasonable limits
        config.minWordCount = Math.min(Math.max(config.minWordCount, 100), 10000);
        
        if (config.inputMode === 'refine' && (!config.existingDraft || config.existingDraft.length < 10)) {
            throw new Error("Mode perbaikan memerlukan Draf Naskah yang valid (minimal 10 karakter).");
        }
    }

    /**
     * Main Pipeline: Generates content via streaming, then performs post-analysis.
     * Uses Async Generator so the UI can subscribe to progress updates.
     */
    public static async *executePipeline(config: GenerationRequest): AsyncGenerator<OrchestratorEvent, void, unknown> {
        // 1. Build Payload
        const director = new PromptDirector(config);
        const payload = {
            systemInstruction: director.buildSystemContext(),
            contentPrompt: director.compileUserTaskPayload(),
            generationConfig: director.configureGenerationSettings()
        };

        // 2. Start Streaming
        const accumulator = new StreamAccumulator();
        const stream = await streamArticle(payload);

        for await (const rawChunk of stream) {
            const parsed = StreamResponseParser.parse(rawChunk);
            const delta = accumulator.processChunk(parsed);
            
            if (delta) {
                yield { type: 'STREAM_CHUNK', payload: delta };
            }
        }

        // 3. Post-Processing Analysis
        const finalResult = accumulator.getResult();
        
        if (!finalResult.text || finalResult.text.length === 0) {
            throw new Error("Output AI kosong. Mungkin terblokir filter keamanan atau terjadi kesalahan jaringan.");
        }

        yield { type: 'PHASE_CHANGE', step: 'Analyzing content (SEO & Visuals)...' };
        
        // Execute heavy analysis tasks
        const analysis = await PostProcessingPipeline.execute(finalResult.text, config);

        // 4. Completion
        yield { 
            type: 'COMPLETE', 
            payload: {
                text: finalResult.text,
                data: analysis,
                sources: finalResult.sources,
                queries: finalResult.searchQueries
            }
        };
    }
}
