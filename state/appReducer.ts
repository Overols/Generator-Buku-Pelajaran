
import { State } from '../models/StateTypes';
import { FinalizedData, ReadabilityScores } from '../types';

export type Action =
  | { type: 'SET_FIELD'; field: keyof State; payload: any }
  | { type: 'GENERATE_START' }
  | { type: 'STREAM_UPDATE'; payload: string }
  | { type: 'UPDATE_LOADING_STEP'; payload: { currentStep: string; completedStep: string } }
  | { type: 'FINALIZE_DATA'; payload: FinalizedData }
  | { type: 'GENERATE_ERROR'; payload: string }
  | { type: 'REVISE_START' }
  | { type: 'REVISE_SUCCESS'; payload: { article: string; readabilityScores: ReadabilityScores } }
  | { type: 'REVISE_ERROR'; payload: string }
  | { type: 'HUMANIZE_START' }
  | { type: 'HUMANIZE_SUCCESS'; payload: { article: string; readabilityScores: ReadabilityScores } }
  | { type: 'HUMANIZE_ERROR'; payload: string }
  | { type: 'SUMMARIZE_START' }
  | { type: 'SUMMARIZE_SUCCESS'; payload: string }
  | { type: 'SUMMARIZE_ERROR'; payload: string };

export function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      if (typeof state[action.field] === 'number') {
        const numValue = Number(action.payload);
        return { ...state, [action.field]: isNaN(numValue) ? 0 : numValue };
      }
      return { ...state, [action.field]: action.payload };
    case 'GENERATE_START':
      return {
        ...state,
        isLoading: true,
        error: null,
        article: '',
        finalizedData: null,
        loadingState: {
          // Localized initial state
          currentStep: state.inputMode === 'refine' ? 'Menganalisis draf & riset data...' : 'Menyusun kerangka & draf awal...',
          completedSteps: [],
        },
      };
    case 'STREAM_UPDATE':
        return {
            ...state,
            article: state.article + action.payload,
        };
    case 'UPDATE_LOADING_STEP':
      if (!state.loadingState) return state;
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          currentStep: action.payload.currentStep,
          completedSteps: [...state.loadingState.completedSteps, action.payload.completedStep],
        },
      };
    case 'FINALIZE_DATA':
        return { 
            ...state,
            finalizedData: action.payload,
            article: '', 
            isLoading: false,
            loadingState: null,
            error: null,
        };
    case 'GENERATE_ERROR':
      return { ...state, isLoading: false, loadingState: null, error: action.payload };
    case 'REVISE_START':
        return { ...state, isRevising: true, error: null };
    case 'REVISE_SUCCESS':
        if (!state.finalizedData) return state;
        return {
            ...state,
            isRevising: false,
            finalizedData: {
                ...state.finalizedData,
                article: action.payload.article,
                readabilityScores: action.payload.readabilityScores,
            },
        };
    case 'REVISE_ERROR':
        return { ...state, isRevising: false, error: action.payload };
    case 'HUMANIZE_START':
        return { ...state, isHumanizing: true, error: null };
    case 'HUMANIZE_SUCCESS':
        if (!state.finalizedData) return state;
        return {
            ...state,
            isHumanizing: false,
            finalizedData: {
                ...state.finalizedData,
                article: action.payload.article,
                readabilityScores: action.payload.readabilityScores,
            },
        };
    case 'HUMANIZE_ERROR':
        return { ...state, isHumanizing: false, error: action.payload };
    case 'SUMMARIZE_START':
        return { ...state, isSummarizing: true, error: null };
    case 'SUMMARIZE_SUCCESS':
        return { 
            ...state, 
            isSummarizing: false, 
            previousContext: action.payload,
            chapterFocus: '', // RESET FOKUS BAB untuk bab berikutnya agar user menginput arahan baru
            finalizedData: state.finalizedData ? { ...state.finalizedData, summary: action.payload } : null
        };
    case 'SUMMARIZE_ERROR':
        return { ...state, isSummarizing: false, error: action.payload };
    default:
      return state;
  }
}
