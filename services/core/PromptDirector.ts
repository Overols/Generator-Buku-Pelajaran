
import { GenerationRequest } from '../../models/PromptConfig';
import { GenerateContentConfig, HarmCategory, HarmBlockThreshold } from '@google/genai';
import { StrategyFactory } from '../strategies/StrategyFactory';
import { IPromptStrategy } from '../strategies/types';
import { SystemPromptBuilder } from './SystemPromptBuilder';
import { TemplateEngine } from './TemplateEngine';
import { DENSITY_PROTOCOL, REFINE_DRAFT_TEMPLATE } from '../../constants/promptTemplates';
import { TOKEN_LIMITS } from '../../constants/models';
import { ContinuityBridge } from '../continuity/ContinuityBridge';

/**
 * PromptDirector
 * Domain: Prompt Engineering Logic
 * Responsibility: Orchestrates the construction of the final prompt payload for Gemini.
 * 
 * Acts as the "Builder" pattern director, assembling the System Instructions,
 * User Task, and Configuration based on the specific Strategy employed.
 */
export class PromptDirector {
    private readonly strategy: IPromptStrategy;

    constructor(private readonly request: GenerationRequest) {
        // Strategy pattern determines HOW the content is structured (Textbook vs Module, etc.)
        this.strategy = StrategyFactory.create(this.request);
    }

    /**
     * Constructs the System Instruction (Persona & Constraints).
     * @returns The raw string for the system prompt.
     */
    public buildSystemContext(): string {
        return new SystemPromptBuilder(this.request, this.strategy).build();
    }

    /**
     * Compiles the actual user message/task.
     * Automatically switches between "Creation Mode" and "Refinement Mode".
     * @returns The final prompt string to be sent as the user message.
     */
    public compileUserTaskPayload(): string {
        const hasDraft = this.request.existingDraft && this.request.existingDraft.trim().length > 0;
        return hasDraft ? this.constructRefinementTask() : this.constructGenerationTask();
    }

    /**
     * Configures the Model Parameters (Temperature, Safety, Tools).
     * optimized for Educational Content safety standards.
     * @returns Gemini API Configuration object.
     */
    public configureGenerationSettings(): GenerateContentConfig {
        const { citationCount, minWordCount, useStrictFactMode } = this.request;
        
        // Logic: Use Google Search Tool if citations or strict facts are required
        const useSearchTool = citationCount > 0 || useStrictFactMode;
        
        // Logic: Use Thinking Model for long-form content (>1500 words) where deep reasoning is needed,
        // BUT ONLY if tools are NOT used (Current API limitation: Thinking + Tools often conflict or latency is too high).
        const useThinking = (minWordCount >= 1500 && !useSearchTool);

        const config: GenerateContentConfig = {
            temperature: 0.7, // Balanced creativity and adherence
            topK: 40,
            // Strict Safety Settings for Education (K-12 Friendly)
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                // Medium threshold for sexually explicit to avoid biology/health topics being blocked unnecessarily,
                // but still blocking pornography.
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }, 
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
            ]
        };

        // Apply Token Limits & Thinking Config
        if (useThinking) {
            config.maxOutputTokens = TOKEN_LIMITS.EXTENDED_OUTPUT;
            config.thinkingConfig = { thinkingBudget: TOKEN_LIMITS.THINKING_BUDGET };
        } else {
            config.maxOutputTokens = TOKEN_LIMITS.STANDARD_OUTPUT;
        }

        // Apply Tools
        if (useSearchTool) {
            config.tools = [{ googleSearch: {} }];
        }

        return config;
    }

    // --- INTERNAL BUILDER METHODS ---

    /**
     * Builds the task for generating NEW content from scratch.
     */
    private constructGenerationTask(): string {
        const { minWordCount, previousContext } = this.request;

        const mainTaskDescription = this.resolveMainTaskDescription();
        const searchDirective = this.resolveSearchDirective();
        
        // Dynamic Density Protocol: Ensures the AI respects word count constraints
        const lengthDirective = minWordCount >= 600 
            ? TemplateEngine.hydrate(DENSITY_PROTOCOL, { count: minWordCount })
            : `**TARGET PANJANG:** Sekitar ${minWordCount} kata.`;

        // Assembly
        return `
${ContinuityBridge.buildProtocol(previousContext)}

${searchDirective}

**TUGAS UTAMA:** ${mainTaskDescription}

**🛡️ PROTOKOL KEAMANAN & GAYA (INDO):**
1. **IMPLISIT > EKSPLISIT:** Gunakan metafora untuk hal sensitif (jika ada).
2. **ANTI-INDOGLISH:** Hapus "Yang mana" (which is) dan gunakan struktur kalimat Indonesia baku (S-P-O-K).
3. **STRUKTUR:** Ikuti kerangka yang ditetapkan di System Instruction.

${lengthDirective}

**CRITICAL MANDATE:** Output in Bahasa Indonesia (PUEBI/Standar) strictly.`;
    }

    /**
     * Determines the specific focus of the generation (Chapter vs Whole Project).
     */
    private resolveMainTaskDescription(): string {
        const { prompt, eduChapter, chapterFocus } = this.request;
        
        // Logic: If writing a specific chapter (>1) and a specific focus is provided, priority is given to the chapter focus.
        if (eduChapter > 1 && chapterFocus && chapterFocus.trim().length > 0) {
            return `
**KONTEKS PROYEK (TOPIK UTAMA):** "${prompt}"
**FOKUS SPESIFIK BAB ${eduChapter} INI:** "${chapterFocus}"

**INSTRUKSI PENULISAN:**
Tulis Bab ${eduChapter} dengan fokus penuh pada arahan "${chapterFocus}" di atas. Pastikan materi tetap relevan dengan Topik Utama proyek.`.trim();
        }
        
        return `Tulis materi edukasi MENDALAM tentang: "${prompt}"`;
    }

    /**
     * Adds directives for Google Search Grounding if enabled.
     */
    private resolveSearchDirective(): string {
        const { citationCount, useStrictFactMode } = this.request;
        const shouldUseSearch = citationCount > 0 || useStrictFactMode;

        return shouldUseSearch
            ? `**VALIDASI DATA & REFERENSI:** Gunakan Google Search untuk memverifikasi definisi, tanggal sejarah, data ilmiah, atau dalil terkini. Pastikan setiap klaim faktual akurat dan dapat dipertanggungjawabkan.` 
            : '';
    }

    /**
     * Builds the task for REFINING/EDITING existing drafts.
     */
    private constructRefinementTask(): string {
        const { existingDraft, prompt } = this.request;
        
        return TemplateEngine.hydrate(REFINE_DRAFT_TEMPLATE, {
            draft: existingDraft!,
            prompt: `Instruksi Revisi: "${prompt}"`, 
            persona: this.strategy.buildPersona(),
            linguistics: this.strategy.buildLanguageConstraints()
        });
    }
}
