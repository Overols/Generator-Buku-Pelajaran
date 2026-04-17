
import { PromptConfig } from '../../models/PromptConfig';

/**
 * OpeningProtocolEngine
 * Domain: Business Logic
 * Responsibility: Menentukan protokol pembukaan naskah berdasarkan Institusi dan Bab.
 * 
 * Aturan Bisnis:
 * 1. Sekolah Umum: DILARANG ada salam keagamaan/Bismillah.
 * 2. Madrasah (Bab 1): WAJIB ada Bismillah, Salam, dan Doa.
 * 3. Madrasah (Bab > 1): DILARANG mengulang salam pembuka (Continuity).
 */
export class OpeningProtocolEngine {
    
    public static getDirective(config: PromptConfig): string {
        const isMadrasah = config.targetAudience === 'Madrasah (Kemenag)';
        const isFirstChapter = config.eduChapter === 1;

        // KASUS 1: Sekolah Umum (Kemendikbud)
        // Strict Nasionalis: Langsung ke materi.
        if (!isMadrasah) {
            return `
**PROTOKOL PEMBUKAAN (SEKOLAH UMUM):**
1. **DILARANG** menggunakan "Bismillahirrahmanirrahim" atau Salam Keagamaan (seperti Assalamu'alaikum).
2. **LANGSUNG FOKUS:** Mulai langsung dengan Judul Bab dan Apersepsi (Pemicu Minat) yang relevan secara akademis.`;
        }

        // KASUS 2: Madrasah (Kemenag) - BAB 1
        // Wajib identitas keislaman lengkap di awal buku.
        if (isFirstChapter) {
            return `
**PROTOKOL PEMBUKAAN (KHUSUS MADRASAH - BAB 1):**
1. **BISMILLAH:** Awali naskah paling atas dengan "Bismillahirrahmanirrahim" (Teks Arab atau Latin).
2. **SALAM:** Berikan paragraf pembuka "Assalamu'alaikum" yang hangat, menyapa siswa, dan perkenalan singkat.
3. **DOA:** Ajak siswa berdoa sebelum belajar.`;
        } 
        
        // KASUS 3: Madrasah (Kemenag) - BAB LANJUTAN
        // Continuity: Tidak boleh mengulang salam pembuka buku agar alur tidak putus.
        return `
**PROTOKOL PEMBUKAAN (MADRASAH - BAB LANJUTAN):**
1. **LANGSUNG JUDUL:** DILARANG mengulang Bismillah atau Salam Pembuka (Assalamu'alaikum). Ini adalah kelanjutan bab sebelumnya.
2. **TRANSISI:** Langsung mulai dengan Judul Bab dan kalimat penghubung (Bridge) dari materi sebelumnya.`;
    }
}
