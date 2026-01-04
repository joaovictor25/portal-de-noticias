import { useState } from 'react';
import { Menu, Search, Cpu, Github, Linkedin, X } from 'lucide-react';
import { WPCategory, Post } from '../types';

interface HeaderProps {
  onCategorySelect?: (category: any) => void;
  onHomeClick?: () => void;
  onSearch?: (query: string) => void;
  categories: WPCategory[];
  tickerPosts: Post[];
}

export const Header = ({ onCategorySelect, onHomeClick, onSearch, categories, tickerPosts }:HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim());
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSearchValue('');
    }
  };

  const handleMagnifierClick = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    } else if (searchValue.trim()) {
      if (onSearch) onSearch(searchValue.trim());
      setIsSearchOpen(false);
      setSearchValue('');
    } else {
      setIsSearchOpen(false);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="bg-slate-50 text-slate-500 text-[10px] py-1 px-4 border-b border-slate-100 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center overflow-hidden">
            <div className="shrink-0 flex items-center gap-2 mr-6 border-r border-slate-200 pr-4 z-10 bg-slate-50">
              <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse"></span>
              <span className="font-black uppercase tracking-tighter text-[9px]">Loop: Active</span>
            </div>
            <div className="whitespace-nowrap animate-[marquee_40s_linear_infinite] flex gap-12 font-bold uppercase italic tracking-widest opacity-70 text-[9px]">
              {tickerPosts.length > 0 ? (
                [...tickerPosts, ...tickerPosts].map((post, idx) => (
                  <span key={`${post.id}-${idx}`}>
                    <span dangerouslySetInnerHTML={{ __html: post.title }}></span>
                    <span>•</span>
                  </span>
                ))
              ) : (
                <span>Estabelecendo conexão segura com a rede Base Tecnológica...</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center relative">
          <div className="flex items-center gap-4 lg:gap-10">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              <Menu size={24} />
            </button>

            <div 
              onClick={onHomeClick}
              className="flex items-center gap-1 group cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-[#2563EB] rounded-sm flex items-center justify-center transform skew-x-[-15deg] group-hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                <Cpu size={18} className="text-white transform skew-x-[15deg]" />
              </div>
              <h1 className="text-lg md:text-2xl font-black tracking-tighter text-slate-900 uppercase italic ml-1">
                Base <span className="text-[#2563EB]">Tecnológica</span>
              </h1>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              <button 
                onClick={onHomeClick}
                className="cursor-pointer px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#2563EB] italic hover:bg-blue-50 rounded-md transition-all"
              >
                Início
              </button>
              {categories.slice(0, 5).map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => onCategorySelect?.(cat)}
                  className="cursor-pointer px-4 text-[10px] font-black uppercase tracking-widest transition-all italic flex items-center text-slate-500 hover:text-[#2563EB]"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex relative items-center">
              <input 
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Busque por..." 
                className={`bg-slate-50 border border-slate-200 rounded-sm py-2 pl-10 pr-4 text-[10px] text-slate-900 focus:outline-none transition-all font-bold uppercase italic ${isSearchOpen ? 'w-48 opacity-100 mr-2' : 'w-0 opacity-0 pointer-events-none'}`}
                onBlur={() => !searchValue && setIsSearchOpen(false)}
                autoFocus={isSearchOpen}
              />
              <button 
                type="button"
                onClick={handleMagnifierClick}
                className="text-slate-400 hover:text-[#2563EB] transition-colors z-10 w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <Search size={18} />
              </button>
            </form>

            <div className="hidden lg:flex items-center gap-1">
              <a href="https://github.com/joaovictor25" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 hover:bg-[#2563EB] text-white flex items-center justify-center rounded-sm transform skew-x-[-12deg] transition-all">
                <Github size={16} className="transform skew-x-[12deg]" />
              </a>
              <a href="https://www.linkedin.com/in/joaovictorbc/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 hover:bg-[#2563EB] text-white flex items-center justify-center rounded-sm transform skew-x-[-12deg] transition-all">
                <Linkedin size={16} className="transform skew-x-[12deg]" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeMenu}></div>
        <div className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-slate-200`}>
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2563EB] rounded-sm flex items-center justify-center transform skew-x-[-15deg]">
                  <Cpu size={18} className="text-white transform skew-x-[15deg]" />
                </div>
                <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Base Tecnológica</h2>
              </div>
              <button onClick={closeMenu} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#2563EB] border border-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
               <nav className="flex flex-col gap-1">
                <button 
                  onClick={() => { onHomeClick?.(); closeMenu(); }}
                  className="text-left py-4 px-5 text-xs font-black uppercase tracking-widest italic text-[#2563EB] bg-blue-500/5 rounded-xl mb-2"
                >
                  Início
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => { onCategorySelect?.(cat); closeMenu(); }}
                    className="text-left py-4 px-5 text-xs font-black uppercase tracking-widest italic text-slate-600 hover:text-[#2563EB] hover:bg-slate-50 rounded-xl transition-all"
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-[marquee_40s_linear_infinite] {
          display: inline-flex;
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
};