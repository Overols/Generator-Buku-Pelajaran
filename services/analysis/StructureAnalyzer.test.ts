
import { describe, it, expect } from 'vitest';
import { StructureAnalyzer } from './StructureAnalyzer';

describe('StructureAnalyzer', () => {
    const mockArticle = `
# Judul Bab
Ini adalah paragraf pembuka.

## Sub Bab 1
Konten sub bab 1.

## Sub Bab 2
Konten sub bab 2.
    `;

    it('should count total words correctly', () => {
        const stats = StructureAnalyzer.analyze(mockArticle);
        // "Judul Bab Ini adalah paragraf pembuka. Sub Bab 1 Konten sub bab 1. Sub Bab 2 Konten sub bab 2."
        // Total sekitar 19 kata
        expect(stats.totalWords).toBeGreaterThan(15);
        expect(stats.totalWords).toBeLessThan(25);
    });

    it('should identify sections based on headers', () => {
        const stats = StructureAnalyzer.analyze(mockArticle);
        
        // Should detect Introduction, Sub Bab 1, Sub Bab 2
        // Note: StructureAnalyzer logic pushes the buffer when it hits a header.
        
        const titles = stats.sections.map(s => s.title);
        expect(titles).toContain('Judul Bab');
        expect(titles).toContain('Sub Bab 1');
        expect(titles).toContain('Sub Bab 2');
    });

    it('should handle empty input gracefully', () => {
        const stats = StructureAnalyzer.analyze('');
        expect(stats.totalWords).toBe(0);
        expect(stats.sections).toEqual([]);
    });
});
