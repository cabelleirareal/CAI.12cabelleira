import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../components/ui/AppLogo';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      // In a real app, we would set auth state here
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }, 1500);
  };

  const handleSocialLogin = () => {
    setLoading(true);
    // Simulating Social Auth
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden bg-cyber-bg">
      {/* Background Particles / Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyber-purple/20 rounded-full blur-[120px] animate-glow-breathing"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyber-pink/20 rounded-full blur-[120px] animate-glow-breathing" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side: Logo Illustration */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center justify-center mb-12 lg:mb-0 animate-cyber-fade">
        <div className="relative group flex flex-col items-center">
          <AppLogo size="xl" animated={true} className="mb-8" />
          
          {/* Logo Text below image */}
          <div className="text-center">
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple via-cyber-pink to-orange-400 drop-shadow-neon-glow">
                Cabelleira<span className="text-white">.IA</span>
             </h2>
             <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs md:text-sm mt-2">Inteligência Capilar</p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Card */}
      <div className="relative z-10 w-full max-w-[450px] lg:w-1/2 animate-cyber-fade" style={{ animationDelay: '0.2s' }}>
        <div className="glass-card shine-effect p-8 md:p-12 flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink">Cabelleira</span>
              <span className="text-white">.IA</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-medium">
              A revolução da colorimetria capilar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-1">
              <input 
                type="email" 
                placeholder="E-mail" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input w-full"
              />
            </div>
            
            <div className="space-y-1">
              <input 
                type="password" 
                placeholder="Senha" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input w-full"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="cyber-button w-full mt-4 h-14 text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <button onClick={handleSocialLogin} className="social-button group">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6 group-hover:scale-110 transition-transform" alt="Google" />
            </button>
            <button onClick={handleSocialLogin} className="social-button group">
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.04 1.44-3.24 1.44-1.18 0-2.18-.44-3.04-1.32-.86.88-1.86 1.32-3.04 1.32-1.2 0-2.28-.49-3.24-1.44C3.53 19.32 3 18.06 3 16.5c0-1.56.53-2.82 1.59-3.78 1.06-.96 2.14-1.44 3.24-1.44 1.18 0 2.18.44 3.04 1.32.86-.88 1.86-1.32 3.04-1.32 1.2 0 2.28.49 3.24 1.44 1.06.96 1.59 2.22 1.59 3.78 0 1.56-.53 2.82-1.59 3.78zM12 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
            </button>
            <button onClick={handleSocialLogin} className="social-button group">
               <svg className="w-6 h-6 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
               </svg>
            </button>
            <button onClick={handleSocialLogin} className="social-button group">
               <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h11v11H0z"/><path fill="#f3f3f3" d="M12 0h11v11H12z"/><path fill="#f3f3f3" d="M0 12h11v11H0z"/><path fill="#f3f3f3" d="M12 12h11v11H12z"/>
               </svg>
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-10 w-full flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="w-full h-12 rounded-cyber-input border border-white/20 text-white/80 font-medium hover:bg-white/5 transition-all"
            >
              {isLogin ? 'Criar nova conta com e-mail' : 'Já tenho uma conta'}
            </button>
            
            <button className="text-white/40 hover:text-cyber-purple text-sm transition-colors underline underline-offset-4">
              Esqueceu a senha?
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
