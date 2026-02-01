
import React, { useState, useRef, useEffect } from 'react';
import { analyzeImage, generateTTS, playAudioBuffer } from '../services/geminiService';

const VisionStudio: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultText, setResultText] = useState('');
  const [mode, setMode] = useState<'read' | 'explain'>('read');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setCapturedImage(null);
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Por favor, permita o acesso à câmera ou use o botão 'Escolher Foto'.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleNativePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (action: 'read' | 'explain') => {
    if (!capturedImage) return;
    setMode(action);
    setIsProcessing(true);
    setResultText('');

    const base64Data = capturedImage.split(',')[1];
    const text = await analyzeImage(base64Data, action);
    
    if (text) {
      setResultText(text);
      const ttsBuffer = await generateTTS(text, action === 'read' ? "Lendo o texto da imagem" : "Explicando a imagem");
      if (ttsBuffer) {
        playAudioBuffer(ttsBuffer);
      }
    } else {
      setResultText("Não foi possível processar a imagem. Tente novamente.");
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Visão Inteligente</h2>
        <p className="text-gray-600 mt-2">Use a câmera ou escolha uma foto do seu dispositivo para ler ou explicar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Viewport Area */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative aspect-square md:aspect-auto h-[450px] border-4 border-white">
          {isCameraActive ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : capturedImage ? (
            <img src={capturedImage} className="w-full h-full object-contain bg-slate-800" alt="Capturado" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <i className="fa-solid fa-camera-retro text-4xl text-slate-600"></i>
              </div>
              <p className="text-lg font-medium text-slate-400">Nenhuma imagem selecionada</p>
              <p className="text-sm text-slate-600 mt-2">Toque no botão abaixo para capturar ou escolher uma foto.</p>
            </div>
          )}

          {/* Overlays */}
          {isProcessing && (
            <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-md flex flex-col items-center justify-center text-white z-20 animate-in fade-in duration-300">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-white/20 rounded-full"></div>
                <i className="fa-solid fa-microchip text-5xl mb-6 relative"></i>
              </div>
              <p className="font-bold text-xl mb-2">Analisando com IA...</p>
              <p className="text-blue-100 text-sm">Extraindo informações visuais</p>
            </div>
          )}
          
          {isCameraActive && (
             <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-widest animate-pulse">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> AO VIVO
                </span>
             </div>
          )}
        </div>

        {/* Controls Area */}
        <div className="flex flex-col">
          <div className="flex-grow space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[180px] flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resultado da Análise</h3>
                {resultText && (
                   <button onClick={() => playAudioBuffer(null as any)} className="text-blue-600 hover:text-blue-800 transition-colors">
                     <i className="fa-solid fa-volume-high"></i>
                   </button>
                )}
              </div>
              {resultText ? (
                <div className="text-gray-800 leading-relaxed overflow-y-auto max-h-[250px] custom-scrollbar">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${mode === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {mode === 'read' ? 'Leitura de Texto' : 'Explicação Visual'}
                    </span>
                  </div>
                  <p className="text-sm md:text-base">{resultText}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-grow text-gray-300 italic py-10">
                   <i className="fa-solid fa-quote-left text-2xl mb-2 opacity-20"></i>
                   <p className="text-center px-4">O texto extraído ou a explicação aparecerá aqui automaticamente.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => processImage('read')}
                disabled={!capturedImage || isProcessing}
                className="group flex flex-col items-center justify-center gap-2 bg-blue-600 text-white p-5 rounded-3xl font-bold hover:bg-blue-700 disabled:opacity-40 disabled:grayscale transition-all shadow-xl shadow-blue-200 active:scale-95"
              >
                <i className="fa-solid fa-file-lines text-xl group-hover:scale-110 transition-transform"></i>
                <span>Ler Texto</span>
              </button>
              <button 
                onClick={() => processImage('explain')}
                disabled={!capturedImage || isProcessing}
                className="group flex flex-col items-center justify-center gap-2 bg-purple-600 text-white p-5 rounded-3xl font-bold hover:bg-purple-700 disabled:opacity-40 disabled:grayscale transition-all shadow-xl shadow-purple-200 active:scale-95"
              >
                <i className="fa-solid fa-wand-magic-sparkles text-xl group-hover:scale-110 transition-transform"></i>
                <span>Explicar Foto</span>
              </button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
             <input 
               type="file" 
               ref={fileInputRef} 
               className="hidden" 
               accept="image/*" 
               onChange={handleFileUpload} 
             />
             
             {!isCameraActive ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <button 
                   onClick={handleNativePicker}
                   className="flex items-center justify-center gap-3 bg-white text-blue-600 p-4 rounded-2xl font-bold hover:bg-blue-50 transition-all border-2 border-blue-100 shadow-sm"
                 >
                   <i className="fa-solid fa-camera"></i>
                   Câmera ou Galeria
                 </button>
                 <button 
                   onClick={startCamera}
                   className="flex items-center justify-center gap-3 bg-slate-800 text-white p-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-md"
                 >
                   <i className="fa-solid fa-video"></i>
                   Câmera ao Vivo
                 </button>
               </div>
             ) : (
               <div className="flex gap-3">
                 <button 
                    onClick={capturePhoto}
                    className="flex-grow flex items-center justify-center gap-3 bg-red-600 text-white p-5 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg animate-pulse"
                  >
                    <i className="fa-solid fa-camera-retro text-xl"></i>
                    BATER FOTO AGORA
                  </button>
                  <button 
                    onClick={stopCamera}
                    className="bg-gray-200 text-gray-700 p-5 rounded-2xl hover:bg-gray-300 transition-colors"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2rem] p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-white p-4 rounded-2xl shadow-inner flex-shrink-0">
          <i className="fa-solid fa-universal-access text-4xl text-blue-600"></i>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-xl mb-2">Compromisso com a Acessibilidade</h4>
          <p className="text-slate-600 leading-relaxed">
            Nossa tecnologia de <strong>Visão IA</strong> permite que documentos físicos, cardápios, avisos e objetos do cotidiano sejam compreendidos por pessoas com deficiência visual ou dificuldades de leitura, transformando imagens em áudio claro e descritivo em segundos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionStudio;
