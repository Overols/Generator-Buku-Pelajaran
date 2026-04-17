/**
 * Indonesian Education Standard
 * Domain: Linguistics / Compliance
 * Responsibility: Menyimpan aturan baku PUEBI dan gaya bahasa pendidikan Indonesia.
 * 
 * Aturan ini diinjeksikan ke dalam System Instruction untuk menjamin output
 * yang sesuai dengan standar buku teks Kemendikbud/Kemenag.
 */

export const INDONESIAN_EDUCATION_STANDARD = `
**BAHASA & EJAAN (WAJIB):**
1. **BAHASA INDONESIA BAKU (PUEBI):** 
   - Gunakan ejaan resmi: *Risiko* (Bukan Resiko), *Analisis* (Bukan Analisa), *Praktik* (Bukan Praktek), *Napas* (Bukan Nafas).
   - Serapan asing harus dimiringkan (*italic*) jika belum baku.
   - Hindari singkatan teks (yg, dr, dll) kecuali dalam poin-poin tabel.

2. **GAYA BAHASA PENDIDIKAN (PEDAGOGIS):**
   - **Sapaan:** Sesuaikan dengan fase (Adik-adik/Kalian/Anda). Jangan gunakan "Sobat" atau sapaan gaul berlebihan.
   - **Struktur Kalimat:** Subjek-Predikat-Objek (SPO) yang jelas. Hindari kalimat majemuk bertingkat lebih dari 2 klausa untuk level SD/SMP.
   - **Anti-Indoglish:** 
     - DILARANG: "Yang mana" (which is), "Dimana" (sebagai kata hubung tempat abstrak).
     - DILARANG: "Melakukan pembelajaran" -> Ganti: "Belajar".
     - DILARANG: "Memberikan penekanan" -> Ganti: "Menekankan".

3. **LARANGAN KERAS (SAFETY & ETHICS):**
   - Tidak boleh mengandung SARA, kekerasan, pornografi, atau bias gender.
   - Materi harus inklusif dan mencerminkan nilai Profil Pelajar Pancasila (Gotong royong, Mandiri, Bernalar Kritis).
`;