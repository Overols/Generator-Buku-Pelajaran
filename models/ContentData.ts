
// Domain: Output Data Models

export interface TitleAnalysis {
  title: string;
  score: number;
  feedback: string;
  length: number;
}

export interface SeoData {
  focusKeyphrase: string;
  tags: string[];
  metaDescriptions: string[];
  slug: string;
  suggestedTitles: string[];
  titleAnalysis?: TitleAnalysis[];
}

export interface DetailedImagePrompt {
  subject: string;
  cameraBrand: string;
  cameraType: string;
  lens: string;
  atmosphere: string;
  pointOfView: string;
  negativePrompt: string;
}

export interface ImagePlaceholderData {
    description: string;
    detailedPrompt: DetailedImagePrompt | null;
}

export interface ReadabilityScores {
  fleschReadingEase: number;
  gradeLevel: number;
}

export interface SectionStat {
    title: string;
    level: number;
    wordCount: number;
    percentage: number;
}

export interface ArticleStats {
    totalWords: number;
    readingTimeMinutes: number;
    sections: SectionStat[];
}

export interface FinalizedData {
  article: string;
  sources: any[] | null;
  searchQueries?: string[];
  seoData: SeoData | null;
  imagePlaceholders: ImagePlaceholderData[] | null;
  readabilityScores: ReadabilityScores | null;
  summary?: string; 
  stats?: ArticleStats;
}
