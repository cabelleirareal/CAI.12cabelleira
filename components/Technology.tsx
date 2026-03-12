import React from 'react';
import type { TechCardProps } from '../types';
import { techCards } from '../constants';

const TechCard: React.FC<TechCardProps> = ({ icon, title, description, tags }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start mb-3 md:mb-4">
        <div className="bg-slate-50 text-brand-purple p-2 md:p-3 rounded-xl md:rounded-2xl mr-3 md:mr-4 shrink-0">
          {React.cloneElement(icon as React.ReactElement<any>, { className: "h-5 w-5 md:h-6 md:w-6" })}
        </div>
        <div>
            <h3 className="text-sm md:text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-2 md:pt-4 flex flex-wrap gap-1 md:gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-slate-100 text-slate-600 text-[10px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-slate-200">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Technology: React.FC = () => {
  return (
    <section id="tech" className="py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-12 gap-4 md:gap-6">
            <div className="max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-slate-900">Tecnologia de Ponta</h2>
                <p className="text-sm md:text-base text-slate-600">
                    IA e visão computacional para precisão máxima.
                </p>
            </div>
            <div className="hidden md:block">
                <button className="text-brand-purple font-semibold hover:text-brand-pink transition-colors flex items-center">
                    Ver documentação técnica <span className="ml-2">→</span>
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {techCards.map((tech, index) => (
            <TechCard key={index} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;