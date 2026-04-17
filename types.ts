
// Barrel file for types
export * from './models/PromptConfig';
export * from './models/ContentData';

// UI Specific Types
export interface LoadingState {
  currentStep: string;
  completedSteps: string[];
}
