
import React, { useState } from 'react';
import InfoTooltip from '../InfoTooltip';

interface ContextManagerProps {
    previousContext: string;
    chapterRoadmap: string;
    onContextChange: (val: string) => void;
    onRoadmapChange: (val: string) => void;
    isLoading: boolean;
}

export const ContextManager: React.FC<ContextManagerProps> = React.memo(({ 
    previousContext, 
    chapterRoadmap, 
    onContextChange, 
    onRoadmapChange, 
    isLoading 
}) => {
    const [isOpen, setIsOpen] = useState(false); // Default closed for cleaner UI
    const [activeTab, setActiveTab] = useState<'bridge' | 'roadmap'>('bridge');

    const hasBridge = !!(previousContext && previousContext.length > 0);
    const hasRoadmap = !!(chapterRoadmap && chapterRoadmap.length > 0);

    return (
        <div className="bg-gray-900/30 rounded-lg border border-gray-700/50 overflow-hidden">
            {/* Header / Toggler */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-gray-800/40 hover:bg-gray-800/60 transition-colors group border-b border-gray-700/30"
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Manajer Konteks (Kontrol Alur)
                    </span>
                    {(hasBridge || hasRoadmap) && (
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                    )}
                </div>
                <span className="text-[10px] text-gray-500 font-mono uppercase">{isOpen ? 'Tutup' : 'Buka'}</span>
            </button>

            {isOpen && (
                <div className="animate-fade-in">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-700/50">
                        <button
                            onClick={() => setActiveTab('bridge')}
                            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === 'bridge' ? 'bg-gray-800 text-blue-300 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Jembatan (Masa Lalu)
                        </button>
                        <button
                            onClick={() => setActiveTab('roadmap')}
                            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === 'roadmap' ? 'bg-gray-800 text-green-300 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Roadmap (Masa Depan)
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="p-3">
                        {activeTab === 'bridge' && (
                            <div className="space-y-2 animate-fade-in">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold text-blue-400 uppercase">Snapshot dari Bab Sebelumnya</label>
                                    <InfoTooltip text="Status terakhir (Waktu, Lokasi, Inventaris) dari akhir bab sebelumnya. Mencegah logika lompat." />
                                </div>
                                <textarea 
                                    value={previousContext}
                                    onChange={(e) => onContextChange(e.target.value)}
                                    placeholder="Paste 'Continuity Snapshot' di sini..."
                                    className="w-full h-32 p-3 bg-gray-900/50 border border-gray-700 rounded-md text-xs text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-y font-mono"
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        {activeTab === 'roadmap' && (
                            <div className="space-y-2 animate-fade-in">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold text-green-400 uppercase">Rencana Bab (Story Bible)</label>
                                    <InfoTooltip text="AI akan mematuhi rencana untuk BAB SAAT INI. Edit ini untuk menyetir plot sebelum generate." />
                                </div>
                                <textarea 
                                    value={chapterRoadmap}
                                    onChange={(e) => onRoadmapChange(e.target.value)}
                                    placeholder="Chapter 1: Intro...&#10;Chapter 2: Konflik..."
                                    className="w-full h-32 p-3 bg-gray-900/50 border border-gray-700 rounded-md text-xs text-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 resize-y font-mono"
                                    disabled={isLoading}
                                />
                                <p className="text-[10px] text-gray-500 italic">
                                    *Tip: Pastikan ada baris seperti <strong>"Chapter [N]: [Kejadian]"</strong> yang sesuai dengan selektor bab saat ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});
