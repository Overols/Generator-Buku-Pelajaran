
// Domain: SEO Configuration
// Extracted from service to adhere to Open/Closed Principle.
// STRICTLY INDONESIAN CONTEXT

export interface SeoRegionContext {
    role: string;
    lang: string;
    descLen: string;
    titleLen: string;
    feedback: string;
}

export const SEO_CONTEXTS: Record<string, SeoRegionContext> = {
    'Indonesia': {
        role: 'Pakar SEO & Copywriter Indonesia (Google.co.id).',
        lang: 'Bahasa Indonesia',
        descLen: 'Maksimal 135 karakter. Kalimat harus utuh/selesai.',
        titleLen: 'Maksimal 60 karakter',
        feedback: 'Feedback singkat Bhs Indonesia.'
    },
    // Fallback always maps to Indonesia for this specific app
    'default': {
        role: 'Pakar SEO & Copywriter Indonesia (Google.co.id).',
        lang: 'Bahasa Indonesia',
        descLen: 'Maksimal 135 karakter. Kalimat harus utuh/selesai.',
        titleLen: 'Maksimal 60 karakter',
        feedback: 'Feedback singkat Bhs Indonesia.'
    }
};
