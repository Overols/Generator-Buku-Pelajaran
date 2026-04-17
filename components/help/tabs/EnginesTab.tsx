import React from 'react';

const EngineCard: React.FC<{ 
    icon: string; 
    title: string; 
    colorClass: string; 
    bgClass: string; 
    borderClass: string;
    children: React.ReactNode 
}> = ({ icon, title, colorClass, bgClass, borderClass, children }) => (
    <div className={`bg-gray-800/40 rounded-xl border ${borderClass} overflow-hidden hover:bg-gray-800/60 transition-colors`}>
        <div className={`${bgClass} p-4 border-b ${borderClass.replace('/30', '/20')} flex items-center gap-3`}>
            <span className="text-2xl">{icon}</span>
            <h3 className={`font-bold ${colorClass}`}>{title}</h3>
        </div>
        <div className="p-6 text-sm text-gray-300">
            {children}
        </div>
    </div>
);

export const EnginesTab: React.FC = () => (
    <div className="space-y-8 animate-fade-in">
        <header>
            <h1 className="text-3xl font-bold text-white mb-2">Jenis Output (Styles)</h1>
            <p className="text-lg text-gray-400">Sistem menggunakan <strong>Structure Repository</strong> untuk memilih template yang tepat berdasarkan Mapel & Institusi.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TEXTBOOK ENGINE */}
            <EngineCard icon="📖" title="Buku Teks Pelajaran" colorClass="text-blue-200" bgClass="bg-blue-900/20" borderClass="border-blue-500/30">
                <p className="mb-3 font-semibold text-blue-100">Cerdas beradaptasi dengan Mata Pelajaran:</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-400">
                    <li><strong>Mapel Umum:</strong> Struktur standar (Apersepsi > Materi > Aktivitas > Rangkuman).</li>
                    <li><strong>Mapel Islam (Kemenag):</strong> Struktur Khas Arab (Istima' > Hiwar > Qira'ah > Tarkib).</li>
                    <li><strong>Fitur:</strong> Kotak "Tahukah Kamu?", Glosarium, dan Daftar Pustaka otomatis.</li>
                </ul>
            </EngineCard>

            {/* MODUL AJAR ENGINE */}
            <EngineCard icon="📝" title="Modul Ajar / RPP" colorClass="text-emerald-200" bgClass="bg-emerald-900/20" borderClass="border-emerald-500/30">
                <p className="mb-3 font-semibold text-emerald-100">Administrasi Guru Lengkap.</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-400">
                    <li>Komponen Inti: Tujuan Pembelajaran (TP) & Pemahaman Bermakna.</li>
                    <li>Skenario: Pendahuluan (Apersepsi) > Inti (Diferensiasi) > Penutup.</li>
                    <li>Asesmen: Rubrik penilaian sikap (Profil Pelajar Pancasila) & pengetahuan.</li>
                </ul>
            </EngineCard>

            {/* LKS ENGINE */}
            <EngineCard icon="🧪" title="Lembar Kerja (LKS)" colorClass="text-amber-200" bgClass="bg-amber-900/20" borderClass="border-amber-500/30">
                <p className="mb-3 font-semibold text-amber-100">Aktivitas Praktis & Inkuiri.</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-400">
                    <li>Fokus pada instruksi kerja step-by-step.</li>
                    <li>Menyediakan kolom/tabel kosong untuk isian siswa.</li>
                    <li>Pertanyaan reflektif di akhir kegiatan.</li>
                </ul>
            </EngineCard>

            {/* VIDEO SCRIPT ENGINE */}
            <EngineCard icon="🎬" title="Naskah Video" colorClass="text-red-200" bgClass="bg-red-900/20" borderClass="border-red-500/30">
                <p className="mb-3 font-semibold text-red-100">Skrip Multimedia.</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-400">
                    <li>Format kolom ganda (Visual vs Audio).</li>
                    <li>Gaya bahasa tutur (Conversational) yang natural.</li>
                    <li>Pembagian segmen: Hook > Intro > Materi > Quiz > Outro.</li>
                </ul>
            </EngineCard>

            {/* BUKU PENGAYAAN */}
            <EngineCard icon="📚" title="Buku Pengayaan" colorClass="text-purple-200" bgClass="bg-purple-900/20" borderClass="border-purple-500/30">
                <p className="mb-3 font-semibold text-purple-100">Literasi Non-Fiksi Kreatif.</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-400">
                    <li>Gaya bercerita (Storytelling) untuk fakta sains/sosial.</li>
                    <li>Menghindari jargon akademis yang berat.</li>
                    <li>Fokus pada penanaman nilai dan wawasan luas.</li>
                </ul>
            </EngineCard>
        </div>
    </div>
);