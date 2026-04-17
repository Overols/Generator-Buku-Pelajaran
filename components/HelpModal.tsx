
import React, { useEffect, useRef, useState } from 'react';
import { HelpSidebar } from './help/HelpSidebar';
import { OverviewTab } from './help/tabs/OverviewTab';
import { EnginesTab } from './help/tabs/EnginesTab';
import { ModesTab } from './help/tabs/ModesTab';
import { WorkflowTab } from './help/tabs/WorkflowTab';
import { PromptingTab } from './help/tabs/PromptingTab';
import { NAV_ITEMS, Tab } from '../constants/helpContent';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    // Close on click outside & Esc key
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />;
            case 'prompting': return <PromptingTab />;
            case 'engines': return <EnginesTab />;
            case 'modes': return <ModesTab />;
            case 'workflow': return <WorkflowTab />;
            default: return <OverviewTab />;
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div 
                ref={modalRef}
                className="bg-brand-surface border border-gray-700 w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
                {/* SIDEBAR (Desktop) / TOPBAR (Mobile) */}
                <HelpSidebar 
                    items={NAV_ITEMS} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onClose={onClose} 
                />

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 overflow-y-auto bg-brand-surface relative">
                     {/* Mobile Close Button */}
                    <button 
                        onClick={onClose} 
                        className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg z-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-8 pb-20 md:pb-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
