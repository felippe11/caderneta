import React from 'react';
import { User, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, AlertCircle, TrendingUp, Calendar, ArrowUpRight, Award, CheckCircle, Clock, Plus, FileText, User as UserIcon } from 'lucide-react';

interface DashboardProps {
  user: User;
}

// Mock Data for Charts (Student/Professor)
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

// Mock Data for Admin Dashboard Lists
const RECENT_ACTIVITIES = [
  { id: 1, user: 'João Santos', action: 'lançou notas de Matemática', context: '6º A', time: '5 min atrás', avatar: 'JS', color: 'bg-blue-100 text-blue-600' },
  { id: 2, user: 'Ana Costa', action: 'cadastrou novo aluno', context: '7º B', time: '15 min atrás', avatar: 'AC', color: 'bg-purple-100 text-purple-600' },
  { id: 3, user: 'Carlos Ferreira', action: 'registrou frequência', context: '8º A', time: '32 min atrás', avatar: 'CF', color: 'bg-emerald-100 text-emerald-600' },
  { id: 4, user: 'Maria Silva', action: 'atualizou configurações', context: 'Sistema', time: '1 hora atrás', avatar: 'MS', color: 'bg-amber-100 text-amber-600' },
];

const UPCOMING_EVENTS = [
  { id: 1, title: 'Reunião de Pais', date: '14/03/2024', time: '19:00', type: 'MEETING' },
  { id: 2, title: 'Prova de Matemática - 6º A', date: '17/03/2024', time: '08:00', type: 'EXAM' },
  { id: 3, title: 'Feira de Ciências', date: '21/03/2024', time: '14:00', type: 'EVENT' },
  { id: 4, title: 'Conselho de Classe', date: '24/03/2024', time: '15:00', type: 'MEETING' },
];

const AdminStatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
     <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
     </div>
     <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} />
     </div>
  </div>
);

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

  // --- ADMIN DASHBOARD LAYOUT ---
  if (user.role === UserRole.ADMIN) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
         {/* Header */}
         <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bem-vindo, {user.name}!</h1>
            <p className="text-slate-500 mt-2 text-lg">Gerencie sua escola e acompanhe todas as atividades</p>
         </div>
         
         {/* Stats Cards - Specific Admin Layout */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminStatCard title="Total de Alunos" value="1.247" icon={Users} color="bg-blue-50 text-blue-600" />
            <AdminStatCard title="Professores" value="87" icon={UserIcon} color="bg-emerald-50 text-emerald-600" />
            {/* Keeping requested cards */}
            <AdminStatCard title="Taxa de Aprovação" value="94%" icon={TrendingUp} color="bg-purple-50 text-purple-600" /> 
            <AdminStatCard title="Ocorrências" value="12" icon={AlertCircle} color="bg-amber-50 text-amber-600" />
         </div>
         
         {/* Content Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Atividades Recentes</h3>
                  <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Ver todas</button>
               </div>
               <div className="space-y-6">
                  {RECENT_ACTIVITIES.map(activity => (
                     <div key={activity.id} className="flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${activity.color}`}>
                           {activity.avatar}
                        </div>
                        <div>
                           <p className="text-sm text-slate-800 leading-snug">
                              <span className="font-bold">{activity.user}</span> {activity.action}
                           </p>
                           <p className="text-xs text-slate-400 mt-1 font-medium">
                              {activity.context} • {activity.time}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="lg:col-span-1 space-y-6">
               <div>
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold text-slate-800">Próximos Eventos</h3>
                     <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><Plus size={20} /></button>
                  </div>
                  <div className="space-y-4">
                     {UPCOMING_EVENTS.map(event => (
                        <div key={event.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-colors cursor-pointer">
                           <div className={`p-3 rounded-lg shrink-0 ${event.type === 'EXAM' ? 'bg-indigo-50 text-indigo-600' : event.type === 'EVENT' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                              {event.type === 'EXAM' ? <FileText size={20} /> : <Calendar size={20} />}
                           </div>
                           <div className="min-w-0">
                              <h4 className="text-sm font-bold text-slate-800 truncate">{event.title}</h4>
                              <p className="text-xs text-slate-500 mt-0.5">{event.date} às {event.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // --- DEFAULT DASHBOARD (Professor/Student) ---
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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

      {/* Charts Section (Only for Non-Admin now) */}
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