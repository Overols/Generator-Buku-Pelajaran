
// Centralized Source of Truth for AI Models
// Usage: Import specific constants or the entire object to ensure consistency.

export const AI_MODELS = {
    // High-intelligence model for generating the actual content
    GENERATION: 'gemini-3-pro-preview',
    
    // Fast/Cost-effective model for analysis (SEO, Formatting, Summaries)
    ANALYSIS: 'gemini-2.5-flash',
    
    // Model for visual prompts (can be same as generation or specialized)
    VISION_PROMPT: 'gemini-3-pro-preview',
};

// UI Display Names (For Footers/Headers)
export const MODEL_DISPLAY_NAMES = {
    GENERATION: 'Gemini 3.0 Pro',
    ANALYSIS: 'Gemini 2.5 Flash'
};

export const TOKEN_LIMITS = {
    STANDARD_OUTPUT: 8192,
    EXTENDED_OUTPUT: 65536,
    THINKING_BUDGET: 8192,
};
