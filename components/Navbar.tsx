
import React from 'react';
import { AppSection } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, isLoggedIn }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setActiveSection(AppSection.HOME)}
          >
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center mr-2 shadow-sm">
              <i className="fa-solid fa-waveform text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold gradient-text">AuraVoz</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => setActiveSection(AppSection.HOME)}
              className={`${activeSection === AppSection.HOME ? 'text-violet-600 font-bold' : 'text-gray-600'} hover:text-violet-500 transition-colors text-sm font-medium`}
            >
              Início
            </button>
            <button 
              onClick={() => setActiveSection(AppSection.STUDIO)}
              className={`${activeSection === AppSection.STUDIO ? 'text-violet-600 font-bold' : 'text-gray-600'} hover:text-violet-500 transition-colors text-sm font-medium`}
            >
              Estúdio
            </button>
            <button 
              onClick={() => setActiveSection(AppSection.EXPLAINER)}
              className={`${activeSection === AppSection.EXPLAINER ? 'text-violet-600 font-bold' : 'text-gray-600'} hover:text-violet-500 transition-colors text-sm font-medium flex items-center`}
            >
              <span className="mr-1">Professor IA</span>
              <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold">ALPHA</span>
            </button>
            <button 
              onClick={() => setActiveSection(AppSection.VISION)}
              className={`${activeSection === AppSection.VISION ? 'text-violet-600 font-bold' : 'text-gray-600'} hover:text-violet-500 transition-colors text-sm font-medium flex items-center`}
            >
              <span className="mr-1">Visão IA</span>
              <span className="text-[8px] bg-cyan-600 text-white px-1.5 py-0.5 rounded-full font-bold">NOVO</span>
            </button>
            <button 
              onClick={() => setActiveSection(AppSection.LIVE)}
              className={`${activeSection === AppSection.LIVE ? 'text-violet-600 font-bold' : 'text-gray-600'} hover:text-violet-500 transition-colors text-sm font-medium`}
            >
              Conversa
            </button>
            <button 
              onClick={() => setActiveSection(AppSection.PRICING)}
              className={`${activeSection === AppSection.PRICING ? 'text-violet-600 font-bold' : 'text-gray-600'} hover:text-violet-500 transition-colors text-sm font-medium`}
            >
              Preços
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-gray-100 pl-1 pr-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition-all">
                <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  JS
                </div>
                <span className="text-xs font-bold text-gray-700 hidden sm:inline">Minha Conta</span>
              </div>
            ) : (
              <button 
                onClick={() => setActiveSection(AppSection.LOGIN)}
                className={`px-5 py-2 rounded-xl font-bold transition-all text-sm shadow-sm ${activeSection === AppSection.LOGIN ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Added default export to resolve import errors in App components.
export default Navbar;
