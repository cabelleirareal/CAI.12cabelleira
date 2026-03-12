import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mainContainer = document.getElementById('app-main');
    
    const handleScroll = () => {
        if (mainContainer) {
            setScrolled(mainContainer.scrollTop > 10);
        }
    };

    if (mainContainer) {
        mainContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
        if (mainContainer) {
            mainContainer.removeEventListener('scroll', handleScroll);
        }
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-md py-2' : 'bg-transparent py-3 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-brand-purple to-brand-pink p-1 md:p-1.5 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-6 md:h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <div className={`text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-slate-800' : 'text-white'}`}>
            Cabelleira<span className="font-light text-brand-accent">.IA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;