
import React from 'react';
import { SeoData } from '../../types';
import CopyButton from './CopyButton';
import { TitleAnalysisDisplay } from './TitleAnalysisDisplay';


const SeoDisplay: React.FC<{ seoData: SeoData | null }> = React.memo(({ seoData }) => {
  if (!seoData) {
    return null;
  }

  const { focusKeyphrase, titleAnalysis, suggestedTitles, slug, tags, metaDescriptions } = seoData;

  return (
    <div className="space-y-4 text-brand-text">
      {/* Focus Keyphrase */}
      {focusKeyphrase && (
        <div>
          <h3 className="font-semibold text-brand-subtle">Focus Keyphrase</h3>
          <div className="flex items-center mt-1 p-2 bg-gray-800 rounded-md">
            <span className="flex-grow">{focusKeyphrase}</span>
            <CopyButton textToCopy={focusKeyphrase} />
          </div>
        </div>
      )}

      {/* Suggested Titles & Analysis */}
      {(Array.isArray(titleAnalysis) && titleAnalysis.length > 0) || (Array.isArray(suggestedTitles) && suggestedTitles.length > 0) ? (
        <div>
          <h3 className="font-semibold text-brand-subtle">Suggested Titles &amp; Analysis</h3>
          <div className="space-y-2 mt-1">
            {Array.isArray(titleAnalysis) && titleAnalysis.length > 0 ? (
              titleAnalysis.map((analysis, index) => (
                <TitleAnalysisDisplay key={index} analysis={analysis} />
              ))
            ) : (
              // Fallback for when analysis fails but titles exist
              Array.isArray(suggestedTitles) && suggestedTitles.map((title, index) => (
                <div key={index} className="p-2 bg-gray-800 rounded-md">
                   <div className="flex justify-between items-start">
                      <p className="flex-grow text-sm pr-2">{title}</p>
                      <CopyButton textToCopy={title || ''} />
                   </div>
                   <p className="text-right text-xs text-gray-500 mt-1">{title ? title.length : 0} / 60</p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

      {/* Slug */}
      {slug && (
        <div>
          <h3 className="font-semibold text-brand-subtle">Slug</h3>
          <div className="flex items-center mt-1 p-2 bg-gray-800 rounded-md font-mono text-sm">
            <span className="flex-grow">{slug}</span>
            <CopyButton textToCopy={slug} />
          </div>
        </div>
      )}

      {/* Tags */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-brand-subtle">Tags</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Meta Descriptions */}
      {Array.isArray(metaDescriptions) && metaDescriptions.length > 0 && (
        <div>
          <h3 className="font-semibold text-brand-subtle">Meta Descriptions</h3>
          <div className="space-y-2 mt-1">
            {metaDescriptions.map((desc, index) => (
              <div key={index} className="p-2 bg-gray-800 rounded-md">
                <div className="flex justify-between items-start">
                  <p className="flex-grow text-sm pr-2">"{desc}"</p>
                  <CopyButton textToCopy={desc || ''} />
                </div>
                <p className="text-right text-xs text-gray-500 mt-1">{desc ? desc.length : 0} / 135</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
});

export default SeoDisplay;
