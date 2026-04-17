
import { WritingStyle } from '../../models/PromptConfig';
import { SubjectDomainService } from '../logic/SubjectDomainService';
import { 
    TEXTBOOK_STRUCTURE, 
    ARABIC_TEXTBOOK_STRUCTURE, 
    MODUL_AJAR_STRUCTURE, 
    LKS_STRUCTURE,
    VIDEO_SCRIPT_STRUCTURE,
    ENRICHMENT_STRUCTURE,
    POPULAR_ARTICLE_STRUCTURE,
    PTN_PREP_STRUCTURE // Verified Import
} from '../../constants/educationPrompts';

/**
 * StructureRepository
 * Domain: Data Access
 * Responsibility: Menyediakan template struktur yang tepat berdasarkan jenis output dan mapel.
 */
export class StructureRepository {
    
    private static readonly MAPPING: Record<WritingStyle, string> = {
        'Buku Teks Pelajaran': TEXTBOOK_STRUCTURE,
        'Modul Ajar / RPP': MODUL_AJAR_STRUCTURE,
        'Lembar Kerja Siswa (LKS)': LKS_STRUCTURE,
        'Naskah Video Pembelajaran': VIDEO_SCRIPT_STRUCTURE,
        'Buku Pengayaan / Non-Fiksi': ENRICHMENT_STRUCTURE,
        'Artikel Populer Pendidikan': POPULAR_ARTICLE_STRUCTURE,
        'Buku Persiapan PTN / UTBK': PTN_PREP_STRUCTURE
    };

    /**
     * Mengambil template struktur.
     * Mengandung logika override khusus untuk mapel Bahasa Arab/Agama pada Buku Teks.
     */
    public static getTemplate(style: WritingStyle, subjectName: string): string {
        // Logika Khusus: Buku Teks Mapel Islam menggunakan struktur Khas Arab (Istima', Kalam, Qira'ah)
        if (style === 'Buku Teks Pelajaran' && SubjectDomainService.isIslamicSubject(subjectName)) {
            return ARABIC_TEXTBOOK_STRUCTURE;
        }

        return this.MAPPING[style] || TEXTBOOK_STRUCTURE;
    }
}
