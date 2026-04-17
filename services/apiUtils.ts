
/**
 * Utility: API Error Handler
 * Responsibility: Parses raw errors from the Gemini API and translates them into
 * localized, actionable messages for the Indonesian user (Education Context).
 * 
 * @param error The raw error object thrown by the API client.
 * @param context A string describing the operation that failed (e.g., "generating article").
 * @returns A user-friendly error message string.
 */
export function getApiErrorMessage(error: any, context: string): string {
    // Log the full error for developer debugging (preserve stack trace in console)
    console.error(`[Gemini API Error] Context: ${context}`, error);

    const errorMessage = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

    // Map error patterns to user-friendly messages
    // Order matters: Specific errors first, generic last.

    // 1. Authentication & Permissions
    if (errorMessage.includes('api key') || errorMessage.includes('403') || errorMessage.includes('permission denied')) {
        return `🔑 Masalah Izin Akses: API Key tidak valid atau tidak memiliki akses. Mohon periksa konfigurasi environment variables Anda. (${context})`;
    }

    // 2. Rate Limiting (429)
    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('resource exhausted')) {
        return `⏳ Server Sedang Sibuk (Rate Limit): Kuota penggunaan API sementara penuh. Mohon tunggu 30-60 detik sebelum mencoba lagi.`;
    }

    // 3. Bad Requests (400)
    if (errorMessage.includes('400') || errorMessage.includes('invalid argument')) {
        return `🚫 Permintaan Ditolak AI: Sistem tidak dapat memproses instruksi ini. Kemungkinan prompt terlalu panjang atau format tidak valid.`;
    }

    // 4. Safety Filters (FinishReason.SAFETY)
    if (errorMessage.includes('blocked') || errorMessage.includes('safety') || errorMessage.includes('harm') || errorMessage.includes('finishreason')) {
        return `🛡️ Intervensi Keamanan Konten: AI menolak menghasilkan teks ini karena terdeteksi potensi konten sensitif (SARA/Kekerasan/Eksplisit) yang tidak sesuai untuk lingkungan sekolah.`;
    }

    // 5. Network / Connectivity
    if (errorMessage.includes('fetch failed') || errorMessage.includes('network') || errorMessage.includes('connection') || errorMessage.includes('offline')) {
        return `📡 Gangguan Koneksi Internet: Tidak dapat terhubung ke server Google AI. Mohon periksa koneksi internet, DNS, atau VPN Anda.`;
    }
    
    // 6. Server Errors (5xx)
    if (errorMessage.includes('503') || errorMessage.includes('500') || errorMessage.includes('internal') || errorMessage.includes('overloaded')) {
        return `🔥 Gangguan Server Google: Layanan Gemini sedang mengalami gangguan sementara (Overloaded). Silakan coba lagi dalam beberapa menit.`;
    }

    // 7. Cancellation
    if (errorMessage.includes('aborted') || errorMessage.includes('cancelled')) {
        return `Proses dibatalkan oleh pengguna.`;
    }

    // Fallback for generic errors
    return `⚠️ Kesalahan Sistem Tak Terduga: ${error.message || 'Terjadi kesalahan teknis'}. Silakan muat ulang halaman. (${context})`;
}
