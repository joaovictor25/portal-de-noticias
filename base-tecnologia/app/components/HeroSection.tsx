import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Post } from '../types';

interface HeroSectionProps {
  posts: Post[];
  onPostSelect?: (post: Post) => void;
}

export const HeroSection = ({ posts, onPostSelect }:HeroSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentPost = posts[activeIndex];
  
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % posts.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);

  if (!currentPost) return null;

  return (
    <section className="w-full relative bg-[#0a0a0a] overflow-hidden min-h-[600px] md:min-h-[700px] lg:aspect-[21/9] flex items-center justify-center py-6 md:py-10">
      <div className="absolute inset-0 z-0">
        <img 
          src={currentPost.imageUrl} 
          alt={currentPost.title}
          className="w-full h-full object-cover opacity-50 transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 w-[95%] h-[90%] max-w-[1600px] border border-white/10 rounded-[40px] flex flex-col justify-between p-6 md:p-16 bg-black/10 backdrop-blur-[2px]">
        <div className="absolute top-10 left-[-1px] w-[2px] h-24 bg-white/60"></div>
        <div className="absolute top-10 left-4 w-4 h-[2px] bg-white/60"></div>
        
        <div className="absolute bottom-10 right-[-1px] w-[2px] h-24 bg-white/60"></div>
        <div className="absolute bottom-10 right-4 w-4 h-[2px] bg-white/60"></div>

        <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="mb-6">
            <span className="bg-[#1a1a1a] text-[#2563EB] text-[11px] font-black px-3 py-1 uppercase tracking-widest border border-white/10">
              {currentPost.category}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tighter mb-6 italic" dangerouslySetInnerHTML={{ __html: currentPost.title }}></h2>

          <p className="text-white/80 text-sm md:text-1 font-medium leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none" dangerouslySetInnerHTML={{ __html: currentPost.summary }}></p>
          
          <button 
            onClick={() => onPostSelect?.(currentPost)}
            className="cursor-pointer mt-8 bg-[#2563EB] text-white px-10 py-4 font-black uppercase italic tracking-tighter text-sm skew-x-[-12deg] hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-600/30 flex items-center gap-3"
          >
            Ver mais <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mt-8">
          <div className="flex items-center gap-6 text-white/90 text-sm font-bold uppercase tracking-tight">
            <div className="flex items-center gap-2">
              <span className="opacity-60 lowercase">by</span>
              <span className="border-b border-[#2563EB] pb-0.5">{currentPost.author}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <span className="opacity-80 font-mono tracking-tighter">{currentPost.date}</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#2563EB] transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              {posts.slice(0, 3).map((post, idx) => (
                <div 
                  key={post.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-16 h-10 md:w-32 md:h-18 cursor-pointer rounded-sm overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'ring-2 ring-[#2563EB] scale-105' : 'opacity-40 grayscale hover:grayscale-0'}`}
                >
                  <img src={post.imageUrl} className="w-full h-full object-cover" alt="thumb" />
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="w-10 h-10 flex items-center justify-center text-white hover:text-[#2563EB] transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
