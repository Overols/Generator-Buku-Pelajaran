import React, { useState, ReactNode } from 'react';
import CopyButton from './seo/CopyButton';

interface CollapsibleSectionProps {
  title: string;
  titleColorClass: string;
  children: ReactNode;
  defaultOpen?: boolean;
  copyText?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = React.memo(({ title, titleColorClass, children, defaultOpen, copyText }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  return (
    <div className="mt-8 pt-6 border-t border-gray-600">
      <button
        type="button"
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`section-content-${title.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
            <h2 className={`text-2xl font-bold ${titleColorClass}`}>{title}</h2>
            {copyText && <CopyButton textToCopy={copyText} label={`Copy ${title} section`} />}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div id={`section-content-${title.replace(/\s+/g, '-')}`} className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
});

export default CollapsibleSection;