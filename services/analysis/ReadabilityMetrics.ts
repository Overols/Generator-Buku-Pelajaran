
/**
 * ReadabilityMetrics
 * Domain: Text Analysis
 * Responsibility: Calculate objective readability scores.
 */
export class ReadabilityMetrics {
    private static countSyllables(word: string): number {
        if (word.length <= 3) return 1;
        return word.toLowerCase().replace(/[^a-z]/g, '').replace(/e$/, '').match(/[aeiouy]+/g)?.length || 1;
    }

    public static calculate(text: string): { fleschReadingEase: number; gradeLevel: number } {
        if (!text?.trim()) return { fleschReadingEase: 0, gradeLevel: 0 };

        const words = text.trim().split(/\s+/);
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        if (!words.length) return { fleschReadingEase: 0, gradeLevel: 0 };

        const syllableCount = words.reduce((acc, word) => acc + this.countSyllables(word), 0);
        const wordsPerSent = words.length / (sentences.length || 1);
        const syllsPerWord = syllableCount / words.length;

        // Flesch Reading Ease formula
        const flesch = 206.835 - (1.015 * wordsPerSent) - (84.6 * syllsPerWord);
        // Flesch-Kincaid Grade Level formula
        const grade = (0.39 * wordsPerSent) + (11.8 * syllsPerWord) - 15.59;

        return {
            fleschReadingEase: Number(flesch.toFixed(1)),
            gradeLevel: Number(grade.toFixed(1)),
        };
    }
}
