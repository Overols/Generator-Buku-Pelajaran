
import { CONTINUITY_INJECTION_TEMPLATE } from '../../constants/templates/continuityTemplates';
import { TemplateEngine } from '../core/TemplateEngine';

/**
 * ContinuityBridge
 * Responsibility: Generating the instruction block (Prompt Injection) for the NEXT chapter.
 * Principle: Open/Closed (Templates can change without changing this logic).
 */
export class ContinuityBridge {

    /**
     * Builds the "Anchor Protocol" string to be injected into the prompt.
     * @param previousContext The XML State Vector from the previous chapter.
     */
    public static buildProtocol(previousContext: string | undefined): string {
        if (!previousContext || previousContext.trim() === '') {
            return "";
        }

        return TemplateEngine.hydrate(CONTINUITY_INJECTION_TEMPLATE, {
            context: previousContext
        });
    }
}
