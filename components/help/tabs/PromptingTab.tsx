
import React from 'react';

export const PromptingTab: React.FC = () => (
    <div className="space-y-8 animate-fade-in">
        <header>
            <h1 className="text-3xl font-bold text-white mb-2">Tips Input Efektif</h1>
            <p className="text-lg text-gray-400">Kualitas materi ditentukan oleh input CP/KD dan terutama **Materi Referensi** yang Anda berikan.</p>
        </header>

        <div className="space-y-6">
            
            {/* NEW SECTION: MAPEL KUSTOM */}
            <div className="p-5 bg-amber-900/20 rounded-xl border border-amber-500/30">
                <h3 className="text-amber-300 font-bold text-lg mb-3 flex items-center gap-2">
                    <span>💡</span> Tips Mapel Khusus / Muatan Lokal
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                    Jika Mata Pelajaran Anda tidak ada di daftar (misal: <em>Bhs. Sunda, Kewirausahaan, Seni Teater</em>), ikuti langkah ini:
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2 bg-black/20 p-4 rounded-lg">
                    <li>Pada kolom <strong>Mata Pelajaran</strong>, pilih opsi paling bawah: <strong>"Umum/Lainnya"</strong>.</li>
                    <li>Akan muncul kotak input baru. Ketik nama mapel Anda di sana (Contoh: <em>"Prakarya & Kewirausahaan"</em>).</li>
                    <li>Di kolom <strong>Materi Referensi</strong>, berikan konteks lebih detail karena AI mungkin butuh panduan ekstra untuk mapel spesifik.</li>
                </ol>
            </div>

            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <h4 className="text-sm font-bold text-green-300 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Kunci Anti-Halusinasi: Kolom "Materi Referensi"
                </h4>
                <p className="text-sm text-green-100/80 leading-relaxed">
                    Karena fitur <strong>Guardrail selalu ON</strong>, AI akan menolak mengarang fakta yang tidak ia ketahui.
                    <br/><br/>
                    Sangat disarankan untuk <strong>Menyalin (Copy-Paste) ringkasan materi dari Buku Paket atau Silabus Resmi</strong> ke dalam kolom "Materi Referensi".
                    <br/>
                    AI akan menganggap teks tersebut sebagai "Kebenaran Mutlak" dan menyusun narasi berdasarkan data tersebut.
                </p>
            </div>

            {/* EXAMPLE 1: Materi Sejarah */}
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6">
                <h3 className="text-gray-200 font-bold text-lg mb-4 flex items-center gap-2">
                    <span>🏛️</span> Contoh Input: Sejarah (SMA)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Input Kompetensi (CP)</span>
                        <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-300 font-mono border border-gray-700">
                            "Peserta didik mampu menganalisis keterkaitan antara peristiwa sejarah global dengan pergerakan nasional Indonesia."
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-sky-400 uppercase">Input Topik & Instruksi</span>
                        <div className="bg-gray-900/50 p-3 rounded text-sm text-sky-300 font-mono border border-sky-500/20">
                            "Topik: Dampak Perang Dunia II terhadap Kemerdekaan RI.
                            Fokus: Vacuum of Power.
                            Instruksi: Jelaskan kronologi menyerahnya Jepang hingga Proklamasi."
                        </div>
                    </div>
                </div>
            </div>

            {/* EXAMPLE 2: Materi Fikih MI */}
            <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-6">
                <h3 className="text-gray-200 font-bold text-lg mb-4 flex items-center gap-2">
                    <span>🕌</span> Contoh Input: Fikih (MI Kelas 3)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Input Kompetensi (KD)</span>
                        <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-300 font-mono border border-gray-700">
                            "3.1 Memahami ketentuan shalat sunnah rawatib."
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-sky-400 uppercase">Input Topik & Instruksi</span>
                        <div className="bg-gray-900/50 p-3 rounded text-sm text-sky-300 font-mono border border-sky-500/20">
                            "Topik: Shalat Sunnah Rawatib.
                            Gaya Bahasa: Ramah anak, gunakan cerita pendek tentang Budi yang rajin ke masjid.
                            Tekankan perbedaan Muakkad dan Ghairu Muakkad."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
