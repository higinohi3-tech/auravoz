
import React, { useState, useRef } from 'react';
import { generateTTS, playAudioBuffer } from '../services/geminiService';
import { EMOTIONS, LANGUAGES, VOICE_TYPES, GENDERS } from '../constants';
import { VoiceGender, AppSection } from '../types';

interface StudioProps {
  onSwitchSection?: (section: AppSection) => void;
}

const Studio: React.FC<StudioProps> = ({ onSwitchSection }) => {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('Alegre');
  const [gender, setGender] = useState<VoiceGender>('Feminino');
  const [language, setLanguage] = useState('Português (Angola)');
  const [voiceType, setVoiceType] = useState('Normal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastAudio, setLastAudio] = useState<AudioBuffer | null>(null);
  const [name, setName] = useState('');
  const accountNum = "4220360093643975";

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    
    let processedText = text;
    if (name) {
      processedText = text.replace(/\[NOME\]/gi, name);
    }

    const voiceName = gender === 'Feminino' ? 'Kore' : 'Puck';
    const instruction = `Gere uma voz do gênero ${gender} em ${language}, com emoção ${emotion}, no estilo ${voiceType}.`;
    
    const buffer = await generateTTS(processedText, instruction, voiceName);
    if (buffer) {
      setLastAudio(buffer);
      playAudioBuffer(buffer);
    }
    setIsGenerating(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          setText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
        <div className="md:flex">
          {/* Controls */}
          <div className="w-full md:w-1/3 bg-gray-50 p-8 border-r border-gray-200">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <i className="fa-solid fa-sliders mr-2 text-violet-600"></i>
              Configuração
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gênero</label>
                <div className="flex p-1 bg-white border border-gray-200 rounded-xl">
                  {GENDERS.map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g as VoiceGender)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${gender === g ? 'bg-violet-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Emoção</label>
                <select 
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  {EMOTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Idioma</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estilo</label>
                <select 
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  {VOICE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Personalizar (Nome)</label>
                <input 
                  type="text" 
                  placeholder="Ex: Ana"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="w-full md:w-2/3 p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Estúdio de Narração</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => onSwitchSection?.(AppSection.VISION)}
                  className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center font-semibold"
                >
                  <i className="fa-solid fa-camera mr-2"></i>
                  Foto
                </button>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center">
                  <i className="fa-solid fa-file-import mr-2"></i>
                  Doc
                  <input type="file" className="hidden" accept=".txt,.doc,.pdf" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
            
            <textarea 
              className="w-full h-64 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-lg focus:ring-2 focus:ring-violet-500 outline-none resize-none mb-6"
              placeholder="Sua história começa aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">
                {text.length} caracteres
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !text.trim()}
                className={`flex items-center gap-3 bg-violet-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all ${isGenerating || !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700 active:scale-95'}`}
              >
                {isGenerating ? (
                  <><i className="fa-solid fa-spinner animate-spin"></i> Criando...</>
                ) : (
                  <><i className="fa-solid fa-play"></i> Dar Voz ao Texto</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-[2rem] p-6 border border-violet-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-violet-500/20">
            <i className="fa-solid fa-money-bill-transfer"></i>
          </div>
          <div>
            <h4 className="font-bold text-lg leading-tight">Créditos AuraVoz</h4>
            <p className="text-slate-400 text-sm">Recarregue sua conta para narrações ilimitadas.</p>
          </div>
        </div>
        <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-center">
          <p className="text-[10px] text-violet-400 uppercase font-bold mb-1 tracking-widest">IBAN de Recarga:</p>
          <p className="text-xl font-mono font-bold">{accountNum}</p>
        </div>
      </div>
    </div>
  );
};

export default Studio;
