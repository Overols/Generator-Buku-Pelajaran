
import { useCallback, useState } from 'react';
import { useClipboard } from '../hooks/useClipboard';
import { formatAllForCopy } from '../utils/textFormatters';
import { FinalizedData } from '../types';
import { ExportFacade } from '../services/export/ExportFacade';

/**
 * ExportController
 * Responsibility: Manages UI state for exports and delegates logic to ExportFacade.
 */
export const useExportController = (data: FinalizedData) => {
    const { article, seoData } = data;
    
    const [isGeneratingDocx, setDocx] = useState(false);
    const [isGeneratingPdf, setPdf] = useState(false);

    // Helpers
    const cleanText = article?.replace(/\[Image Placeholder: (.*?)\]/g, '').replace(/\s*\[\d+\]/g, '') || '';
    const title = seoData?.suggestedTitles?.[0] || 'Materi Ajar';
    const slug = seoData?.slug || 'materi-ajar';

    // Clipboard Logic
    const { isCopied: isTextCopied, copyToClipboard: copyText } = useClipboard();
    const { isCopied: isAllCopied, copyToClipboard: copyAll } = useClipboard();

    // Handlers
    const handleExport = useCallback(async (type: 'html' | 'docx' | 'pdf') => {
        if (!cleanText) return;
        
        if (type === 'docx') setDocx(true);
        if (type === 'pdf') setPdf(true);

        try {
            switch(type) {
                case 'html': await ExportFacade.exportToHtml(cleanText, title, slug); break;
                case 'docx': await ExportFacade.exportToDocx(cleanText, title, slug); break;
                case 'pdf':  await ExportFacade.exportToPdf(cleanText, title, slug); break;
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : "Terjadi kesalahan saat ekspor.");
        } finally {
            setDocx(false);
            setPdf(false);
        }
    }, [cleanText, title, slug]);

    return {
        state: {
            isTextCopied,
            isAllCopied,
            isGeneratingDocx,
            isGeneratingPdf,
        },
        actions: {
            copyText: () => copyText(cleanText),
            copyAll: () => copyAll(formatAllForCopy(data)),
            exportHtml: () => handleExport('html'),
            exportDocx: () => handleExport('docx'),
            exportPdf: () => handleExport('pdf')
        }
    };
};
