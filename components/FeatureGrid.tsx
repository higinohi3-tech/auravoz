
import React from 'react';
import { FEATURES } from '../constants';

const FeatureGrid: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Poder Único da AuraVoz</h2>
          <p className="mt-4 text-lg text-gray-600">A tecnologia de voz mais sofisticada ao seu serviço.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              {feature.tag && (
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase">
                  {feature.tag}
                </div>
              )}
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <i className={`fa-solid ${feature.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
