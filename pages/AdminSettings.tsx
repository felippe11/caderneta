import React, { useState } from 'react';
import { School, AcademicPeriod } from '../types';
import { MOCK_PERIODS } from '../services/mockData';
import { Settings, Save, School as SchoolIcon, Calendar, Plus, Trash2, Clock, Users, Shield } from 'lucide-react';

interface AdminSettingsProps {
  school: School;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ school }) => {
  const [periods, setPeriods] = useState<AcademicPeriod[]>(MOCK_PERIODS);
  
  // Local state for toggles (simulating school.config update)
  const [studentAccess, setStudentAccess] = useState(school.config.studentAccess);

  const handlePeriodChange = (id: string, field: keyof AcademicPeriod, value: string) => {
    setPeriods(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addPeriod = () => {
    const nextId = `p${periods.length + 1}`;
    const newPeriod: AcademicPeriod = {
      id: nextId,
      name: `${periods.length + 1}º Período`,
      startDate: '',
      endDate: '',
      isClosed: false
    };
    setPeriods([...periods, newPeriod]);
  };

  const removePeriod = (id: string) => {
    setPeriods(prev => prev.filter(p => p.id !== id));
  };

  const toggleStudentAccess = (key: keyof typeof studentAccess) => {
    setStudentAccess(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-2">
         <div className="p-2 bg-slate-200 rounded-lg">
           <Settings className="w-6 h-6 text-slate-700" />
         </div>
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Configurações da Escola</h1>
            <p className="text-slate-500">Gerencie parâmetros globais da instituição</p>
         </div>
      </div>

      {/* Identity Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <SchoolIcon className="w-5 h-5 text-blue-600" />
             Identidade e Branding
           </h3>
        </div>
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome da Escola</label>
                <input type="text" defaultValue={school.name} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email de Contato</label>
                <input type="email" defaultValue="contato@escola.com" className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>
           </div>
        </div>
      </div>

      {/* Student Portal Access Rules (NEW) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <Shield className="w-5 h-5 text-blue-600" />
             Portal do Aluno
           </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
             <div>
               <h4 className="font-bold text-slate-800">Permitir Acesso dos Alunos</h4>
               <p className="text-sm text-slate-500 mt-1">Habilita o login e acesso geral dos alunos à plataforma.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={studentAccess.enabled} onChange={() => toggleStudentAccess('enabled')} className="sr-only peer" />
                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${!studentAccess.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
             {[
               { key: 'viewGrades', label: 'Visualizar Notas', desc: 'Acesso ao boletim e notas de avaliações' },
               { key: 'viewAttendance', label: 'Visualizar Frequência', desc: 'Acesso ao histórico de presença' },
               { key: 'viewContent', label: 'Conteúdos Ministrados', desc: 'Ver diário de classe e tópicos de aula' },
               { key: 'viewTasks', label: 'Tarefas e Atividades', desc: 'Acesso à lista de tarefas e deveres de casa' },
             ].map((item) => (
                <div key={item.key} className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                   <div className="mr-4">
                     <span className="block text-sm font-bold text-slate-700">{item.label}</span>
                     <span className="text-xs text-slate-500">{item.desc}</span>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input 
                        type="checkbox" 
                        checked={(studentAccess as any)[item.key]} 
                        onChange={() => toggleStudentAccess(item.key as any)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Academic Rules */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800">Regras Acadêmicas</h3>
        </div>
        <div className="p-6 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Regime Letivo</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer" defaultValue={school.config.periodType}>
                  <option value="BIMESTER">Bimestral (4 etapas)</option>
                  <option value="TRIMESTER">Trimestral (3 etapas)</option>
                  <option value="SEMESTER">Semestral (2 etapas)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sistema de Notas</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer" defaultValue={school.config.gradingScale}>
                  <option value="NUMERIC">Numérico (0 - 10)</option>
                  <option value="CONCEPT">Conceitual (A, B, C...)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Média Aprovação</label>
                <input type="number" step="0.5" defaultValue={school.config.passingGrade} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
              </div>
           </div>
        </div>
      </div>

      {/* Attendance Rules (New Section) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <Clock className="w-5 h-5 text-blue-600" />
             Regras de Frequência
           </h3>
        </div>
        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Frequência Mínima Obrigatória</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    defaultValue={school.config.minAttendance || 75} 
                    className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pl-4 pr-12" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Percentual mínimo de presença para aprovação automática.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                   <div>
                     <span className="block text-sm font-bold text-slate-700">Atrasos contam como falta</span>
                     <span className="text-xs text-slate-500">Se marcado, o status "Atraso" deduz presença.</span>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={school.config.lateCountsAsAbsence} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                   <div>
                     <span className="block text-sm font-bold text-slate-700">Falta Justificada conta como falta</span>
                     <span className="text-xs text-slate-500">Se marcado, atestados não abonam o cálculo final.</span>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={school.config.excusedCountsAsAbsence} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                   </label>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Calendar Management */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-blue-600" />
             Calendário Acadêmico - {school.config.academicYear || 2024}
           </h3>
           <button onClick={addPeriod} className="text-sm text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
             <Plus size={16} /> Adicionar Período
           </button>
        </div>
        <div className="p-6">
           <div className="space-y-3">
             {periods.map((period, index) => (
               <div key={period.id} className="flex flex-col sm:flex-row gap-4 items-end sm:items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-blue-200 transition-colors">
                 <div className="flex-1 w-full sm:w-auto">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nome do Período</label>
                    <input 
                      type="text" 
                      value={period.name}
                      onChange={(e) => handlePeriodChange(period.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                 </div>
                 <div className="w-full sm:w-40">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Início</label>
                    <input 
                      type="date" 
                      value={period.startDate}
                      onChange={(e) => handlePeriodChange(period.id, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                 </div>
                 <div className="w-full sm:w-40">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fim</label>
                    <input 
                      type="date" 
                      value={period.endDate}
                      onChange={(e) => handlePeriodChange(period.id, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                 </div>
                 <button 
                   onClick={() => removePeriod(period.id)}
                   className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                   title="Remover Período"
                 >
                   <Trash2 size={18} />
                 </button>
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-slate-50 px-8 py-5 flex justify-end">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 font-bold active:scale-95">
             <Save className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;