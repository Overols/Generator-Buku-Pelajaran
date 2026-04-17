
import { BaseStrategy } from './BaseStrategy';
import { PedagogyEngine } from '../logic/PedagogyEngine';
import { OpeningProtocolEngine } from '../logic/OpeningProtocolEngine';
import { SubjectDomainService } from '../logic/SubjectDomainService';
import { StructureRepository } from '../repositories/StructureRepository';
import { 
    EDUCATION_PERSONA, 
    FACT_CHECK_PROTOCOL, 
    ARABIC_SCRIPT_PROTOCOL,
    PTN_PEDAGOGY_PERSONA 
} from '../../constants/educationPrompts';

/**
 * TextbookStrategy
 * Domain: Strategy Layer
 * Responsibility: Merakit instruksi prompt akhir dengan menggabungkan berbagai logika bisnis.
 */
export class TextbookStrategy extends BaseStrategy {
    
    // --- Helper Methods (Internal) ---

    private getAudienceDirective(): string {
        const style = this.config.writingStyle;
        
        // UTBK Specific Handling
        if (style === 'Buku Persiapan PTN / UTBK') {
            return `**TARGET PEMBACA: PEJUANG PTN 2026.** 
            Konteks: Ini adalah **Buku Pintar Komprehensif** yang memuat semua subtes. 
            Saat ini Anda sedang menulis bagian: **${this.config.eduSubject}**.
            Fokus: Penguasaan konsep cepat & trik pengerjaan.`;
        }

        const isStudentFacing = ['Buku Teks Pelajaran', 'Lembar Kerja Siswa (LKS)', 'Buku Pengayaan / Non-Fiksi'].includes(style);
        
        return isStudentFacing
            ? `**TARGET PEMBACA: SISWA.** Gunakan sapaan sesuai Fase Kelas. Gaya naratif & interaktif.`
            : `**TARGET PEMBACA: GURU.** Dokumen administrasi. Gunakan bahasa teknis pedagogis (KKTP/Indikator).`;
    }

    private getReligiousDirective(subject: string): string {
        const isMadrasah = this.config.targetAudience === 'Madrasah (Kemenag)';
        const isReligiousSubject = SubjectDomainService.isIslamicSubject(subject);

        if (!isMadrasah && !isReligiousSubject) return "";

        return `\n**PROTOKOL IMTAQ (KEMENAG):**\n- Integrasikan nilai Akhlakul Karimah.\n- Gunakan istilah Islami.\n${isReligiousSubject ? ARABIC_SCRIPT_PROTOCOL : ""}`;
    }

    private getGroundingDirective(): string {
        if (this.config.sourceMaterial?.trim()) {
            return `\n**📚 SINGLE SOURCE OF TRUTH:**\nReferensi berikut adalah ACUAN UTAMA:\n<REFERENSI>\n${this.config.sourceMaterial}\n</REFERENSI>`;
        }
        if (this.config.useStrictFactMode) {
            return `\n**🛡️ STRICT GUARDRAIL:** Wajib validasi fakta sejarah/sains via Google Search. Dilarang halusinasi.`;
        }
        return "";
    }

    // --- Implementation of IPromptStrategy ---

    public buildPersona(): string {
        const { eduCompetency, eduGrade, writingStyle, eduSubject, customEduSubject, useStrictFactMode } = this.config;
        const subject = SubjectDomainService.getEffectiveSubjectName(eduSubject, customEduSubject);
        const isPtnPrep = writingStyle === 'Buku Persiapan PTN / UTBK';
        
        // Merakit instruksi dari berbagai Engine
        const blocks = [
            // Jika mode PTN, gunakan persona Mentor Bimbel
            isPtnPrep ? PTN_PEDAGOGY_PERSONA : EDUCATION_PERSONA,
            
            `**KONTEKS PENULISAN:**`,
            `- **Mapel/Subtes:** ${subject}`,
            `- **Jenis Output:** ${writingStyle}`,
            `- **Kelas/Fase:** ${eduGrade}`,
            `- **Lingkup Materi:** "${eduCompetency || 'Sesuai Standar'}"`,
            
            `**INSTRUKSI PEDAGOGIS:**`,
            isPtnPrep 
                ? "Gunakan pendekatan 'Smart Learning 2026': Bedah Konsep -> Trik The King -> Latihan Isian Singkat & HOTS."
                : PedagogyEngine.getInstructionByGrade(eduGrade),
            
            `**ATURAN KONTEN & FORMAT:**`,
            this.getAudienceDirective(),
            OpeningProtocolEngine.getDirective(this.config),
            this.getReligiousDirective(subject),
            this.getGroundingDirective(),
            useStrictFactMode ? FACT_CHECK_PROTOCOL : ""
        ];

        return blocks.filter(Boolean).join('\n');
    }

    public buildStructure(): string {
        const { writingStyle, minWordCount, eduChapter, eduSubject, customEduSubject, includeBibliography } = this.config;
        const subject = SubjectDomainService.getEffectiveSubjectName(eduSubject, customEduSubject);
        
        // Delegated to Repository
        const template = StructureRepository.getTemplate(writingStyle, subject);
        
        // Logic: Daftar Pustaka MANUAL (Checklist). 
        // Hanya muncul jika user mencentang 'includeBibliography' (biasanya di bab akhir).
        const showBibliography = includeBibliography
            ? "\n**DAFTAR PUSTAKA:** WAJIB menyertakan Daftar Pustaka lengkap di akhir naskah ini (Format APA/Harvard). Rujuk pada 'Materi Referensi' atau sumber kredibel." 
            : "";

        return `${template}${showBibliography}\n\n**META:** Target ${minWordCount} Kata | Bab ${eduChapter}`;
    }
}
