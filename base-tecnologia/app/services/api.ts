
import { Post, WPCategory } from '../types';

// Altere para a URL do seu site WordPress
const BASE_URL = 'https://ams.joaovictor.online/wp-json/wp/v2'; 

const mapWPPost = (wpPost: any): Post => {
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const author = wpPost._embedded?.['author']?.[0];
  const categories = wpPost._embedded?.['wp:term']?.[0] || [];

  return {
    id: wpPost.id.toString(),
    title: wpPost.title.rendered,
    summary: wpPost.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
    content: wpPost.content.rendered,
    author: author?.name || 'Pulse Admin',
    authorImageUrl: author?.avatar_urls?.['96'] || '',
    date: new Date(wpPost.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    category: categories[0]?.name || 'Uncategorized',
    categoryId: categories[0]?.id,
    imageUrl: featuredMedia?.source_url || 'https://images.unsplash.com/photo-1550741111-3d5d71e3b1c1?q=80&w=1200',
    slug: wpPost.slug
  };
};

export const wpApi = {
  async getPosts(params: string = ''): Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/posts?_embed&${params}`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(mapWPPost) : [];
  },

  async getPopularPosts(): Promise<Post[]> {
    // Usando comment_count como proxy de popularidade, já que WP nativo não tem view_count sem plugin
    return this.getPosts('orderby=comment_count&per_page=5');
  },

  async getCategories(): Promise<WPCategory[]> {
    const res = await fetch(`${BASE_URL}/categories?per_page=20&hide_empty=true`);
    return await res.json();
  },

  async getPostsByCategory(categoryId: number): Promise<Post[]> {
    return this.getPosts(`categories=${categoryId}`);
  },

  async searchPosts(query: string): Promise<Post[]> {
    return this.getPosts(`search=${encodeURIComponent(query)}`);
  }
};
