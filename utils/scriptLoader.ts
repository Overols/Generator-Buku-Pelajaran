
// Singleton promise cache to prevent race conditions
const scriptPromises: Record<string, Promise<void>> = {};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const LOAD_TIMEOUT = 10000; // 10 seconds

/**
 * Loads a script with Retry Logic and Timeout.
 * Provides resilience against CDN failures.
 */
export const loadExternalScript = (src: string, retries = MAX_RETRIES): Promise<void> => {
    // Return existing promise if already loading/loaded successfully
    if (scriptPromises[src]) return scriptPromises[src];

    const loadTask = new Promise<void>((resolve, reject) => {
        let attempts = 0;

        const tryLoad = () => {
            attempts++;
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            // Timeout logic
            const timeoutId = setTimeout(() => {
                script.onerror = null; // Prevent handling if it eventually loads after timeout
                script.onload = null;
                script.remove();
                handleError(new Error(`Timeout loading script: ${src}`));
            }, LOAD_TIMEOUT);

            script.onload = () => {
                clearTimeout(timeoutId);
                resolve();
            };

            script.onerror = () => {
                clearTimeout(timeoutId);
                script.remove();
                handleError(new Error(`Failed to load script: ${src}`));
            };

            document.body.appendChild(script);
        };

        const handleError = (error: Error) => {
            if (attempts < retries) {
                console.warn(`Attempt ${attempts} failed for ${src}. Retrying in ${RETRY_DELAY}ms...`);
                setTimeout(tryLoad, RETRY_DELAY);
            } else {
                delete scriptPromises[src]; // Clear cache so user can try again manually later
                reject(error);
            }
        };

        tryLoad();
    });

    scriptPromises[src] = loadTask;
    return loadTask;
};

export const loadMarked = () => {
    if (typeof window.marked?.parse === 'function') return Promise.resolve();
    return loadExternalScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js');
};

export const loadDocx = () => {
    // @ts-ignore
    if (typeof window.docx !== 'undefined') return Promise.resolve();
    return loadExternalScript('https://unpkg.com/docx@7.1.0/build/index.js');
};

export const loadHtml2Pdf = () => {
    // @ts-ignore
    if (typeof window.html2pdf !== 'undefined') return Promise.resolve();
    return loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
};
