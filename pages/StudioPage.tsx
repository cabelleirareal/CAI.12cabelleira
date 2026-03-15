import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateImage } from '../services/geminiService';

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const StudioPage: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>('A stylish woman with a vibrant, futuristic purple hairstyle');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError('');
    setGeneratedImage('');

    try {
      const result = await generateImage(prompt, aspectRatio);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError('The model did not return an image. Try a different prompt.');
      }
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group self-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <span className="text-xs font-black uppercase tracking-widest">Voltar para o Início</span>
        </button>

        <header className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Estúdio de Criação IA</h1>
          <p className="text-white/50 font-bold uppercase tracking-widest text-sm">Visualize tendências e inspire suas clientes</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 space-y-6">
                <div>
                <label htmlFor="prompt" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Descreva o Penteado</label>
                <textarea
                    id="prompt"
                    rows={6}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="cyber-input w-full p-4 text-sm resize-none"
                    placeholder="Ex: Cabelo longo ondulado com balayage loiro mel, iluminação de estúdio..."
                />
                </div>
                
                <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Formato</label>
                <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map(ar => (
                    <button
                        key={ar}
                        onClick={() => setAspectRatio(ar)}
                        className={`py-2.5 px-2 text-xs font-black uppercase tracking-widest rounded-xl border transition-all ${
                            aspectRatio === ar 
                            ? 'bg-cyber-gradient text-white border-transparent shadow-neon-glow' 
                            : 'bg-white/5 text-white/50 border-white/10 hover:border-cyber-pink hover:text-white'
                        }`}
                    >
                        {ar}
                    </button>
                    ))}
                </div>
                </div>
                
                <button
                onClick={handleGenerate}
                disabled={loading}
                className="cyber-button w-full py-4 px-6 text-sm md:text-base"
                >
                {loading ? (
                     <div className="flex items-center justify-center">
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Criando...
                 </div>
                ) : (
                    'Gerar Imagem'
                )}
                </button>
                {error && <p className="text-red-400 text-xs text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20 shadow-neon-glow">{error}</p>}
            </div>
          </div>

          {/* Right Column: Generated Image */}
          <div className="lg:col-span-8">
            <div className="glass-card p-4 md:p-8 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden animate-cyber-fade">
                {loading && (
                     <div className="text-center z-10">
                        <div className="inline-block w-16 h-16 border-4 border-white/10 border-t-cyber-purple rounded-full animate-spin mb-4 shadow-neon-glow"></div>
                        <p className="text-white/50 font-bold uppercase tracking-widest text-xs">A IA está pintando sua ideia...</p>
                     </div>
                )}
                
                {generatedImage && !loading && (
                <img src={generatedImage} alt="Generated Hairstyle" className="w-full h-full object-contain rounded-2xl shadow-2xl" />
                )}
                
                {!generatedImage && !loading && (
                <div className="text-center text-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-sm font-bold uppercase tracking-widest">Sua criação aparecerá aqui</p>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
