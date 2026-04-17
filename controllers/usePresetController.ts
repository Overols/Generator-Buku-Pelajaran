
import React, { useCallback, useRef } from 'react';
import { PromptConfig } from '../models/PromptConfig';
import { DEFAULT_STATE } from '../state/initialState';
import { SubjectDomainService } from '../services/logic/SubjectDomainService';

/**
 * PresetController
 * Responsibility: Manages the import/export lifecycle of configuration files.
 */
export const usePresetController = (
    config: Partial<PromptConfig>,
    setField: (field: string, value: any) => void,
    savedState?: { prompt?: string; previousContext?: string; existingDraft?: string; chapterRoadmap?: string }
) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerImport = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const generateFilename = useCallback(() => {
        // Logic moved to Domain Service (DRY Principle)
        const effectiveSubject = SubjectDomainService.getEffectiveSubjectName(
            config.eduSubject as any, 
            config.customEduSubject
        );
        
        const safeSubject = SubjectDomainService.formatForFilename(effectiveSubject || 'Mapel');
        
        // Parsing Grade: "Kelas 7 SMP" -> "Kelas7"
        const gradeParts = config.eduGrade?.split(' ') || [];
        const safeGrade = (gradeParts[0] + (gradeParts[1] || '')).replace(/[^a-zA-Z0-9]/g, '') || 'KelasX';
        
        const chapter = config.eduChapter ? `Bab-${config.eduChapter}` : 'Bab-X';
        const date = new Date().toISOString().slice(0, 10);
        
        return `PenaPendidikan_${safeSubject}_${safeGrade}_${chapter}_${date}.json`;
    }, [config.eduSubject, config.customEduSubject, config.eduGrade, config.eduChapter]);

    const handleExport = useCallback(() => {
        const exportData = {
            meta: {
                app: "Pena Pendidikan",
                version: "2.0",
                exportedAt: new Date().toISOString()
            },
            config: { ...config },
            context: { ...savedState }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        const filename = generateFilename();
        
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", filename);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, [config, savedState, generateFilename]);

    const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                
                // Compatibility Layer
                let dataToLoad = json;
                if (json.config && json.context) {
                    dataToLoad = { ...json.config, ...json.context };
                }

                Object.keys(dataToLoad).forEach(key => {
                    if (key !== 'meta') setField(key, dataToLoad[key]);
                });
                
                alert("Proyek Berhasil Dimuat!");
            } catch (error) {
                console.error("Preset Import Error:", error);
                alert("Gagal memuat file proyek.");
            } finally {
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };
        reader.readAsText(file);
    }, [setField]);

    const handleReset = useCallback(() => {
        if (window.confirm("Reset semua pengaturan ke awal? Data tak tersimpan akan hilang.")) {
             Object.keys(DEFAULT_STATE).forEach(key => {
                 // @ts-ignore
                 setField(key, DEFAULT_STATE[key]);
             });
        }
    }, [setField]);

    return {
        fileInputRef,
        triggerImport,
        handleExport,
        handleImport,
        handleReset
    };
};
