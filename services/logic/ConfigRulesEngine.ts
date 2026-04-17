
import { State } from '../../models/StateTypes';
import { GRADE_MAP, K12_SUBJECTS, UTBK_SUBJECTS } from '../../constants/options';

/**
 * ConfigRulesEngine
 * Domain: Business Logic / Rules
 * Responsibility: Enforces consistency, safety defaults, and side-effects.
 * Principle: Single Responsibility (Deciding WHAT happens when config changes).
 */
export class ConfigRulesEngine {
    
    /**
     * Calculates state mutations based on field updates.
     * Centralizes all "If user clicks X, then set Y and Z" logic.
     */
    public static normalizeFieldUpdate(currentState: State, field: string, value: any): Partial<State> {
        const updates: any = { [field]: value };

        // RULE 1: Institution Change Side Effects
        if (field === 'targetAudience') {
            const validGrades = GRADE_MAP[value] || GRADE_MAP['Sekolah Umum (Kemendikbud)'];
            
            // Check context: If UTBK Mode, default to High School/Gap Year, else default to Lowest Grade
            const isUtbk = currentState.writingStyle === 'Buku Persiapan PTN / UTBK';
            
            if (isUtbk) {
                // Logic: UTBK is for final year or alumni
                if (value === 'Madrasah (Kemenag)') {
                    updates.eduGrade = 'Kelas 12 MA (Fase F)';
                } else {
                    updates.eduGrade = 'Gap Year / Alumni';
                }
            } else {
                updates.eduGrade = validGrades[0]; // Reset to PAUD/TK (Base)
            }

            if (value === 'Madrasah (Kemenag)') {
                updates.eduCurriculum = 'Kurikulum Madrasah (Kemenag)';
            } else {
                updates.eduCurriculum = 'Kurikulum Merdeka';
            }
        }

        // RULE 2: Grade Validation (Direct Change)
        if (field === 'eduGrade') {
            const currentAudience = currentState.targetAudience as string;
            const validGrades = GRADE_MAP[currentAudience] || [];
            if (!validGrades.includes(value)) {
                updates.eduGrade = validGrades[0];
            }
        }

        // RULE 3: Subject Specifics
        if (field === 'eduSubject' && value !== 'Umum/Lainnya') {
            updates.customEduSubject = '';
        }

        // RULE 4: UTBK Mode Auto-Switch (NEW)
        // Jika user pindah ke Buku PTN, ganti mapel ke subtes UTBK default.
        // Jika pindah balik ke Buku Sekolah, ganti ke mapel sekolah default.
        if (field === 'writingStyle') {
            const isUtbk = value === 'Buku Persiapan PTN / UTBK';
            
            // Cek apakah subject saat ini valid untuk mode baru
            const currentSubject = currentState.eduSubject;
            
            if (isUtbk) {
                // 1. Auto-switch Mapel
                // @ts-ignore
                if (!UTBK_SUBJECTS.includes(currentSubject)) {
                    updates.eduSubject = UTBK_SUBJECTS[0]; // Default: Penalaran Umum
                }
                
                // 2. Auto-switch Grade (Irrelevant/Max Level)
                const audience = currentState.targetAudience;
                if (audience === 'Madrasah (Kemenag)') {
                    updates.eduGrade = 'Kelas 12 MA (Fase F)';
                } else {
                    updates.eduGrade = 'Gap Year / Alumni';
                }

            } else {
                // Switch back to School Mode
                // @ts-ignore
                if (!K12_SUBJECTS.includes(currentSubject)) {
                    updates.eduSubject = K12_SUBJECTS[0]; // Default: Bhs Indonesia
                }
                // Grade remains as is (user might have set it), or handled by validation if invalid.
            }
        }

        return updates;
    }

    /**
     * Mendapatkan opsi kelas yang valid berdasarkan state saat ini.
     */
    public static getValidGrades(targetAudience: string): string[] {
        return GRADE_MAP[targetAudience] || GRADE_MAP['Sekolah Umum (Kemendikbud)'];
    }
}
