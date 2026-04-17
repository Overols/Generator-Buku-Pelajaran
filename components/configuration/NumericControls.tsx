
import React from 'react';
import ConfigurationOption from '../ConfigurationOption';
import { WordCountControl } from './controls/WordCountControl';
import { PromptConfig } from '../../models/PromptConfig';

interface NumericControlsProps {
  config: Pick<PromptConfig, 'imagePlaceholderCount' | 'includeAnecdotes' | 'minWordCount' | 'citationCount'>;
  setField: (field: string, value: any) => void;
  isLoading: boolean;
}

export const NumericControls: React.FC<NumericControlsProps> = React.memo(({ config, setField, isLoading }) => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 flex flex-col gap-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex flex-wrap gap-6 items-center">
                {/* Image Placeholders */}
                <ConfigurationOption 
                    id="placeholders" 
                    label="Ilustrasi Gambar" 
                    value={config.imagePlaceholderCount} 
                    onChange={(v) => setField('imagePlaceholderCount', v)} 
                    min={0} 
                    max={10} 
                    disabled={isLoading} 
                />

                {/* Citations / Sources Control */}
                <ConfigurationOption 
                    id="citations" 
                    label="Jumlah Sumber (Web)" 
                    value={config.citationCount} 
                    onChange={(v) => setField('citationCount', v)} 
                    min={0} 
                    max={10} 
                    disabled={isLoading} 
                />
            </div>

            <label className="flex items-center cursor-pointer group lg:mt-2">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={config.includeAnecdotes}
                        onChange={(e) => setField('includeAnecdotes', e.target.checked)}
                        disabled={isLoading}
                    />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${config.includeAnecdotes ? 'bg-brand-primary' : 'bg-gray-600'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${config.includeAnecdotes ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-gray-300 group-hover:text-white">Gunakan Contoh Nyata (Kontekstual)</div>
            </label>
        </div>

        <WordCountControl 
            value={config.minWordCount} 
            onChange={(v) => setField('minWordCount', v)} 
            disabled={isLoading} 
        />
    </div>
  );
});
