
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const accountNum = "4220360093643975";
  const whatsappNum = "244931079190";

  // Preços Mensais
  const monthlyPro = 7500;
  const monthlyEnterprise = 12000;

  // Preços Anuais (11x o mensal para dar 1 mês grátis)
  const annualPro = monthlyPro * 11;
  const annualEnterprise = monthlyEnterprise * 11;

  const formatKz = (value: number) => {
    return value.toLocaleString('pt-AO') + " Kz";
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Planos AuraVoz</h2>
          <p className="mt-4 text-lg text-gray-600">Escolha o nível de excelência que você merece.</p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-violet-600' : 'text-gray-400'}`}>Mensal</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-16 h-8 bg-gray-200 rounded-full relative p-1 transition-colors focus:outline-none"
          >
            <div className={`w-6 h-6 bg-violet-600 rounded-full shadow-md transform transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isAnnual ? 'text-violet-600' : 'text-gray-400'}`}>Anual</span>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              1 Mês Oferta
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Plan 1 - Iniciante */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col hover:border-violet-300 transition-colors shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Discovery</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">Grátis</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center text-gray-600">
                <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                Uso Básico Diário
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                Vozes Padrão
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fa-solid fa-xmark mr-3"></i>
                Clonagem Premium
              </li>
            </ul>
            <button className="w-full py-3 px-6 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-colors">
              Explorar
            </button>
          </div>

          {/* Plan 2 - Pro */}
          <div className="bg-violet-600 rounded-3xl p-8 flex flex-col text-white shadow-xl scale-105 relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-cyan-400 text-violet-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Recomendado
            </div>
            <h3 className="text-xl font-bold mb-2">Elite Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">
                {isAnnual ? formatKz(annualPro) : formatKz(monthlyPro)}
              </span>
              <span className="text-violet-100 ml-2 text-sm">{isAnnual ? '/ ano' : '/ mês'}</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center">
                <i className="fa-solid fa-check text-cyan-200 mr-2"></i>
                Vozes com Alma (Emoções)
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-cyan-200 mr-2"></i>
                Dialetos Africanos Completos
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-cyan-200 mr-2"></i>
                Prioridade no Processamento
              </li>
            </ul>
            <button className="w-full py-3 px-6 rounded-xl bg-white text-violet-600 font-bold hover:bg-gray-50 transition-colors shadow-lg">
              Elevar Minha Voz
            </button>
          </div>

          {/* Plan 3 - Enterprise */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col hover:border-violet-300 transition-colors shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Corporativo</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">
                {isAnnual ? formatKz(annualEnterprise) : formatKz(monthlyEnterprise)}
              </span>
              <span className="text-gray-500 ml-2 text-sm">{isAnnual ? '/ ano' : '/ mês'}</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center text-gray-600">
                <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                Clonagem Empresarial
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                API de Integração Direta
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa-solid fa-check text-emerald-500 mr-2"></i>
                Suporte 24/7 Dedicado
              </li>
            </ul>
            <button className="w-full py-3 px-6 rounded-xl border border-violet-600 text-violet-600 font-bold hover:bg-violet-50 transition-colors">
              Negociar
            </button>
          </div>
        </div>

        {/* Unified Payment Info Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <i className="fa-solid fa-waveform text-[120px]"></i>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-md text-center md:text-left">
                <span className="bg-violet-500/20 text-violet-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                  Pagamento Seguro
                </span>
                <h3 className="text-2xl font-bold mb-4">Ativação Instantânea</h3>
                <p className="text-slate-400 mb-6">
                  Envie o valor correspondente para a conta central e tenha seu acesso liberado em minutos após o comprovativo.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-2">Número da Conta AuraVoz</p>
                  <p className="text-2xl md:text-3xl font-mono text-violet-400 font-bold tracking-tighter select-all">
                    {accountNum}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-xl">
                    <i className="fa-solid fa-credit-card"></i>
                  </div>
                  <div>
                    <p className="font-bold">Multicaixa / Express</p>
                    <p className="text-xs text-slate-400">Atendimento via WhatsApp Angola</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNum}?text=Olá AuraVoz, enviei o pagamento para ${accountNum}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-900/20"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  Enviar Comprovativo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
