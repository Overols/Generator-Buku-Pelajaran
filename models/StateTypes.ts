
import { 
    PromptConfig,
    FinalizedData, LoadingState
} from '../types';

// State extends PromptConfig to inherit all configuration fields
export interface State extends PromptConfig {
    // --- Runtime UI State ---
    article: string;
    finalizedData: FinalizedData | null;
    isLoading: boolean;
    loadingState: LoadingState | null;
    error: string | null;
    
    // Process Flags
    isRevising: boolean;
    isHumanizing: boolean;
    isSummarizing: boolean;
    
    // Deprecated fields mapped to any to prevent strict type errors in legacy components
    [key: string]: any;
}
