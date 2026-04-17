
import React from 'react';

interface FailsafeBannerProps {
    textToRescue: string;
}

/**
 * FailsafeBanner
 * Displays when generation is interrupted but partial content exists.
 */
export const FailsafeBanner: React.FC<FailsafeBannerProps> = ({ textToRescue }) => {
    return (
        <div className="mb-6 rounded-lg border border-red-500/50 bg-red-900/20 p-4 shadow-lg animate-pulse">
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                    <div className="p-2 bg-red-900/50 rounded-full h-fit">
                        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-200">Generation Interrupted</h3>
                        <p className="text-sm text-red-300/80 mt-1">
                            Failsafe Protocol activated. Partial draft saved.
                        </p>
                        <div className="mt-3 flex gap-3">
                            <button 
                                onClick={() => navigator.clipboard.writeText(textToRescue)}
                                className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white text-xs font-bold rounded-md transition-colors border border-red-600"
                            >
                                Copy Rescued Text
                            </button>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-3 py-1.5 bg-transparent hover:bg-red-900/50 text-red-300 text-xs font-bold rounded-md transition-colors border border-red-800"
                            >
                                Reload App
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
