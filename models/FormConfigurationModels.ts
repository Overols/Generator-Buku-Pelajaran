
import { PromptConfig } from './PromptConfig';

/**
 * Defines the structure for a Select Field configuration.
 * Adheres to Interface Segregation Principle.
 */
export interface FieldDefinition<T extends keyof PromptConfig> {
    label: string;
    field: T;
    options: readonly string[];
    desc: Record<string, string>;
}

/**
 * Defines the structure for a Text Area configuration (e.g., Story Bible).
 */
export interface TextAreaDefinition<T extends keyof PromptConfig> {
    label: string;
    field: T;
    placeholder: string;
}
