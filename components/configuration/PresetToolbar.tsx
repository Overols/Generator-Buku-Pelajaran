
import React from 'react';

interface PresetToolbarProps {
    onExport: () => void;
    onImport: () => void;
    onReset: () => void;
    isLoading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * PresetButton Component
 * Tombol aksi dengan gaya visual yang konsisten.
 */
const PresetButton = ({ onClick, disabled, iconPath, label, color, description }: { onClick: () => void, disabled: boolean, iconPath: string, label: string, color: 'blue' | 'green' | 'red', description?: string }) => {
    const colors = {
        blue: 'bg-blue-900/20 text-blue-300 border-blue-500/30 hover:bg-blue-900/40 hover:border-blue-400',
        green: 'bg-emerald-900/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/40 hover:border-emerald-400',
        red: 'bg-red-900/10 text-red-300 border-red-500/20 hover:bg-red-900/30 hover:border-red-400'
    };

    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            title={description}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide rounded-lg border transition-all shadow-sm ${colors[color]} disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap`}
        >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
            {label}
        </button>
    );
};

/**
 * PresetToolbar
 * Dashboard utama untuk manajemen file proyek buku.
 */
export const PresetToolbar: React.FC<PresetToolbarProps> = React.memo(({ onExport, onImport, onReset, isLoading, fileInputRef, handleImport }) => (
    <div className="bg-gradient-to-r from-brand-surface2 to-brand-surface border border-brand-border rounded-xl p-5 mb-8 shadow-lg relative overflow-hidden">
        {/* Dekorasi Visual */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10">
            
            {/* Bagian Label / Info */}
            <div className="flex items-center gap-4 w-full lg:w-auto border-b lg:border-b-0 border-white/5 pb-4 lg:pb-0">
                <div className="p-3 bg-brand-surface rounded-xl border border-brand-border/50 shadow-inner">
                    <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Manajemen Proyek Buku</h3>
                    <p className="text-[11px] text-brand-muted leading-tight mt-1 max-w-xs">
                        Simpan "Ingatan AI" (Konteks & Referensi) ke file agar Bab 2 tetap nyambung dengan Bab 1.
                    </p>
                </div>
            </div>

            {/* Bagian Tombol Aksi */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
                <PresetButton 
                    onClick={onExport} 
                    disabled={isLoading} 
                    iconPath="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" 
                    label="Simpan Proyek" 
                    color="blue" 
                    description="Unduh file .json berisi konfigurasi, referensi, dan konteks cerita saat ini."
                />
                <PresetButton 
                    onClick={onImport} 
                    disabled={isLoading} 
                    iconPath="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                    label="Buka Proyek" 
                    color="green" 
                    description="Lanjutkan pekerjaan dari file proyek yang tersimpan."
                />
                
                <div className="w-px h-8 bg-brand-border mx-1 hidden sm:block"></div>
                
                <PresetButton 
                    onClick={onReset} 
                    disabled={isLoading} 
                    iconPath="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    label="Reset Baru" 
                    color="red" 
                    description="Hapus semua pengaturan dan mulai dari awal (Default)."
                />
                
                {/* Hidden Input for File Upload */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImport} 
                    accept=".json" 
                    className="hidden" 
                />
            </div>
        </div>
    </div>
));
