import React, { useEffect, useState } from 'react';

import AppLogo from './ui/AppLogo';

const SplashScreen: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-bg overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-cyber-purple/10 rounded-full blur-[150px] animate-glow-breathing"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-cyber-pink/10 rounded-full blur-[150px] animate-glow-breathing delay-1000"></div>
      </div>

      {/* Main Logo Container */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        
        {/* The Logo Container */}
        <div className="mb-12">
          <AppLogo size="xl" animated={true} />
        </div>

        {/* Text Branding */}
        <div className="text-center relative">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                <span className="text-cyber-gradient bg-clip-text text-transparent drop-shadow-neon-glow">
                    Cabelleira.IA
                </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-cyber-purple/50"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Inteligência Capilar</span>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-cyber-pink/50"></div>
            </div>
        </div>

        {/* Loading Bar at bottom */}
        <div className="absolute bottom-16 w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
             <div className="h-full bg-cyber-gradient w-full animate-[progress_2.5s_ease-in-out] shadow-neon-glow"></div>
        </div>
      </div>

      <style>{`
        .draw-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .delay-100 { animation-delay: 0.3s; }
        .delay-200 { animation-delay: 0.6s; }
        .delay-300 { animation-delay: 0.9s; }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;