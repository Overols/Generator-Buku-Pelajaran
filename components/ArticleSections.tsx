
import React from 'react';
import CollapsibleSection from './CollapsibleSection';
import SourcesDisplay from './SourcesDisplay';
import SeoDisplay from './seo/SeoDisplay';
import ImagePromptsDisplay from './ImagePromptsDisplay';
import WordCountAnalysis from './WordCountAnalysis'; 
import { SeoData, ImagePlaceholderData, ArticleStats } from '../types';
import { formatSourcesForCopy, formatSeoDataForCopy, formatImagePromptsForCopy, formatStatsForCopy } from '../utils/textFormatters';

interface ArticleSectionsProps {
    sources: any[] | null;
    seoData: SeoData | null;
    imagePlaceholders: ImagePlaceholderData[] | null;
    stats?: ArticleStats; 
    searchQueries?: string[]; // Added prop
}

const ArticleSections: React.FC<ArticleSectionsProps> = React.memo(({ sources, seoData, imagePlaceholders, stats, searchQueries }) => {
    const sourcesCopyText = React.useMemo(() => (sources ? formatSourcesForCopy(sources) : ''), [sources]);
    const seoCopyText = React.useMemo(() => (seoData ? formatSeoDataForCopy(seoData) : ''), [seoData]);
    const imagePromptsCopyText = React.useMemo(() => (imagePlaceholders ? formatImagePromptsForCopy(imagePlaceholders) : ''), [imagePlaceholders]);
    const statsCopyText = React.useMemo(() => (stats ? formatStatsForCopy(stats) : ''), [stats]);

    return (
        <>
             {/* Analysis Section */}
             {stats && (
                <div id="stats-section" className="scroll-mt-20">
                    <CollapsibleSection title="Structure & Word Count Analysis" titleColorClass="text-pink-400" defaultOpen={true} copyText={statsCopyText}>
                        <WordCountAnalysis stats={stats} />
                    </CollapsibleSection>
                </div>
            )}

            {/* Sources & Grounding */}
            {((sources && sources.length > 0) || (searchQueries && searchQueries.length > 0)) && (
                <div id="sources-section" className="scroll-mt-20">
                    <CollapsibleSection title="Sources & Grounding" titleColorClass="text-blue-300" defaultOpen={true} copyText={sourcesCopyText}>
                        <SourcesDisplay sources={sources || []} searchQueries={searchQueries} />
                    </CollapsibleSection>
                </div>
            )}

            {seoData && (
                <div id="seo-section" className="scroll-mt-20">
                    <CollapsibleSection title="SEO Recommendations" titleColorClass="text-purple-400" defaultOpen={true} copyText={seoCopyText}>
                        <SeoDisplay seoData={seoData} />
                    </CollapsibleSection>
                </div>
            )}

            {imagePlaceholders && imagePlaceholders.length > 0 && (
                <div id="image-prompts-section" className="scroll-mt-20">
                    <CollapsibleSection title="Image Prompt Generations" titleColorClass="text-green-400" defaultOpen={true} copyText={imagePromptsCopyText}>
                        <ImagePromptsDisplay 
                            imagePlaceholders={imagePlaceholders}
                        />
                    </CollapsibleSection>
                </div>
            )}
        </>
    );
});

export default ArticleSections;
