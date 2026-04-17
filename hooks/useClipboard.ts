
import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 2500) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback((text: string) => {
        if (!text) return;
        
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), timeout);
        }).catch(err => {
            console.error('Failed to copy content: ', err);
            // Fallback or alert could be handled here if strict error reporting is needed
        });
    }, [timeout]);

    return { isCopied, copyToClipboard };
};
