import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="cta" className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand-purple to-brand-pink"></div>
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-16 text-center text-white max-w-5xl mx-auto shadow-2xl border border-white/20">
          <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6 tracking-tight">Transforme seu atendimento</h2>
          <p className="text-sm md:text-lg text-brand-light max-w-2xl mx-auto mb-6 md:mb-10">
            Junte-se a centenas de cabeleireiros que usam IA.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-12">
            <button className="bg-white text-brand-purple font-bold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Baixar Grátis
            </button>
            <button className="bg-brand-purple/50 border border-white/30 backdrop-blur-sm text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-brand-purple/70 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              Assistir Demo
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 md:gap-8 border-t border-white/10 pt-4 md:pt-8">
            {[
                { val: '7 dias', desc: 'Grátis' },
                { val: '24/7', desc: 'Suporte' },
                { val: '∞', desc: 'Ilimitado' }
            ].map((item, i) => (
                 <div key={i} className="text-center">
                    <p className="text-lg md:text-3xl font-bold mb-0.5 md:mb-1">{item.val}</p>
                    <p className="text-[10px] md:text-sm text-brand-light opacity-90">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;