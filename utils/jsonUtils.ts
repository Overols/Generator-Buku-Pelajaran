
/**
 * Safe JSON Parser
 * Attempts to extract and parse JSON from LLM output.
 */
export function safeJsonParse<T>(input: string): T | null {
    if (!input) return null;

    let cleanInput = input.trim();

    // 1. Strip Markdown Code Blocks (Standard Gemini behavior)
    // Matches ```json [content] ``` or just ``` [content] ```
    const markdownRegex = /^```(?:json)?\s*([\s\S]*?)\s*```$/i;
    const match = cleanInput.match(markdownRegex);
    if (match) {
        cleanInput = match[1].trim();
    }

    // 2. Attempt Direct Parse
    try {
        return JSON.parse(cleanInput) as T;
    } catch (e) {
        // 3. Fallback: Find first '{' and last '}'
        // This handles cases where the LLM adds chatter before or after the JSON.
        const firstOpen = cleanInput.indexOf('{');
        const lastClose = cleanInput.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            const potentialJson = cleanInput.substring(firstOpen, lastClose + 1);
            try {
                return JSON.parse(potentialJson) as T;
            } catch (innerError) {
                // Final failure
                console.error("JSON Parse Failed. Input snippet:", cleanInput.substring(0, 50) + "...");
                return null;
            }
        }
        
        return null;
    }
}
