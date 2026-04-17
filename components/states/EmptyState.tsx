
import React from 'react';

export const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
        <div className="w-20 h-20 bg-brand-surface2 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-brand-border">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-muted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-brand-text mb-2">Siap Membuat Karya</h3>
        <p className="text-brand-muted max-w-md leading-relaxed">
            Konfigurasikan pengaturan engine di atas dan klik tombol Buat Konten.
        </p>
    </div>
);
