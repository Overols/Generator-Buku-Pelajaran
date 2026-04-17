
import React, { useMemo } from 'react';
import ImagePlaceholderButton from './ImagePlaceholderButton';
import MarkdownRenderer from './MarkdownRenderer';
import { ArticleParserService } from '../services/ui/ArticleParserService';

interface ArticleContentProps {
  article: string;
  onJumpTo: (targetId: string) => void;
}

const ArticleContent: React.FC<ArticleContentProps> = React.memo(({ article, onJumpTo }) => {

  const segments = useMemo(() => {
    return ArticleParserService.parseSegments(article);
  }, [article]);

  return (
    <div className="prose prose-invert lg:prose-xl max-w-none prose-h1:text-blue-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-brand-text">
        {segments.map((segment, index) => {
            if (segment.type === 'image') {
                return (
                    <ImagePlaceholderButton
                        key={`placeholder-${index}`}
                        index={segment.index}
                        onClick={() => onJumpTo(segment.targetId)}
                    />
                );
            }
            return (
                <MarkdownRenderer
                    key={`text-${index}`}
                    markdown={segment.content}
                    inline={true}
                />
            );
        })}
    </div>
  );
});

export default ArticleContent;
