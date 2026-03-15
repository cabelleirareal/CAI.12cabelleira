import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="cta" className="relative py-20 md:py-32 overflow-hidden bg-cyber-bg">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-purple/10 rounded-full blur-[120px] animate-glow-breathing"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyber-pink/10 rounded-full blur-[150px] animate-glow-breathing delay-700"></div>
        
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card shine-effect p-8 md:p-20 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyber-purple/20 border border-cyber-purple/30 backdrop-blur-xl mb-8 shadow-neon-glow">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyber-purple">Acesso Antecipado</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter text-white leading-tight">Transforme seu <span className="text-cyber-gradient bg-clip-text text-transparent">atendimento</span></h2>
          <p className="text-sm md:text-xl text-white/50 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Junte-se a centenas de cabeleireiros visionários que já estão usando o poder da IA para elevar seus negócios.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-20">
            <button className="cyber-button py-4 px-10 text-sm md:text-base flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Baixar Grátis
            </button>
            <button className="bg-white/5 border border-white/10 backdrop-blur-xl text-white font-black uppercase tracking-widest text-xs px-10 py-4 rounded-xl hover:bg-white/10 transition-all shadow-glass-inset flex items-center justify-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-cyber-pink group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              Assistir Demo
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
            {[
                { val: '7 dias', desc: 'Trial Grátis' },
                { val: '24/7', desc: 'Suporte VIP' },
                { val: '∞', desc: 'Uso Ilimitado' }
            ].map((item, i) => (
                 <div key={i} className="text-center group">
                    <p className="text-xl md:text-4xl font-black mb-1 text-white tracking-tighter group-hover:text-cyber-purple transition-colors">{item.val}</p>
                    <p className="text-[10px] md:text-sm text-white/40 font-bold uppercase tracking-widest">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;