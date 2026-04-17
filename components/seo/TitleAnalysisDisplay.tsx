import React from 'react';
import { TitleAnalysis } from '../../types';
import CopyButton from './CopyButton';

const getScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    return 'text-red-400';
};

export const TitleAnalysisDisplay: React.FC<{ analysis: TitleAnalysis }> = React.memo(({ analysis }) => {
    const title = analysis?.title ?? 'No title provided';
    const score = analysis?.score ?? 0;
    const feedback = analysis?.feedback ?? 'No feedback available.';
    const length = analysis?.length ?? 0;

    return (
        <div className="p-3 bg-gray-800 rounded-md">
            <div className="flex justify-between items-start gap-2">
                <p className="flex-grow text-sm pr-2 font-medium">{title}</p>
                <div className="flex items-center flex-shrink-0">
                    <span className={`font-bold text-lg ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">/10</span>
                    <CopyButton textToCopy={title} />
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{feedback}</p>
            <p className="text-right text-xs text-gray-500 mt-2">{length} / 60 characters</p>
        </div>
    );
});