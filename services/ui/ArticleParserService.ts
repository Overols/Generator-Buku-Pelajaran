
export type ParsedSegment = 
    | { type: 'text'; content: string }
    | { type: 'image'; index: number; targetId: string };

/**
 * ArticleParserService
 * Domain: UI Logic
 * Responsibility: Parses raw article text into renderable segments (Text blocks and Image Buttons).
 */
export class ArticleParserService {
    
    public static parseSegments(article: string): ParsedSegment[] {
        if (!article) return [];

        const placeholderRegex = /(\[Image Placeholder: .*?\])/g;
        const citationRegex = /\s*\[\d+\]/g;
        
        const parts = article.split(placeholderRegex);
        let placeholderIndex = 0;
        const segments: ParsedSegment[] = [];

        parts.forEach((part) => {
            if (placeholderRegex.test(part)) {
                placeholderIndex++;
                segments.push({
                    type: 'image',
                    index: placeholderIndex,
                    targetId: `image-prompt-${placeholderIndex}`
                });
            } else {
                const cleanPart = part.replace(citationRegex, '');
                if (cleanPart.trim()) {
                    segments.push({
                        type: 'text',
                        content: cleanPart
                    });
                }
            }
        });

        return segments;
    }
}
