import { PromptConfig } from '../../models/PromptConfig';
import { IPromptStrategy } from './types';
import { INDONESIAN_EDUCATION_STANDARD } from '../linguistics/IndonesianStandard';

/**
 * BaseStrategy
 * Abstract Class untuk semua strategi konten.
 * Refactored: Menghapus ketergantungan pada LocalizationEngine.
 * Prinsip: YAGNI (You Aren't Gonna Need It) - Kita hanya butuh Indonesia sekarang.
 */
export abstract class BaseStrategy implements IPromptStrategy {
    constructor(protected config: PromptConfig) {}

    abstract buildPersona(): string;
    abstract buildStructure(): string;

    /**
     * Menghitung estimasi distribusi kata per bagian untuk pacing yang baik.
     */
    protected getWordDistribution() {
        const total = this.config.minWordCount; 
        return {
            intro: Math.floor(total * 0.15),
            body: Math.floor(total * 0.75), 
            conc: Math.floor(total * 0.10),
            subSection: Math.floor((total * 0.75) / 3) 
        };
    }

    /**
     * Mengembalikan aturan bahasa baku Indonesia (PUEBI).
     * Hardcoded karena aplikasi ini spesifik region Indonesia.
     */
    public buildLanguageConstraints(): string {
        return INDONESIAN_EDUCATION_STANDARD;
    }

    /**
     * Membangun instruksi validasi fakta (Google Search Grounding).
     */
    public buildResearchDirectives(): string {
        // Jika user meminta sitasi ATAU mode fakta ketat (default pendidikan)
        if (this.config.citationCount > 0 || this.config.useStrictFactMode) {
            return `**PROTOKOL RISET & VALIDASI (WAJIB):**
1. **Pencarian Wajib:** Gunakan Google Search untuk mencari fakta terkini, data statistik, atau dalil yang valid.
2. **Anti-Halusinasi:** Dilarang mengarang tahun sejarah, rumus kimia, atau ayat kitab suci.
3. **Sitasi:** ${this.config.citationCount > 0 ? `Sertakan minimal **${this.config.citationCount} sumber valid/URL** di output akhir.` : 'Verifikasi setiap klaim faktual.'}`;
        }
        
        return "**RISET:** Gunakan knowledge base internal. Pastikan logika penjelasan runtut dan benar secara keilmuan.";
    }
}