
import React from 'react';

export const ModesTab: React.FC = () => (
    <div className="space-y-8 animate-fade-in">
        <header>
            <h1 className="text-3xl font-bold text-white mb-2">Dua Mode Penulisan</h1>
            <p className="text-lg text-gray-400">Pilih mode yang sesuai dengan bahan yang Anda miliki.</p>
        </header>
        
        <div className="grid gap-6">
            <div className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-xl border border-sky-500/20 hover:border-sky-500/50 transition-colors">
                <div className="bg-sky-900/30 p-3 rounded-lg text-3xl">✨</div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">1. Buat Baru (Generate)</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        <strong>"Dari CP/KD menjadi Materi Utuh."</strong> <br/>
                        Cocok jika Anda hanya memiliki silabus atau ide topik. AI akan mengembangkan struktur bab, penjelasan, contoh, dan soal latihan dari nol berdasarkan Capaian Pembelajaran yang Anda input.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <div className="bg-purple-900/30 p-3 rounded-lg text-3xl">🛠️</div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">2. Perbaiki/Revisi (Refine)</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        <strong>"Poles Materi Lama."</strong> <br/>
                        Cocok jika Anda sudah memiliki draf tulisan, materi lama, atau catatan kasar.
                        <br/><br/>
                        <strong>Kegunaan:</strong>
                        <ul className="list-disc ml-4 mt-2 space-y-1">
                            <li><strong>Sederhanakan Bahasa:</strong> Ubah materi jurnal yang rumit menjadi bahasa siswa SD.</li>
                            <li><strong>Koreksi PUEBI:</strong> Perbaiki salah ketik dan tata bahasa.</li>
                            <li><strong>Tambah Aktivitas:</strong> Minta AI menambahkan ide kegiatan praktik dari teks teori yang Anda punya.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
