import React from 'react';

export const WorkflowTab: React.FC = () => (
    <div className="space-y-8 animate-fade-in">
        <header>
            <h1 className="text-3xl font-bold text-white mb-2">Alur Kerja (Workflow)</h1>
            <p className="text-lg text-gray-400">Panduan langkah demi langkah menyusun Buku Teks yang koheren antar-bab.</p>
        </header>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <ol className="relative space-y-10 border-l-2 border-indigo-900 ml-3">
                <li className="pl-8 relative">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-gray-900"></span>
                    <h4 className="text-lg font-bold text-white mb-1">Langkah 1: Konfigurasi Identitas</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Pilih <strong>Institusi</strong> (Menentukan protokol salam/doa) dan <strong>Kelas</strong> (Menentukan gaya bahasa).
                        <br/>
                        <em>Tips:</em> Jika memilih Madrasah, Bab 1 akan otomatis dimulai dengan Bismillah.
                    </p>
                </li>

                <li className="pl-8 relative">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-gray-900"></span>
                    <h4 className="text-lg font-bold text-purple-300 mb-1">Langkah 2: Input Materi & Roadmap</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Masukkan Topik Bab. Buka panel <strong>"Manajer Konteks"</strong> untuk mengisi <em>Chapter Roadmap</em> (Rencana Bab). 
                        Ini membantu AI mengetahui posisi bab ini dalam keseluruhan buku.
                    </p>
                </li>
                
                <li className="pl-8 relative">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900"></span>
                    <h4 className="text-lg font-bold text-blue-300 mb-1">Langkah 3: Generate & Review</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Klik <strong>"Buat Konten"</strong>. Periksa hasil, terutama bagian kutipan sumber dan istilah teknis.
                        Gunakan tombol <strong>Ekspor (DOCX)</strong> untuk menyimpan hasil bab ini.
                    </p>
                </li>

                <li className="pl-8 relative">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-gray-900"></span>
                    <h4 className="text-lg font-bold text-emerald-300 mb-1">Langkah 4: Lanjut Bab (Continuity Bridge)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        <strong>JANGAN RESET HALAMAN!</strong> Klik tombol <span className="text-indigo-400 font-bold border border-indigo-400/30 px-1 rounded mx-1">Lanjut (Rangkum)</span>.
                        <br/>
                        Sistem akan menjalankan <em>Forensic Audit</em> pada bab saat ini dan menyimpannya ke memori. Bab selanjutnya (misal Bab 2) akan tahu apa yang sudah diajarkan di Bab 1.
                    </p>
                </li>

                <li className="pl-8 relative">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-500 border-4 border-gray-900"></span>
                    <h4 className="text-lg font-bold text-gray-200 mb-1">Langkah 5: Simpan Proyek (.json)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Gunakan tombol <strong>"Simpan Proyek"</strong> untuk mem-backup konfigurasi dan memori AI. File ini berisi "Otak" dari buku yang sedang Anda tulis.
                    </p>
                </li>
            </ol>
        </div>
    </div>
);