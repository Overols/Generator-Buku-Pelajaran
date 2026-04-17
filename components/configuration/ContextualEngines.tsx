
import React from 'react';
import { PromptConfig } from '../../models/PromptConfig';
import { EducationPanel } from './EducationPanel';

interface ContextualEnginesProps {
    config: PromptConfig;
    setField: (field: string, value: any) => void;
    isLoading: boolean;
}

export const ContextualEngines: React.FC<ContextualEnginesProps> = React.memo(({ config, setField, isLoading }) => {
    // We strictly use EducationPanel now.
    // The previous architecture allowed swapping, but we are specializing this app.
    return (
        <EducationPanel config={config} setField={setField} isLoading={isLoading} />
    );
});
