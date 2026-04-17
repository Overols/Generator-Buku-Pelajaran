
import { describe, it, expect } from 'vitest';
import { TextbookStrategy } from './TextbookStrategy';
import { PromptConfig } from '../../models/PromptConfig';
import { DEFAULT_STATE } from '../../state/initialState';

describe('TextbookStrategy', () => {
    
    // Helper untuk membuat config dummy
    const createConfig = (overrides: Partial<PromptConfig>): PromptConfig => ({
        ...DEFAULT_STATE,
        ...overrides
    });

    it('should include Arabic Script Protocol for Madrasah religious subjects', () => {
        const config = createConfig({
            targetAudience: 'Madrasah (Kemenag)',
            eduSubject: 'Fikih',
            writingStyle: 'Buku Teks Pelajaran'
        });

        const strategy = new TextbookStrategy(config);
        const persona = strategy.buildPersona();

        // Assert: Harus ada perintah Harakat dan Integrasi Keislaman
        expect(persona).toContain('PROTOKOL AKSARA ARAB');
        expect(persona).toContain('PROTOKOL INTEGRASI KEISLAMAN');
    });

    it('should NOT include Arabic Script Protocol for General Schools Math', () => {
        const config = createConfig({
            targetAudience: 'Sekolah Umum (Kemendikbud)',
            eduSubject: 'Matematika',
            writingStyle: 'Buku Teks Pelajaran'
        });

        const strategy = new TextbookStrategy(config);
        const persona = strategy.buildPersona();

        expect(persona).not.toContain('PROTOKOL AKSARA ARAB');
    });

    it('should enforce Strict Fact Mode when enabled', () => {
        const config = createConfig({
            useStrictFactMode: true
        });

        const strategy = new TextbookStrategy(config);
        const persona = strategy.buildPersona();

        expect(persona).toContain('STRICT GUARDRAIL');
    });

    it('should use Custom Subject name if "Umum/Lainnya" is selected', () => {
        const config = createConfig({
            eduSubject: 'Umum/Lainnya',
            customEduSubject: 'Muatan Lokal Budaya Banjar'
        });

        const strategy = new TextbookStrategy(config);
        const persona = strategy.buildPersona();

        expect(persona).toContain('Mapel: Muatan Lokal Budaya Banjar');
    });
});
