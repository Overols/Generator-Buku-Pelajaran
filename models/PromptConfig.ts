
// Domain: Education Configuration Types
// Scope: Strictly Indonesian K-12 Education (Kemendikbud & Kemenag)

export type TargetRegion = 'Indonesia'; // Locked strictly

export type TargetAudience = 
  | 'Sekolah Umum (Kemendikbud)' 
  | 'Madrasah (Kemenag)';

export type Tone = 
  | 'Edukatif & Memotivasi' 
  | 'Formal & Akademis' 
  | 'Santai & Ramah Anak' 
  | 'Instruktif (Langkah demi Langkah)'
  | 'Kritis & Analitis';

export type WritingStyle = 
  | 'Buku Teks Pelajaran' 
  | 'Modul Ajar / RPP' 
  | 'Lembar Kerja Siswa (LKS)' 
  | 'Buku Pengayaan / Non-Fiksi' 
  | 'Artikel Populer Pendidikan' 
  | 'Naskah Video Pembelajaran'
  | 'Buku Persiapan PTN / UTBK'; // NEW: UTBK Style

export type InputMode = 'generate' | 'refine';

export type EducationSubject = 
  | 'Bahasa Indonesia' | 'Matematika' | 'IPA (Sains)' | 'IPS (Sosial)' 
  | 'Bahasa Inggris' | 'PPKn' | 'Sejarah' | 'Informatika' | 'Seni Budaya' | 'Pendidikan Agama Islam' 
  | 'Al-Qur\'an Hadis' | 'Akidah Akhlak' | 'Fikih' | 'Sejarah Kebudayaan Islam (SKI)' | 'Bahasa Arab'
  // UTBK Specific Subjects
  | 'TPS - Penalaran Umum' | 'TPS - Pengetahuan Kuantitatif' | 'TPS - Pemahaman Bacaan (PPU/KBM)'
  | 'Literasi Bahasa Indonesia' | 'Literasi Bahasa Inggris' | 'Penalaran Matematika'
  | 'Umum/Lainnya';

export type CurriculumType = 'Kurikulum Merdeka' | 'Kurikulum 2013 (K-13)' | 'Kurikulum Madrasah (Kemenag)';

/**
 * Composition Root for Prompt Configuration.
 */
export interface PromptConfig {
    // --- Base Logic ---
    inputMode: InputMode;
    prompt: string; // Topik Utama / Judul Buku
    chapterFocus?: string; // NEW: Arahan Spesifik Bab Ini
    existingDraft?: string;
    previousContext?: string;
    
    // --- Linguistic & Style Configuration ---
    writingStyle: WritingStyle;
    tone: Tone;
    targetAudience: TargetAudience | string;
    targetRegion: TargetRegion; // Always 'Indonesia'

    // --- Advanced Texture/Logic ---
    paragraphLength: string;
    syntaxComplexity: string;
    showDontTell: string;
    
    // --- Numeric Constraints ---
    minWordCount: number;
    imagePlaceholderCount: number;
    includeAnecdotes: boolean;
    citationCount: number;

    // --- Education Engine Specifics (Core Domain) ---
    eduSubject: EducationSubject;
    customEduSubject?: string; 
    eduCurriculum: CurriculumType;
    eduChapter: number;
    eduCompetency: string; 
    eduGrade: string; 
    sourceMaterial?: string;
    useStrictFactMode: boolean;
    includeBibliography: boolean; // NEW: Manual Toggle

    // --- Legacy / Compatibility Fields ---
    chapterRoadmap?: string;
}

export type GenerationRequest = PromptConfig;
export type ArticleGenerationOptions = GenerationRequest;
