
import { ArrowLeft, Cpu, ShieldCheck, Globe, Users } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage = ({ onBack }:AboutPageProps) => {
  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-700">
      <section className="relative w-full h-[400px] flex items-center overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Background tech"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
          <button onClick={onBack} className="mb-12 flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-[10px] hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={14} /> Voltar ao Início
          </button>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              Protocolo <span className="text-[#2563EB]">Base</span>
            </h1>
            <p className="text-xl text-blue-100/80 font-medium italic border-l-4 border-blue-600 pl-6">
              Decodificando a fronteira tecnológica para a nova era digital.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <section className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black uppercase italic text-slate-900 mb-6">Nossa Essência</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                A <strong>Base Tecnológica</strong> nasceu no epicentro da revolução digital com um propósito claro: filtrar o ruído informativo e entregar inteligência pura. Em um mundo saturado de "buzzwords", nossa equipe foca no que realmente importa: o silício, o código e o impacto humano da inovação.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Atuamos como um hub de conhecimento para entusiastas de hardware, especialistas em cibersegurança e desenvolvedores que não se contentam com a superfície. Nossa análise é técnica, nosso compromisso é com a integridade e nossa paixão é o futuro.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <Users size={32} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-black uppercase italic mb-2">Comunidade</h3>
                <p className="text-sm text-slate-500">Conectamos mentes brilhantes através de insights profundos sobre o mercado global.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <Globe size={32} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-black uppercase italic mb-2">Visão Global</h3>
                <p className="text-sm text-slate-500">Acompanhamos o pulso das maiores tech-hubs do mundo, de Silicon Valley a Shenzhen.</p>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
              <Cpu size={48} className="text-blue-500 mb-6" />
              <h4 className="text-2xl font-black uppercase italic leading-tight mb-4">Arquitetura de Dados</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Nossa infraestrutura é otimizada para entregar conteúdo técnico com a menor latência possível.
              </p>
              <div className="pt-6 border-t border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Status: Online</span>
              </div>
            </div>

            <div className="border border-slate-200 p-8 rounded-3xl">
              <ShieldCheck size={40} className="text-blue-600 mb-4" />
              <h4 className="text-xl font-black uppercase italic mb-3">Integridade Alpha</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cada análise passa por um rigoroso processo de verificação técnica antes da publicação.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};