import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-bg text-white/40 py-12 md:py-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-cyber-gradient opacity-20"></div>
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="mb-8 md:mb-0 text-center md:text-left">
            <h4 className="text-white font-black text-xl md:text-2xl mb-2 tracking-tighter">Cabelleira<span className="text-cyber-purple">.IA</span></h4>
            <p className="text-xs md:text-sm text-white/30 max-w-xs font-medium leading-relaxed">Revolucionando a colorimetria capilar profissional com inteligência artificial avançada.</p>
        </div>
        
        <div className="flex space-x-8 md:space-x-12 text-xs md:text-sm font-black uppercase tracking-widest mb-8 md:mb-0">
            <a href="#" className="hover:text-cyber-purple transition-colors">Privacidade</a>
            <a href="#" className="hover:text-cyber-purple transition-colors">Termos</a>
            <a href="#" className="hover:text-cyber-purple transition-colors">Contato</a>
        </div>
        
        <div className="text-[10px] md:text-xs text-white/20 font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Cabelleira.IA. <span className="hidden md:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;