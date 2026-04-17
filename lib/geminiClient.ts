
import { GoogleGenAI, GenerateContentConfig } from '@google/genai';
import { safeJsonParse } from '../utils/jsonUtils';
import { getApiErrorMessage } from '../services/apiUtils';
import { executeWithRetry } from '../utils/retryUtils';

/**
 * Singleton instance storage.
 * Prevents multiple client initializations during the application lifecycle.
 */
let geminiClientInstance: GoogleGenAI | null = null;

/**
 * Retrieves or initializes the Gemini Client singleton.
 * Uses the API_KEY from environment variables.
 * 
 * @throws {Error} If API_KEY is missing in environment variables.
 * @returns {GoogleGenAI} The authenticated client instance.
 */
export const getGeminiClient = (): GoogleGenAI => {
  if (!geminiClientInstance) {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        console.error("[Gemini Client] Critical Error: API_KEY is undefined.");
        throw new Error("Kunci Akses API (API Key) tidak ditemukan. Harap pastikan Anda telah mengonfigurasi variabel lingkungan 'API_KEY' di file .env atau panel deployment.");
    }
    
    geminiClientInstance = new GoogleGenAI({ apiKey });
  }
  return geminiClientInstance;
};

/**
 * Generates structured data (JSON) from the Gemini API with built-in resilience.
 * 
 * Features:
 * - Automatic Retry (Exponential Backoff) for transient errors (429, 503).
 * - Strict JSON Parsing wrapper.
 * - Localized Error Handling for UI display.
 * 
 * @template T The expected interface of the response object.
 * @param {string} modelId The model identifier (e.g., 'gemini-2.0-flash').
 * @param {string} promptText The main content prompt.
 * @param {GenerateContentConfig} config Configuration options (schema, temperature).
 * @param {string} contextDescription Description of the operation for logging/error context (e.g., "generating SEO").
 * @returns {Promise<T>} The parsed and validated JSON object.
 */
export async function generateStructuredContent<T>(
    modelId: string,
    promptText: string,
    config: GenerateContentConfig,
    contextDescription: string
): Promise<T> {
    // Wrap API call in retry logic to handle transient network/server errors
    return executeWithRetry(async () => {
        try {
            const client = getGeminiClient();
            
            const response = await client.models.generateContent({
                model: modelId,
                contents: promptText,
                config: config
            });

            // Guard Clause: Ensure text exists
            const rawText = response.text;
            if (!rawText) {
                throw new Error(`Respons AI kosong saat ${contextDescription}. Kemungkinan terblokir oleh filter keamanan.`);
            }

            // Parse Logic: Robustly extract JSON from potential Markdown wrapping
            const parsedData = safeJsonParse<T>(rawText);
            
            if (!parsedData) {
                console.warn(`[Gemini Client] JSON Parse Failed for: ${contextDescription}. Raw text: ${rawText.substring(0, 100)}...`);
                throw new Error("Format output AI tidak valid (Gagal parsing JSON). Silakan coba lagi.");
            }
            
            return parsedData;

        } catch (error) {
            // Transform technical errors into user-friendly messages immediately
            const friendlyMessage = getApiErrorMessage(error, contextDescription);
            // Re-throw with the friendly message so the UI can display it directly
            throw new Error(friendlyMessage);
        }
    }, 3, 1500); // Retry up to 3 times, starting with a 1.5s delay
}
