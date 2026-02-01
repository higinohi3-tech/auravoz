
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveConversation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    setStatus('connecting');
    // Correctly initialize GoogleGenAI with a named parameter using the process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            setIsActive(true);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // Rely on sessionPromise resolving before calling sendRealtimeInput to avoid race conditions.
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => [...prev, `IA: ${message.serverContent?.outputTranscription?.text}`]);
            }
            
            const audioStr = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioStr && outContextRef.current) {
              setStatus('speaking');
              const ctx = outContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioData = decode(audioStr);
              const buffer = await decodeAudioData(audioData, ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const source of sourcesRef.current) {
                source.stop();
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error("Live Error", e);
            setStatus('idle');
            setIsActive(false);
          },
          onclose: () => {
            setIsActive(false);
            setStatus('idle');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: "Você é um assistente de voz amigável para usuários angolanos. Você fala português e entende o contexto cultural de Angola. Seja prestativo e calmo.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      // Explicitly close the session to release resources as per guidelines.
      sessionRef.current.close();
      setIsActive(false);
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Decorative background pulses */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000 ${isActive ? 'scale-150 opacity-50' : 'scale-100 opacity-0'}`}></div>
        
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Assistente de Voz em Tempo Real</h2>
            <p className="text-slate-400">Tenha uma conversa natural com nossa IA. Ela entende você e responde instantaneamente com voz humana.</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8 py-12">
            <div className="relative">
              {isActive && (
                <>
                  <div className={`absolute -inset-4 bg-blue-500/20 rounded-full animate-ping ${status === 'listening' ? 'duration-1000' : 'duration-300'}`}></div>
                  <div className={`absolute -inset-8 bg-blue-500/10 rounded-full animate-pulse`}></div>
                </>
              )}
              <button 
                onClick={isActive ? stopSession : startSession}
                className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all active:scale-95 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {status === 'connecting' ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : isActive ? (
                  <i className="fa-solid fa-microphone-slash"></i>
                ) : (
                  <i className="fa-solid fa-microphone"></i>
                )}
              </button>
            </div>

            <div className="text-center">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${status === 'listening' ? 'bg-green-500 text-white' : status === 'speaking' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {status === 'idle' ? 'Pronto para começar' : status === 'connecting' ? 'Iniciando Sessão...' : status === 'listening' ? 'Ouvindo você...' : 'A IA está falando...'}
              </span>
            </div>
          </div>

          <div className="w-full h-48 bg-slate-800/50 rounded-2xl p-4 overflow-y-auto text-left border border-slate-700 custom-scrollbar">
            {transcript.length === 0 ? (
              <p className="text-slate-500 text-center mt-16 italic">A transcrição da conversa aparecerá aqui...</p>
            ) : (
              transcript.map((line, idx) => (
                <p key={idx} className="mb-2 text-sm">
                  <span className="text-blue-400 font-bold">{line.split(':')[0]}:</span>
                  <span className="text-slate-200"> {line.split(':')[1]}</span>
                </p>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p><i className="fa-solid fa-shield-halved mr-2"></i>Sua voz é processada de forma segura e ética.</p>
      </div>
    </div>
  );
};

// Added default export to resolve import errors in App components.
export default LiveConversation;
