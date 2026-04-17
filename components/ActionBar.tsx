
import React from 'react';
import { ReadabilityScores } from '../types';
import ReadabilityDisplay from './ReadabilityDisplay';
import { ProcessToolbar } from './actions/ProcessToolbar';
import { ExportToolbar } from './actions/ExportToolbar';

interface ActionBarProps {
    readabilityScores: ReadabilityScores | null;
    isRevising: boolean;
    onRevise: () => void;
    isHumanizing: boolean;
    onHumanize: () => void;
    isSummarizing?: boolean;
    onSummarize?: () => void;
    onCopyText: () => void;
    isCopied: boolean;
    onCopyAll: () => void;
    isAllCopied: boolean;
    onExportHtml: () => void;
    onExportDocx: () => void;
    isGeneratingDocx: boolean;
    onExportPdf: () => void;
    isGeneratingPdf: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
    readabilityScores,
    isRevising,
    onRevise,
    isHumanizing,
    onHumanize,
    isSummarizing = false,
    onSummarize = () => {},
    onCopyText,
    isCopied,
    onCopyAll,
    isAllCopied,
    onExportHtml,
    onExportDocx,
    isGeneratingDocx,
    onExportPdf,
    isGeneratingPdf
}) => {
    if (!readabilityScores) {
        return null;
    }

    const needsRevision = (
        readabilityScores.fleschReadingEase < 60 ||
        readabilityScores.fleschReadingEase > 70 ||
        readabilityScores.gradeLevel < 8 ||
        readabilityScores.gradeLevel > 10
    );

    return (
        <div className="sticky bottom-6 z-40 mx-auto max-w-5xl">
            <div className="glass border border-brand-border rounded-2xl shadow-2xl p-4 flex flex-col xl:flex-row justify-between items-center gap-4">
                
                {/* Left: Stats */}
                <div className="w-full xl:w-auto border-b xl:border-b-0 border-white/5 pb-4 xl:pb-0">
                    <ReadabilityDisplay scores={readabilityScores} />
                </div>

                {/* Center: AI Actions */}
                <div className="flex-1 w-full xl:w-auto flex justify-center">
                    <ProcessToolbar 
                        needsRevision={needsRevision}
                        isRevising={isRevising}
                        onRevise={onRevise}
                        isHumanizing={isHumanizing}
                        onHumanize={onHumanize}
                        isSummarizing={isSummarizing}
                        onSummarize={onSummarize}
                    />
                </div>

                {/* Right: Export Tools */}
                <div className="w-full xl:w-auto pt-4 xl:pt-0 border-t xl:border-t-0 border-white/5">
                    <ExportToolbar 
                        onExportHtml={onExportHtml}
                        onExportDocx={onExportDocx}
                        isGeneratingDocx={isGeneratingDocx}
                        onExportPdf={onExportPdf}
                        isGeneratingPdf={isGeneratingPdf}
                        onCopyText={onCopyText}
                        isCopied={isCopied}
                        onCopyAll={onCopyAll}
                        isAllCopied={isAllCopied}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActionBar;
