// Unused types retained for compilation safety during refactor
export interface FictionContextInput {
    subgenre: string;
    tone: string;
    currentChapter: number;
    totalChapters: number;
    endingType: string;
}

export interface BeatSheetData {
    phase: 'SETUP' | 'MIDDLE' | 'RESOLUTION';
    contextNote: string;
    beats: string[];
    roleInstruction: string;
}

export interface GenreDNA {
    keywords: string;
    forbidden: string;
    sensoryFocus: string;
    beats: string[];
}