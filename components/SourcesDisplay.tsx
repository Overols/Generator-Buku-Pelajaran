
import React from 'react';

interface Source {
  web?: {
    uri: string;
    title: string;
  };
}

interface SourcesDisplayProps {
  sources: Source[];
  searchQueries?: string[];
}

const SourcesDisplay: React.FC<SourcesDisplayProps> = React.memo(({ sources, searchQueries }) => {
  if ((!sources || sources.length === 0) && (!searchQueries || searchQueries.length === 0)) {
    return null;
  }

  const validSources = sources?.filter(source => source.web && source.web.uri && source.web.title) || [];

  return (
    <div className="space-y-6">
        
      {/* 1. What the AI Searched For (Transparency) */}
      {searchQueries && searchQueries.length > 0 && (
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Grounding Queries Used
              </h4>
              <div className="flex flex-wrap gap-2">
                  {searchQueries.map((query, idx) => (
                      <span key={idx} className="bg-blue-900/50 text-blue-100 text-xs px-2.5 py-1 rounded-full font-mono">
                          "{query}"
                      </span>
                  ))}
              </div>
          </div>
      )}

      {/* 2. The Citations Found */}
      {validSources.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cited Sources</h4>
            {validSources.map((source, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-start transition-all hover:bg-gray-700/50 border border-gray-700">
                <span className="text-brand-subtle font-semibold mr-4 pt-1 text-sm">[{index + 1}]</span>
                <div className="flex-1 min-w-0">
                    <a
                    href={source.web!.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 font-medium text-sm leading-snug block"
                    >
                    {source.web!.title}
                    </a>
                    <p className="text-xs text-gray-500 mt-1 truncate" title={source.web!.uri}>{source.web!.uri}</p>
                </div>
                </div>
            ))}
          </div>
      )}
    </div>
  );
});

export default SourcesDisplay;
