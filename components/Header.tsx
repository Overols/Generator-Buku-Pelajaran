
import React from 'react';
import { MODEL_DISPLAY_NAMES } from '../constants/models';

interface HeaderProps {
    onOpenHelp: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ onOpenHelp }) => (
  <header className="sticky top-0 z-50 glass mb-8 transition-all duration-300 border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        
        {/* Logo Area: Education Identity */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-br from-sky-600 to-emerald-600 rounded-lg shadow-lg shadow-sky-900/30 ring-1 ring-white/10">
            <span className="text-xl filter drop-shadow-md">🇮🇩</span>
          </div>
          <div className="flex flex-col">
             <h1 className="text-lg font-bold text-brand-text tracking-tight leading-none">
               Pena <span className="text-sky-500">Pendidikan</span>
             </h1>
             <span className="text-[10px] text-brand-muted uppercase tracking-wider font-medium">
                Generator Buku & Modul Ajar
             </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4">
             <div className="px-3 py-1.5 rounded-full bg-brand-surface2 border border-brand-border text-xs text-brand-muted flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-medium text-emerald-400/80">{MODEL_DISPLAY_NAMES.GENERATION}</span>
                <span className="opacity-50">|</span>
                <span>Active</span>
             </div>
             <button 
                onClick={onOpenHelp}
                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-muted hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 border border-transparent hover:border-white/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Panduan
            </button>
        </div>

        {/* Mobile Nav Button */}
        <button 
            onClick={onOpenHelp}
            className="sm:hidden p-2 text-brand-muted hover:text-white bg-white/5 rounded-md"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        </button>
      </div>
    </div>
  </header>
));

export default Header;
