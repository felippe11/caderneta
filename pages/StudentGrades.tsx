import React, { useState } from 'react';
import { MOCK_STUDENT_REPORT, SCHOOLS, MOCK_CONTENTS, MOCK_TASKS } from '../services/mockData';
import { FileText, Award, AlertCircle, CheckCircle, XCircle, User, GraduationCap, Hash, MapPin, ListTodo, Calendar, BookOpen } from 'lucide-react';

const StudentGrades: React.FC = () => {
  // Mock finding current school context (in real app, passed via props or context)
  const currentSchool = SCHOOLS[0]; 
  const accessConfig = currentSchool.config.studentAccess;

  const [activeTab, setActiveTab] = useState<'REPORT' | 'CONTENT' | 'TASKS'>('REPORT');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Aprovado': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Recuperação': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Reprovado': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
     switch(status) {
      case 'Aprovado': return <CheckCircle className="w-4 h-4" />;
      case 'Recuperação': return <AlertCircle className="w-4 h-4" />;
      case 'Reprovado': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (!accessConfig?.enabled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-2xl border border-slate-200">
         <div className="bg-slate-50 p-4 rounded-full mb-4">
           <User size={32} className="text-slate-400" />
         </div>
         <h2 className="text-xl font-bold text-slate-800">Acesso ao Portal Desativado</h2>
         <p className="text-slate-500 max-w-md mt-2">
           A escola desabilitou temporariamente o acesso dos alunos às informações acadêmicas. Entre em contato com a secretaria.
         </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Student Profile Card */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-blue-600 border-4 border-white shadow-lg">
             <User size={40} />
           </div>
           
           <div className="flex-1 text-center md:text-left space-y-4">
             <div>
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">João Aluno</h1>
               <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                 <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium border border-slate-200">
                    <GraduationCap size={14} /> 9º Ano A
                 </span>
                 <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium border border-slate-200">
                    <Hash size={14} /> Matrícula: 2024001
                 </span>
                 <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium border border-slate-200">
                    <MapPin size={14} /> Colégio Futuro
                 </span>
               </div>
             </div>

             <div className="flex justify-center md:justify-start gap-4">
                {accessConfig.viewGrades && (
                  <div className="flex items-center gap-2">
                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                       <Award size={18} />
                     </div>
                     <div>
                       <p className="text-xs text-slate-500 font-bold uppercase">Média Geral</p>
                       <p className="text-lg font-bold text-slate-800">7.8</p>
                     </div>
                  </div>
                )}
                {accessConfig.viewAttendance && (
                  <>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div className="flex items-center gap-2">
                       <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                         <CheckCircle size={18} />
                       </div>
                       <div>
                         <p className="text-xs text-slate-500 font-bold uppercase">Frequência</p>
                         <p className="text-lg font-bold text-slate-800">92%</p>
                       </div>
                    </div>
                  </>
                )}
             </div>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8">
        {(accessConfig.viewGrades || accessConfig.viewAttendance) && (
          <button 
            onClick={() => setActiveTab('REPORT')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'REPORT' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Boletim Escolar
            {activeTab === 'REPORT' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t-full" />}
          </button>
        )}
        {accessConfig.viewContent && (
          <button 
            onClick={() => setActiveTab('CONTENT')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'CONTENT' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Conteúdos Ministrados
            {activeTab === 'CONTENT' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t-full" />}
          </button>
        )}
        {accessConfig.viewTasks && (
          <button 
            onClick={() => setActiveTab('TASKS')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'TASKS' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Tarefas e Atividades
            {activeTab === 'TASKS' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t-full" />}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in duration-300">
        
        {/* REPORT CARD TAB */}
        {activeTab === 'REPORT' && (accessConfig.viewGrades || accessConfig.viewAttendance) && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider w-1/4">Disciplina</th>
                    {accessConfig.viewGrades && (
                      <>
                        <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider text-center">Bim 1</th>
                        <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider text-center">Bim 2</th>
                        <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider text-center">Bim 3</th>
                        <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider text-center">Bim 4</th>
                        <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider text-center bg-slate-50">Média</th>
                      </>
                    )}
                    {accessConfig.viewAttendance && (
                      <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider text-center w-24">Freq.</th>
                    )}
                    {accessConfig.viewGrades && (
                      <th className="p-5 font-bold text-slate-600 text-xs uppercase tracking-wider w-36">Situação</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_STUDENT_REPORT.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-5 font-semibold text-slate-800">{row.subject}</td>
                      {accessConfig.viewGrades && (
                        <>
                          <td className="p-5 text-center text-slate-600 group-hover:text-slate-900">{row.p1.toFixed(1)}</td>
                          <td className="p-5 text-center text-slate-600 group-hover:text-slate-900">{row.p2.toFixed(1)}</td>
                          <td className="p-5 text-center text-slate-600 group-hover:text-slate-900">{row.p3.toFixed(1)}</td>
                          <td className="p-5 text-center text-slate-600 group-hover:text-slate-900">{row.p4.toFixed(1)}</td>
                          <td className="p-5 text-center font-bold text-slate-800 bg-slate-50/30 group-hover:bg-blue-50/30">{row.final.toFixed(1)}</td>
                        </>
                      )}
                      {accessConfig.viewAttendance && (
                        <td className="p-5 text-center">
                          <div className="flex flex-col items-center">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${row.attendance >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                              {row.attendance}%
                            </span>
                          </div>
                        </td>
                      )}
                      {accessConfig.viewGrades && (
                        <td className="p-5">
                          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(row.status)}`}>
                            {getStatusIcon(row.status)}
                            {row.status}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTENTS TAB */}
        {activeTab === 'CONTENT' && accessConfig.viewContent && (
           <div className="space-y-6 relative border-l-2 border-slate-200 ml-4 py-2">
             {MOCK_CONTENTS.map(content => (
               <div key={content.id} className="ml-8 relative">
                  <div className="absolute -left-[43px] top-1 w-6 h-6 rounded-full bg-slate-100 border-4 border-white shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                        {new Date(content.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                     </span>
                     <p className="text-slate-700 font-medium leading-relaxed">{content.description}</p>
                     {content.attachments > 0 && (
                        <div className="mt-4 flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wide">
                           <BookOpen size={14} /> Material de Apoio Disponível
                        </div>
                     )}
                  </div>
               </div>
             ))}
           </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'TASKS' && accessConfig.viewTasks && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TASKS.map(task => (
              <div key={task.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                       <ListTodo size={24} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase ${task.isGraded ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'}`}>
                       {task.isGraded ? 'Avaliativo' : 'Exercício'}
                    </span>
                 </div>
                 <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{task.title}</h3>
                 <p className="text-slate-600 text-sm mb-4 leading-relaxed">{task.description}</p>
                 <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-2 rounded-lg inline-flex">
                    <Calendar size={16} />
                    Entrega: <span className="text-slate-800">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                 </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentGrades;