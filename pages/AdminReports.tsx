import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import { 
  FileText, Printer, Filter, ChevronRight, 
  TrendingUp, TrendingDown, Users, AlertTriangle, 
  CheckCircle, FileSpreadsheet, PieChart as PieChartIcon, 
  BarChart as BarChartIcon, Activity, ChevronDown, BookOpen
} from 'lucide-react';

// --- MOCK DATA FOR CHARTS ---

const PERFORMANCE_DATA = [
  { name: '1º Bim', turmaA: 7.5, turmaB: 6.8, turmaC: 8.2 },
  { name: '2º Bim', turmaA: 7.8, turmaB: 7.2, turmaC: 8.0 },
  { name: '3º Bim', turmaA: 8.1, turmaB: 7.5, turmaC: 7.8 },
  { name: '4º Bim', turmaA: 8.5, turmaB: 7.9, turmaC: 8.4 },
];

const SUBJECT_PERFORMANCE = [
  { name: 'Mat', media: 7.2, aprovacao: 85 }, // Shortened names for mobile
  { name: 'Port', media: 8.1, aprovacao: 92 },
  { name: 'Hist', media: 8.5, aprovacao: 95 },
  { name: 'Geo', media: 7.8, aprovacao: 88 },
  { name: 'Fís', media: 6.5, aprovacao: 70 },
  { name: 'Quím', media: 6.9, aprovacao: 75 },
];

const ATTENDANCE_MONTHLY = [
  { name: 'Fev', presentes: 95, faltas: 5 },
  { name: 'Mar', presentes: 92, faltas: 8 },
  { name: 'Abr', presentes: 88, faltas: 12 },
  { name: 'Mai', presentes: 90, faltas: 10 },
  { name: 'Jun', presentes: 85, faltas: 15 },
];

const GRADES_DISTRIBUTION = [
  { name: 'Excelente', value: 15, color: '#10b981' },
  { name: 'Bom', value: 45, color: '#3b82f6' },
  { name: 'Regular', value: 30, color: '#f59e0b' },
  { name: 'Crítico', value: 10, color: '#ef4444' },
];

const RADAR_DATA = [
  { subject: 'Mat', A: 85, B: 70, fullMark: 100 },
  { subject: 'Port', A: 90, B: 85, fullMark: 100 },
  { subject: 'Hist', A: 65, B: 80, fullMark: 100 },
  { subject: 'Geo', A: 70, B: 75, fullMark: 100 },
  { subject: 'Fís', A: 80, B: 60, fullMark: 100 },
  { subject: 'Quím', A: 75, B: 65, fullMark: 100 },
];

const RISK_DATA = [
  { name: 'Crítico', value: 12, color: '#ef4444' },
  { name: 'Atenção', value: 28, color: '#f59e0b' },
  { name: 'Estável', value: 140, color: '#10b981' },
];

// --- REPORT TYPES CONFIGURATION ---

type ReportType = 
  | 'INDIVIDUAL' | 'CLASS_PERFORMANCE' | 'ATTENDANCE' | 'GRADE_SUMMARY' 
  | 'COMPARATIVE' | 'RISK' | 'SUBJECT_DETAIL' | 'PROFESSOR' 
  | 'MONTHLY_FREQ' | 'FINAL_GRADES' | 'RECOVERY' | 'PARENTS_MEETING';

