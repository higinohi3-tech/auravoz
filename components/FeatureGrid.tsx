
import React from 'react';
import { FEATURES } from '../constants';

const FeatureGrid: React.FC = () => {
  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Poder Único da AuraVoz</h2>
          <p className="text-lg text-zinc-400">Sinta a emoção em cada sílaba gerada pela nossa inteligência.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800 hover:border-violet-500/40 transition-all relative overflow-hidden group hover:bg-zinc-900">
              {feature.tag && (
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                  {feature.tag}
                </div>
              )}
              <div className="w-14 h-14 bg-zinc-800 text-violet-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                <i className={`fa-solid ${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-violet-400 transition-colors">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{feature.description}</p>
              
              {/* Subtle hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
