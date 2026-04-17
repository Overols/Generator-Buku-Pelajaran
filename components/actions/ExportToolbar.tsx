
import React from 'react';
import { Loader } from '../Loader';

interface ExportToolbarProps {
    onExportHtml: () => void;
    onExportDocx: () => void;
    isGeneratingDocx: boolean;
    onExportPdf: () => void;
    isGeneratingPdf: boolean;
    onCopyText: () => void;
    isCopied: boolean;
    onCopyAll: () => void;
    isAllCopied: boolean;
}

type ButtonColor = 'green' | 'gray' | 'purple' | 'blue' | 'red';

const COLOR_VARIANTS: Record<ButtonColor, string> = {
    green: 'hover:bg-green-900/30 text-green-400 border-green-900/30 hover:border-green-500/50',
    gray: 'hover:bg-gray-700 text-gray-300 border-gray-700 hover:border-gray-500',
    purple: 'hover:bg-purple-900/30 text-purple-400 border-purple-900/30 hover:border-purple-500/50',
    blue: 'hover:bg-blue-900/30 text-blue-400 border-blue-900/30 hover:border-blue-500/50',
    red: 'hover:bg-red-900/30 text-red-400 border-red-900/30 hover:border-red-500/50'
};

interface UtilityButtonProps {
    onClick: () => void;
    label: string;
    icon: React.ReactNode;
    color: ButtonColor;
    active?: boolean;
    disabled?: boolean;
    title?: string;
}

const UtilityButton: React.FC<UtilityButtonProps> = ({ onClick, label, icon, active, disabled, color, title }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent transition-all duration-200 text-sm font-medium ${
            active ? 'bg-gray-700 text-white' : COLOR_VARIANTS[color]
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
    onExportHtml, onExportDocx, isGeneratingDocx, onExportPdf, isGeneratingPdf, onCopyText, isCopied, onCopyAll, isAllCopied
}) => {
    return (
        <div className="flex items-center gap-2 pt-3 xl:pt-0 border-t xl:border-0 border-gray-800 justify-end w-full xl:w-auto overflow-x-auto">
            <UtilityButton 
                onClick={onExportDocx} 
                label={isGeneratingDocx ? "Memproses..." : "DOCX"} 
                title="Unduh sebagai dokumen Word"
                icon={isGeneratingDocx ? <Loader size="sm"/> : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" /></svg>}
                color="blue"
                disabled={isGeneratingDocx}
            />
             <UtilityButton 
                onClick={onExportPdf} 
                label={isGeneratingPdf ? "Memproses..." : "PDF"} 
                title="Unduh sebagai dokumen PDF"
                icon={isGeneratingPdf ? <Loader size="sm"/> : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                color="red"
                disabled={isGeneratingPdf}
            />
            <UtilityButton 
                onClick={onExportHtml} 
                label="HTML" 
                title="Lihat sebagai halaman Web"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>} 
                color="green" 
            />

            <div className="w-px h-6 bg-gray-700 mx-1"></div>

            <UtilityButton 
                onClick={onCopyText} 
                label={isCopied ? "Tersalin" : "Salin Teks"} 
                title="Salin isi artikel saja"
                active={isCopied} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>} 
                color="gray" 
            />
            
            <UtilityButton 
                onClick={onCopyAll} 
                label={isAllCopied ? "Tersalin Semua" : "Salin Lengkap"} 
                title="Salin artikel beserta prompt gambar dan sumber"
                active={isAllCopied} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} 
                color="purple" 
            />
        </div>
    );
};
