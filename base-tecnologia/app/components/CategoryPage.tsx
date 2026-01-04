import { ChevronLeft } from 'lucide-react';
import { Post } from '../types';
import { ArticleCard } from './ArticleCard';

interface CategoryPageProps {
  title: string;
  posts: Post[];
  onPostClick: (post: Post) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const CategoryPage = ({ title, posts, onPostClick, onBack, isLoading }:CategoryPageProps) => {
  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <header className="pt-32 pb-16 border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 flex items-center gap-2">
                  <ChevronLeft size={14} /> Raiz do Sistema
                </button>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none" dangerouslySetInnerHTML={{ __html: title }}></h1>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900 font-mono leading-none">
                {posts.length.toString().padStart(3, '0')}
                <span className="text-xs ml-2 text-slate-400 uppercase tracking-widest">Postagens</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-video bg-slate-50 animate-pulse rounded-xl"></div>)}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map((post) => (
              <div key={post.id} onClick={() => onPostClick(post)}>
                <ArticleCard post={post} variant="grid" />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-slate-100 rounded-3xl">
            <h3 className="text-xl font-black text-slate-400 uppercase italic">Nenhum dado encontrado</h3>
          </div>
        )}
      </main>
    </div>
  );
};