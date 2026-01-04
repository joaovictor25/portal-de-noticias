import { Cpu, Linkedin, Github } from 'lucide-react';
import { WPCategory } from '../types';

interface FooterProps {
  onNavigate: (view: any) => void;
  categories: WPCategory[];
  onCategorySelect: (cat: WPCategory) => void;
}

export const Footer = ({ onNavigate, categories, onCategorySelect }:FooterProps) => {
  return (
    <footer className="bg-slate-50 text-slate-600 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#2563EB] rounded-sm flex items-center justify-center transform skew-x-[-12deg]">
                  <Cpu size={18} className="text-white transform skew-x-[12deg]" />
                </div>
                <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">
                  Base <span className="text-[#2563EB]">Tecnológica</span>
                </h1>
              </div>
              <p className="text-xs leading-loose">
                A vanguarda da tecnologia. Fornecendo análises críticas para a nova era digital com foco em silício e código.
              </p>
          </div>
          
          <div>
            <h5 className="text-slate-900 font-black uppercase text-[10px] tracking-widest mb-6 border-l-2 border-blue-600 pl-3">Categorias</h5>
            <ul className="space-y-3 text-xs font-bold uppercase italic">
              {categories.slice(0, 4).map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onCategorySelect(cat)} 
                    className="cursor-pointer hover:text-blue-600 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-slate-900 font-black uppercase text-[10px] tracking-widest mb-6 border-l-2 border-blue-600 pl-3">Institucional</h5>
            <ul className="space-y-3 text-xs font-bold uppercase italic">
              <li><button onClick={() => onNavigate('about')} className="cursor-pointer hover:text-blue-600 transition-colors">Sobre Nós</button></li>
            </ul>
          </div>

          <div>
             <h5 className="text-slate-900 font-black uppercase text-[10px] tracking-widest mb-6 border-l-2 border-blue-600 pl-3">Conectar</h5>
             <div className="flex flex-col gap-4">
                <a href="https://www.linkedin.com/in/joaovictorbc/" target="_blank" className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 text-xs hover:border-blue-600 transition-all group">
                   <Linkedin size={16} className="text-[#0077b5]" />
                   <span className="font-black uppercase italic group-hover:text-blue-600">LinkedIn</span>
                </a>
                <a href="https://github.com/joaovictor25" target="_blank" className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 text-xs hover:border-blue-600 transition-all group">
                   <Github size={16} className="text-slate-900" />
                   <span className="font-black uppercase italic group-hover:text-blue-600">GitHub</span>
                </a>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-200 text-[10px] font-bold uppercase tracking-widest">
           <p>© 2024 Base Tecnológica. Todos os direitos reservados.</p>
           <div className="flex items-center gap-6">
              <p>Desenvolvido por <a href="https://joaovictor.online/" target="_blank" className="text-[#2563EB] hover:text-blue-500 transition-colors">João Victor</a></p>
           </div>
        </div>
      </div>
    </footer>
  );
};