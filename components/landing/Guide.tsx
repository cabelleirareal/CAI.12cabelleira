import React from 'react';

interface GuideStepProps {
    icon: React.ReactNode;
    step: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const GuideStep: React.FC<GuideStepProps> = ({ icon, step, title, description, isLast }) => (
    <div className="relative flex flex-col items-center text-center group">
        {/* Connector Line */}
        {!isLast && (
            <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-white/5 -z-10"></div>
        )}
        
        <div className="bg-cyber-dark/80 border-2 border-white/10 w-20 h-20 md:w-32 md:h-32 rounded-3xl flex items-center justify-center shadow-neon-glow mb-6 group-hover:scale-110 group-hover:border-cyber-purple transition-all duration-500 z-10 backdrop-blur-xl">
            <div className="text-cyber-purple transform scale-90 md:scale-110">
                {React.cloneElement(icon as React.ReactElement<any>, { className: "h-8 w-8 md:h-12 md:w-12", strokeWidth: 2.5 })}
            </div>
        </div>
        
        <span className="text-[10px] md:text-xs font-black text-cyber-purple bg-cyber-purple/10 px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest border border-cyber-purple/20 shadow-neon-glow">{step}</span>
        <h3 className="text-sm md:text-2xl font-black mb-2 text-white tracking-tight">{title}</h3>
        <p className="text-white/40 text-[10px] md:text-sm font-medium leading-relaxed max-w-[140px] md:max-w-xs">{description}</p>
    </div>
  );

const Guide: React.FC = () => {
  const iconClass = "h-8 w-8 md:h-12 md:w-12";
  
  const steps: Omit<GuideStepProps, 'isLast'>[] = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      step: 'PASSO 1',
      title: 'Envie as Fotos',
      description: 'Faça o upload da foto atual e da referência desejada.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      step: 'PASSO 2',
      title: 'Receba o Plano',
      description: 'A IA cria um plano técnico detalhado.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M4 17v4M2 19h4M17 3v4M15 5h4M18 17v4M16 19h4M12 9v6M9 12h6" /></svg>,
      step: 'PASSO 3',
      title: 'Aplique a Magia',
      description: 'Siga as instruções para alcançar o resultado.'
    },
  ];

  return (
    <section id="guide" className="py-20 md:py-32 bg-cyber-bg border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-purple/5 rounded-full blur-[150px] -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tighter">Como <span className="text-cyber-gradient bg-clip-text text-transparent">Funciona?</span></h2>
            <p className="text-sm md:text-lg text-white/50 font-medium max-w-2xl mx-auto leading-relaxed">
            Processo simplificado e inteligente em apenas 3 passos para o resultado perfeito.
            </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-6xl mx-auto">
          {steps.map((s, index) => (
            <GuideStep key={index} icon={s.icon} step={s.step} title={s.title} description={s.description} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guide;