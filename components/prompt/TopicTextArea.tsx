
import React, { useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../../state/AppContext';
import InfoTooltip from '../InfoTooltip';
import { PlaceholderService } from '../../services/ui/PlaceholderService';

interface TopicTextAreaProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    isGenerate: boolean;
}

export const TopicTextArea: React.FC<TopicTextAreaProps> = React.memo(({ value, onChange, onSubmit, isLoading, isGenerate }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { state } = useAppContext();
    const isContinuation = state.eduChapter > 1;

    // Delegate logic to Service Layer
    const placeholderText = useMemo(() => {
        return PlaceholderService.getTopicPlaceholder(isGenerate, state.writingStyle);
    }, [isGenerate, state.writingStyle]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 400)}px`;
        }
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !isLoading) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className={`space-y-2 group ${isContinuation ? 'opacity-70 hover:opacity-100 transition-opacity' : ''}`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-brand-text uppercase tracking-wide">
                        {isGenerate 
                            ? (isContinuation ? 'Topik Utama Proyek (Konteks Global)' : 'Topik & Instruksi Utama') 
                            : 'Instruksi Revisi'}
                    </label>
                    <InfoTooltip text={isGenerate 
                        ? "Ini adalah 'Payung Besar' atau Judul Buku Anda. Jaga ini tetap sama antar bab agar AI tahu konteks keseluruhannya." 
                        : "Instruksi untuk mengedit atau memperbaiki draf yang diunggah."} 
                    />
                </div>
                {!isContinuation && (
                    <span className="text-[10px] text-brand-muted px-2 py-0.5 bg-brand-surface2 rounded border border-brand-border">
                        CMD + Enter
                    </span>
                )}
            </div>
            
            <div className={`relative bg-brand-bg/50 border border-brand-border rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-primary focus-within:border-brand-primary ${isLoading ? 'opacity-50' : 'group-hover:border-brand-muted/50'}`}>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholderText}
                    className="w-full min-h-[6rem] p-4 bg-transparent border-none rounded-xl resize-none text-base text-brand-text placeholder-brand-muted/40 focus:ring-0 leading-relaxed font-mono text-sm"
                    disabled={isLoading}
                    rows={2}
                />
            </div>
             
             {/* Region Indicator (Locked) */}
             <div className="flex justify-between items-center px-1">
                <p className="text-[10px] text-brand-muted">
                    *Engine Aktif: <span className="text-red-400 font-bold">Indonesia (PUEBI/Standar)</span>
                </p>
            </div>
        </div>
    );
});
