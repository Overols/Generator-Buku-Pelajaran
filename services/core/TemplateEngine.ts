
/**
 * TemplateEngine
 * Responsibility: Handles robust string interpolation and variable replacement.
 * Follows DRY principle by centralizing regex logic.
 */
export class TemplateEngine {
    
    /**
     * Replaces placeholders in {{key}} format with values from the dictionary.
     * Safely handles undefined values by replacing them with empty strings.
     */
    public static hydrate(template: string, variables: Record<string, string | number | boolean | undefined>): string {
        return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
            const value = variables[key];
            return value !== undefined && value !== null ? String(value) : '';
        });
    }

    /**
     * Constructs the dynamic "Extra" instructions block based on configuration.
     */
    public static buildExtrasBlock(params: { images: number; anecdotes: boolean }): string {
        const parts: string[] = [];
        
        if (params.images > 0) {
            parts.push(`- Insert [Image Placeholder: description] for ${params.images} visual elements.`);
        }
        
        if (params.anecdotes) {
            parts.push(`- Include specific real-world anecdotes or case studies.`);
        }

        return parts.join('\n');
    }
}
