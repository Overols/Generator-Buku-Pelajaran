
import React from 'react';
import { ArticleStats } from '../types';

interface WordCountAnalysisProps {
    stats: ArticleStats;
}

const WordCountAnalysis: React.FC<WordCountAnalysisProps> = React.memo(({ stats }) => {
    if (!stats || stats.totalWords === 0) return null;

    return (
        <div className="text-brand-text space-y-6">
            {/* Top Level Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Words</p>
                    <p className="text-2xl font-bold text-blue-300">{stats.totalWords.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reading Time</p>
                    <p className="text-2xl font-bold text-green-300">~{stats.readingTimeMinutes} min</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 col-span-2 sm:col-span-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sections</p>
                    <p className="text-2xl font-bold text-purple-300">{stats.sections.length}</p>
                </div>
            </div>

            {/* Structural Breakdown */}
            <div>
                <h3 className="font-semibold text-brand-subtle mb-3 text-sm uppercase tracking-wide">Structural Breakdown (Words per Section)</h3>
                <div className="space-y-3">
                    {stats.sections.map((section, index) => (
                        <div key={index} className="relative group">
                            <div className="flex justify-between items-end mb-1">
                                <span 
                                    className={`font-medium truncate pr-4 ${
                                        section.level === 0 ? 'text-gray-400 italic text-sm' : 
                                        section.level === 1 ? 'text-blue-300 text-base font-bold' : 
                                        'text-gray-200 text-sm ml-2'
                                    }`}
                                >
                                    {section.title || '(Untitled Section)'}
                                </span>
                                <span className="text-xs text-gray-400 flex-shrink-0 font-mono">
                                    {section.wordCount} w ({section.percentage}%)
                                </span>
                            </div>
                            
                            {/* Visual Bar */}
                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div 
                                    className={`h-1.5 rounded-full transition-all duration-500 ${
                                        section.level === 1 ? 'bg-blue-500' : 'bg-gray-500'
                                    }`}
                                    style={{ width: `${Math.max(section.percentage, 1)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <p className="text-[10px] text-gray-500 italic mt-2 text-right">
                *Count includes headings. Introduction/Preamble is text before the first header.
            </p>
        </div>
    );
});

export default WordCountAnalysis;
