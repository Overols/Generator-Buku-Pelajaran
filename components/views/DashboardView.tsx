
import React, { useState, Suspense, lazy } from 'react';
import Header from '../Header';
import PromptInput from '../PromptInput';
import ArticleDisplay from '../ArticleDisplay';
import HelpModal from '../HelpModal';
import { Loader } from '../Loader';
import ErrorBoundary from '../ErrorBoundary';
import { useDashboardController } from '../../controllers/useDashboardController';
import { useAutoSave } from '../../hooks/useAutoSave';

const ArticleResults = lazy(() => import('../ArticleResults'));

const DashboardView: React.FC = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  // Connect to Main Controller
  const { state, config, actions } = useDashboardController();

  // Activate Auto-Save (Utility Hook)
  useAutoSave(state);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header onOpenHelp={() => setIsHelpOpen(true)} />
        <ErrorBoundary>
            <main className="mt-8">
            <PromptInput
                config={config}
                actions={actions}
            />
            <ArticleDisplay
                isLoading={state.isLoading}
                loadingState={state.loadingState}
                articleStream={state.article}
                finalizedData={state.finalizedData}
            >
                <Suspense fallback={<div className="flex justify-center p-8"><Loader size="lg" /></div>}>
                {state.finalizedData && (
                    <ArticleResults
                        data={state.finalizedData}
                        status={{
                            isRevising: state.isRevising,
                            isHumanizing: state.isHumanizing,
                            isSummarizing: state.isSummarizing
                        }}
                        actions={actions}
                    />
                )}
                </Suspense>
            </ArticleDisplay>
            </main>
        </ErrorBoundary>
      </div>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default DashboardView;