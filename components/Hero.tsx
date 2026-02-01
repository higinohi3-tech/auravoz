
import React from 'react';
import { AppSection } from '../types';

interface HeroProps {
  onStart: (section: AppSection) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
          Sua voz, <span className="gradient-text">com alma.</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Crie narrações profissionais, clone sua voz e fale em línguas africanas nativas. 
          A AuraVoz é a ponte entre a inteligência artificial avançada e as raízes de Angola.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onStart(AppSection.STUDIO)}
            className="px-8 py-4 bg-violet-600 text-white rounded-full font-bold text-lg hover:bg-violet-700 shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-waveform"></i>
            Criar Agora
          </button>
          <button 
            onClick={() => onStart(AppSection.VISION)}
            className="px-8 py-4 bg-cyan-600 text-white rounded-full font-bold text-lg hover:bg-cyan-700 shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-eye"></i>
            Ver com IA
          </button>
          <button 
            onClick={() => onStart(AppSection.LIVE)}
            className="px-8 py-4 bg-gray-100 text-gray-800 rounded-full font-bold text-lg hover:bg-gray-200 transition-all border border-gray-200 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-comments"></i>
            Conversar
          </button>
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              Tecnologia de ponta feita para o futuro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Added default export to resolve import errors in App components.
export default Hero;
