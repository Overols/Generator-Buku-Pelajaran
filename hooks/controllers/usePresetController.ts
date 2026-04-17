
import React, { useCallback, useRef } from 'react';
import { PromptConfig } from '../models/PromptConfig';
import { DEFAULT_STATE } from '../state/initialState';

/**
 * PresetController
 * Responsibility: Mengelola siklus hidup penyimpanan/pemuatan File Proyek Buku (.json).
 * Context: Sistem Pendidikan Indonesia (Menjaga agar AI tidak 'lupa' antar bab).
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

    /**
     * Menghasilkan nama file yang deskriptif agar Guru mudah mengarsipkan materi.
     * Format: PenaPendidikan_[Mapel]_[Kelas]_Bab-[N].json
     */
    const generateFilename = useCallback(() => {
        const subject = config.eduSubject?.replace(/[^a-zA-Z0-9]/g, '') || 'Mapel';
        // Ambil hanya 2 kata pertama dari Kelas (misal: "Kelas 7") untuk nama file
        const gradeParts = config.eduGrade?.split(' ') || [];
        const grade = (gradeParts[0] + (gradeParts[1] || '')).replace(/[^a-zA-Z0-9]/g, '') || 'KelasX';
        const chapter = config.eduChapter ? `Bab-${config.eduChapter}` : 'Bab-X';
        const date = new Date().toISOString().slice(0, 10);
        
        return `PenaPendidikan_${subject}_${grade}_${chapter}_${date}.json`;
    }, [config.eduSubject, config.eduGrade, config.eduChapter]);

    const handleExport = useCallback(() => {
        // Gabungkan Config + Contextual State (Memory AI)
        // Ini memastikan "Otak" AI (referensi & konteks bab sebelumnya) ikut tersimpan.
        const exportData = {
            meta: {
                app: "Pena Pendidikan",
                version: "2.0",
                description: "File Proyek Buku Digital",
                exportedAt: new Date().toISOString()
            },
            config: {
                ...config,
            },
            context: {
                ...savedState
            }
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
                
                // Mendukung format lama (flat) dan format baru (nested dengan meta/config/context)
                let dataToLoad: any = {};
                
                if (json.config || json.context) {
                    // Format Baru (Terstruktur)
                    dataToLoad = { ...json.config, ...json.context };
                } else {
                    // Format Lama (Flat) - Fallback
                    dataToLoad = json;
                }

                // Validasi sederhana: Pastikan ini file konfigurasi yang benar
                if (Object.keys(dataToLoad).length === 0) throw new Error("File kosong atau tidak valid");

                // Bulk update logic
                Object.keys(dataToLoad).forEach(key => {
                    // Abaikan metadata
                    if (key !== 'meta') {
                        setField(key, dataToLoad[key]);
                    }
                });
                
                alert("✅ Proyek Berhasil Dimuat!\n\nKonfigurasi, Materi Referensi, dan Ingatan Bab Sebelumnya telah dipulihkan. Anda bisa melanjutkan penulisan.");
            } catch (error) {
                console.error("Preset Import Error:", error);
                alert("❌ Gagal memuat file proyek. Format JSON rusak atau tidak dikenali.");
            } finally {
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };
        reader.readAsText(file);
    }, [setField]);

    const handleReset = useCallback(() => {
        const confirmReset = window.confirm(
            "⚠️ PERINGATAN: RESET PROYEK\n\nApakah Anda yakin ingin menghapus semua pengaturan dan memulai dari nol? Data yang belum disimpan akan hilang."
        );
        
        if (confirmReset) {
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
