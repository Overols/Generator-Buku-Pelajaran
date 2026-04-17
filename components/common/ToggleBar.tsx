
import React from 'react';

interface ToggleBarProps {
    label: string;
    isOpen: boolean;
    onToggle: () => void;
}

export const ToggleBar: React.FC<ToggleBarProps> = React.memo(({ label, isOpen, onToggle }) => (
    <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors focus:outline-none w-full justify-between p-2 rounded hover:bg-gray-800/50"
    >
        <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {label}
        </span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    </button>
));
