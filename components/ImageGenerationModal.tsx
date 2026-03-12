import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';

interface ImageGenerationModalProps {
  onClose: () => void;
}

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] flex justify-center items-center md:p-4">
      <div className="bg-white md:rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden border-0 md:border border-white/50 flex flex-col h-[100dvh] md:h-auto md:max-h-[90vh]">
        <header className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-brand-pink text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <h2 className="text-lg md:text-xl font-bold text-slate-800">Estúdio de Criação IA</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="p-0 flex-grow overflow-hidden flex flex-col md:flex-row">
          {/* Left Column: Controls */}
          <div className="w-full md:w-2/5 p-4 md:p-6 bg-slate-50 border-r border-slate-100 overflow-y-auto shrink-0">
            <div className="space-y-4 md:space-y-6 pb-20 md:pb-0">
                <div>
                <label htmlFor="prompt" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Descreva o Penteado</label>
                <textarea
                    id="prompt"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-3 md:p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent text-slate-700 shadow-sm resize-none text-sm"
                    placeholder="Ex: Cabelo longo ondulado com balayage loiro mel, iluminação de estúdio..."
                />
                </div>
                
                <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Formato</label>
                <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map(ar => (
                    <button
                        key={ar}
                        onClick={() => setAspectRatio(ar)}
                        className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all ${
                            aspectRatio === ar 
                            ? 'bg-brand-pink text-white border-brand-pink shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-pink hover:text-brand-pink'
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
                className="w-full bg-brand-pink text-white font-bold py-3 md:py-4 px-4 rounded-xl shadow-lg hover:shadow-lg hover:shadow-brand-pink/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 flex justify-center items-center text-sm md:text-base"
                >
                {loading ? (
                     <>
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Criando...
                 </>
                ) : (
                    'Gerar Imagem'
                )}
                </button>
                {error && <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
            </div>
          </div>

          {/* Right Column: Generated Image */}
          <div className="w-full md:w-3/5 bg-slate-100/50 relative flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <div className="relative w-full h-full min-h-[250px] flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white overflow-hidden">
                {loading && (
                     <div className="text-center">
                        <div className="inline-block w-12 h-12 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-slate-500 font-medium text-sm">A IA está pintando sua ideia...</p>
                     </div>
                )}
                
                {generatedImage && !loading && (
                <img src={generatedImage} alt="Generated Hairstyle" className="w-full h-full object-contain" />
                )}
                
                {!generatedImage && !loading && (
                <div className="text-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-xs md:text-sm">Sua criação aparecerá aqui</p>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationModal;