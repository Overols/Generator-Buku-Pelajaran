
import { PromptConfig } from '../../models/PromptConfig';
import { IPromptStrategy } from './types';
import { TextbookStrategy } from './TextbookStrategy';

/**
 * StrategyFactory
 * Responsibility: Instantiates the correct content strategy.
 * Refactored: Strict single-path execution for Indonesian Education domain.
 */
export class StrategyFactory {
    
    /**
     * Creates the content strategy instance.
     * 
     * @param config The user configuration.
     * @returns The specific strategy instance (TextbookStrategy).
     */
    public static create(config: PromptConfig): IPromptStrategy {
        // STRICT ENFORCEMENT:
        // Karena aplikasi ini sekarang dikhususkan 100% untuk Pendidikan Indonesia (K-12),
        // kita merutekan SEMUA permintaan ke TextbookStrategy.
        // Variasi (Modul, LKS, Artikel) ditangani secara internal oleh TextbookStrategy 
        // berdasarkan field 'writingStyle' di config.
        
        return new TextbookStrategy(config);
    }
}
