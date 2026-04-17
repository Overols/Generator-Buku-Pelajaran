
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = React.memo(({ message }) => {
  if (!message) return null;

  // Detect Safety/Policy Errors vs Technical Errors
  const isSafetyError = message.toLowerCase().includes('blocked') || message.toLowerCase().includes('safety') || message.toLowerCase().includes('policy') || message.toLowerCase().includes('sensitive');
  const isRateLimit = message.toLowerCase().includes('429') || message.toLowerCase().includes('quota') || message.toLowerCase().includes('sibuk');

  return (
    <div className={`border-l-4 p-5 rounded-md shadow-lg animate-fade-in ${isSafetyError ? 'bg-orange-900/40 border-orange-500 text-orange-200' : 'bg-red-900/40 border-red-500 text-red-200'}`} role="alert">
      <div className="flex items-start">
        <div className="py-1 flex-shrink-0">
          {isSafetyError ? (
            <svg className="h-6 w-6 text-orange-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5a1 1 0 012 0v2a1 1 0 11-2 0v-2zm0-6a1 1 0 012 0v2a1 1 0 11-2 0V7z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">{isSafetyError ? 'Intervensi Keamanan Konten' : 'Terjadi Kendala Teknis'}</p>
          <p className="text-sm mt-1 opacity-90 leading-relaxed">{message}</p>
          
          {/* Actionable Advice Failsafe (Indonesian) */}
          <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs font-bold uppercase opacity-70 mb-1">Saran Tindakan:</p>
              {isSafetyError && (
                  <p className="text-sm italic opacity-80">
                      • AI menolak memproses topik ini. Cobalah sederhanakan instruksi atau hindari kata kunci sensitif (kekerasan/politik).<br/>
                      • Pastikan materi sesuai untuk konsumsi siswa sekolah.
                  </p>
              )}
              {isRateLimit && (
                  <p className="text-sm italic opacity-80">
                      • Server sedang sibuk. Mohon tunggu <strong>60 detik</strong> sebelum mencoba lagi.<br/>
                      • Cobalah mengurangi target jumlah kata.
                  </p>
              )}
              {!isSafetyError && !isRateLimit && (
                  <p className="text-sm italic opacity-80">
                      • Periksa koneksi internet Anda.<br/>
                      • Coba muat ulang halaman (Refresh). Pengaturan Anda tersimpan otomatis.
                  </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ErrorMessage;
