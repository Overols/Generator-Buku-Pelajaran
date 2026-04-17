import { WritingStyle } from '../../models/PromptConfig';

/**
 * PlaceholderService
 * Domain: UI Logic
 * Responsibility: Provides dynamic helper text based on the selected engine.
 * Localized: Indonesian (Prioritized).
 */
export class PlaceholderService {
    
    public static getTopicPlaceholder(isGenerate: boolean, style: WritingStyle): string {
        if (!isGenerate) {
            return "Tempel teks Anda di sini. Cth: 'Perbaiki tata bahasa, buat lebih formal, dan perbaiki alur...'";
        }

        switch (style) {
            case 'Buku Teks Pelajaran':
                return "Materi: [Judul Bab]. \nFokus: [Konsep Utama]. \nKonteks: [Kehidupan Sehari-hari].";
            
            case 'Modul Ajar / RPP':
                return "Topik: [Materi Pokok]. \nTujuan: [Apa yang ingin dicapai]. \nMetode: [Problem Based Learning/Project Based].";
            
            case 'Lembar Kerja Siswa (LKS)':
                return "Kegiatan: [Eksperimen/Pengamatan]. \nAlat: [Bahan]. \nOutput: [Laporan/Presentasi].";

            case 'Buku Pengayaan / Non-Fiksi':
                return "Topik: [Fenomena/Tokoh]. \nSudut Pandang: [Inspiratif/Analitis]. \nPesan Moral: [Value].";

            case 'Artikel Populer Pendidikan':
                return "Isu: [Masalah Pendidikan]. \nOpini: [Solusi/Kritik]. \nAudiens: [Guru/Orang Tua].";

            case 'Naskah Video Pembelajaran':
                return "Konsep: [Materi Visual]. \nDurasi: [Estimasi]. \nGaya: [Vlog/Animasi/Presenter].";

            default:
                return "Jelaskan apa yang ingin Anda tulis secara mendetail. Semakin spesifik instruksinya, semakin baik hasilnya...";
        }
    }
}