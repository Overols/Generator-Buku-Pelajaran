
import { PromptConfig, InputMode } from './PromptConfig';

// Extracts the configuration props needed for the UI
// Updated to include all fields to prevent type errors in PromptConfiguration
export type UIConfig = PromptConfig & { inputMode: InputMode; chapterRoadmap?: string };

export type TabOption = 'original' | 'translation';

export interface NavLink {
    targetId: string;
    label: string;
}
