
import React from 'react';
import { AppSection } from '../types';

interface HeroProps {
  onStart: (section: AppSection) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-black pt-24 pb-32">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-violet-600/10 blur-[120px] rounded-full"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8">
          Sua voz, <br /><span className="gradient-text">com alma.</span>
        </h1>
        <p className="mt-4 text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
          Crie narrações profissionais, clone sua voz e fale em línguas africanas nativas. 
          A AuraVoz é a ponte entre o futuro da IA e as nossas raízes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button 
            onClick={() => onStart(AppSection.STUDIO)}
            className="px-10 py-5 bg-violet-600 text-white rounded-full font-bold text-lg hover:bg-violet-700 shadow-2xl shadow-violet-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <i className="fa-solid fa-waveform"></i>
            Começar Agora
          </button>
          <button 
            onClick={() => onStart(AppSection.VISION)}
            className="px-10 py-5 bg-zinc-800 text-zinc-100 rounded-full font-bold text-lg hover:bg-zinc-700 shadow-xl transition-all flex items-center justify-center gap-2 border border-zinc-700 active:scale-95"
          >
            <i className="fa-solid fa-eye text-cyan-400"></i>
            Ver com IA
          </button>
        </div>
        
        <div className="mt-24 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-900"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-black px-6 text-sm font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Tecnologia de Angola para o Mundo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
