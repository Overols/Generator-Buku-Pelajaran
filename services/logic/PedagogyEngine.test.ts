
import { describe, it, expect } from 'vitest';
import { PedagogyEngine } from './PedagogyEngine';

describe('PedagogyEngine', () => {
    // Test Case 1: Validasi Fase A (SD Kelas Bawah)
    it('should return FASE A instructions for Grade 1 SD', () => {
        const instruction = PedagogyEngine.getInstructionByGrade('Kelas 1 SD (Fase A)');
        expect(instruction).toContain('FASE A');
        expect(instruction).toContain('kalimat pendek');
    });

    // Test Case 2: Validasi Fase D (SMP)
    it('should return FASE D instructions for SMP', () => {
        const instruction = PedagogyEngine.getInstructionByGrade('Kelas 7 SMP (Fase D)');
        expect(instruction).toContain('FASE D');
        expect(instruction).toContain('dunia remaja');
    });

    // Test Case 3: Validasi PAUD (Fase Fondasi)
    it('should prioritize play-based learning for PAUD', () => {
        const instruction = PedagogyEngine.getInstructionByGrade('PAUD/TK (Fase Fondasi)');
        expect(instruction).toContain('FASE FONDASI');
        expect(instruction).toContain('bermain sambil belajar');
    });

    // Test Case 4: Fallback Mechanism
    it('should return default instruction for unknown input', () => {
        const instruction = PedagogyEngine.getInstructionByGrade('Kelas X Unknown');
        expect(instruction).toContain('standar Indonesia (PUEBI)');
    });
});
