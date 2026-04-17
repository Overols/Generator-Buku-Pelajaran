
import { GenerationRequest } from '../../models/PromptConfig';
import { IPromptStrategy } from '../strategies/types';
import { TemplateEngine } from './TemplateEngine';
import { SYSTEM_INSTRUCTION_TEMPLATE } from '../../constants/promptTemplates';
import { TONE_DESCRIPTIONS } from '../../constants/options';

/**
 * SystemPromptBuilder
 * Domain: Core Logic
 * Responsibility: Assembles the "System Instruction" (The Personality/Rules) of the AI.
 */
export class SystemPromptBuilder {
    constructor(private request: GenerationRequest, private strategy: IPromptStrategy) {}

    public build(): string {
        const r = this.request;
        const isRefine = r.inputMode === 'refine';
        
        // Data Preparation
        const extras = TemplateEngine.buildExtrasBlock({ 
            images: r.imagePlaceholderCount, 
            anecdotes: r.includeAnecdotes 
        });

        // Structure Logic
        const structureInstruction = isRefine
            ? "**STRUCTURE:** Preserve the original structure/outline unless asked to change. Do NOT force new sections."
            : this.strategy.buildStructure();

        // Linguistics: Derived dynamically from Strategy
        let languageConstraint = this.strategy.buildLanguageConstraints();
        
        const nativeThoughtDirective = `You are an expert Content Architect specialized in ${r.targetRegion} context.`;

        const variableMap = {
            persona: this.strategy.buildPersona(),
            language: languageConstraint,
            nativeThought: nativeThoughtDirective,
            targetAudience: r.targetAudience,
            targetRegion: r.targetRegion,
            tone: r.tone,
            toneDesc: TONE_DESCRIPTIONS[r.tone] || r.tone,
            structure: structureInstruction,
            research: this.strategy.buildResearchDirectives(),
            extras
        };

        return TemplateEngine.hydrate(SYSTEM_INSTRUCTION_TEMPLATE, variableMap);
    }
}
