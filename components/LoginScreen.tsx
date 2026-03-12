import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handleSocialLogin = () => {
    setLoading(true);
    // Simulating Social Auth
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background Layer (Matches Hero) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-purple to-brand-pink opacity-90"></div>
        <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40" 
            style={{ backgroundImage: "url('https://storage.googleapis.com/aistudio-hosting/history/1721245082855/user/5323e740-423c-4424-9dfc-50a1df7a76c0.png')" }}
        ></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Cabelleira.IA</h1>
            <p className="text-purple-100 text-sm opacity-80">
              {isLogin ? 'Bem-vindo de volta, Expert!' : 'Junte-se à revolução da colorimetria.'}
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button onClick={handleSocialLogin} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 px-4 transition-all duration-300 group">
               <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span className="text-white text-sm font-medium">Facebook</span>
            </button>
            <button onClick={handleSocialLogin} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 px-4 transition-all duration-300 group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                </svg>
                <span className="text-white text-sm font-medium">Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/40">ou continue com email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white/40 group-focus-within:text-brand-accent transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                </div>
                <input 
                    type="email" 
                    placeholder="Seu melhor email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                />
            </div>
            
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-white/40 group-focus-within:text-brand-accent transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <input 
                    type="password" 
                    placeholder="Sua senha secreta" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-brand-purple font-bold py-3.5 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    isLogin ? 'Entrar no App' : 'Criar Conta Grátis'
                )}
            </button>
          </form>

          {/* Footer / Toggle */}
          <div className="mt-6 text-center">
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
                {isLogin ? (
                    <>Não tem uma conta? <span className="text-brand-accent underline decoration-brand-accent/30 underline-offset-4">Cadastre-se</span></>
                ) : (
                    <>Já é membro? <span className="text-brand-accent underline decoration-brand-accent/30 underline-offset-4">Faça Login</span></>
                )}
            </button>
          </div>

        </div>
        
        {/* Simple Footer Links */}
        <div className="mt-8 text-center flex justify-center space-x-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white/60 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white/60 transition-colors">Ajuda</a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;