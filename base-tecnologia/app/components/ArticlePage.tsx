import { useState, useEffect } from 'react';
import { ArrowLeft, Link as LinkIcon, Calendar, User as UserIcon } from 'lucide-react';
import { Post } from '../types';
import { wpApi } from '../services/api';
import { ArticleCard } from './ArticleCard';

interface ArticlePageProps {
  post: Post;
  onBack: () => void;
}

export const ArticlePage = ({ post, onBack }:ArticlePageProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchRelated = async () => {
      if (post.categoryId) {
        setIsLoadingRelated(true);
        try {
          const results = await wpApi.getPostsByCategory(post.categoryId);
          setRelatedPosts(results.filter(p => p.id !== post.id).slice(0, 3));
        } catch (e) {
          console.error("Related posts error", e);
        } finally {
          setIsLoadingRelated(false);
        }
      }
    };
    
    fetchRelated();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.id, post.categoryId]);

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-700 relative text-slate-900">
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-100">
        <div className="h-full bg-[#2563EB] transition-all duration-150" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <header className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-12 overflow-hidden bg-black">
        <img src={post.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 w-full relative z-10">
          <button onClick={onBack} className="mb-8 flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-[10px] hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={14} /> Voltar ao Início
          </button>
          <div className="flex flex-col gap-5">
            <span className="bg-blue-600 text-white w-fit px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm italic">{post.category}</span>
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-[1] italic" dangerouslySetInnerHTML={{ __html: post.title }}></h1>
            <div className="flex items-center gap-6 mt-4">
               <div className="flex items-center gap-2">
                  <UserIcon size={14} className="text-blue-500" />
                  <p className="text-white text-xs font-bold uppercase">{post.author}</p>
               </div>
               <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase">
                  <Calendar size={12} />
                  <span>{post.date}</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-slate max-w-none prose-p:text-lg prose-p:leading-relaxed text-slate-800">
            <div className="text-xl text-slate-600 font-medium leading-relaxed mb-10 italic border-l-4 border-blue-600 pl-6 py-4" dangerouslySetInnerHTML={{ __html: post.summary }}></div>
            <div className="wp-content font-sans space-y-6" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </article>
        </div>

        <section className="mt-24 pt-16 border-t border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-lg shadow-blue-600/20"><LinkIcon size={20} /></div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">Explorar <span className="text-[#2563EB]">Conexões</span></h3>
            <div className="h-[1px] bg-slate-100 grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoadingRelated ? (
              [1,2,3].map(i => <div key={i} className="aspect-video bg-slate-50 rounded-xl animate-pulse"></div>)
            ) : relatedPosts.map(p => (
              <div key={p.id}>
                <ArticleCard post={p} variant="grid" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};