const REPORT_TYPES: { id: ReportType; label: string; desc: string; icon: any }[] = [
  { id: 'INDIVIDUAL', label: 'Boletim Individual', desc: 'Notas e frequência detalhada', icon: FileText },
  { id: 'CLASS_PERFORMANCE', label: 'Desempenho da Turma', desc: 'Análise geral da turma', icon: BarChartIcon },
  { id: 'ATTENDANCE', label: 'Relatório de Frequência', desc: 'Frequência por período', icon: CheckCircle },
  { id: 'GRADE_SUMMARY', label: 'Resumo de Notas', desc: 'Estatísticas por disciplina', icon: PieChartIcon },
  { id: 'COMPARATIVE', label: 'Análise Comparativa', desc: 'Comparação entre turmas', icon: Activity },
  { id: 'RISK', label: 'Alunos em Risco', desc: 'Baixo desempenho/frequência', icon: AlertTriangle },
  { id: 'SUBJECT_DETAIL', label: 'Por Disciplina', desc: 'Análise detalhada', icon: BookOpen },
  { id: 'PROFESSOR', label: 'Relatório do Professor', desc: 'Resumo de aulas e turmas', icon: Users },
  { id: 'MONTHLY_FREQ', label: 'Frequência Mensal', desc: 'Evolução mês a mês', icon: TrendingUp },
  { id: 'FINAL_GRADES', label: 'Notas Finais', desc: 'Consolidação do ano letivo', icon: CheckCircle },
  { id: 'RECOVERY', label: 'Recuperação', desc: 'Resultados de recuperação', icon: TrendingDown },
  { id: 'PARENTS_MEETING', label: 'Reunião de Pais', desc: 'Resumo para apresentação', icon: Users },
];

const AdminReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('COMPARATIVE');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (type: 'PDF' | 'EXCEL' | 'PRINT') => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      alert(`Relatório exportado com sucesso para ${type}!`);
    }, 1500);
  };

  const renderStatsCards = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Média Geral</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">7.8</h3>
             </div>
             <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
               <TrendingUp size={12} /> +0.5
             </span>
           </div>
           <p className="text-xs text-slate-400 mt-2">Comparado ao bimestre anterior</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Aprovação</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">92%</h3>
             </div>
             <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
               <CheckCircle size={12} /> +2%
             </span>
           </div>
           <p className="text-xs text-slate-400 mt-2">Taxa de sucesso da turma</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Freq. Média</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">88%</h3>
             </div>
             <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
               <TrendingDown size={12} /> -1.2%
             </span>
           </div>
           <p className="text-xs text-slate-400 mt-2">Queda leve este mês</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Em Risco</p>
               <h3 className="text-2xl font-bold text-slate-800 mt-1">12</h3>
             </div>
             <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
               <AlertTriangle size={12} /> Alunos
             </span>
           </div>
           <p className="text-xs text-slate-400 mt-2">Necessitam atenção pedagógica</p>
        </div>
      </div>
    );
  };

  const renderChart = () => {
    // Determine height based on device roughly via CSS classes in container, 
    // but here we just ensure content fits.
    
    switch (selectedReport) {
      case 'COMPARATIVE':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 10]} width={30} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
              <Line type="monotone" dataKey="turmaA" name="9º A" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="turmaB" name="9º B" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="turmaC" name="1º Méd" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'SUBJECT_DETAIL':
      case 'CLASS_PERFORMANCE':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={SUBJECT_PERFORMANCE} margin={{ left: 0, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 10]} hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{fontSize: 12}} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{fontSize: '12px'}} />
              <Bar dataKey="media" name="Média" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={15} />
              <Bar dataKey="aprovacao" name="Aprovação (1/10)" fill="#10b981" radius={[0, 4, 4, 0]} barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'MONTHLY_FREQ':
      case 'ATTENDANCE':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ATTENDANCE_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{fontSize: '12px'}} />
              <Area type="monotone" dataKey="presentes" name="Presença %" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Area type="monotone" dataKey="faltas" name="Faltas %" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'GRADE_SUMMARY':
      case 'FINAL_GRADES':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={GRADES_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {GRADES_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{fontSize: '12px'}} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'INDIVIDUAL':
      case 'PARENTS_MEETING':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Aluno" dataKey="A" stroke="#3b82f6" strokeWidth={3} fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Turma" dataKey="B" stroke="#94a3b8" strokeWidth={2} fill="#94a3b8" fillOpacity={0.1} />
              <Legend wrapperStyle={{fontSize: '12px', marginTop: '10px'}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'RISK':
      case 'RECOVERY':
        return (
           <div className="flex flex-col items-center h-full">
              <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RISK_DATA}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                        return window.innerWidth > 600 ? value : '';
                      }}
                    >
                      {RISK_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#fff" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{fontSize: '12px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100 max-h-[150px] overflow-y-auto">
                 <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Alunos em Estado Crítico</h4>
                 <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                         <span className="font-medium text-xs text-slate-700">Aluno {i}</span>
                         <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Média 4.2</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        );

      default:
        return <div className="h-full flex items-center justify-center text-slate-400">Selecione um relatório</div>;
    }
  };

  const currentReportInfo = REPORT_TYPES.find(r => r.id === selectedReport);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)] gap-6 pb-6">
      
      {/* MOBILE ONLY: Report Selector Dropdown */}
      <div className="lg:hidden">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Selecionar Relatório</label>
        <div className="relative">
          <select 
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value as ReportType)}
            className="w-full appearance-none bg-white border border-slate-200 text-slate-900 font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            {REPORT_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* DESKTOP ONLY: Sidebar - Report Selector */}
      <div className="hidden lg:flex w-80 bg-white rounded-2xl border border-slate-200 shadow-sm flex-col overflow-hidden shrink-0 h-[calc(100vh-140px)] sticky top-6">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Filter size={20} className="text-blue-600" /> 
            Catálogo de Relatórios
          </h2>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
          {REPORT_TYPES.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                selectedReport === report.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedReport === report.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                <report.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${selectedReport === report.id ? 'text-white' : 'text-slate-800'}`}>{report.label}</p>
                <p className={`text-[10px] truncate ${selectedReport === report.id ? 'text-blue-100' : 'text-slate-400'}`}>{report.desc}</p>
              </div>
              {selectedReport === report.id && <ChevronRight size={16} className="text-blue-200" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
          <div className="w-full md:w-auto">
             <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 truncate">
               {currentReportInfo?.label}
             </h1>
             <p className="text-slate-500 mt-1 text-sm">{currentReportInfo?.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
             <button 
                onClick={() => handleExport('PDF')}
                disabled={isExporting}
                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
             >
                {isExporting ? '...' : <><FileText size={16} className="text-red-500" /> <span className="hidden sm:inline">Exportar</span> PDF</>}
             </button>
             <button 
                onClick={() => handleExport('EXCEL')}
                disabled={isExporting}
                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
             >
                {isExporting ? '...' : <><FileSpreadsheet size={16} className="text-emerald-500" /> <span className="hidden sm:inline">Exportar</span> Excel</>}
             </button>
             <button 
                onClick={() => handleExport('PRINT')}
                disabled={isExporting}
                className="flex-1 md:flex-none justify-center flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-900 rounded-lg text-xs md:text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-md"
             >
                <Printer size={16} /> <span className="hidden sm:inline">Imprimir</span>
             </button>
          </div>
        </div>

        {/* Filters (Responsive) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row flex-wrap gap-4">
           <div className="flex-1 min-w-full sm:min-w-[150px]">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Período</label>
             <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
               <option>Ano Letivo 2024</option>
               <option>1º Bimestre</option>
               <option>2º Bimestre</option>
             </select>
           </div>
           <div className="flex-1 min-w-full sm:min-w-[150px]">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Turma</label>
             <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
               <option>Todas as Turmas</option>
               <option>9º Ano A</option>
               <option>9º Ano B</option>
               <option>1º Ano Médio</option>
             </select>
           </div>
           <div className="flex-1 min-w-full sm:min-w-[150px]">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Disciplina</label>
             <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
               <option>Geral / Todas</option>
               <option>Matemática</option>
               <option>Português</option>
             </select>
           </div>
        </div>

        {/* Stats Cards (Grid already responsive) */}
        {renderStatsCards()}

        {/* Main Chart Area (Adaptive Height) */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px] md:h-[500px]">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Activity className="text-blue-600" size={20} /> 
             Visualização Gráfica
           </h3>
           <div className="w-full h-[320px] md:h-[400px]">
             {renderChart()}
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminReports;