
import { describe, it, expect } from 'vitest';
import { appReducer } from './appReducer';
import { DEFAULT_STATE } from './initialState';

describe('appReducer', () => {
    it('should handle SET_FIELD correctly', () => {
        const newState = appReducer(DEFAULT_STATE, {
            type: 'SET_FIELD',
            field: 'prompt',
            payload: 'Buat materi tentang fotosintesis'
        });
        expect(newState.prompt).toBe('Buat materi tentang fotosintesis');
    });

    it('should reset error and loading state on GENERATE_START', () => {
        const errorState = { ...DEFAULT_STATE, error: 'Previous Error', isLoading: false };
        const newState = appReducer(errorState, { type: 'GENERATE_START' });
        
        expect(newState.isLoading).toBe(true);
        expect(newState.error).toBeNull();
        expect(newState.article).toBe('');
    });

    it('should append text on STREAM_UPDATE', () => {
        const typingState = { ...DEFAULT_STATE, article: 'Hello' };
        const newState = appReducer(typingState, { 
            type: 'STREAM_UPDATE', 
            payload: ' World' 
        });
        expect(newState.article).toBe('Hello World');
    });

    it('should update loading steps on UPDATE_LOADING_STEP', () => {
        const loadingState = { 
            ...DEFAULT_STATE, 
            loadingState: { currentStep: 'Step 1', completedSteps: [] } 
        };
        const newState = appReducer(loadingState, { 
            type: 'UPDATE_LOADING_STEP', 
            payload: { currentStep: 'Step 2', completedStep: 'Step 1' } 
        });
        
        expect(newState.loadingState?.currentStep).toBe('Step 2');
        expect(newState.loadingState?.completedSteps).toContain('Step 1');
    });
});
