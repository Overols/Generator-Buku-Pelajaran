
import { State } from '../models/StateTypes';
import { parseUrlState } from '../utils/urlUtils';
import { loadAutoSave } from '../utils/storageUtils';

/**
 * Initial State Configuration
 * Single Source of Truth untuk nilai default aplikasi.
 * 
 * STRICT LOCALIZATION:
 * Semua default diatur ke konteks PENDIDIKAN SEKOLAH INDONESIA (Kemendikbud/Kemenag).
 */
export const DEFAULT_STATE: State = {
  // --- Input Layer ---
  inputMode: 'generate',
  prompt: '',
  chapterFocus: '', // Default kosong
  existingDraft: '',
  previousContext: '',
  
  // --- Output Constraints ---
  citationCount: 0,
  imagePlaceholderCount: 2, 
  minWordCount: 800,
  includeAnecdotes: true,
  includeBibliography: false, // Default false (Manual Check)
  
  // --- Advanced Texture ---
  paragraphLength: 'Medium',
  syntaxComplexity: 'Varied',
  showDontTell: 'Balanced',

  // --- Education Domain (Indonesian Standard) ---
  targetAudience: 'Sekolah Umum (Kemendikbud)', 
  targetRegion: 'Indonesia', 
  tone: 'Edukatif & Memotivasi',
  writingStyle: 'Buku Teks Pelajaran',
  
  // --- Curriculum Specs ---
  eduSubject: 'Bahasa Indonesia',
  customEduSubject: '', 
  eduCurriculum: 'Kurikulum Merdeka',
  eduChapter: 1,
  eduCompetency: '',
  eduGrade: 'Kelas 7 SMP (Fase D)', 
  sourceMaterial: '',
  useStrictFactMode: true, // ALWAYS ON: Mencegah Halusinasi AI

  // --- Runtime UI State (Do not persist) ---
  article: '',
  finalizedData: null,
  isLoading: false,
  loadingState: null,
  error: null,
  isRevising: false,
  isHumanizing: false,
  isSummarizing: false,
  
  // Legacy
  chapterRoadmap: '',
};

/**
 * Hydrates state from URL params or LocalStorage.
 */
export const getInitialState = (): State => {
  const urlState = parseUrlState(window.location.search);
  const isDirectAccess = Object.keys(urlState).length > 0;
  
  const autoSaveState = isDirectAccess ? {} : loadAutoSave() as Partial<State>;

  return {
    ...DEFAULT_STATE,
    ...autoSaveState,
    ...urlState,
    
    // Safety Overrides
    isLoading: false,
    loadingState: null,
    error: null,
    isRevising: false,
    isHumanizing: false,
    isSummarizing: false,
    article: '', 
    finalizedData: null, 
    useStrictFactMode: true, 
  };
};
