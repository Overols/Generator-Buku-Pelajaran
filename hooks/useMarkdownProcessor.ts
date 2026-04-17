
import { useState, useEffect } from 'react';
import { loadMarked } from '../utils/scriptLoader';

interface MarkdownProcessorState {
    sanitizedHtml: string;
    error: string | null;
}

export const useMarkdownProcessor = (markdown: string, inline: boolean = false): MarkdownProcessorState => {
    const [state, setState] = useState<MarkdownProcessorState>({ sanitizedHtml: '', error: null });

    useEffect(() => {
        let isMounted = true;
        
        if (!markdown) {
            setState({ sanitizedHtml: '', error: null });
            return;
        }

        const process = async () => {
            try {
                await loadMarked();

                if (!window.marked || typeof window.marked.parse !== 'function') {
                    throw new Error("Marked.js failed to load.");
                }

                // Security Check
                if (!window.DOMPurify) {
                    console.warn("DOMPurify not found. Rendering raw text for safety.");
                    if (isMounted) setState({ sanitizedHtml: markdown, error: 'Sanitizer missing' });
                    return;
                }

                const rawHtml = inline 
                    ? window.marked.parseInline(markdown) 
                    : window.marked.parse(markdown);
                
                const cleanHtml = window.DOMPurify.sanitize(rawHtml);

                if (isMounted) setState({ sanitizedHtml: cleanHtml, error: null });

            } catch (err) {
                console.error("Markdown Error:", err);
                if (isMounted) setState({ sanitizedHtml: 'Error rendering content.', error: 'Processing failed' });
            }
        };

        const timeoutId = setTimeout(process, 50); // Debounce
        
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [markdown, inline]);

    return state;
};
