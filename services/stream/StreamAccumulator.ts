
import { ParsedStreamChunk } from './StreamResponseParser';
import { StreamResponseParser } from './StreamResponseParser';

export interface AccumulatedResult {
    fullText: string;
    sourceMap: Map<string, any>;
    searchQueriesSet: Set<string>;
}

/**
 * StreamAccumulator
 * Domain: Infrastructure / Data Processing
 * Responsibility: Stateful accumulation of streaming chunks.
 * Principle: Single Responsibility (Aggregating Data).
 */
export class StreamAccumulator {
    private fullText: string = '';
    private sourceMap: Map<string, any> = new Map();
    private searchQueriesSet: Set<string> = new Set();

    /**
     * Processes a single chunk and updates internal state.
     * @param chunk The parsed chunk from the API
     * @returns The newly appended text segment (delta)
     */
    public processChunk(chunk: ParsedStreamChunk): string {
        let delta = '';

        if (chunk.text) {
            this.fullText += chunk.text;
            delta = chunk.text;
        }

        if (chunk.groundingMetadata) {
            StreamResponseParser.aggregateSources(this.sourceMap, chunk.groundingMetadata.chunks);
            chunk.groundingMetadata.queries?.forEach(q => this.searchQueriesSet.add(q));
        }

        return delta;
    }

    /**
     * Returns the final accumulated state in a clean format.
     */
    public getResult() {
        return {
            text: this.fullText,
            sources: this.sourceMap.size > 0 ? Array.from(this.sourceMap.values()) : null,
            searchQueries: this.searchQueriesSet.size > 0 ? Array.from(this.searchQueriesSet) : undefined
        };
    }

    public hasContent(): boolean {
        return this.fullText.length > 0;
    }
}
