
import React, { useState } from 'react';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-black">
      <div className="max-w-md w-full">
        <div className="bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-800">
          <div className="bg-zinc-950 p-12 text-center relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-[60px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-fuchsia-600/20 blur-[60px] rounded-full"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/20">
                <i className="fa-solid fa-waveform text-white text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                AuraVoz Account
              </h2>
              <p className="text-zinc-500 text-sm font-medium">
                O futuro da voz africana começa aqui
              </p>
            </div>
          </div>

          <div className="p-10">
            <div className="flex p-1 bg-zinc-950 border border-zinc-800 rounded-2xl mb-10">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-zinc-800 text-violet-400 shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                ENTRAR
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-zinc-800 text-violet-400 shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                CRIAR CONTA
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Nome Completo</label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600"></i>
                    <input 
                      type="text" 
                      required 
                      className="w-full pl-14 pr-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-zinc-800 shadow-inner"
                      placeholder="Ex: Manuel dos Santos"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">E-mail</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600"></i>
                  <input 
                    type="email" 
                    required 
                    className="w-full pl-14 pr-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-zinc-800 shadow-inner"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Senha</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600"></i>
                  <input 
                    type="password" 
                    required 
                    className="w-full pl-14 pr-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-zinc-800 shadow-inner"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-violet-700 transition-all shadow-xl shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                ) : (
                  <>{isLogin ? 'ATIVAR ACESSO' : 'GERAR MINHA AURA'}</>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="px-4 bg-zinc-900 text-zinc-600">Conectar com</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex flex-col items-center justify-center gap-3 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all group">
                  <i className="fa-brands fa-google text-xl text-zinc-500 group-hover:text-red-500 transition-colors"></i>
                  <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Google</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all group">
                  <i className="fa-brands fa-apple text-xl text-zinc-500 group-hover:text-white transition-colors"></i>
                  <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">iCloud</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all group">
                  <i className="fa-brands fa-facebook text-xl text-zinc-500 group-hover:text-blue-500 transition-colors"></i>
                  <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-10 text-center text-zinc-700 text-[10px] font-bold uppercase tracking-widest">
          Orgulhosamente feito para o povo Angolano.
        </p>
      </div>
    </div>
  );
};

export default Login;
