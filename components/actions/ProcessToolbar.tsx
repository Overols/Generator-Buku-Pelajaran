
import React from 'react';
import { Loader } from '../Loader';

interface ProcessToolbarProps {
    needsRevision: boolean;
    isRevising: boolean;
    onRevise: () => void;
    isHumanizing: boolean;
    onHumanize: () => void;
    isSummarizing: boolean;
    onSummarize: () => void;
}

export const ProcessToolbar: React.FC<ProcessToolbarProps> = ({ 
    needsRevision, isRevising, onRevise, isHumanizing, onHumanize, isSummarizing, onSummarize 
}) => {
    const isBusy = isRevising || isHumanizing || isSummarizing;

    return (
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Optimize Button */}
            {needsRevision && (
                <button
                    onClick={onRevise}
                    disabled={isBusy}
                    className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-teal-600/90 hover:bg-teal-500 text-white font-medium rounded-lg transition-all text-sm shadow-sm backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed border border-teal-500/50"
                >
                    {isRevising ? <Loader size="sm" /> : 'Optimalkan'}
                </button>
            )}
            
            {/* Summarize for Context */}
            <button
                onClick={onSummarize}
                disabled={isBusy}
                className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500/50"
                title="Rangkum bagian ini untuk melanjutkan penulisan bagian berikutnya"
            >
                {isSummarizing ? (
                    <>
                        <Loader size="sm" />
                        <span className="ml-2">Merangkum...</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                        Lanjut (Rangkum)
                    </>
                )}
            </button>

            {/* Humanize Button (Hero Action) */}
            <button
                onClick={onHumanize}
                disabled={isBusy}
                className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-lg shadow-md hover:shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm border border-orange-400/20"
            >
                {isHumanizing ? (
                    <>
                        <Loader size="sm" />
                        <span className="ml-2">Memproses...</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                        </svg>
                        Manusiakan
                    </>
                )}
            </button>
        </div>
    );
};
