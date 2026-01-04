import { ArticleCard } from './ArticleCard';
import { Post, WPCategory } from '../types';

interface SidebarProps {
  onCategorySelect?: (category: WPCategory) => void;
  categories: WPCategory[];
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export const Sidebar = ({ onCategorySelect, categories, posts, onPostClick }:SidebarProps) => {
  return (
    <aside className="space-y-12">
      <div>
        <div className="flex items-center gap-3 border-b-2 border-blue-600 mb-6">
          <h3 className="bg-[#2563EB] text-white px-4 py-1 text-[10px] font-black uppercase tracking-tighter italic skew-x-[-12deg]">
            Base de dados
          </h3>
        </div>
        <div className="space-y-4">
          {posts.slice(0, 4).map(post => (
            <div key={post.id} onClick={() => onPostClick?.(post)}>
              <ArticleCard post={post} variant="list" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 border-b-2 border-slate-200 mb-6">
          <h3 className="text-slate-500 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Categorias</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => onCategorySelect?.(cat)}
              className="px-3 py-1.5 border border-slate-200 hover:border-blue-500/50 hover:bg-blue-500/5 text-slate-500 hover:text-blue-600 transition-all rounded-sm text-[9px] font-black uppercase italic tracking-widest"
            >
              #{cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};