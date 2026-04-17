
// DEPRECATED FILE: All constants moved to constants/options.ts to prevent circular dependencies.
// Re-exporting for safety.

export { 
    TONE_DESCRIPTIONS, 
    WRITING_STYLE_DESCRIPTIONS, 
    SHOW_DONT_TELL_DESCRIPTIONS,
    TARGET_AUDIENCE_DESCRIPTIONS
} from './options';

export const TARGET_REGION_DESCRIPTIONS: Record<string, string> = {
  'Indonesia': 'Bahasa Indonesia (PUEBI/Standar/Slang). Konteks Lokal Kuat.',
  'United States': 'American English (AP Style).',
  'Europe': 'British English/EU Standards.',
  'Global': 'International English.',
  'Asia': 'Asian Context.'
};

// Legacy placeholders to prevent crashes if imported elsewhere
export const PARAGRAPH_LENGTH_DESCRIPTIONS: Record<string, string> = {
    'Short': 'Singkat.',
    'Medium': 'Sedang.',
    'Long': 'Panjang.'
};

export const SYNTAX_COMPLEXITY_DESCRIPTIONS: Record<string, string> = {
    'Simple': 'Sederhana.',
    'Varied': 'Bervariasi.',
    'Complex': 'Rumit.'
};

export const EDITORIAL_STANCE_DESCRIPTIONS: Record<string, string> = {
    'Neutral / Objective': 'Balanced coverage of all sides.',
    'Controversial / Provocative': 'Challenges the status quo.',
    'Investigative / Deep Dive': 'Focus on hidden facts and systems.',
    'Opinionated / Strong Voice': 'Clear personal stance and advocacy.'
};
