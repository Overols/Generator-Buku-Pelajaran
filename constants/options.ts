
import { 
    Tone, WritingStyle, TargetAudience, 
    EducationSubject, CurriculumType
} from '../models/PromptConfig';

// --- TONE OPTIONS ---
export const TONE_OPTIONS: readonly Tone[] = [
    'Edukatif & Memotivasi',
    'Formal & Akademis',
    'Santai & Ramah Anak',
    'Instruktif (Langkah demi Langkah)',
    'Kritis & Analitis'
];

// --- WRITING STYLE OPTIONS ---
export const WRITING_STYLE_OPTIONS: readonly WritingStyle[] = [
    'Buku Teks Pelajaran',
    'Modul Ajar / RPP',
    'Lembar Kerja Siswa (LKS)',
    'Buku Pengayaan / Non-Fiksi',
    'Artikel Populer Pendidikan',
    'Naskah Video Pembelajaran',
    'Buku Persiapan PTN / UTBK'
];

// --- TARGET AUDIENCE OPTIONS ---
export const TARGET_AUDIENCE_OPTIONS: readonly TargetAudience[] = [
    'Sekolah Umum (Kemendikbud)', 
    'Madrasah (Kemenag)'
];

export const PARAGRAPH_LENGTH_OPTIONS = ['Short', 'Medium', 'Long'];
export const SYNTAX_COMPLEXITY_OPTIONS = ['Simple', 'Varied', 'Complex'];

// --- GRADE MAPPING (K-12 ONLY) ---

export const KEMENDIKBUD_GRADES: string[] = [
    'PAUD/TK (Fase Fondasi)',
    'Kelas 1 SD (Fase A)', 'Kelas 2 SD (Fase A)',
    'Kelas 3 SD (Fase B)', 'Kelas 4 SD (Fase B)',
    'Kelas 5 SD (Fase C)', 'Kelas 6 SD (Fase C)',
    'Kelas 7 SMP (Fase D)', 'Kelas 8 SMP (Fase D)', 'Kelas 9 SMP (Fase D)',
    'Kelas 10 SMA/SMK (Fase E)', 'Kelas 11 SMA/SMK (Fase F)', 'Kelas 12 SMA/SMK (Fase F)',
    'Gap Year / Alumni'
];

export const KEMENAG_GRADES: string[] = [
    'RA (Raudhatul Athfal)',
    'Kelas 1 MI (Fase A)', 'Kelas 2 MI (Fase A)',
    'Kelas 3 MI (Fase B)', 'Kelas 4 MI (Fase B)',
    'Kelas 5 MI (Fase C)', 'Kelas 6 MI (Fase C)',
    'Kelas 7 MTs (Fase D)', 'Kelas 8 MTs (Fase D)', 'Kelas 9 MTs (Fase D)',
    'Kelas 10 MA (Fase E)', 'Kelas 11 MA (Fase F)', 'Kelas 12 MA (Fase F)'
];

export const GRADE_MAP: Record<string, string[]> = {
    'Sekolah Umum (Kemendikbud)': KEMENDIKBUD_GRADES,
    'Madrasah (Kemenag)': KEMENAG_GRADES
};

// --- SUBJECTS SPLIT LIST ---

// 1. Mapel Sekolah (K-12)
export const K12_SUBJECTS: readonly EducationSubject[] = [
    'Bahasa Indonesia', 'Matematika', 'IPA (Sains)', 'IPS (Sosial)',
    'Bahasa Inggris', 'PPKn', 'Sejarah', 'Informatika', 'Seni Budaya', 
    'Pendidikan Agama Islam', 
    'Al-Qur\'an Hadis', 'Akidah Akhlak', 'Fikih', 'Sejarah Kebudayaan Islam (SKI)', 'Bahasa Arab',
    'Umum/Lainnya'
];

// 2. Subtes UTBK SNBT (Entrance Exam)
export const UTBK_SUBJECTS: readonly EducationSubject[] = [
    'TPS - Penalaran Umum', 
    'TPS - Pengetahuan Kuantitatif', 
    'TPS - Pemahaman Bacaan (PPU/KBM)',
    'Literasi Bahasa Indonesia', 
    'Literasi Bahasa Inggris', 
    'Penalaran Matematika',
    'Umum/Lainnya' // Untuk strategi umum campuran
];

// Gabungan untuk Type checking (Legacy)
export const EDUCATION_SUBJECTS: readonly EducationSubject[] = [
    ...K12_SUBJECTS,
    ...UTBK_SUBJECTS
];

export const CURRICULUM_TYPES: readonly CurriculumType[] = [
    'Kurikulum Merdeka', 'Kurikulum 2013 (K-13)', 'Kurikulum Madrasah (Kemenag)'
];

// --- UI DESCRIPTIONS ---

export const WRITING_STYLE_DESCRIPTIONS: Record<string, string> = {
    'Buku Teks Pelajaran': 'Struktur Bab: Apersepsi > Materi Konsep > Contoh > Aktivitas > Rangkuman.',
    'Modul Ajar / RPP': 'Panduan Guru: Tujuan Pembelajaran, Langkah Kegiatan, Asesmen.',
    'Lembar Kerja Siswa (LKS)': 'Fokus Latihan: Soal isian, proyek mini, dan aktivitas eksplorasi.',
    'Buku Pengayaan / Non-Fiksi': 'Materi pendalaman yang lebih naratif dan menarik minat baca.',
    'Artikel Populer Pendidikan': 'Opini atau tips edukasi untuk blog sekolah/media.',
    'Naskah Video Pembelajaran': 'Skrip narasi untuk video explainer konsep.',
    'Buku Persiapan PTN / UTBK': 'Buku Komprehensif (All-in-One): Strategi, Materi Subtes, & Drilling Soal.'
};

export const TONE_DESCRIPTIONS: Record<string, string> = {
    'Edukatif & Memotivasi': 'Jelas, mengajak berpikir, menyemangati.',
    'Formal & Akademis': 'Baku, definisi presisi, objektif.',
    'Santai & Ramah Anak': 'Menggunakan sapaan akrab, analogi sederhana (cocok untuk SD).',
    'Instruktif (Langkah demi Langkah)': 'Direktif, fokus pada prosedur (How-to).',
    'Kritis & Analitis': 'Mengajak siswa mempertanyakan konsep (HOTS).'
};

export const SHOW_DONT_TELL_DESCRIPTIONS: Record<string, string> = {
    'Tell (Expository)': 'Explain facts directly. Efficient.',
    'Balanced': 'Mix of explanation and examples.',
    'Show (Immersive)': 'Use sensory details and narrative. Immersive.'
};

export const TARGET_AUDIENCE_DESCRIPTIONS: Record<string, string> = {
    'Sekolah Umum (Kemendikbud)': 'Standar Nasional Pendidikan.',
    'Madrasah (Kemenag)': 'Integrasi Nilai Islam & Kurikulum Nasional.'
};