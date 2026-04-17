
import React from 'react';

interface ConfigurationOptionProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max?: number;
  step?: number;
  disabled: boolean;
  inputClass?: string;
}

const ConfigurationOption: React.FC<ConfigurationOptionProps> = React.memo(({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  inputClass = 'w-16'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseInt(e.target.value, 10) || min;
    const clampedValue = Math.max(min, max !== undefined ? Math.min(max, rawValue) : rawValue);
    onChange(clampedValue);
  };

  const handleStep = (direction: 'up' | 'down') => {
      const newValue = value + (direction === 'up' ? step : -step);
      const clampedValue = Math.max(min, max !== undefined ? Math.min(max, newValue) : newValue);
      onChange(clampedValue);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold text-brand-muted uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-brand-border bg-brand-surface2 overflow-hidden transition-colors focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary">
        <button
          onClick={() => handleStep('down')}
          disabled={disabled || value <= min}
          className="px-3 py-2 bg-brand-surface2 hover:bg-brand-border text-brand-text border-r border-brand-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={`Decrease ${label}`}
        >
          -
        </button>
        <input
          type="number"
          id={id}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className={`${inputClass} py-2 text-center bg-transparent border-none text-brand-text font-mono text-sm focus:ring-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none`}
          disabled={disabled}
        />
        <button
          onClick={() => handleStep('up')}
          disabled={disabled || (max !== undefined && value >= max)}
          className="px-3 py-2 bg-brand-surface2 hover:bg-brand-border text-brand-text border-l border-brand-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
});

export default ConfigurationOption;
