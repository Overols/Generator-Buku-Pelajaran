
import React from 'react';
import InfoTooltip from '../../InfoTooltip';

interface WordCountControlProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
}

export const WordCountControl: React.FC<WordCountControlProps> = React.memo(({ value, onChange, disabled }) => {
    return (
        <div className="border-t border-gray-700/50 pt-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="wordcount-slider" className="text-sm font-medium text-brand-subtle">Target Jumlah Kata (Per Bab)</label>
                    <InfoTooltip text="Ini adalah batas maksimum per generasi karena Batasan Token AI. Untuk buku yang lebih panjang, buat beberapa bab menggunakan mode Konteks." />
                </div>
                <span className="text-sm font-bold text-blue-300 bg-blue-900/30 px-2 py-1 rounded">{value.toLocaleString()} kata</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 font-mono">500</span>
                <input
                    id="wordcount-slider"
                    type="range"
                    min={500}
                    max={4500}
                    step={100}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    disabled={disabled}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <span className="text-xs text-gray-500 font-mono">4.5k (Maks)</span>
            </div>
             <div className="mt-2 flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
                <span>Artikel/Adegan</span>
                <span>Deep Dive</span>
                <span>Full Bab</span>
            </div>
        </div>
    );
});
