
import React from 'react';
import { useMarkdownProcessor } from '../hooks/useMarkdownProcessor';

declare global {
  interface Window {
    DOMPurify: { sanitize: (dirty: string) => string };
    marked: {
      parse: (markdown: string) => string;
      parseInline: (markdown: string) => string;
    };
  }
}

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
  inline?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(({ markdown, className, inline = false }) => {
  const { sanitizedHtml } = useMarkdownProcessor(markdown, inline);

  const Tag = inline ? 'span' : 'div';
  
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
});

export default MarkdownRenderer;
