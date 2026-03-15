import React from 'react';
import type { TechCardProps } from '../../types';
import { techCards } from '../../constants';

const TechCard: React.FC<TechCardProps> = ({ icon, title, description, tags }) => {
  return (
    <div className="glass-card shine-effect p-6 md:p-8 flex flex-col h-full group">
      <div className="flex items-start mb-6">
        <div className="bg-cyber-purple/20 text-cyber-purple p-3.5 rounded-2xl mr-5 shrink-0 shadow-neon-glow group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement<any>, { className: "h-6 w-6 md:h-7 md:w-7", strokeWidth: 2.5 })}
        </div>
        <div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight">{title}</h3>
            <p className="text-white/50 text-xs md:text-sm mt-2 leading-relaxed font-medium">{description}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-white/5 text-white/70 text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-white/10 shadow-glass-inset">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Technology: React.FC = () => {
  return (
    <section id="tech" className="py-20 md:py-32 bg-cyber-bg relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-purple/10 blur-[100px] rounded-full animate-glow-breathing"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyber-pink/10 blur-[100px] rounded-full animate-glow-breathing delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6">
            <div className="max-w-2xl">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 shadow-neon-glow">
                    <span className="w-2 h-2 bg-cyber-purple rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Engine v2.5</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tighter">Tecnologia de <span className="text-cyber-purple">Ponta</span></h2>
                <p className="text-sm md:text-lg text-white/50 font-medium leading-relaxed">
                    IA e visão computacional para precisão máxima em cada diagnóstico e simulação.
                </p>
            </div>
            <div className="hidden md:block">
                <button className="text-white font-black uppercase tracking-widest text-xs hover:text-cyber-pink transition-all flex items-center group">
                    Ver documentação técnica <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {techCards.map((tech, index) => (
            <TechCard key={index} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;