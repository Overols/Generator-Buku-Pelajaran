
import React from 'react';
import { SelectField } from '../common/SelectField';
import { PromptConfig } from '../../models/PromptConfig';
import { TEXTURE_FIELDS, LOGIC_FIELDS } from '../../constants/formConfigurations';

type AdvancedKey = keyof Pick<PromptConfig, 
    'paragraphLength' | 'syntaxComplexity' | 'showDontTell'
>;

interface AdvancedOptionsProps {
  config: Pick<PromptConfig, 'writingStyle' | AdvancedKey>;
  setField: (field: string, value: any) => void;
  isLoading: boolean;
  show: boolean;
  onToggle: () => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = React.memo(({ config, setField, isLoading, show, onToggle }) => {
  return (
    <div className="pt-2">
        <button
            onClick={onToggle}
            className="flex items-center gap-2 text-sm font-semibold text-brand-subtle hover:text-brand-primary transition-colors focus:outline-none"
        >
            <svg 
                className={`w-4 h-4 transition-transform duration-200 ${show ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {show ? 'Sembunyikan Tekstur & Logika Teks' : 'Tampilkan Tekstur & Logika Teks (Struktur, Kompleksitas, Show/Tell)'}
        </button>

        {show && (
             <div className="mt-4 p-6 bg-gray-900/50 border border-indigo-900/30 rounded-xl space-y-6 animate-fade-in shadow-inner">
                
                {/* Visual Texture Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 border-b border-gray-800">
                    {TEXTURE_FIELDS.map(item => (
                        <SelectField
                            key={item.field}
                            id={item.field}
                            label={item.label}
                            value={config[item.field] as string}
                            options={item.options}
                            description={item.desc[config[item.field] as string]}
                            onChange={(val) => setField(item.field, val)}
                            disabled={isLoading}
                            theme="default"
                        />
                    ))}
                </div>

                {/* Computational Logic Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {LOGIC_FIELDS.map(item => (
                         <SelectField
                            key={item.field}
                            id={item.field}
                            label={item.label}
                            value={config[item.field] as string}
                            options={item.options}
                            description={item.desc[config[item.field] as string]}
                            onChange={(val) => setField(item.field, val)}
                            disabled={isLoading}
                            theme="default"
                        />
                    ))}
                </div>
            </div>
        )}
      </div>
  );
});
