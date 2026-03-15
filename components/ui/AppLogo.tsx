import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  animated?: boolean;
  className?: string;
  customSize?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ 
  size = 'md', 
  animated = true, 
  className = '',
  customSize
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 md:w-12 md:h-12',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-36 h-36 md:w-48 md:h-48',
    xl: 'w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72', // Mobile: 160px, Tablet: 224px, Desktop: 288px
    custom: customSize || ''
  };

  const animationClass = animated ? 'animate-glow-breathing' : '';

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-cyber-purple/20 blur-[30px] rounded-full ${animationClass}`}></div>
      
      <img 
        src="https://storage.googleapis.com/m-infra.appspot.com/v0/b/m-infra.appspot.com/o/7f9v67v5p5v%2Flogo.png?alt=media&token=7f9v67v5p5v" 
        alt="Cabelleira.IA Logo" 
        className={`relative z-10 w-full h-full object-contain drop-shadow-[0_0_25px_rgba(123,77,255,0.35)] ${animationClass}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  );
};

export default AppLogo;
