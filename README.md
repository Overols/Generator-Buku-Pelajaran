# 🇮🇩 Pena Pendidikan v2.0: AI Content Engine Kurikulum Nasional

![Language](https://img.shields.io/badge/Bahasa-Indonesia_(PUEBI)-red) ![Kurikulum](https://img.shields.io/badge/Standar-Merdeka_&_K13-blue) ![Core](https://img.shields.io/badge/Engine-Gemini_3.0_Pro-emerald) ![Domain](https://img.shields.io/badge/Fokus-Pendidikan_K12-orange)

**Pena Pendidikan** adalah sistem orkestrasi konten cerdas yang dirancang khusus untuk ekosistem pendidikan Indonesia. Aplikasi ini menerjemahkan standar pedagogis **Kurikulum Merdeka** dan **Kemenag** menjadi instruksi presisi (prompt) untuk Google Gemini.

---

## 🚀 Fitur Unggulan & Logika Cerdas

### 1. 🏛️ Dual-Mode Institusi (Kemendikbud vs Kemenag)
*   **Opening Protocol Engine:** 
    *   *Sekolah Umum:* Pembukaan langsung ke materi (Nasionalis).
    *   *Madrasah:* Otomatis menyisipkan **Bismillahirrahmanirrahim**, Salam, dan Doa pada Bab 1.
*   **Subject Domain Service:** Deteksi otomatis mapel agama (Fikih, SKI, B. Arab) untuk mengaktifkan **Protokol Aksara Arab Berharakat**.

### 2. 🧠 Pedagogi Adaptif (Fase A-F)
*   **Pedagogy Engine:** Menyesuaikan kompleksitas kalimat dan metode penyampaian berdasarkan Fase Kelas.
    *   *Fase A (SD Kelas 1-2):* Kalimat pendek, konkret, sapaan "Adik-adik".
    *   *Fase F (SMA):* Analitis, abstrak, berbasis data.

### 3. 🌉 Continuity & Context Bridge
*   **Smart Summarizer:** Saat lanjut ke bab berikutnya, AI melakukan "Forensic Audit" pada bab sebelumnya.
*   **Context Injection:** Memastikan AI "ingat" definisi, tokoh, atau konsep yang sudah dijelaskan di bab lalu agar tidak terjadi repetisi atau halusinasi.
*   **Chapter Roadmap:** Mengelola alur buku (Story Bible) agar konsisten dari Bab 1 hingga akhir.

### 4. 🛡️ Guardrails & Validasi Fakta
*   **Strict Fact Mode:** Kolom "Materi Referensi" bertindak sebagai *Single Source of Truth*.
*   **Google Grounding:** Integrasi Google Search untuk memvalidasi data terkini (statistik, tahun sejarah) secara real-time.

### 5. 📚 Variasi Output (Structure Repository)
*   **Buku Teks:** Struktur dinamis (Standard vs Arabic Style).
*   **Modul Ajar (RPP+):** Lengkap dengan TP, ATP, dan Asesmen.
*   **LKS & Pengayaan:** Fokus pada aktivitas inkuiri dan narasi non-fiksi.

---

## 🛠️ Arsitektur Teknis (Clean Architecture)

Aplikasi dibangun dengan prinsip **SOLID** dan pemisahan *concerns* yang ketat:

*   **`/services/logic`**: *Business Logic Layer*.
    *   `OpeningProtocolEngine`: Logika kondisional salam/pembuka.
    *   `PedagogyEngine`: Mapping instruksi berdasarkan grade level.
    *   `SubjectDomainService`: Logika deteksi mapel agama/umum.
*   **`/services/repositories`**: *Data Access*.
    *   `StructureRepository`: Menyimpan template struktur (Textbook, LKS, RPP).
*   **`/services/strategies`**: *Strategy Pattern*.
    *   `TextbookStrategy`: Orchestrator utama yang memanggil Engine dan Repository untuk merakit prompt.
*   **`/services/core`**: *Orchestration Layer*.
    *   `PromptDirector`: Builder pattern untuk menyusun payload final ke Gemini.
    *   `ContinuityBridge`: Mengelola injeksi konteks antar-bab.

---

## 📦 Cara Penggunaan

1.  **Konfigurasi:** Pilih Institusi (Penting! Ini mengubah protokol pembukaan), Kelas, dan Mapel.
2.  **Input:** Masukkan Topik Utama.
3.  **Guardrail:** Tempel ringkasan materi resmi di kolom **Materi Referensi**.
4.  **Manajemen Konteks:** Gunakan tab "Manajer Konteks" untuk melihat apa yang diingat AI dari bab sebelumnya.
5.  **Ekspor:** Unduh ke DOCX/PDF.

---

**Disclaimer:** Alat ini adalah *Asisten Penulisan*. Validasi akhir dan akurasi materi tetap menjadi tanggung jawab Pendidik/Guru.