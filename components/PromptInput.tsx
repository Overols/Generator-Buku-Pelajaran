
import React from 'react';
import { useAppContext } from '../state/AppContext';
import ErrorMessage from './ErrorMessage';
import PromptConfiguration from './PromptConfiguration';
import { ModeSwitcher } from './prompt/ModeSwitcher';
import { DraftInput } from './prompt/DraftInput';
import { ContextManager } from './prompt/ContextManager';
import { TopicTextArea } from './prompt/TopicTextArea';
import { ActionFooter } from './prompt/ActionFooter';
import { usePromptController } from '../controllers/usePromptController';
import { UIConfig } from '../models/PresentationTypes';
import InfoTooltip from './InfoTooltip';

interface PromptInputProps {
  config: UIConfig;
  actions: {
      setField: (field: string, value: any) => void;
      generate: () => void;
  }
}

/**
 * PromptInput
 * Responsibility: Layout Container for the Input Area.
 * Delegates logic to `usePromptController`.
 */
const PromptInput: React.FC<PromptInputProps> = React.memo(({ config, actions }) => {
  const { state } = useAppContext();
  const { prompt, chapterFocus, existingDraft, previousContext, isLoading, error, eduChapter } = state;

  const { isGenerate, isFormValid } = usePromptController({ 
      config: { 
          inputMode: config.inputMode, 
          prompt, 
          chapterFocus,
          existingDraft,
          eduChapter
      } 
  });

  const isContinuation = eduChapter > 1 || (previousContext && previousContext.length > 0);

  return (
    <div className="w-full animate-fade-in">
        <ModeSwitcher 
            currentMode={config.inputMode} 
            onChange={(mode) => actions.setField('inputMode', mode)} 
        />

        <div className="bg-brand-surface rounded-2xl border border-brand-border shadow-2xl overflow-hidden">
            {/* 1. Input Section */}
            <div className="p-6 sm:p-8 space-y-8">
                {isGenerate ? (
                    <ContextManager 
                        previousContext={previousContext}
                        chapterRoadmap={config.chapterRoadmap || ''}
                        onContextChange={(val) => actions.setField('previousContext', val)}
                        onRoadmapChange={(val) => actions.setField('chapterRoadmap', val)}
                        isLoading={isLoading}
                    />
                ) : (
                    <DraftInput 
                        value={existingDraft} 
                        onChange={(val) => actions.setField('existingDraft', val)} 
                        isLoading={isLoading} 
                    />
                )}

                {/* FEATURE: CHAPTER SPECIFIC INSTRUCTION */}
                {isGenerate && isContinuation && (
                    <div className="space-y-2 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-sky-400 uppercase tracking-wide flex items-center gap-2">
                                    <span className="bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">BAB {eduChapter}</span>
                                    Arahan Spesifik Bab Ini
                                </label>
                                <InfoTooltip text="Jelaskan secara detail apa yang harus dibahas KHUSUS di Bab ini. Contoh: 'Bahas tentang Perang Diponegoro secara mendalam'." />
                            </div>
                            <span className="text-[10px] text-sky-400 font-bold px-2 py-0.5 bg-sky-900/30 rounded border border-sky-500/30">
                                Wajib Diisi untuk Presisi
                            </span>
                        </div>
                        <div className="relative group">
                             <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-200 blur"></div>
                             <textarea
                                value={chapterFocus || ''}
                                onChange={(e) => actions.setField('chapterFocus', e.target.value)}
                                placeholder={`Apa yang ingin Anda bahas di Bab ${eduChapter}? (Misal: Kronologi kejadian, Tokoh utama, atau Studi Kasus)`}
                                className="relative w-full min-h-[5rem] p-4 bg-gray-900 border border-sky-500/30 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-mono text-sm text-sky-100 placeholder-sky-700/50 resize-y"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                )}

                <TopicTextArea 
                    value={prompt}
                    onChange={(val) => actions.setField('prompt', val)}
                    onSubmit={actions.generate}
                    isLoading={isLoading}
                    isGenerate={isGenerate}
                />
            </div>

            {/* 2. Configuration Section */}
            <div className="bg-brand-bg/50 border-t border-brand-border p-6 sm:p-8">
                 <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Engine Configuration
                </h3>
                <PromptConfiguration 
                    config={config} 
                    savedState={{ prompt, previousContext, existingDraft }} 
                    setField={actions.setField} 
                    isLoading={isLoading} 
                />
                
                {error && <div className="mt-6"><ErrorMessage message={error} /></div>}
            </div>

            {/* 3. Action Footer */}
            <ActionFooter 
                onGenerate={actions.generate} 
                isLoading={isLoading} 
                isDisabled={!isFormValid} 
                isGenerate={isGenerate} 
            />
        </div>
    </div>
  );
});

export default PromptInput;
