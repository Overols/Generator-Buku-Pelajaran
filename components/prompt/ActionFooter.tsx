
import React from 'react';
import { Loader } from '../Loader';
import { MODEL_DISPLAY_NAMES } from '../../constants/models';

interface ActionFooterProps {
    onGenerate: () => void;
    isLoading: boolean;
    isDisabled: boolean;
    isGenerate: boolean;
}

export const ActionFooter: React.FC<ActionFooterProps> = React.memo(({ onGenerate, isLoading, isDisabled, isGenerate }) => {
    return (
        <div className="p-4 sm:px-8 sm:py-6 bg-brand-surface border-t border-brand-border flex items-center justify-between">
            <div className="text-xs text-brand-muted hidden sm:block">
                Engine Aktif: <span className="text-brand-text font-mono">{MODEL_DISPLAY_NAMES.GENERATION}</span>
            </div>
            <button
                onClick={onGenerate}
                disabled={isLoading || isDisabled}
                className={`
                    relative group px-6 py-3 rounded-lg font-semibold text-sm shadow-lg shadow-indigo-500/20 
                    transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                    flex items-center gap-2 text-white w-full sm:w-auto justify-center
                    ${isGenerate 
                        ? 'bg-brand-primary hover:bg-indigo-400' 
                        : 'bg-purple-600 hover:bg-purple-500'}
                `}
            >
                {isLoading ? (
                    <><Loader size="sm" /><span className="ml-2">Memproses Permintaan...</span></>
                ) : (
                    <>
                        <span>{isGenerate ? 'Buat Konten' : 'Perbaiki Naskah'}</span>
                        <svg className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </>
                )}
            </button>
        </div>
    );
});
