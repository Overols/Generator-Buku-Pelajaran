
import React from 'react';
import InfoTooltip from '../InfoTooltip';

export type SelectTheme = 'default' | 'fiction-indigo' | 'fiction-purple';

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    options: readonly string[];
    description?: string;
    onChange: (value: string) => void;
    disabled: boolean;
    theme?: SelectTheme;
}

const THEME_STYLES: Record<SelectTheme, { wrapper: string, label: string, focus: string }> = {
    'default': {
        wrapper: 'border-brand-border bg-brand-surface2',
        label: 'text-brand-muted',
        focus: 'focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary'
    },
    'fiction-indigo': {
        wrapper: 'border-indigo-900/50 bg-indigo-950/20',
        label: 'text-indigo-300',
        focus: 'focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'
    },
    'fiction-purple': {
        wrapper: 'border-purple-900/50 bg-purple-950/20',
        label: 'text-purple-300',
        focus: 'focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500'
    }
};

export const SelectField: React.FC<SelectFieldProps> = React.memo(({ 
    id, label, value, options, description, onChange, disabled, theme = 'default' 
}) => {
    const styles = THEME_STYLES[theme];

    return (
        <div className={`relative group rounded-lg border transition-all duration-200 ${styles.wrapper} ${styles.focus} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-opacity-80'}`}>
            {/* Pointer events none on container ensures clicks pass through to the native select element */}
            <div className="absolute top-2 left-3 flex items-center gap-2 z-10 pointer-events-none">
                <label htmlFor={id} className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${styles.label}`}>
                    {label}
                </label>
                {/* Re-enable pointer events specifically for the tooltip interaction */}
                {description && <div className="mt-[-2px] pointer-events-auto"><InfoTooltip text={description} /></div>}
            </div>
            
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="w-full h-14 pt-4 pb-1 px-3 text-sm bg-transparent border-none outline-none text-brand-text appearance-none cursor-pointer focus:ring-0"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-brand-surface text-brand-text py-2">
                        {opt}
                    </option>
                ))}
            </select>

            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-brand-muted/50 group-hover:text-brand-muted transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </div>
        </div>
    );
});
