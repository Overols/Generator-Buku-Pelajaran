import React from 'react';

export const OverviewTab: React.FC = () => (
    <div className="space-y-8 animate-fade-in">
        <header>
            <h1 className="text-3xl font-bold text-white mb-2">Pena Pendidikan: Asisten Cerdas Guru</h1>
            <p className="text-lg text-gray-400">Mesin penyusun perangkat ajar yang memahami Kurikulum Nasional (Kemendikbud & Kemenag) dan Karakteristik Siswa Indonesia.</p>
        </header>

        <div className="bg-gradient-to-r from-sky-900/40 to-blue-900/40 p-6 rounded-xl border border-sky-500/30 mb-6">
             <h3 className="text-lg font-bold text-white mb-2">Filosofi: Konteks Lokal 100%</h3>
             <p className="text-sm text-gray-300 leading-relaxed">
                Aplikasi ini bukan sekadar wrapper AI biasa. Kami menanamkan <strong>"Logic Engines"</strong> yang mematuhi standar birokrasi dan pedagogi Indonesia:
             </p>
             <ul className="mt-3 space-y-2 text-sm text-gray-200">
                <li className="flex gap-2">
                    <span>🏛️</span> 
                    <strong>Dual-Mode Institusi:</strong> Pembedaan otomatis antara gaya <em>Sekolah Umum</em> (Nasionalis) dan <em>Madrasah</em> (Islami).
                </li>
                <li className="flex gap-2">
                    <span>👶</span> 
                    <strong>Adaptasi Fase:</strong> Bahasa untuk siswa SD (Fase A) akan sangat berbeda dengan SMA (Fase F).
                </li>
             </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🕌</span>
                    <h3 className="text-lg font-bold text-emerald-300">Dukungan Kemenag</h3>
                </div>
                <ul className="text-sm text-gray-400 list-disc list-inside space-y-2">
                    <li><strong>Protokol Pembukaan:</strong> Otomatis menyisipkan <em>Bismillah, Salam, dan Doa</em> pada awal buku (Bab 1) khusus mode Madrasah.</li>
                    <li><strong>Aksara Arab:</strong> Untuk mapel Fikih/SKI/B.Arab, materi otomatis menyertakan teks Arab berharakat.</li>
                </ul>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-sky-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🌉</span>
                    <h3 className="text-lg font-bold text-sky-300">Kontinuitas Materi</h3>
                </div>
                <ul className="text-sm text-gray-400 list-disc list-inside space-y-2">
                    <li><strong>Context Bridge:</strong> AI "mengingat" isi bab sebelumnya agar materi tidak tumpang tindih.</li>
                    <li><strong>Chapter Roadmap:</strong> Anda bisa merencanakan alur buku dari awal (Story Bible).</li>
                </ul>
            </div>
        </div>
    </div>
);