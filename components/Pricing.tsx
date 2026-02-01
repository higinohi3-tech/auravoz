
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
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Planos AuraVoz</h2>
          <p className="text-lg text-zinc-400">Escolha o nível de acesso que combina com o seu talento.</p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div className="flex justify-center items-center gap-5 mb-20">
          <span className={`text-sm font-bold ${!isAnnual ? 'text-violet-400' : 'text-zinc-600'}`}>MENSAL</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-16 h-8 bg-zinc-800 rounded-full relative p-1 transition-colors focus:outline-none border border-zinc-700"
          >
            <div className={`w-6 h-6 bg-violet-600 rounded-full shadow-md transform transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isAnnual ? 'text-violet-400' : 'text-zinc-600'}`}>ANUAL</span>
            <span className="bg-emerald-600/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
              -1 Mês
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Plan 1 - Discovery */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col hover:border-violet-500/30 transition-all hover:bg-zinc-900">
            <h3 className="text-xl font-bold text-zinc-300 mb-2">Discovery</h3>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">Grátis</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              <li className="flex items-center text-zinc-400 text-sm">
                <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                Narrações Diárias Limitadas
              </li>
              <li className="flex items-center text-zinc-400 text-sm">
                <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                Vozes Padrão de Angola
              </li>
              <li className="flex items-center text-zinc-600 text-sm italic">
                <i className="fa-solid fa-lock mr-3 opacity-50"></i>
                Clonagem de Voz
              </li>
            </ul>
            <button className="w-full py-4 rounded-2xl border border-zinc-700 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">
              Explorar Agora
            </button>
          </div>

          {/* Plan 2 - Elite Pro */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2.5rem] p-10 flex flex-col text-white shadow-2xl scale-105 relative z-10 overflow-hidden">
            <div className="absolute top-0 right-10 bg-cyan-400 text-violet-950 text-[10px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-widest">
              POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Elite Pro</h3>
            <div className="mb-8">
              <span className="text-4xl font-black">
                {isAnnual ? formatKz(annualPro) : formatKz(monthlyPro)}
              </span>
              <span className="text-violet-200 ml-2 text-sm">{isAnnual ? '/ ano' : '/ mês'}</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              <li className="flex items-center text-sm font-medium">
                <i className="fa-solid fa-check text-cyan-300 mr-3"></i>
                Vozes com Emoção Real
              </li>
              <li className="flex items-center text-sm font-medium">
                <i className="fa-solid fa-check text-cyan-300 mr-3"></i>
                Línguas Nacionais Completas
              </li>
              <li className="flex items-center text-sm font-medium">
                <i className="fa-solid fa-check text-cyan-300 mr-3"></i>
                Processamento Ultra-Rápido
              </li>
            </ul>
            <button className="w-full py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-zinc-100 transition-all shadow-xl active:scale-95">
              Assinar Plano Elite
            </button>
          </div>

          {/* Plan 3 - Corporate */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col hover:border-violet-500/30 transition-all hover:bg-zinc-900">
            <h3 className="text-xl font-bold text-zinc-300 mb-2">Corporate</h3>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">
                {isAnnual ? formatKz(annualEnterprise) : formatKz(monthlyEnterprise)}
              </span>
              <span className="text-zinc-500 ml-2 text-sm">{isAnnual ? '/ ano' : '/ mês'}</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              <li className="flex items-center text-zinc-400 text-sm">
                <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                Clonagem Empresarial
              </li>
              <li className="flex items-center text-zinc-400 text-sm">
                <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                API de Voz Nativa
              </li>
              <li className="flex items-center text-zinc-400 text-sm">
                <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                Atendimento por Voz IA 24h
              </li>
            </ul>
            <button className="w-full py-4 rounded-2xl border border-violet-500/40 text-violet-400 font-bold hover:bg-violet-500/10 transition-colors">
              Falar com Vendas
            </button>
          </div>
        </div>

        {/* Payment Detail Section */}
        <div className="bg-zinc-950 rounded-[3rem] p-10 md:p-16 border border-zinc-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <i className="fa-solid fa-building-columns text-[150px]"></i>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl text-center md:text-left">
              <span className="bg-violet-600/20 text-violet-400 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block border border-violet-500/20">
                PROCESSO DE ATIVAÇÃO
              </span>
              <h3 className="text-3xl font-bold mb-6 text-white">Sua assinatura ativa em minutos.</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                A AuraVoz processa ativações manualmente via transferência. Garanta seu acesso enviando o comprovativo pelo nosso canal oficial no WhatsApp.
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-inner">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">IBAN AuraVoz (Angola)</p>
                <p className="text-2xl md:text-3xl font-mono text-violet-400 font-bold select-all tracking-tighter">
                  {accountNum}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 w-full md:w-auto">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex items-center gap-5">
                <div className="w-14 h-14 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center text-xl text-violet-400">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <div>
                  <p className="font-bold text-white">Multicaixa Express</p>
                  <p className="text-xs text-zinc-500">Forma preferencial p/ Angola</p>
                </div>
              </div>
              <a 
                href={`https://wa.me/${whatsappNum}?text=Oi AuraVoz, fiz o pagamento para ${accountNum}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-10 rounded-3xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/30 active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i>
                ENVIAR COMPROVATIVO
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
