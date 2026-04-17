
import { PromptConfig } from '../models/PromptConfig';
import { DEFAULT_STATE } from '../state/initialState';

export const parseUrlState = (search: string): Partial<PromptConfig> => {
    const params = new URLSearchParams(search);
    const state: any = {};

    // Standard
    if (params.get('p')) state.prompt = params.get('p');
    if (params.get('ws')) state.writingStyle = params.get('ws');
    if (params.get('ta')) state.targetAudience = params.get('ta');
    if (params.get('tone')) state.tone = params.get('tone');
    
    // Education
    if (params.get('subj')) state.eduSubject = params.get('subj');
    if (params.get('curr')) state.eduCurriculum = params.get('curr');
    if (params.get('chap')) state.eduChapter = parseInt(params.get('chap') || '1');
    if (params.get('cp')) state.eduCompetency = params.get('cp');

    return state;
};

export const stringifyStateToUrl = (state: PromptConfig, defaults: PromptConfig): string => {
    const params = new URLSearchParams();

    if (state.prompt && state.prompt !== defaults.prompt) params.set('p', state.prompt);
    if (state.writingStyle !== defaults.writingStyle) params.set('ws', state.writingStyle);
    if (state.targetAudience !== defaults.targetAudience) params.set('ta', state.targetAudience);
    if (state.tone !== defaults.tone) params.set('tone', state.tone);
    
    if (state.eduSubject !== defaults.eduSubject) params.set('subj', state.eduSubject);
    if (state.eduCurriculum !== defaults.eduCurriculum) params.set('curr', state.eduCurriculum);
    if (state.eduChapter !== defaults.eduChapter) params.set('chap', String(state.eduChapter));
    if (state.eduCompetency) params.set('cp', state.eduCompetency);

    return params.toString();
};
