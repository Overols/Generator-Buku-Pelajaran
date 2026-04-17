
import React from 'react';
import { NavItem, Tab } from '../../constants/helpContent';

interface HelpSidebarProps {
    items: NavItem[];
    activeTab: Tab;
    onTabChange: (id: Tab) => void;
    onClose: () => void;
}

export const HelpSidebar: React.FC<HelpSidebarProps> = ({ items, activeTab, onTabChange, onClose }) => {
    return (
        <div className="w-full md:w-72 bg-gray-900/50 border-b md:border-b-0 md:border-r border-gray-700 flex flex-col">
            <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="text-blue-500">❖</span> Panduan Pengguna
                </h2>
                <p className="text-xs text-gray-400 mt-1">Gemini 3.0 Architect (Indo)</p>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                            activeTab === item.id 
                            ? 'bg-blue-600/10 border border-blue-500/50 text-white' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                        <div>
                            <div className={`font-semibold text-sm ${activeTab === item.id ? 'text-blue-200' : ''}`}>{item.label}</div>
                            <div className="text-[10px] opacity-60 leading-tight">{item.desc}</div>
                        </div>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-700/50 hidden md:block">
                 <button 
                    onClick={onClose}
                    className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                    Tutup Panduan
                </button>
            </div>
        </div>
    );
};
