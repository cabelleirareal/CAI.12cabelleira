import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppLogo from '../ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-30 transition-all duration-500 ${
        scrolled ? 'bg-cyber-bg/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-neon-glow' : 'bg-transparent py-5 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <AppLogo size="sm" animated={true} />
          <div className="text-xl md:text-3xl font-black tracking-tighter text-white">
            Cabelleira<span className="text-cyber-pink">.IA</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
                <Link to="/" className={`text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === '/' ? 'text-cyber-pink' : 'text-white/50 hover:text-white'}`}>Início</Link>
                {isAuthenticated && (
                  <>
                    <Link to="/diagnostico" className={`text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === '/diagnostico' ? 'text-cyber-pink' : 'text-white/50 hover:text-white'}`}>Diagnóstico</Link>
                    <Link to="/estudio" className={`text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === '/estudio' ? 'text-cyber-pink' : 'text-white/50 hover:text-white'}`}>Estúdio</Link>
                  </>
                )}
            </nav>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 py-2 px-6 rounded-xl text-sm font-bold uppercase tracking-widest transition-all">Sair</button>
            ) : (
              <button onClick={() => navigate('/login')} className="cyber-button py-2 px-6 text-sm">Entrar</button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
