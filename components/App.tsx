
import React, { useState } from 'react';
import { AppSection } from '../types';
import Navbar from './Navbar';
import Hero from './Hero';
import FeatureGrid from './FeatureGrid';
import Studio from './Studio';
import VisionStudio from './VisionStudio';
import LiveConversation from './LiveConversation';
import Pricing from './Pricing';
import Login from './Login';
import Explainer from './Explainer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const accountNum = "4220360093643975";
  const whatsappNum = "244931079190";
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveSection(AppSection.STUDIO);
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.HOME:
        return (
          <>
            <Hero onStart={(section) => setActiveSection(section)} />
            <FeatureGrid />
            <Pricing />
          </>
        );
      case AppSection.STUDIO:
        return <Studio onSwitchSection={setActiveSection} />;
      case AppSection.VISION:
        return <VisionStudio />;
      case AppSection.LIVE:
        return <LiveConversation />;
      case AppSection.PRICING:
        return <Pricing />;
      case AppSection.LOGIN:
        return <Login onSuccess={handleLoginSuccess} />;
      case AppSection.EXPLAINER:
        return <Explainer />;
      default:
        return <Hero onStart={(section) => setActiveSection(section)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isLoggedIn={isLoggedIn}
      />
      
      {/* Floating Payment Banner - Persistent across all sections */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-lg">
        <div className="bg-slate-900/90 text-white p-4 rounded-2xl shadow-2xl border border-violet-500/40 flex items-center justify-between gap-4 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-violet-500/20">
              <i className="fa-solid fa-receipt text-sm"></i>
            </div>
            <div>
              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Conta p/ Pagamento</p>
              <p className="font-mono font-bold text-sm md:text-base tracking-wider">{accountNum}</p>
            </div>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${copied ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 hover:bg-violet-50'}`}
          >
            {copied ? (
              <><i className="fa-solid fa-check"></i> Copiado</>
            ) : (
              <><i className="fa-solid fa-copy"></i> Copiar</>
            )}
          </button>
        </div>
      </div>

      <main className="flex-grow pb-24">
        {renderContent()}
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-12">
            <div>
              <div className="flex justify-center md:justify-start items-center mb-6">
                <i className="fa-solid fa-waveform text-violet-500 text-2xl mr-2"></i>
                <span className="text-xl font-bold">AuraVoz</span>
              </div>
              <p className="text-zinc-400 max-w-sm mx-auto md:mx-0">
                Líder em tecnologia de voz generativa. A AuraVoz traz emoção e identidade para cada palavra falada, honrando as raízes de Angola.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-6 text-violet-400">Recebimento</h4>
              <p className="text-zinc-500 text-sm mb-4">Todo pagamento via:</p>
              <div className="bg-zinc-900 border border-violet-500/20 rounded-2xl p-5 w-full max-w-xs shadow-lg">
                <p className="text-[10px] text-violet-400 uppercase font-bold tracking-widest mb-1">Número da Conta</p>
                <p className="text-xl font-mono text-white tracking-wider select-all">{accountNum}</p>
                <div className="mt-2 flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase">Pagamento Instantâneo</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-lg font-bold mb-6 text-violet-400">Atendimento</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-linkedin"></i></a>
                <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors text-2xl">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
              <p className="text-zinc-500 text-xs mt-6 italic">WhatsApp: +244 931 079 190</p>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 text-center">
            <div className="text-sm text-zinc-600 mb-2">
              &copy; {new Date().getFullYear()} AuraVoz. Feito em Luanda, Angola.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
