
export type Tab = 'overview' | 'engines' | 'modes' | 'prompting' | 'workflow';

export interface NavItem {
    id: Tab;
    label: string;
    icon: string;
    desc: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'Tentang Aplikasi', icon: '🇮🇩', desc: 'Filosofi Pena Pendidikan' },
    { id: 'engines', label: 'Jenis Output', icon: '📚', desc: 'Buku Teks, Modul Ajar, LKS' },
    { id: 'modes', label: 'Mode Input', icon: '🎛️', desc: 'Buat Baru vs Perbaiki Materi' },
    { id: 'prompting', label: 'Cara Instruksi', icon: '✍️', desc: 'Tips Input CP/KD & Topik' },
    { id: 'workflow', label: 'Alur Kerja', icon: '🔄', desc: 'Menyusun Bab demi Bab' },
];
