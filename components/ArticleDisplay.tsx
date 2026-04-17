
import React from 'react';
import LoadingStatus from './LoadingStatus';
import { LoadingState, FinalizedData } from '../types';
import ArticleContent from './ArticleContent';
import { FailsafeBanner } from './alerts/FailsafeBanner';
import { useAppContext } from '../state/AppContext';
import { EmptyState } from './states/EmptyState';
import { ErrorDisplayState } from './states/ErrorDisplayState';

interface ArticleDisplayProps {
  isLoading: boolean;
  loadingState: LoadingState | null;
  articleStream: string;
  finalizedData: FinalizedData | null;
  children: React.ReactNode;
}

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ 
  isLoading, 
  loadingState, 
  articleStream,
  finalizedData,
  children
}) => {
  const { state } = useAppContext();
  
  // 1. STATE: LOADING (Prioritas Tertinggi)
  if (isLoading && !articleStream && !finalizedData?.article) {
    return (
      <section className="mt-8 min-h-[20rem] flex flex-col justify-center animate-fade-in">
        <LoadingStatus loadingState={loadingState} />
      </section>
    );
  }

  // 2. STATE: ERROR (Tanpa Konten)
  if (!isLoading && !articleStream && !finalizedData?.article && state.error) {
    return (
        <section className="mt-8 animate-fade-in">
            <ErrorDisplayState error={state.error} />
        </section>
    );
  }

  // 3. STATE: SILENT FAILURE (Final tapi Kosong)
  if (!isLoading && finalizedData && !finalizedData.article && !state.error) {
      return (
          <section className="mt-8 animate-fade-in">
              <ErrorDisplayState error="Gagal menghasilkan konten. Respons AI kosong. Coba sederhanakan instruksi atau cek filter keamanan." />
          </section>
      );
  }

  // 4. STATE: EMPTY (Belum ada aktivitas)
  const hasContent = !!(articleStream || finalizedData?.article);
  if (!hasContent) {
    return (
        <section className="mt-8 min-h-[20rem] flex flex-col justify-center rounded-2xl border-2 border-dashed border-brand-border/50 transition-all">
            <EmptyState />
        </section>
    );
  }

  // 5. STATE: CONTENT DISPLAY (Streaming atau Final)
  const isFailsafeMode = !!state.error && hasContent && !isLoading;
  const showStreamingContent = !finalizedData;

  return (
    <section className="mt-8 min-h-[20rem] flex flex-col justify-center rounded-2xl animate-fade-in">
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Failsafe Banner: Muncul jika ada error di tengah streaming */}
        {isFailsafeMode && !finalizedData && <FailsafeBanner textToRescue={articleStream} />}
        
        {/* Streaming View */}
        {showStreamingContent && (
          <div className={isFailsafeMode ? "opacity-80 grayscale-[0.3]" : ""}>
             <ArticleContent article={articleStream} onJumpTo={() => {}} />
          </div>
        )}
        
        {/* Finalized Result View (Children = ArticleResults) */}
        {children}
      </div>
    </section>
  );
};

export default ArticleDisplay;
