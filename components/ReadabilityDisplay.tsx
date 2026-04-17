
import React from 'react';
import { ReadabilityScores } from '../types';
import InfoTooltip from './InfoTooltip';

interface ReadabilityDisplayProps {
  scores: ReadabilityScores;
}

const ReadabilityDisplay: React.FC<ReadabilityDisplayProps> = React.memo(({ scores }) => {
  const getFleschColor = (score: number) => {
    if (score >= 60 && score <= 70) return 'text-green-400';
    if (score >= 50 && score < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeColor = (level: number) => {
    if (level >= 8 && level <= 10) return 'text-green-400';
    if (level >= 7 && level < 12) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
      <div className="flex items-center space-x-6 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="text-center">
              <span className="text-xs font-medium text-brand-subtle uppercase tracking-wider">Flesch Ease</span>
              <p className={`text-xl font-bold ${getFleschColor(scores.fleschReadingEase)}`}>{scores.fleschReadingEase.toFixed(1)}</p>
            </div>
            <InfoTooltip text="Flesch Reading Ease: Rates text on a 100-point scale. Higher scores mean easier to read. Target is 60-70." />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <span className="text-xs font-medium text-brand-subtle uppercase tracking-wider">Grade Level</span>
              <p className={`text-xl font-bold ${getGradeColor(scores.gradeLevel)}`}>{scores.gradeLevel.toFixed(1)}</p>
            </div>
            <InfoTooltip text="Flesch-Kincaid Grade Level: Estimates the U.S. school grade level needed to understand the text. Target is 8-10." />
          </div>
      </div>
  );
});

export default ReadabilityDisplay;