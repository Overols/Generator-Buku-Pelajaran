
import React from 'react';
import { Loader } from './Loader';
import { LoadingState } from '../types';

interface LoadingStatusProps {
  loadingState: LoadingState | null;
}

const LoadingStatus: React.FC<LoadingStatusProps> = ({ loadingState }) => {
  if (!loadingState) return null;

  return (
    <div className="w-full max-w-md mx-auto p-8">
        <div className="flex flex-col items-center mb-8">
            <div className="relative w-12 h-12 flex items-center justify-center bg-brand-surface2 rounded-full mb-4 ring-2 ring-brand-primary/20">
                <Loader size="md" />
            </div>
            <h3 className="text-lg font-semibold text-brand-text animate-pulse">Sedang Berpikir...</h3>
        </div>

        <div className="space-y-4 relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-brand-border"></div>
            
            {loadingState.completedSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 relative z-10 animate-fade-in">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center flex-shrink-0">
                         <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {/* Translating common steps dynamically or ensuring upstream sends ID */}
                    <span className="text-brand-muted text-sm">{translateStep(step)}</span>
                </div>
            ))}
            
            <div className="flex items-center gap-4 relative z-10">
                 <div className="w-7 h-7 rounded-full bg-brand-primary/10 border border-brand-primary flex items-center justify-center flex-shrink-0 animate-pulse">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                 </div>
                 <span className="text-brand-text font-medium text-sm">{translateStep(loadingState.currentStep)}</span>
            </div>
        </div>
    </div>
  );
};

// Helper sederhana untuk menerjemahkan status teknis ke bahasa awam
function translateStep(step: string): string {
    if (step.includes('Generating')) return 'Menyusun draf awal materi...';
    if (step.includes('Analyzing')) return 'Menganalisis struktur & pedagogi...';
    if (step.includes('Draft Generated')) return 'Draf awal selesai.';
    if (step.includes('SEO')) return 'Mengoptimalkan kata kunci...';
    if (step.includes('Image')) return 'Merancang ilustrasi visual...';
    return step;
}

export default LoadingStatus;
