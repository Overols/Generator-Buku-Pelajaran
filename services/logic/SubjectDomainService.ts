
import { EducationSubject } from '../../models/PromptConfig';

/**
 * SubjectDomainService
 * Domain: Education Logic
 * Responsibility: Handles business logic related to Subject characteristics.
 */
export class SubjectDomainService {
    
    private static readonly ISLAMIC_SUBJECTS = new Set([
        'Bahasa Arab', 
        'Al-Qur\'an Hadis', 
        'Akidah Akhlak', 
        'Fikih', 
        'Sejarah Kebudayaan Islam (SKI)', 
        'Pendidikan Agama Islam'
    ]);

    /**
     * Determines if a subject requires specific Madrasah/Kemenag protocols.
     */
    public static isIslamicSubject(subject: string): boolean {
        return this.ISLAMIC_SUBJECTS.has(subject);
    }

    /**
     * Resolves the effective subject name.
     * Uses 'customEduSubject' if the 'Umum/Lainnya' option is selected.
     */
    public static getEffectiveSubjectName(
        selectedSubject: EducationSubject | string, 
        customSubject?: string
    ): string {
        if (selectedSubject === 'Umum/Lainnya' && customSubject?.trim()) {
            return customSubject.trim();
        }
        return selectedSubject;
    }

    /**
     * Sanitizes subject name for filesystem usage.
     * Example: "Bahasa Indonesia" -> "BahasaIndonesia"
     */
    public static formatForFilename(subjectName: string): string {
        return subjectName.replace(/[^a-zA-Z0-9]/g, '');
    }
}
