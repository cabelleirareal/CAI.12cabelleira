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
            <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
        )}
        
        <div className="bg-white border-4 border-slate-50 w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg mb-3 md:mb-6 group-hover:scale-110 group-hover:border-brand-light transition-all duration-300 z-10">
            <div className="text-brand-purple transform scale-75 md:scale-100">
                {React.cloneElement(icon as React.ReactElement<any>, { className: "h-6 w-6 md:h-10 md:w-10" })}
            </div>
        </div>
        
        <span className="text-[10px] md:text-xs font-bold text-brand-purple bg-brand-light px-2 py-0.5 md:px-3 md:py-1 rounded-full mb-1 md:mb-3">{step}</span>
        <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[140px] md:max-w-xs">{description}</p>
    </div>
  );

const Guide: React.FC = () => {
  const iconClass = "h-8 w-8 md:h-10 md:w-10";
  
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
    <section id="guide" className="py-12 md:py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-slate-900">Como Funciona?</h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Processo simplificado em apenas 3 passos.
            </p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
          {steps.map((s, index) => (
            <GuideStep key={index} icon={s.icon} step={s.step} title={s.title} description={s.description} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guide;