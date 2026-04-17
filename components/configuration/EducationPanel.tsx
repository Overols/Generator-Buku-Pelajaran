
import React, { useMemo } from 'react';
import { SelectField } from '../common/SelectField';
import ConfigurationOption from '../ConfigurationOption';
import { PromptConfig } from '../../models/PromptConfig';
import { ConfigRulesEngine } from '../../services/logic/ConfigRulesEngine';
import { 
    EDUCATION_SUBJECTS, // Fallback
    K12_SUBJECTS,
    UTBK_SUBJECTS,
    CURRICULUM_TYPES, 
    TARGET_AUDIENCE_OPTIONS,
    WRITING_STYLE_OPTIONS,
    TONE_OPTIONS,
    WRITING_STYLE_DESCRIPTIONS,
    TONE_DESCRIPTIONS
} from '../../constants/options';
import InfoTooltip from '../InfoTooltip';

interface EducationPanelProps {
  config: PromptConfig;
  setField: (field: string, value: any) => void;
  isLoading: boolean;
}

/**
 * EducationPanel
 * Responsibility: Pure Presentation Layer for Education Config.
 * Logic freed (moved to ConfigRulesEngine).
 */
export const EducationPanel: React.FC<EducationPanelProps> = React.memo(({ config, setField, isLoading }) => {
  
  // Data Transformation
  const activeGradeOptions = ConfigRulesEngine.getValidGrades(config.targetAudience as string);
  const isUtbkMode = config.writingStyle === 'Buku Persiapan PTN / UTBK';

  // Dynamic Subject List based on Mode
  const activeSubjectOptions = useMemo(() => {
      return isUtbkMode ? UTBK_SUBJECTS : K12_SUBJECTS;
  }, [isUtbkMode]);

  return (
    <div className="bg-sky-900/10 border border-sky-500/30 rounded-xl p-5 relative z-20 animate-fade-in shadow-sm">
        <h3 className="text-sky-400 text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-sky-500/20 pb-3">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
            Konfigurasi Materi Ajar
        </h3>

        {/* 1. Identity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
                id="targetAudience"
                label="Jenis Institusi"
                value={config.targetAudience as string}
                options={TARGET_AUDIENCE_OPTIONS}
                description="Pilih jenis lembaga untuk menyesuaikan standar kurikulum."
                onChange={(val) => setField('targetAudience', val)}
                disabled={isLoading}
                theme="fiction-indigo"
            />
            <SelectField
                id="eduGrade"
                label="Tingkat Kelas"
                value={config.eduGrade}
                options={activeGradeOptions}
                description={isUtbkMode ? "Tingkat kelas dikunci otomatis (Gap Year / Akhir Fase F) untuk konteks UTBK." : "Menentukan pendekatan pedagogis (Fase A-F)."}
                onChange={(val) => setField('eduGrade', val)}
                disabled={isLoading || isUtbkMode} // Disabled on UTBK
                theme="fiction-indigo"
            />
        </div>

        {/* 2. Content & Style Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
                <SelectField
                    id="writingStyle"
                    label="Jenis Output (Style)"
                    value={config.writingStyle}
                    options={WRITING_STYLE_OPTIONS}
                    description={WRITING_STYLE_DESCRIPTIONS[config.writingStyle]}
                    onChange={(val) => setField('writingStyle', val)}
                    disabled={isLoading}
                    theme="fiction-indigo"
                />
            </div>
            <div className="space-y-3">
                <SelectField
                    id="eduSubject"
                    label={isUtbkMode ? "Subtes / Materi Uji" : "Mata Pelajaran"}
                    value={config.eduSubject}
                    options={activeSubjectOptions}
                    description={isUtbkMode ? "Pilih subtes spesifik untuk bab ini." : "Menentukan terminologi spesifik."}
                    onChange={(val) => setField('eduSubject', val)}
                    disabled={isLoading}
                    theme="fiction-indigo"
                />
                {config.eduSubject === 'Umum/Lainnya' && (
                    <input
                        type="text"
                        value={config.customEduSubject || ''}
                        onChange={(e) => setField('customEduSubject', e.target.value)}
                        placeholder="Ketik Nama Mapel / Topik Campuran..."
                        className="w-full p-3 text-sm bg-amber-900/10 border border-amber-500/30 rounded-lg text-brand-text focus:border-amber-500 outline-none"
                        disabled={isLoading}
                    />
                )}
            </div>
        </div>

        {/* 3. Curriculum & Tone Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
                id="eduCurriculum"
                label="Basis Kurikulum"
                value={config.eduCurriculum}
                options={CURRICULUM_TYPES}
                description="Merdeka (CP) vs K-13 (KD)."
                onChange={(val) => setField('eduCurriculum', val)}
                disabled={isLoading}
                theme="fiction-indigo"
            />
            <SelectField
                id="tone"
                label="Nada Bahasa (Tone)"
                value={config.tone}
                options={TONE_OPTIONS}
                description={TONE_DESCRIPTIONS[config.tone]}
                onChange={(val) => setField('tone', val)}
                disabled={isLoading}
                theme="fiction-indigo"
            />
        </div>

        {/* 4. Competency & Guardrail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                    {isUtbkMode ? 'Cakupan Materi (Kisi-Kisi)' : (config.eduCurriculum === 'Kurikulum Merdeka' ? 'Capaian Pembelajaran (CP)' : 'Kompetensi Dasar (KD)')}
                </label>
                <textarea
                    value={config.eduCompetency}
                    onChange={(e) => setField('eduCompetency', e.target.value)}
                    placeholder={isUtbkMode ? "Contoh: Menganalisis pola bilangan deret aritmatika dan geometri." : "Salin teks CP/KD resmi di sini..."}
                    className="w-full h-32 bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 focus:border-sky-500 outline-none resize-none"
                    disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-green-400 uppercase tracking-wider">Materi Referensi (Guardrail)</label>
                    <span className="text-[10px] px-2 py-0.5 bg-green-900/40 border border-green-500/30 rounded text-green-300 font-bold">Wajib</span>
                </div>
                <textarea
                    value={config.sourceMaterial}
                    onChange={(e) => setField('sourceMaterial', e.target.value)}
                    placeholder="Tempelkan ringkasan materi valid. AI akan dilarang mengarang fakta di luar teks ini."
                    className="w-full h-32 bg-gray-900/50 border border-green-500/50 rounded-lg p-3 text-sm text-gray-300 focus:border-green-400 outline-none resize-none"
                    disabled={isLoading}
                />
            </div>
        </div>

        {/* 5. Structure Section (Chapter & Bibliography) */}
        <div className="bg-sky-900/20 border border-sky-500/20 rounded-lg p-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            
            {/* Chapter Counter */}
            <div className="flex-shrink-0">
                <ConfigurationOption 
                    id="eduChapter" 
                    label="Bab Ke-" 
                    value={config.eduChapter} 
                    onChange={(v) => setField('eduChapter', v)} 
                    min={1} 
                    max={20} 
                    disabled={isLoading}
                />
            </div>

            {/* Middle: Info */}
            <div className="flex-1 text-xs text-sky-400/70 sm:border-l sm:border-sky-500/30 sm:pl-3">
                {isUtbkMode 
                    ? "Bab 1 biasanya Strategi Umum. Bab selanjutnya bedah Subtes per materi."
                    : "Urutan Alur: Apersepsi \u2192 Materi Inti \u2192 Aktivitas \u2192 Asesmen."}
            </div>

            {/* Right: Bibliography Toggle (Manual Control) */}
            <div className="flex-shrink-0 bg-sky-950/40 p-2 rounded-lg border border-sky-500/10">
                 <label className={`flex items-center gap-2 cursor-pointer group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={config.includeBibliography}
                            onChange={(e) => setField('includeBibliography', e.target.checked)}
                            disabled={isLoading}
                        />
                        <div className={`w-9 h-5 rounded-full transition-colors duration-200 border border-gray-600 ${config.includeBibliography ? 'bg-green-600 border-green-500' : 'bg-gray-700'}`}></div>
                        <div className={`absolute left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${config.includeBibliography ? 'translate-x-4' : ''}`}></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">
                            + Daftar Pustaka
                        </span>
                        <span className="text-[9px] text-gray-500">
                            Centang di Bab Akhir
                        </span>
                    </div>
                </label>
            </div>
        </div>
    </div>
  );
});
