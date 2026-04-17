
/**
 * Utility: Exponential Backoff Retry Strategy
 * Responsibility: Executes a promise-returning function with automatic retries on transient failures.
 * 
 * Strategy:
 * - Attempt 1: Immediate
 * - Fail -> Wait 1000ms -> Attempt 2
 * - Fail -> Wait 2000ms -> Attempt 3
 * - Fail -> Wait 4000ms -> Attempt 4 (Max)
 * 
 * @template T The return type of the operation.
 * @param {() => Promise<T>} operation - The async operation to execute (e.g., API call).
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3).
 * @param {number} baseDelay - Initial delay in ms before the first retry (default: 1000).
 * @returns {Promise<T>} The result of the operation.
 * @throws {Error} The last error encountered if all retries fail.
 */
export async function executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error: any) {
            lastError = error;
            
            // Critical Optimization: 
            // Don't retry on client errors (400 Bad Request) or Safety Blocks (Policy).
            // Retrying these will just result in the same error and waste time/quota.
            // Only retry on Server Errors (5xx), Rate Limits (429), or Network Flukes.
            const isRetryable = 
                error.status === 429 || 
                error.status === 503 || 
                error.status === 500 ||
                (error.message && error.message.includes('fetch failed'));

            // If it's not a retryable error, or we hit the limit, throw immediately.
            if (!isRetryable || attempt === maxRetries) {
                throw error;
            }

            // Calculate delay: base * 2^attempt
            const delay = baseDelay * Math.pow(2, attempt);
            
            // Optional: Log the retry for observability
            console.warn(`[Retry System] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delay}ms... Reason: ${error.message}`);
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}
