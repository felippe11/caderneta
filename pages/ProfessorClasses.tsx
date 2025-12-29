import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CLASSES } from '../services/mockData';
import { BookOpen, Users, Clock, ChevronRight, GraduationCap } from 'lucide-react';

const ProfessorClasses: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Minhas Turmas</h1>
           <p className="text-slate-500">Gerencie seus diários e alunos</p>
        </div>
        <div className="text-sm font-semibold text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 flex items-center gap-2">
          <GraduationCap size={16} /> Ano Letivo 2024
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLASSES.map((cls) => (
          <div 
            key={cls.id}
            onClick={() => navigate(`/classes/${cls.id}`)}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            {/* Top color bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors mb-1">
                  {cls.name}
                </h3>
                <span className="inline-block bg-slate-50 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-100">
                  {cls.subject}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <BookOpen size={20} />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{cls.studentsCount} Alunos matriculados</span>
              </div>
              {cls.nextClass && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Próxima aula: <span className="font-semibold text-slate-900">{cls.nextClass}</span></span>
                </div>
              )}
            </div>

            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all flex items-center justify-center gap-2">
               Acessar Diário <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorClasses;