import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getTechnicalPlanFromImages, generateHairPreview } from '../services/geminiService';

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
                alert("Could not access the camera. Please check permissions.");
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
                    <button onClick={handleCapture} className="flex-1 py-3 rounded-xl font-semibold text-white bg-brand-purple hover:bg-brand-dark transition-colors shadow-lg hover:shadow-glow">Capturar</button>
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
                alert("Failed to read file.");
            }
        }
    };
    
    const handleCameraCapture = (source: ImageSource) => {
        onImageSelected(source);
        setIsCameraOpen(false);
    };

    return (
      <div className="group">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{title}</label>
        <div className={`border-2 border-dashed rounded-2xl p-1 h-48 md:h-64 transition-all duration-300 relative ${selectedImagePreview ? 'border-brand-purple/50 bg-brand-light/20' : 'border-slate-200 hover:border-brand-purple hover:bg-slate-50'}`}>
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
                <div className="bg-slate-100 p-2 md:p-3 rounded-full text-slate-400 mb-2 md:mb-3 group-hover:scale-110 group-hover:text-brand-purple transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-xs md:text-sm font-medium text-slate-600 mb-2 md:mb-4">Arraste ou escolha uma opção</p>
                
                <div className="flex gap-2 w-full max-w-[200px]">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 text-xs bg-white border border-slate-200 hover:border-brand-purple text-slate-700 py-2 rounded-lg transition-colors font-medium shadow-sm">Upload</button>
                    <button onClick={() => setIsCameraOpen(true)} className="flex-1 text-xs bg-white border border-slate-200 hover:border-brand-purple text-slate-700 py-2 rounded-lg transition-colors font-medium shadow-sm">Câmera</button>
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
            <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-brand-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img src={imageUrl} alt="Resultado Previsto" className="w-full h-auto rounded-2xl shadow-2xl border border-white/10" />
            <div className="mt-4 text-center">
                 <span className="inline-block bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white text-sm border border-white/20">✨ Resultado Gerado por IA</span>
            </div>
        </div>
    </div>
);


// --- Main Component ---
interface ImageAnalysisModalProps {
  onClose: () => void;
}

const ImageAnalysisModal: React.FC<ImageAnalysisModalProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] flex justify-center items-center md:p-4">
      <div className="bg-white md:rounded-[2rem] shadow-2xl w-full max-w-6xl h-[100dvh] md:h-[90vh] flex flex-col overflow-hidden border-0 md:border border-white/50">
        <header className="px-6 py-4 md:px-8 md:py-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
          <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800">Diagnóstico Inteligente</h2>
              <p className="text-xs md:text-sm text-slate-500">Crie o plano técnico perfeito em segundos</p>
          </div>
          <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-grow overflow-hidden flex flex-col md:flex-row">
          {/* Left Column: Inputs */}
          <div className={`w-full p-4 md:p-8 overflow-y-auto bg-slate-50 transition-all duration-300 ${
              showResults 
              ? 'md:w-2/5 md:border-r border-slate-100' 
              : 'md:w-full'
            }`}
          >
            <div className="space-y-4 md:space-y-6 pb-20 md:pb-0">
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
                  <label htmlFor="observations" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Observações Extras</label>
                  <textarea
                    id="observations"
                    rows={3}
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent text-sm transition-shadow resize-none"
                    placeholder="Ex: Cliente tem alergia a amônia, pontas muito porosas..."
                  />
                </div>
                
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 flex items-center"><span className="mr-2">⚠️</span>{error}</div>}
                
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !currentHair || !referenceHair}
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold py-3 md:py-4 px-6 rounded-xl shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 flex justify-center items-center text-sm md:text-base"
                >
                  {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analisando Imagens...
                    </>
                  ) : (
                    'Gerar Plano Técnico'
                  )}
                </button>
            </div>
          </div>

          {/* Right Column: Analysis Result */}
          {showResults && (
            <div className="w-full md:w-3/5 p-4 md:p-8 bg-white h-full flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 md:mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center">
                      <span className="bg-brand-light p-1.5 rounded-lg mr-2 text-brand-purple">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                      </span>
                      Plano Técnico da IA
                  </h3>
                  {analysisResult && !loading && (
                      <button
                          onClick={handleGeneratePreview}
                          disabled={isPreviewLoading}
                          className="bg-slate-900 text-white text-[10px] md:text-xs font-bold py-2 px-3 md:px-4 rounded-full hover:bg-slate-800 disabled:opacity-70 transition-all flex items-center shadow-md"
                      >
                          {isPreviewLoading ? (
                              <>
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                  Processando...
                              </>
                          ) : (
                              <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                  Visualizar Resultado
                              </>
                          )}
                      </button>
                  )}
              </div>

              {previewError && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs text-center border border-red-100">{previewError}</div>}
              
              <div className="overflow-y-auto flex-grow pr-2 custom-scrollbar pb-20 md:pb-0">
                  {loading && (
                      <div className="flex flex-col justify-center items-center h-64 text-center">
                          <div className="w-16 h-16 mb-4 border-4 border-brand-light border-t-brand-purple rounded-full animate-spin"></div>
                          <p className="text-slate-500 font-medium">Nossa IA está analisando a estrutura capilar e colorimetria...</p>
                      </div>
                  )}
                  
                  {analysisResult && !loading && (
                      <div className="prose prose-slate prose-sm max-w-none prose-headings:text-brand-purple prose-strong:text-slate-900 prose-li:marker:text-brand-pink">
                          <div dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- /g, '• ') }} />
                      </div>
                  )}
                  
                  {/* This placeholder is now correctly omitted as the parent container won't render initially */}
              </div>
              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>
      </div>
      {previewImage && <PreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />}
    </div>
  );
};

export default ImageAnalysisModal;