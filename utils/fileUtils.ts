
/**
 * Reads a text file and returns its content as a string.
 * Supports .txt, .md, .markdown files.
 */
export const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                resolve(text);
            } else {
                reject(new Error('Failed to read file content as string.'));
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Error occurred while reading the file.'));
        };

        reader.readAsText(file);
    });
};
