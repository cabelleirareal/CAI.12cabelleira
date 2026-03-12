import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4000ms]"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[5000ms]"></div>
      </div>

      {/* Main Logo Container - Matches the Rounded Square from video */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* The 3D-style Icon Container */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group perspective-1000">
            {/* Glow behind the icon */}
            <div className="absolute inset-4 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 blur-[40px] opacity-40 animate-pulse"></div>
            
            {/* The Box */}
            <div className="relative w-full h-full rounded-[2.5rem] bg-[#0f0f12] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
                {/* Circuitry Texture Background (Subtle) */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                
                {/* Neon Profile SVG Illustration */}
                <svg className="w-full h-full p-6" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="neonFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0EA5E9" /> {/* Sky Blue */}
                            <stop offset="50%" stopColor="#D946EF" /> {/* Fuchsia */}
                            <stop offset="100%" stopColor="#F97316" /> {/* Orange */}
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Face Profile Silhouette */}
                    <path 
                        d="M85 50 C 85 50, 60 55, 60 90 C 60 115, 75 125, 80 145 C 82 155, 75 170, 75 170" 
                        stroke="white" 
                        strokeWidth="1.5" 
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                    />

                    {/* Neon Hair Strands - The visual hook */}
                    <g filter="url(#glow)">
                        {/* Top Strand (Blueish) */}
                        <path 
                            d="M85 50 C 110 40, 160 60, 150 110 C 145 135, 120 120, 120 120" 
                            stroke="url(#neonFlow)" 
                            strokeWidth="3" 
                            fill="none"
                            strokeLinecap="round"
                            className="draw-path delay-100"
                        />
                         {/* Mid Strand (Purple) */}
                        <path 
                            d="M80 60 C 120 55, 150 90, 140 140 C 135 160, 100 150, 100 150" 
                            stroke="url(#neonFlow)" 
                            strokeWidth="3" 
                            fill="none"
                            strokeLinecap="round"
                            className="draw-path delay-200"
                        />
                         {/* Bottom Strand (Orange) */}
                        <path 
                            d="M75 75 C 100 80, 130 120, 110 170" 
                            stroke="url(#neonFlow)" 
                            strokeWidth="3" 
                            fill="none"
                            strokeLinecap="round"
                            className="draw-path delay-300"
                        />
                        {/* Abstract Circuit Lines */}
                         <path d="M50 50 L 60 60" stroke="#0EA5E9" strokeWidth="1" opacity="0.5" />
                         <path d="M150 160 L 160 150" stroke="#F97316" strokeWidth="1" opacity="0.5" />
                         <circle cx="150" cy="50" r="2" fill="#D946EF" className="animate-ping"/>
                    </g>
                </svg>
            </div>
        </div>

        {/* Text Branding */}
        <div className="text-center relative">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Cabelleira.IA
                </span>
                <span className="text-brand-accent inline-block animate-pulse">.</span>
            </h1>
            
            <div className="h-[1px] w-0 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto animate-[expandWidth_1.5s_ease-out_forwards_0.5s]"></div>
        </div>

        {/* Loading Bar at bottom */}
        <div className="absolute bottom-12 w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 w-full animate-[progress_2.5s_ease-in-out]"></div>
        </div>
      </div>

      <style>{`
        .draw-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw 2s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes expandWidth {
            from { w-0; opacity: 0; }
            to { width: 100%; opacity: 1; }
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