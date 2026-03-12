import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 md:py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
            <h4 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">Cabelleira.IA</h4>
            <p className="text-xs md:text-sm text-slate-500 max-w-xs">Revolutionizing professional hair colorimetry with AI.</p>
        </div>
        
        <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
        </div>
        
        <div className="mt-4 md:mt-0 text-[10px] md:text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Cabelleira.IA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;