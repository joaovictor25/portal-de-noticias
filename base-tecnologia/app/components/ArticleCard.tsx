import { User } from 'lucide-react';
import { Post } from '../types';

interface ArticleCardProps {
  post: Post;
  variant?: 'list' | 'grid';
}

export const ArticleCard = ({ post, variant = 'grid' }:ArticleCardProps) => {
  if (variant === 'list') {
    return (
      <div className="flex gap-4 group cursor-pointer border-b border-slate-100 pb-4 last:border-0 hover:bg-slate-50 p-2 transition-all duration-300 rounded-lg">
        <div className="w-28 h-20 shrink-0 overflow-hidden rounded-md border border-slate-200">
          <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[9px] font-black text-[#2563EB] uppercase tracking-[0.2em] mb-1">{post.category}</span>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 leading-tight mb-2 italic" dangerouslySetInnerHTML={{ __html: post.title }}></h4>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col group cursor-pointer bg-white border border-slate-200 hover:border-blue-500/50 transition-all duration-500 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 h-full">
      <div className="aspect-[16/9] overflow-hidden relative">
        <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
        <div className="absolute top-4 left-4">
           <span className="bg-[#2563EB] text-white text-[9px] font-black px-2 py-1 uppercase tracking-tighter skew-x-[-12deg] shadow-md">{post.category}</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-3 uppercase italic tracking-tight" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
        <p className="text-slate-600 text-xs line-clamp-2 mb-5 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: post.summary }}></p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 uppercase font-black tracking-widest">
          <div className="flex items-center gap-2">
            <User size={12} className="text-blue-600" />
            <span>{post.author}</span>
          </div>
          <span className="font-bold opacity-60">{post.date}</span>
        </div>
      </div>
    </div>
  );
};