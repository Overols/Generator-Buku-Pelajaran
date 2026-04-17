
import { loadMarked } from '../../utils/scriptLoader';

/**
 * HtmlService
 * Responsibility: Generates HTML blobs from Markdown content.
 */
export class HtmlService {
    public static async generateBlob(articleText: string, title: string): Promise<Blob | null> {
        if (!articleText) return null;
        
        await loadMarked();
        const articleHtml = window.marked.parse(articleText);
        const fullHtml = this.wrapHtml(title, articleHtml);
        
        return new Blob([fullHtml], { type: 'text/html' });
    }

    private static wrapHtml(title: string, bodyContent: string): string {
        const safeBody = bodyContent.replace(/`/g, '&#96;');
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
                <style>
                    body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; line-height: 1.6; max-width: 800px; margin: 2rem auto; padding: 2rem; }
                    h1, h2, h3 { color: #93c5fd; border-bottom: 1px solid #334155; padding-bottom: 0.3em; }
                    a { color: #60a5fa; }
                    code { background: #334155; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
                    pre { background: #334155; padding: 1em; border-radius: 5px; overflow: auto; }
                    blockquote { border-left: 4px solid #475569; padding-left: 1em; color: #94a3b8; font-style: italic; }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                ${safeBody}
            </body>
            </html>
        `.trim();
    }
}
