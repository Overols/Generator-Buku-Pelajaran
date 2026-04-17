
import { loadDocx } from '../../utils/scriptLoader';

// Global Type Augmentation untuk library eksternal
declare global {
    interface Window {
        docx: any;
    }
}

/**
 * DocxService
 * Responsibility: Generates DOCX blobs from Markdown content.
 * Refactored for: Atomicity & Type Safety.
 */
export class DocxService {
    
    public static async generateBlob(articleText: string, title: string): Promise<Blob | null> {
        if (!articleText) return null;

        await loadDocx();
        if (!window.docx) throw new Error("Library DOCX gagal dimuat.");

        const { Document, Packer } = window.docx;
        const children = this.parseMarkdownToDocx(window.docx, articleText, title);

        const doc = new Document({
            styles: {
                default: {
                    document: {
                        run: { font: "Times New Roman", size: 24, color: "000000" },
                    },
                },
            },
            sections: [{ children }],
        });

        return await Packer.toBlob(doc);
    }

    /**
     * Parsing Logic isolated for readability.
     */
    private static parseMarkdownToDocx(docxLib: any, text: string, title: string) {
        const { Paragraph, HeadingLevel, AlignmentType, BorderStyle } = docxLib;

        const children: any[] = [];
        
        // 1. Add Title
        children.push(new Paragraph({
            text: title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 } }
        }));

        // 2. Parse Body
        const lines = text.split('\n');
        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;

            // Header Handling
            if (trimmed.startsWith('#')) {
                children.push(this.createHeader(docxLib, trimmed));
                return;
            }

            // List Handling
            if (trimmed.match(/^(\-|\*)\s/)) {
                children.push(new Paragraph({ 
                    children: this.parseTextRuns(docxLib, trimmed.replace(/^(\-|\*)\s/, '')), 
                    bullet: { level: 0 }, 
                    spacing: { after: 100 } 
                }));
                return;
            }

            // Quote Handling
            if (trimmed.startsWith('> ')) {
                children.push(new Paragraph({ 
                    children: this.parseTextRuns(docxLib, trimmed.replace('> ', '')), 
                    indent: { left: 720 }, 
                    italics: true, 
                    spacing: { after: 200 } 
                }));
                return;
            }

            // Normal Paragraph
            children.push(new Paragraph({ 
                children: this.parseTextRuns(docxLib, trimmed), 
                spacing: { after: 240, line: 276 }, 
                alignment: AlignmentType.BOTH 
            }));
        });

        return children;
    }

    private static createHeader(docxLib: any, text: string) {
        const { Paragraph, HeadingLevel, BorderStyle } = docxLib;
        
        if (text.startsWith('### ')) {
            return new Paragraph({ children: this.parseTextRuns(docxLib, text.replace('### ', '')), heading: HeadingLevel.HEADING_3, spacing: { before: 240, after: 120 } });
        } 
        if (text.startsWith('## ')) {
            return new Paragraph({ children: this.parseTextRuns(docxLib, text.replace('## ', '')), heading: HeadingLevel.HEADING_2, spacing: { before: 320, after: 160 }, border: { bottom: { color: "E5E7EB", space: 1, style: BorderStyle.SINGLE, size: 4 } } });
        }
        // H1
        return new Paragraph({ children: this.parseTextRuns(docxLib, text.replace('# ', '')), heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } });
    }

    private static parseTextRuns(docxLib: any, lineText: string) {
        const { TextRun } = docxLib;
        const parts: any[] = [];
        // Tokenize by bold, italic, code
        const tokens = lineText.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

        tokens.forEach(token => {
            if (!token) return;
            if (token.startsWith('**') && token.endsWith('**')) {
                parts.push(new TextRun({ text: token.slice(2, -2), bold: true, font: "Times New Roman" }));
            } else if (token.startsWith('*') && token.endsWith('*')) {
                parts.push(new TextRun({ text: token.slice(1, -1), italics: true, font: "Times New Roman" }));
            } else if (token.startsWith('`') && token.endsWith('`')) {
                parts.push(new TextRun({ text: token.slice(1, -1), font: "Courier New", size: 22 }));
            } else {
                parts.push(new TextRun({ text: token, font: "Times New Roman" }));
            }
        });
        return parts;
    }
}
