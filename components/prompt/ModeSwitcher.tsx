
import React from 'react';
import { InputMode } from '../../models/PromptConfig';

interface ModeSwitcherProps {
    currentMode: InputMode;
    onChange: (mode: InputMode) => void;
}

const ModeButton = ({ active, label, icon, onClick }: { active: boolean, label: string, icon: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            active 
            ? 'text-white' 
            : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
        }`}
    >
        <span>{icon}</span>
        <span>{label}</span>
    </button>
);

export const ModeSwitcher: React.FC<ModeSwitcherProps> = React.memo(({ currentMode, onChange }) => {
    const isGenerate = currentMode === 'generate';
    
    return (
        <div className="flex justify-center mb-8">
            <div className="p-1 bg-brand-bg rounded-xl border border-brand-border shadow-inner flex w-full max-w-sm relative">
                {/* Sliding Background Animation */}
                <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-surface2 rounded-lg shadow-sm border border-brand-border/50 transition-all duration-300 ease-out ${isGenerate ? 'left-1' : 'left-[calc(50%+4px)]'}`} 
                />
                
                <ModeButton 
                    active={isGenerate} 
                    label="Buat Baru" 
                    icon="✨" 
                    onClick={() => onChange('generate')} 
                />
                <ModeButton 
                    active={!isGenerate} 
                    label="Perbaiki/Edit" 
                    icon="🛠️" 
                    onClick={() => onChange('refine')} 
                />
            </div>
        </div>
    );
});
