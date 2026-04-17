
import React from 'react';
import QuickNav from './QuickNav';
import { FinalizedData } from '../types';
import ArticleContent from './ArticleContent';
import ArticleSections from './ArticleSections';
import ActionBar from './ActionBar';
import { useExportController } from '../controllers/useExportController';
import { useNavigationController } from '../controllers/useNavigationController';

interface ArticleResultsProps {
    data: FinalizedData;
    status: {
        isRevising: boolean;
        isHumanizing: boolean;
        isSummarizing: boolean;
    };
    actions: {
        revise: () => void;
        humanize: () => void;
        summarize: () => void;
    };
}

/**
 * ArticleResults Component
 * Responsibility: Presentational Layer for Generated Content.
 * Uses Controllers for interaction logic.
 */
const ArticleResults: React.FC<ArticleResultsProps> = React.memo(({ data, status, actions }) => {
    // Controller Composition
    const exportController = useExportController(data);
    const navigationController = useNavigationController(data);

    return (
        <div className="animate-fade-in">
            {/* Top Bar: Actions & Readability */}
            <ActionBar 
                readabilityScores={data.readabilityScores}
                isRevising={status.isRevising}
                onRevise={actions.revise}
                isHumanizing={status.isHumanizing}
                onHumanize={actions.humanize}
                isSummarizing={status.isSummarizing}
                onSummarize={actions.summarize}
                
                // Export Actions (Delegated to Controller)
                onCopyText={exportController.actions.copyText}
                isCopied={exportController.state.isTextCopied}
                onCopyAll={exportController.actions.copyAll}
                isAllCopied={exportController.state.isAllCopied}
                onExportHtml={exportController.actions.exportHtml}
                onExportDocx={exportController.actions.exportDocx}
                isGeneratingDocx={exportController.state.isGeneratingDocx}
                onExportPdf={exportController.actions.exportPdf}
                isGeneratingPdf={exportController.state.isGeneratingPdf}
            />

            {/* Navigation Pills */}
            {navigationController.navLinks.length > 0 && (
                <QuickNav links={navigationController.navLinks} onJumpTo={navigationController.handleJumpTo} />
            )}

            {/* Content Panel (Direct, no Tabs) */}
            <div className="mt-8">
                <ArticleContent article={data.article} onJumpTo={navigationController.handleJumpTo} />
            </div>
            
            {/* Post-Content Sections (SEO, Visuals, Analysis) */}
            <ArticleSections 
                sources={data.sources} 
                searchQueries={data.searchQueries}
                seoData={data.seoData} 
                imagePlaceholders={data.imagePlaceholders} 
                stats={data.stats}
            />
        </div>
    );
});

export default ArticleResults;
