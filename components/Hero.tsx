import React from 'react';

interface HeroProps {
    onStartDiagnosis: () => void;
    onOpenImageGeneration: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartDiagnosis, onOpenImageGeneration }) => {
  return (
    <section className="relative min-h-[100dvh] md:min-h-[100dvh] flex items-center justify-center pt-20 md:pt-0 overflow-hidden">
        {/* Background & Overlay */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-purple to-brand-pink opacity-90"></div>
            <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40" 
                style={{ backgroundImage: "url('https://storage.googleapis.com/aistudio-hosting/history/1721245082855/user/5323e740-423c-4424-9dfc-50a1df7a76c0.png')" }}
            ></div>
            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-20 flex flex-col justify-center items-center h-full pb-8 md:pb-12">
        <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] md:text-sm mb-4 md:mb-8 animate-[fadeIn_1s_ease-out] mx-auto w-fit mt-2 md:mt-0">
          <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-brand-accent"></span>
          </span>
          Inteligência Artificial para Colorimetria
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold mb-3 md:mb-6 leading-tight tracking-tight text-white drop-shadow-sm">
          A Revolução da <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-light to-brand-accent block md:inline mt-1 md:mt-0">
            Colorimetria Profissional
          </span>
        </h1>
        
        <p className="text-sm md:text-xl text-white/80 max-w-lg md:max-w-2xl mx-auto mb-6 md:mb-10 font-light leading-relaxed px-2">
          O primeiro assistente de IA especializado em coloração capilar. Diagnósticos precisos e fórmulas inteligentes para seu salão.
        </p>
        
        <div className="flex flex-col justify-center items-center gap-3 md:gap-4 px-4 md:px-0 w-full max-w-sm mx-auto">
          <button onClick={onStartDiagnosis} className="group bg-white text-brand-purple px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 mr-2 transition-transform group-hover:rotate-12" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
            Cor Perfeita com IA
          </button>
          <button onClick={onOpenImageGeneration} className="group bg-white text-brand-purple px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 mr-2 transition-transform group-hover:rotate-12" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
            Geração de Penteado
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;