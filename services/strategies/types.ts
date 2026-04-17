
export interface IPromptStrategy {
    buildPersona(): string;
    buildStructure(): string;
    buildLanguageConstraints(): string;
    buildResearchDirectives(): string;
}
