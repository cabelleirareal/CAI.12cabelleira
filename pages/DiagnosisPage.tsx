import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTechnicalPlanFromImages, generateHairPreview } from '../services/geminiService';
import AppLogo from '../components/ui/AppLogo';

// --- Helper Types ---
interface ImageSource {
  data: string; // base64
  mimeType: string;
  preview: string;
}

interface CameraModalProps {
    onCapture: (imageSource: ImageSource) => void;
    onClose: () => void;
}

// --- Helper Functions ---
const fileToImageSource = (file: File): Promise<ImageSource> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const mimeType = result.split(';')[0].split(':')[1];
            const data = result.split(',')[1];
            resolve({ data, mimeType, preview: result });
        };
        reader.onerror = error => reject(error);
    });
};

// --- Sub-Components ---
const CameraModal: React.FC<CameraModalProps> = ({ onCapture, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                onClose();
            }
        };
        startCamera();

        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, [onClose]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            const data = dataUrl.split(',')[1];
            onCapture({ data, mimeType: 'image/jpeg', preview: dataUrl });
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[60] flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-lg flex flex-col items-center">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Capturar Foto</h3>
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6 w-full bg-black">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover"></video>
                </div>
                <canvas ref={canvasRef} className="hidden"></canvas>
                <div className="flex gap-4 w-full">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancelar</button>
                    <button onClick={handleCapture} className="flex-1 py-3 rounded-xl font-semibold text-white bg-cyber-purple hover:bg-cyber-purple/80 transition-colors shadow-lg">Capturar</button>
                </div>
            </div>
        </div>
    );
};

interface ImageInputProps {
    title: string;
    onImageSelected: (source: ImageSource | null) => void;
    selectedImagePreview: string | null;
}

const ImageInput: React.FC<ImageInputProps> = ({ title, onImageSelected, selectedImagePreview }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const source = await fileToImageSource(file);
                onImageSelected(source);
            } catch (error) {
                console.error("Failed to read file.");
            }
        }
    };
    
    const handleCameraCapture = (source: ImageSource) => {
        onImageSelected(source);
        setIsCameraOpen(false);
    };

    return (
      <div className="group">
        <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">{title}</label>
        <div className={`border-2 border-dashed rounded-2xl p-1 h-48 md:h-64 transition-all duration-300 relative ${selectedImagePreview ? 'border-cyber-purple/50 bg-cyber-purple/5' : 'border-white/10 hover:border-cyber-purple hover:bg-white/5'}`}>
          {selectedImagePreview ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden group/image">
              <img src={selectedImagePreview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => onImageSelected(null)} className="bg-white/20 backdrop-blur text-white p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-4 md:p-6">
                <div className="bg-white/5 p-2 md:p-3 rounded-full text-white/20 mb-2 md:mb-3 group-hover:scale-110 group-hover:text-cyber-purple transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-xs md:text-sm font-medium text-white/40 mb-2 md:mb-4">Arraste ou escolha uma opção</p>
                
                <div className="flex gap-2 w-full max-w-[200px]">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 text-xs bg-white/5 border border-white/10 hover:border-cyber-purple text-white/70 py-2 rounded-lg transition-colors font-medium shadow-sm">Upload</button>
                    <button onClick={() => setIsCameraOpen(true)} className="flex-1 text-xs bg-white/5 border border-white/10 hover:border-cyber-purple text-white/70 py-2 rounded-lg transition-colors font-medium shadow-sm">Câmera</button>
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
          )}
        </div>
        {isCameraOpen && <CameraModal onCapture={handleCameraCapture} onClose={() => setIsCameraOpen(false)} />}
      </div>
    );
};

const PreviewModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-[70] flex justify-center items-center p-4" onClick={onClose}>
        <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-cyber-pink transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={imageUrl} alt="Resultado Previsto" className="w-full h-auto rounded-2xl shadow-2xl border border-white/10" />
            <div className="mt-4 text-center">
                 <span className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white text-sm border border-white/20">✨ Resultado Gerado por IA</span>
            </div>
        </div>
    </div>
);


const DiagnosisPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentHair, setCurrentHair] = useState<ImageSource | null>(null);
  const [referenceHair, setReferenceHair] = useState<ImageSource | null>(null);
  const [observations, setObservations] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string>('');
  
  const handleAnalyze = useCallback(async () => {
    if (!currentHair || !referenceHair) {
      setError('Por favor, forneça a imagem do cabelo atual e a de referência.');
      return;
    }
    setLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      const imagePayload = [
          { data: currentHair.data, mimeType: currentHair.mimeType },
          { data: referenceHair.data, mimeType: referenceHair.mimeType },
      ];
      
      const result = await getTechnicalPlanFromImages(imagePayload, observations);
      setAnalysisResult(result);
    } catch (err) {
      setError('Falha ao gerar o plano técnico. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentHair, referenceHair, observations]);

  const handleGeneratePreview = useCallback(async () => {
    if (!currentHair || !analysisResult) return;

    setIsPreviewLoading(true);
    setPreviewError('');
    setPreviewImage(null);

    try {
        const prompt = `Usando a imagem fornecida como base, aplique a transformação de cabelo descrita neste plano técnico. Mantenha as características faciais da pessoa e o fundo intactos, focando apenas em alterar o cabelo para que corresponda ao resultado final descrito. O resultado deve ser o mais realista possível. Plano: "${analysisResult}"`;
        
        const result = await generateHairPreview(currentHair, prompt);
        
        if (result) {
            setPreviewImage(result);
        } else {
            setPreviewError('A IA não conseguiu gerar uma pré-visualização. Tente novamente.');
        }

    } catch (err) {
        setPreviewError('Ocorreu um erro ao gerar a pré-visualização. Por favor, tente novamente.');
        console.error(err);
    } finally {
        setIsPreviewLoading(false);
    }
}, [currentHair, analysisResult]);

  const showResults = loading || !!analysisResult;
  
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
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Diagnóstico Inteligente</h1>
          <p className="text-white/50 font-bold uppercase tracking-widest text-sm">Crie o plano técnico perfeito em segundos</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className={`lg:col-span-5 space-y-6`}>
            <div className="glass-card p-6 space-y-6">
                <ImageInput 
                    title="1. Cabelo Atual"
                    onImageSelected={setCurrentHair}
                    selectedImagePreview={currentHair?.preview || null}
                />
                <ImageInput 
                    title="2. Objetivo (Referência)"
                    onImageSelected={setReferenceHair}
                    selectedImagePreview={referenceHair?.preview || null}
                />
                <div>
                  <label htmlFor="observations" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Observações Extras</label>
                  <textarea
                    id="observations"
                    rows={3}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="cyber-input w-full p-4 text-sm resize-none"
                    placeholder="Ex: Cliente tem alergia a amônia, pontas muito porosas..."
                  />
                </div>
                
                {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm border border-red-500/20 flex items-center shadow-neon-glow"><span className="mr-2">⚠️</span>{error}</div>}
                
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !currentHair || !referenceHair}
                  className="cyber-button w-full py-4 px-6 text-sm md:text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analisando...
                    </div>
                  ) : (
                    'Gerar Plano Técnico'
                  )}
                </button>
            </div>
          </div>

          {/* Right Column: Analysis Result */}
          <div className="lg:col-span-7">
            {showResults ? (
              <div className="glass-card p-6 md:p-8 h-full flex flex-col relative overflow-hidden animate-cyber-fade">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <h3 className="text-lg font-black text-white flex items-center tracking-tight">
                        <span className="bg-cyber-purple/20 p-2 rounded-xl mr-3 text-cyber-purple shadow-neon-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                        </span>
                        Plano Técnico da IA
                    </h3>
                    {analysisResult && !loading && (
                        <button
                            onClick={handleGeneratePreview}
                            disabled={isPreviewLoading}
                            className="bg-white/10 text-white text-[10px] md:text-xs font-black uppercase tracking-widest py-2.5 px-5 rounded-xl hover:bg-white/20 disabled:opacity-70 transition-all flex items-center shadow-glass-inset border border-white/10"
                        >
                            {isPreviewLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                    Processando...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-cyber-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    Visualizar Resultado
                                </>
                            )}
                        </button>
                    )}
                </div>

                {previewError && <div className="mb-4 p-4 bg-red-500/10 text-red-400 rounded-2xl text-xs text-center border border-red-500/20 shadow-neon-glow">{previewError}</div>}
                
                <div className="flex-grow">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-64 text-center">
                            <div className="w-16 h-16 mb-6 border-4 border-white/10 border-t-cyber-purple rounded-full animate-spin shadow-neon-glow"></div>
                            <p className="text-white/50 font-bold uppercase tracking-widest text-xs">Analisando estrutura capilar e colorimetria...</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-none prose-headings:text-cyber-purple prose-strong:text-white prose-li:marker:text-cyber-pink">
                            <div dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- /g, '• ') }} />
                        </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-white/5">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest mb-2">Aguardando Diagnóstico</h3>
                <p className="text-white/20 max-w-xs mx-auto">Faça o upload das imagens para que a IA possa gerar o plano técnico personalizado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {previewImage && <PreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />}
    </div>
  );
};

export default DiagnosisPage;
