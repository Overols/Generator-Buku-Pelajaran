
/**
 * PedagogyEngine
 * Domain: Educational Logic
 * Responsibility: Memetakan Tingkat Kelas (Grade) ke Instruksi Pedagogis.
 * Status: Atomic & Pure Function.
 */
export class PedagogyEngine {
    
    public static getInstructionByGrade(grade: string): string {
        const g = grade.toLowerCase();
        
        // Fase Fondasi (PAUD/TK)
        if (g.match(/paud|tk|ra /)) {
            return `
**LEVEL: FASE FONDASI (Usia Dini)**
1. **GAYA BAHASA:** Sangat lisan, ceria, sapaan "Anak-anak".
2. **KOMPLEKSITAS:** Kalimat tunggal (5-7 kata).
3. **METODE:** Analogi benda konkret, hindari definisi abstrak.`;
        }

        // Fase A (Kelas 1-2)
        if (g.match(/kelas 1|kelas 2|fase a/)) {
            return `
**LEVEL: FASE A (Literasi Dasar)**
1. **GAYA BAHASA:** Membimbing, sapaan "Adik-adik/Teman-teman".
2. **KOMPLEKSITAS:** Kalimat pendek (SPO), hindari anak kalimat.
3. **METODE:** Contoh konkret, kosakata dasar, instruksi langkah-demi-langkah.`;
        }

        // Fase B (Kelas 3-4)
        if (g.match(/kelas 3|kelas 4|fase b/)) {
            return `
**LEVEL: FASE B (Pengembangan)**
1. **GAYA BAHASA:** Naratif (Storytelling), sapaan "Kalian".
2. **KOMPLEKSITAS:** Kalimat majemuk setara.
3. **METODE:** Jembatan konkret ke abstrak, analogi sehari-hari.`;
        }

        // Fase C (Kelas 5-6)
        if (g.match(/kelas 5|kelas 6|fase c/)) {
            return `
**LEVEL: FASE C (Pemantapan)**
1. **GAYA BAHASA:** Formal komunikatif.
2. **KOMPLEKSITAS:** Paragraf deduktif/induktif standar.
3. **METODE:** Kausalitas (Sebab-Akibat), berpikir kritis dasar (HOTS).`;
        }

        // Fase D (SMP)
        if (g.match(/smp|mts|fase d/)) {
            return `
**LEVEL: FASE D (Remaja Awal)**
1. **GAYA BAHASA:** Semi-formal, relevan dengan dunia remaja.
2. **KOMPLEKSITAS:** Logika multiperspektif.
3. **METODE:** Hubungkan dengan isu terkini/teknologi, definisi operasional.`;
        }

        // Fase E/F (SMA)
        if (g.match(/sma|smk|ma |fase e|fase f/)) {
            return `
**LEVEL: FASE E/F (Pra-Dewasa)**
1. **GAYA BAHASA:** Akademis, analitis.
2. **KOMPLEKSITAS:** Analisis, sintesis, evaluasi.
3. **METODE:** Berbasis data/ilmiah, problem solving kompleks.`;
        }
        
        return "Gunakan bahasa buku teks siswa standar Indonesia (PUEBI).";
    }
}
