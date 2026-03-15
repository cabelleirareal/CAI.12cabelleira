import React from 'react';

interface HeroProps {
    onStartDiagnosis: () => void;
    onOpenImageGeneration: () => void;
}

import AppLogo from '../ui/AppLogo';

const Hero: React.FC<HeroProps> = ({ onStartDiagnosis, onOpenImageGeneration }) => {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 md:pt-0 overflow-hidden bg-cyber-bg">
        {/* Background & Overlay */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cyber-bg-gradient opacity-90"></div>
            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyber-purple/20 rounded-full blur-[100px] animate-glow-breathing"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyber-pink/20 rounded-full blur-[100px] animate-glow-breathing" style={{ animationDelay: '2s' }}></div>
        </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-20 flex flex-col justify-center items-center h-full pb-8 md:pb-12">
        <div className="mb-6 md:mb-10 animate-cyber-fade">
          <AppLogo size="lg" animated={true} />
        </div>

        <div className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl border border-white/15 text-white px-4 py-2 rounded-full text-xs md:text-sm mb-6 md:mb-10 animate-cyber-fade shadow-neon-glow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-pink"></span>
          </span>
          <span className="font-medium tracking-wide">Inteligência Artificial para Colorimetria</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 md:mb-10 leading-[0.9] tracking-tighter text-white animate-cyber-fade" style={{ animationDelay: '0.1s' }}>
          A REVOLUÇÃO DA <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-cyber-gradient">
            COLORIMETRIA
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-white/60 max-w-lg md:max-w-2xl mx-auto mb-10 md:mb-14 font-medium leading-relaxed px-2 animate-cyber-fade" style={{ animationDelay: '0.2s' }}>
          O primeiro assistente de IA especializado em coloração capilar. <br className="hidden md:block"/> Diagnósticos precisos e fórmulas inteligentes para seu salão.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 px-4 md:px-0 w-full max-w-2xl mx-auto animate-cyber-fade" style={{ animationDelay: '0.3s' }}>
          <button onClick={onStartDiagnosis} className="cyber-button w-full md:w-auto h-16 px-10 text-lg flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Cor Perfeita com IA
          </button>
          <button onClick={onOpenImageGeneration} className="w-full md:w-auto h-16 px-10 text-lg flex items-center justify-center gap-3 glass-card hover:bg-white/10 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Geração de Penteado
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;