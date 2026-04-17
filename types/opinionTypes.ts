// Unused types retained for compilation safety during refactor
export type OpinionArchetypeType = 'SATIRIST' | 'POLEMICIST' | 'ANALYST' | 'ADVOCATE' | 'OBSERVER';

export interface OpinionArchetypeConfig {
    type: OpinionArchetypeType;
    name: string;
    icon: string;
    color: string;
    description: string;
}

export interface OpinionContextInput {
    tone: string;
    editorialStance: string;
}