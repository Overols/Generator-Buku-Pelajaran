
import { loadHtml2Pdf, loadMarked } from '../../utils/scriptLoader';

declare global {
    interface Window {
        html2pdf: any;
    }
}

/**
 * PdfService
 * Responsibility: Orchestrates PDF generation via html2pdf.js.
 * Note: PDF generation is client-side and interacts directly with DOM/Window APIs.
 */
export class PdfService {
    public static async generate(articleText: string, title: string, filename: string): Promise<void> {
        if (!articleText) return;

        await Promise.all([loadHtml2Pdf(), loadMarked()]);
        
        if (!window.html2pdf || !window.marked) {
            throw new Error("Library PDF gagal dimuat. Periksa koneksi internet.");
        }

        const htmlContent = window.marked.parse(articleText);
        const element = this.createContainer(htmlContent, title);
        
        const opt = {
            margin: [15, 15, 15, 15],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Execution
        await window.html2pdf().set(opt).from(element).save();
    }

    private static createContainer(html: string, title: string): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="font-family: 'Times New Roman', serif; color: #000; padding: 20px;">
                <h1 style="text-align: center; margin-bottom: 2rem;">${title}</h1>
                <div style="font-size: 12pt; line-height: 1.6; text-align: justify;">
                    ${html}
                </div>
            </div>
        `;
        return div;
    }
}
