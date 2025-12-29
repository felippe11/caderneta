import React from 'react';
import { User, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, AlertCircle, TrendingUp, Calendar, ArrowUpRight, Award, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  user: User;
}

// Mock Data
const ATTENDANCE_DATA = [
  { name: 'Seg', presenca: 100 },
  { name: 'Ter', presenca: 100 },
  { name: 'Qua', presenca: 0 }, // Faltou
  { name: 'Qui', presenca: 100 },
  { name: 'Sex', presenca: 100 },
];

const PERFORMANCE_DATA = [
  { name: 'Matemática', value: 85 },
  { name: 'Português', value: 72 },
  { name: 'História', value: 90 },
  { name: 'Ciências', value: 65 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const StatCard = ({ title, value, icon: Icon, colorClass, trend, label }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-full group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass.bg} ${colorClass.text} transition-colors`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
           <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
             +{trend}% <ArrowUpRight size={12} className="ml-0.5" />
           </span>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-800 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">{value}</h3>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {label && <p className="text-xs text-slate-400 mt-1 font-medium">{label}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Olá, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1 text-lg">Bem-vindo ao seu painel escolar.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <Calendar size={16} className="text-slate-400" />
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === UserRole.PROFESSOR && (
          <>
            <StatCard title="Total de Alunos" value="142" icon={Users} colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }} trend="12" />
            <StatCard title="Turmas Ativas" value="5" icon={BookOpen} colorClass={{ bg: 'bg-indigo-50', text: 'text-indigo-600' }} />
            <StatCard title="Média Frequência" value="92%" icon={TrendingUp} colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }} trend="4" />
            <StatCard title="Tarefas Pendentes" value="3" icon={AlertCircle} colorClass={{ bg: 'bg-amber-50', text: 'text-amber-600' }} />
          </>
        )}
        
        {user.role === UserRole.ADMIN && (
          <>
            <StatCard title="Alunos Matriculados" value="1,240" icon={Users} colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }} trend="8" />
            <StatCard title="Professores" value="48" icon={BookOpen} colorClass={{ bg: 'bg-purple-50', text: 'text-purple-600' }} />
            <StatCard title="Taxa de Aprovação" value="89%" icon={TrendingUp} colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }} trend="2" />
            <StatCard title="Ocorrências" value="12" icon={AlertCircle} colorClass={{ bg: 'bg-rose-50', text: 'text-rose-600' }} />
          </>
        )}

        {/* STUDENT DASHBOARD WIDGETS */}
        {user.role === UserRole.STUDENT && (
          <>
            <StatCard 
              title="Média Geral" 
              value="7.8" 
              icon={Award} 
              colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }} 
              label="Bom desempenho"
            />
            <StatCard 
              title="Frequência Global" 
              value="92%" 
              icon={CheckCircle} 
              colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }} 
              label="Dentro da meta escolar"
            />
            <StatCard 
              title="Atividades" 
              value="2" 
              icon={BookOpen} 
              colorClass={{ bg: 'bg-purple-50', text: 'text-purple-600' }} 
              label="Pendentes para entrega"
            />
            <StatCard 
              title="Próxima Aula" 
              value="Matemática" 
              icon={Clock} 
              colorClass={{ bg: 'bg-amber-50', text: 'text-amber-600' }} 
              label="Inicia às 08:00"
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-bold text-slate-800">
                {user.role === UserRole.STUDENT ? 'Minha Presença na Semana' : 'Frequência Semanal'}
             </h3>
             <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 text-slate-600 focus:ring-2 focus:ring-blue-100 cursor-pointer">
               <option>Esta semana</option>
               <option>Semana passada</option>
             </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ATTENDANCE_DATA} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="presenca" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Presença (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
           <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800">
              {user.role === UserRole.PROFESSOR ? 'Distribuição de Conceitos' : 
               user.role === UserRole.STUDENT ? 'Meu Desempenho por Matéria' : 'Desempenho por Disciplina'}
            </h3>
           </div>
           
           <div className="h-64 flex items-center justify-center relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PERFORMANCE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    cornerRadius={5}
                  >
                    {PERFORMANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
             </ResponsiveContainer>
             {/* Center Stats */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-800">
                   {user.role === UserRole.STUDENT ? '7.8' : '84%'}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Média Geral</span>
             </div>
           </div>
           
           <div className="flex flex-wrap justify-center gap-6 mt-6">
              {PERFORMANCE_DATA.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm font-medium text-slate-600">{entry.name}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
