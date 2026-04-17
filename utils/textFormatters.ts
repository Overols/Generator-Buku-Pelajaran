
import { SeoData, ImagePlaceholderData, FinalizedData, ArticleStats } from '../types';
import { createFullPromptString } from './promptUtils';

interface Source {
    web?: { uri: string; title: string; };
}

const buildSection = (title: string, content: string | undefined | null) => 
    content ? `--- ${title} ---\n\n${content.trim()}\n\n` : '';

export const formatSourcesForCopy = (sources: Source[] | null): string => {
    if (!sources?.length) return '';
    
    const validSources = sources.filter(s => s.web?.uri && s.web?.title);
    if (!validSources.length) return '';

    return 'Sources:\n\n' + validSources
        .map((s, i) => `${i + 1}. ${s.web!.title}\n   ${s.web!.uri}`)
        .join('\n\n');
};

export const formatStatsForCopy = (stats: ArticleStats | undefined): string => {
    if (!stats) return '';
    
    const header = `Word Count Analysis:\nTotal Words: ${stats.totalWords}\nEst. Reading Time: ${stats.readingTimeMinutes} min\n\nSection Breakdown:`;
    
    const sections = stats.sections.map(s => 
        `- ${s.title}: ${s.wordCount} words (${s.percentage}%)`
    ).join('\n');

    return `${header}\n${sections}`;
};

export const formatSeoDataForCopy = (seoData: SeoData | null): string => {
    if (!seoData) return '';
    
    const sections = [
        seoData.focusKeyphrase && `Focus Keyphrase:\n${seoData.focusKeyphrase}`,
        
        (seoData.titleAnalysis?.length ?? 0) > 0 
            ? 'Suggested Titles & Analysis:\n' + seoData.titleAnalysis!.map(a => 
                `- "${a.title}" (Score: ${a.score?.toFixed(1) ?? 'N/A'})\n  Feedback: ${a.feedback}`
              ).join('\n')
            : seoData.suggestedTitles?.length 
                ? 'Suggested Titles:\n' + seoData.suggestedTitles.map(t => `- ${t}`).join('\n') 
                : null,

        seoData.slug && `Slug:\n${seoData.slug}`,
        seoData.tags?.length && `Tags:\n${seoData.tags.join(', ')}`,
        seoData.metaDescriptions?.length && 'Meta Descriptions:\n' + seoData.metaDescriptions.map((d, i) => `${i + 1}. "${d}"`).join('\n')
    ];

    return 'SEO Recommendations:\n\n' + sections.filter(Boolean).join('\n\n');
};

export const formatImagePromptsForCopy = (placeholders: ImagePlaceholderData[] | null): string => {
    if (!placeholders?.length) return '';
    
    return 'Image Prompt Generations:\n\n' + placeholders
        .filter(Boolean)
        .map((p, i) => `Prompt for Image ${i + 1}: "${p.description}"\n${createFullPromptString(p)}`)
        .join('\n\n');
};

export const formatAllForCopy = (data: FinalizedData): string => {
    const cleanArticle = data.article
        ?.replace(/\[Image Placeholder: (.*?)\]/g, '')
        .replace(/\s*\[\d+\]/g, '');

    const sections = [
        cleanArticle && `--- ORIGINAL ARTICLE ---\n\n${cleanArticle}`,
        formatStatsForCopy(data.stats), // Added stats copy
        formatSourcesForCopy(data.sources),
        formatSeoDataForCopy(data.seoData),
        formatImagePromptsForCopy(data.imagePlaceholders)
    ];

    return sections.filter(Boolean).join('\n\n').trim();
};