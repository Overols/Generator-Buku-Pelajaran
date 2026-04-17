
import { FieldDefinition } from '../models/FormConfigurationModels';
import { PromptConfig } from '../models/PromptConfig';

import { 
    TARGET_AUDIENCE_OPTIONS, TONE_OPTIONS, WRITING_STYLE_OPTIONS,
    PARAGRAPH_LENGTH_OPTIONS, SYNTAX_COMPLEXITY_OPTIONS,
    TONE_DESCRIPTIONS, WRITING_STYLE_DESCRIPTIONS,
    SHOW_DONT_TELL_DESCRIPTIONS
} from './options';

// --- STANDARD OPTIONS ---
type StandardKey = keyof Pick<PromptConfig, 'targetAudience' | 'tone' | 'writingStyle'>;

export const STANDARD_FIELDS: FieldDefinition<StandardKey>[] = [
  { label: 'Target Pembaca', field: 'targetAudience', options: TARGET_AUDIENCE_OPTIONS, desc: {} },
  { label: 'Gaya Penulisan', field: 'writingStyle', options: WRITING_STYLE_OPTIONS, desc: WRITING_STYLE_DESCRIPTIONS },
  { label: 'Nada Bahasa (Tone)', field: 'tone', options: TONE_OPTIONS, desc: TONE_DESCRIPTIONS },
];

// --- TEXTURE OPTIONS ---
type TextureKey = keyof Pick<PromptConfig, 'paragraphLength' | 'syntaxComplexity'>;

export const TEXTURE_FIELDS: FieldDefinition<TextureKey>[] = [
    { label: 'Panjang Paragraf', field: 'paragraphLength', options: PARAGRAPH_LENGTH_OPTIONS, desc: {} },
    { label: 'Kompleksitas Kalimat', field: 'syntaxComplexity', options: SYNTAX_COMPLEXITY_OPTIONS, desc: {} },
];

// --- LOGIC OPTIONS ---
type LogicKey = keyof Pick<PromptConfig, 'showDontTell'>;

export const LOGIC_FIELDS: FieldDefinition<LogicKey>[] = [
    { label: 'Show, Don\'t Tell', field: 'showDontTell', options: ['Tell (Expository)', 'Balanced', 'Show (Immersive)'], desc: SHOW_DONT_TELL_DESCRIPTIONS },
];
