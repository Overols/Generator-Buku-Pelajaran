
import React, { useRef } from 'react';
import { readTextFile } from '../../utils/fileUtils';

interface DraftInputProps {
    value: string;
    onChange: (val: string) => void;
    isLoading: boolean;
}

export const DraftInput: React.FC<DraftInputProps> = React.memo(({ value, onChange, isLoading }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            onChange(await readTextFile(file));
        } catch (err) { 
            console.error(err); 
        } finally { 
            if (fileInputRef.current) fileInputRef.current.value = ''; 
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
        // Basic auto-resize
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="animate-fade-in space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Input Draf Awal</span>
                <button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={isLoading}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-300 py-1.5 px-3 rounded-lg border border-gray-700 transition-colors flex gap-2 disabled:opacity-50"
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.md,.markdown" className="hidden" />
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Unggah File
                </button>
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleInput}
                placeholder="Tempel draf kasar Anda di sini..."
                className="w-full min-h-[12rem] max-h-[24rem] p-5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-mono text-sm text-gray-300"
                disabled={isLoading}
            />
        </div>
    );
});
