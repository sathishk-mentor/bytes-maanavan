export interface ByteMetadata {
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  updatedAt: string;
  order: number;
  isPopular: boolean;
}

export interface Byte extends ByteMetadata {
  content: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  heroLine?: string;
}

export interface ProgressData {
  completedBytes: string[];
  lastUpdated: string;
  categoryProgress: Record<string, {
    total: number;
    completed: number;
    percentage: number;
  }>;
}

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'all';
export type SortOption = 'order' | 'title' | 'recent';
