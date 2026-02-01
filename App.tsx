
import React, { useState } from 'react';
import { AppSection } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Studio from './components/Studio';
import LiveConversation from './components/LiveConversation';
import Pricing from './components/Pricing';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);

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
        return <Studio />;
      case AppSection.LIVE:
        return <LiveConversation />;
      case AppSection.PRICING:
        return <Pricing />;
      default:
        return <Hero onStart={(section) => setActiveSection(section)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-12">
            <div>
              <div className="flex justify-center md:justify-start items-center mb-6">
                <i className="fa-solid fa-microphone-lines text-blue-500 text-2xl mr-2"></i>
                <span className="text-xl font-bold">VozIA</span>
              </div>
              <p className="text-gray-400 max-w-sm mx-auto md:mx-0">
                Transformando a comunicação em Angola e no mundo com inteligência artificial de voz humanizada.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-6 text-blue-400">Informações de Pagamento</h4>
              <p className="text-gray-400 text-sm mb-2">Para transferências bancárias:</p>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 w-full max-w-xs">
                <p className="text-xs text-gray-500 mb-1">Número de Conta:</p>
                <p className="text-lg font-mono text-white tracking-wider">4220360093643975</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-lg font-bold mb-6 text-blue-400">Redes Sociais</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-2xl"><i className="fa-brands fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="text-sm text-gray-500 mb-2">
              &copy; {new Date().getFullYear()} VozIA Corporation. Todos os direitos reservados.
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-tighter">Luanda, Angola</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
