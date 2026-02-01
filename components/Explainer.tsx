
import React, { useState } from 'react';
import { generateExplanation, generateTTS, playAudioBuffer } from '../services/geminiService';
import { EMOTIONS, LANGUAGES, GENDERS } from '../constants';
import { VoiceGender } from '../types';

const Explainer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emotion, setEmotion] = useState('Calma');
  const [language, setLanguage] = useState('Português (Angola)');
  const [gender, setGender] = useState<VoiceGender>('Feminino');

  const handleExplain = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setExplanation('');

    const text = await generateExplanation(query);
    if (text) {
      setExplanation(text);
      const voiceName = gender === 'Feminino' ? 'Kore' : 'Puck';
      const instruction = `Gere uma voz de professor em ${language}, com tom ${emotion}.`;
      
      const buffer = await generateTTS(text, instruction, voiceName);
      if (buffer) {
        playAudioBuffer(buffer);
      }
    } else {
      setExplanation("A AuraVoz não conseguiu gerar a explicação. Tente outro tema.");
    }
    setIsLoading(false);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-10 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <i className="fa-solid fa-graduation-cap text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold mb-3">Professor AuraVoz</h2>
          <p className="text-violet-100 max-w-xl mx-auto">
            Explicações didáticas lidas em voz alta por IA. Aprenda qualquer tema agora.
          </p>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Estilo de Voz</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value as VoiceGender)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              >
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Língua</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              >
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tom</label>
              <select 
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              >
                {EMOTIONS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          <div className="relative mb-6">
            <input 
              type="text" 
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-6 pr-32 py-5 text-lg focus:ring-2 focus:ring-violet-500 outline-none shadow-inner"
              placeholder="Digite sua dúvida aqui..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
            />
            <button 
              onClick={handleExplain}
              disabled={isLoading || !query.trim()}
              className="absolute right-3 top-3 bottom-3 px-6 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-bolt"></i>}
              {isLoading ? 'Ensinando...' : 'Explicar'}
            </button>
          </div>

          {explanation && (
            <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm">
                  AV
                </div>
                <div>
                  <h4 className="font-bold text-violet-900 mb-2">Explicação Gerada:</h4>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{explanation}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explainer;
