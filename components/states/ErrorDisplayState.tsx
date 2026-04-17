
import React from 'react';
import ErrorMessage from '../ErrorMessage';

interface ErrorDisplayStateProps {
    error: string | null;
}

export const ErrorDisplayState: React.FC<ErrorDisplayStateProps> = ({ error }) => {
    if (!error) return null;
    return (
        <div className="py-10 max-w-2xl mx-auto">
            <ErrorMessage message={error} />
        </div>
    );
};
