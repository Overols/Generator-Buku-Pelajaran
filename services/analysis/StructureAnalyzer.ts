
import { ArticleStats, SectionStat } from '../../types';

/**
 * StructureAnalyzer
 * Domain: Text Analysis
 * Responsibility: Analyze the structural composition of the article (Words, Sections).
 */
export class StructureAnalyzer {
    private static countWords(text: string): number {
        if (!text || !text.trim()) return 0;
        return text.trim().split(/\s+/).length;
    }

    public static analyze(article: string): ArticleStats {
        if (!article) {
            return { totalWords: 0, readingTimeMinutes: 0, sections: [] };
        }

        const totalWords = this.countWords(article);
        const readingTimeMinutes = Math.ceil(totalWords / 200); // Standard avg reading speed

        const lines = article.split('\n');
        const sections: SectionStat[] = [];
        
        let currentTitle = "Introduction / Preamble";
        let currentLevel = 0;
        let currentBuffer: string[] = [];

        const pushSection = () => {
            const text = currentBuffer.join('\n');
            const count = this.countWords(text);
            // Include section if it has content or is a header (structure)
            if (count > 0 || currentLevel > 0) { 
                sections.push({
                    title: currentTitle,
                    level: currentLevel,
                    wordCount: count,
                    percentage: totalWords > 0 ? Math.round((count / totalWords) * 100) : 0
                });
            }
            currentBuffer = [];
        };

        for (const line of lines) {
            const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
            
            if (headerMatch) {
                pushSection();
                currentLevel = headerMatch[1].length;
                currentTitle = headerMatch[2].trim();
            } else {
                currentBuffer.push(line);
            }
        }
        pushSection();

        return { totalWords, readingTimeMinutes, sections };
    }
}
