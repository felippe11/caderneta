import React, { useState } from 'react';
import { SCHOOLS, loginMock } from '../services/mockData';
import { GraduationCap, ArrowRight, Loader2, Lock, Mail, Building2 } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [schoolId, setSchoolId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSchoolSelect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) {
      setError('Por favor selecione uma escola.');
      return;
    }
    setStep(2);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await loginMock(email, schoolId);
      if (user) {
        onLogin(user);
      } else {
        setError('Acesso negado. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Ocorreu um erro técnico.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSchool = SCHOOLS.find(s => s.id === schoolId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative z-10 overflow-hidden">
        
        {/* Header Section */}
        <div className="pt-12 pb-8 px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-6 transform rotate-3">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">EduNova</h1>
          <p className="text-slate-500 font-medium">Plataforma de Gestão Escolar</p>
        </div>

        {/* Form Body */}
        <div className="px-8 pb-12">
          {step === 1 ? (
            <form onSubmit={handleSchoolSelect} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 ml-1">Selecione sua Instituição</label>
                <div className="grid gap-3">
                  {SCHOOLS.map(school => (
                    <div 
                      key={school.id}
                      onClick={() => { setSchoolId(school.id); setError(''); }}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                        schoolId === school.id 
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                          : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${schoolId === school.id ? 'bg-blue-200/50 text-blue-700' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                          <Building2 size={20} />
                        </div>
                        <span className={`font-semibold ${schoolId === school.id ? 'text-slate-800' : 'text-slate-600'}`}>
                          {school.name}
                        </span>
                      </div>
                      {schoolId === school.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">{error}</p>}

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Continuar <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="text-center mb-8 bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Acessando</p>
                <p className="text-slate-800 font-bold">{selectedSchool?.name}</p>
                <button 
                  type="button" 
                  onClick={() => { setStep(1); setError(''); }}
                  className="text-xs text-slate-500 hover:text-blue-600 hover:underline mt-2 transition-colors"
                >
                  Trocar escola
                </button>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium text-center border border-red-100">{error}</div>}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar na Plataforma'}
              </button>
              
              <div className="text-center">
                 <p className="text-xs text-slate-400">Ambiente seguro e monitorado</p>
                 <p className="text-xs text-slate-300 mt-1">Dica: admin@futuro.com | prof@futuro.com</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;