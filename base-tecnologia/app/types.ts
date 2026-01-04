
export enum Category {
  AI = 'Artificial Intelligence',
  HARDWARE = 'Hardware',
  SOFTWARE = 'Software',
  DEV = 'Development',
  CYBER = 'Cybersecurity',
  REVIEWS = 'Reviews'
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorImageUrl?: string;
  date: string;
  category: string;
  categoryId?: number;
  imageUrl: string;
  featured?: boolean;
  score?: number;
  slug?: string;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}
