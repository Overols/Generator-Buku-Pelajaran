
import { ContinuityAnalyzer, ContinuityResult } from './continuity/ContinuityAnalyzer';

/**
 * Service Wrapper for Continuity Analysis
 */
export async function generateContextSummary(articleText: string, currentChapter: number): Promise<ContinuityResult> {
  return ContinuityAnalyzer.analyzeState(articleText, currentChapter);
}
