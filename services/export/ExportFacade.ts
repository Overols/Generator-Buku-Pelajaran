
import { HtmlService } from './HtmlService';
import { DocxService } from './DocxService';
import { PdfService } from './PdfService';

/**
 * ExportFacade
 * Domain: Output Infrastructure
 * Responsibility: Single entry point for all document generation tasks.
 * Pattern: Facade (Hides complexity of individual services).
 */
export class ExportFacade {
    
    public static async exportToHtml(text: string, title: string, slug: string): Promise<void> {
        try {
            const blob = await HtmlService.generateBlob(text, title);
            if (blob) this.downloadBlob(blob, `${slug}.html`);
        } catch (e) {
            console.error("HTML Export Failed", e);
            throw new Error("Gagal mengekspor ke HTML. Pastikan konten sudah tergenerasi.");
        }
    }

    public static async exportToDocx(text: string, title: string, slug: string): Promise<void> {
        try {
            const blob = await DocxService.generateBlob(text, title);
            if (blob) this.downloadBlob(blob, `${slug}.docx`);
        } catch (e) {
            console.error("DOCX Export Failed", e);
            throw new Error("Gagal mengekspor ke Word (Docx). Periksa koneksi internet untuk memuat library.");
        }
    }

    public static async exportToPdf(text: string, title: string, slug: string): Promise<void> {
        try {
            await PdfService.generate(text, title, `${slug}.pdf`);
        } catch (e) {
            console.error("PDF Export Failed", e);
            throw new Error("Gagal mengekspor ke PDF. Coba gunakan fitur 'Print to PDF' browser jika ini berlanjut.");
        }
    }

    private static downloadBlob(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
