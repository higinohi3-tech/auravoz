
import React, { useState } from 'react';
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
      playAudioBuffer(buffer);
    }
    setIsGenerating(false);
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <div className="bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-800 mb-8">
        <div className="md:flex">
          {/* Controls Sidebar */}
          <div className="w-full md:w-1/3 bg-zinc-950 p-10 border-r border-zinc-800">
            <h2 className="text-xl font-bold mb-8 flex items-center text-white">
              <i className="fa-solid fa-sliders mr-3 text-violet-500"></i>
              Configuração
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Gênero</label>
                <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
                  {GENDERS.map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g as VoiceGender)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${gender === g ? 'bg-violet-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Emoção</label>
                <select 
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                >
                  {EMOTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Idioma</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Estilo de Voz</label>
                <select 
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                >
                  {VOICE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Tag Personalizada</label>
                <input 
                  type="text" 
                  placeholder="Substitui [NOME]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="w-full md:w-2/3 p-10 bg-zinc-900">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Estúdio AuraVoz</h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => onSwitchSection?.(AppSection.VISION)}
                  className="bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 px-4 py-2 rounded-xl text-xs font-bold border border-cyan-500/20 transition-all flex items-center"
                >
                  <i className="fa-solid fa-camera mr-2"></i>
                  IMPORTAR FOTO
                </button>
              </div>
            </div>
            
            <textarea 
              className="w-full h-[400px] bg-zinc-950/50 border border-zinc-800 rounded-3xl p-8 text-lg text-zinc-200 focus:ring-2 focus:ring-violet-500 outline-none resize-none mb-8 placeholder:text-zinc-800 shadow-inner"
              placeholder="Digite ou cole aqui o texto que você deseja transformar em voz com alma..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                {text.length} caracteres digitados
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !text.trim()}
                className={`flex items-center gap-3 bg-violet-600 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-violet-500/20 transition-all ${isGenerating || !text.trim() ? 'opacity-30 cursor-not-allowed' : 'hover:bg-violet-700 active:scale-95'}`}
              >
                {isGenerating ? (
                  <><i className="fa-solid fa-spinner animate-spin"></i> PROCESSANDO...</>
                ) : (
                  <><i className="fa-solid fa-play"></i> GERAR VOZ AGORA</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-violet-500/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center text-2xl text-violet-400 shadow-inner">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div>
            <h4 className="font-bold text-xl text-white">Créditos de Produção</h4>
            <p className="text-zinc-500">Recarregue para remover o limite de caracteres diários.</p>
          </div>
        </div>
        <div className="bg-black/40 px-8 py-4 rounded-2xl border border-zinc-800 text-center">
          <p className="text-[10px] text-violet-400 uppercase font-bold mb-1 tracking-[0.2em]">IBAN AuraVoz:</p>
          <p className="text-2xl font-mono font-bold text-white select-all">{accountNum}</p>
        </div>
      </div>
    </div>
  );
};

export default Studio;
