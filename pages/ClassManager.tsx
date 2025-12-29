import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Student, AttendanceRecord, GradeRecord, ClassContent, ClassTask } from '../types';
import { MOCK_STUDENTS, MOCK_ASSESSMENTS, MOCK_GRADES, MOCK_CONTENTS, MOCK_CLASSES, MOCK_TASKS } from '../services/mockData';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  MoreVertical, 
  Save, 
  FileText,
  Calendar,
  ArrowLeft,
  Search,
  ListTodo,
  X
} from 'lucide-react';

type Tab = 'ATTENDANCE' | 'GRADES' | 'CONTENT' | 'TASKS';

const ClassManager: React.FC = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('ATTENDANCE');
  
  // Data States
  const [students] = useState<Student[]>(MOCK_STUDENTS);
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord['status']>>({});
  const [grades, setGrades] = useState<GradeRecord[]>(MOCK_GRADES);
  const [contents, setContents] = useState<ClassContent[]>(MOCK_CONTENTS);
  const [tasks, setTasks] = useState<ClassTask[]>(MOCK_TASKS);

  // Modal States
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  // Form States
  const [newContentDesc, setNewContentDesc] = useState('');
  const [newContentDate, setNewContentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [newTaskGraded, setNewTaskGraded] = useState(false);

  const currentClass = MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0];

  // Initialize attendance
  useEffect(() => {
    const initial: Record<string, AttendanceRecord['status']> = {};
    students.forEach(s => initial[s.id] = 'PRESENT');
    setAttendance(initial);
  }, [students]);

  const toggleAttendance = (studentId: string) => {
    const current = attendance[studentId];
    const statuses: AttendanceRecord['status'][] = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];
    const nextIndex = (statuses.indexOf(current) + 1) % statuses.length;
    setAttendance(prev => ({ ...prev, [studentId]: statuses[nextIndex] }));
  };

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    const newContent: ClassContent = {
      id: Math.random().toString(36).substr(2, 9),
      date: newContentDate,
      description: newContentDesc,
      attachments: 0
    };
    setContents([newContent, ...contents]);
    setIsContentModalOpen(false);
    setNewContentDesc('');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ClassTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      description: newTaskDesc,
      dueDate: newTaskDue,
      isGraded: newTaskGraded
    };
    setTasks([newTask, ...tasks]);
    setIsTaskModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDue('');
    setNewTaskGraded(false);
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch(status) {
      case 'PRESENT': return <CheckCircle className="text-emerald-500 w-5 h-5" />;
      case 'ABSENT': return <XCircle className="text-rose-500 w-5 h-5" />;
      case 'LATE': return <Clock className="text-amber-500 w-5 h-5" />;
      case 'EXCUSED': return <AlertTriangle className="text-blue-500 w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: AttendanceRecord['status']) => {
    switch(status) {
      case 'PRESENT': return 'Presente';
      case 'ABSENT': return 'Falta';
      case 'LATE': return 'Atraso';
      case 'EXCUSED': return 'Justif.';
    }
  };

  const getStatusStyles = (status: AttendanceRecord['status']) => {
     switch(status) {
      case 'PRESENT': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'ABSENT': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'LATE': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'EXCUSED': return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Nav */}
      <div className="flex flex-col gap-6">
        <button onClick={() => navigate('/classes')} className="self-start flex items-center text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Voltar para Minhas Turmas
        </button>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{currentClass.name}</h2>
            <div className="flex items-center gap-3 mt-2">
               <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide border border-blue-100">
                 {currentClass.subject}
               </span>
               <span className="text-slate-500 text-sm font-medium">{students.length} Alunos matriculados</span>
            </div>
          </div>

          {/* Modern Tabs */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-xl self-start lg:self-auto overflow-x-auto">
            {(['ATTENDANCE', 'GRADES', 'CONTENT', 'TASKS'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'ATTENDANCE' && 'Frequência'}
                {tab === 'GRADES' && 'Notas'}
                {tab === 'CONTENT' && 'Conteúdos'}
                {tab === 'TASKS' && 'Atividades'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
        
        {/* ATTENDANCE TAB */}
        {activeTab === 'ATTENDANCE' && (
          <div className="animate-in fade-in duration-300">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <Calendar className="text-slate-400 w-5 h-5" />
                <span className="font-semibold text-slate-700">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              </div>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 text-sm font-semibold active:scale-95">
                <Save className="w-4 h-4" />
                Salvar Chamada
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider w-1/3">Aluno</th>
                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Matrícula</th>
                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Presença Global</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                             {student.name.charAt(0)}
                           </div>
                           <span className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <button 
                          onClick={() => toggleAttendance(student.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all w-36 ${getStatusStyles(attendance[student.id])}`}
                        >
                          {getStatusIcon(attendance[student.id])}
                          <span className="text-sm font-bold">{getStatusLabel(attendance[student.id])}</span>
                        </button>
                      </td>
                      <td className="p-5 text-slate-500 text-sm font-mono hidden sm:table-cell">{student.enrollmentId}</td>
                      <td className="p-5 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${student.attendanceRate < 75 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {student.attendanceRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GRADES TAB */}
        {activeTab === 'GRADES' && (
          <div className="animate-in fade-in duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                 <h3 className="font-bold text-slate-800 text-lg">Notas do Período</h3>
                 <p className="text-slate-400 text-sm mt-0.5">1º Bimestre</p>
              </div>
              <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 text-sm font-semibold transition-colors">
                <Plus className="w-4 h-4" /> Nova Avaliação
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider sticky left-0 bg-slate-50/50 z-10 w-64 backdrop-blur-sm">Aluno</th>
                    {MOCK_ASSESSMENTS.map(a => (
                      <th key={a.id} className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-center min-w-[140px]">
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-700">{a.name}</span>
                          <span className="text-[10px] font-normal opacity-70">Max: {a.maxScore} | {new Date(a.date).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})}</span>
                        </div>
                      </th>
                    ))}
                    <th className="p-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-center w-24 bg-slate-50">Média</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5 font-semibold text-slate-700 sticky left-0 bg-white group-hover:bg-slate-50/80 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                        {student.name}
                      </td>
                      {MOCK_ASSESSMENTS.map(assessment => {
                        const grade = grades.find(g => g.studentId === student.id && g.assessmentId === assessment.id);
                        return (
                          <td key={assessment.id} className="p-4 text-center">
                             <input 
                              type="number"
                              min="0"
                              max={assessment.maxScore}
                              defaultValue={grade?.value}
                              className="w-16 text-center py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-slate-800 font-bold text-sm bg-transparent hover:bg-white transition-all"
                              onBlur={(e) => {/* update logic */}}
                             />
                          </td>
                        );
                      })}
                      <td className="p-5 text-center bg-slate-50/30">
                         <span className="font-bold text-slate-800 bg-white px-3 py-1 rounded-md border border-slate-100 shadow-sm">7.5</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === 'CONTENT' && (
          <div className="p-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
               <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input placeholder="Buscar conteúdos..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
               </div>
               <button 
                onClick={() => setIsContentModalOpen(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-sm font-semibold shadow-lg shadow-slate-900/10"
               >
                <Plus className="w-4 h-4" /> Registrar Aula
              </button>
            </div>
            
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
              {contents.map((content) => (
                <div key={content.id} className="ml-8 relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-blue-100 group-hover:border-blue-500 transition-colors" />
                  
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                          {new Date(content.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-slate-700 text-base leading-relaxed font-medium">
                      {content.description}
                    </p>
                    {content.attachments > 0 && (
                       <div className="mt-4 flex gap-2">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100 hover:bg-white hover:shadow-sm cursor-pointer transition-all">
                           <FileText className="w-3.5 h-3.5" />
                           {content.attachments} Material(is) de apoio
                         </span>
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'TASKS' && (
          <div className="p-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="text-xl font-bold text-slate-800">Tarefas e Atividades</h3>
                  <p className="text-slate-400 text-sm">Gerencie deveres de casa e trabalhos para a turma.</p>
               </div>
               <button 
                 onClick={() => setIsTaskModalOpen(true)}
                 className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors text-sm font-semibold shadow-lg shadow-slate-900/10"
               >
                <Plus className="w-4 h-4" /> Nova Tarefa
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all group">
                   <div className="flex justify-between items-start mb-3">
                      <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${task.isGraded ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'}`}>
                         {task.isGraded ? 'Avaliativo' : 'Exercício'}
                      </div>
                      <div className="flex items-center text-slate-400 text-xs font-medium bg-slate-50 px-2 py-1 rounded">
                         <Clock size={12} className="mr-1" />
                         Entrega: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                   </div>
                   <h4 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                   <p className="text-slate-600 text-sm leading-relaxed mb-4">{task.description}</p>
                   <div className="flex justify-end pt-4 border-t border-slate-50">
                      <button className="text-sm font-medium text-slate-400 hover:text-slate-700">Editar</button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Register Content Modal */}
      {isContentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800 text-lg">Registrar Aula</h3>
                 <button onClick={() => setIsContentModalOpen(false)}><X size={20} className="text-slate-400 hover:text-red-500" /></button>
              </div>
              <form onSubmit={handleAddContent} className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Data</label>
                    <input type="date" required value={newContentDate} onChange={e => setNewContentDate(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Conteúdo Ministrado</label>
                    <textarea required rows={4} value={newContentDesc} onChange={e => setNewContentDesc(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Descreva o que foi ensinado..."></textarea>
                 </div>
                 <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all">Salvar Registro</button>
              </form>
           </div>
        </div>
      )}

      {/* 2. Create Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800 text-lg">Nova Tarefa</h3>
                 <button onClick={() => setIsTaskModalOpen(false)}><X size={20} className="text-slate-400 hover:text-red-500" /></button>
              </div>
              <form onSubmit={handleAddTask} className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Título</label>
                    <input type="text" required value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Lista de Exercícios 1" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Data de Entrega</label>
                       <input type="date" required value={newTaskDue} onChange={e => setNewTaskDue(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="flex items-end pb-2">
                       <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={newTaskGraded} onChange={e => setNewTaskGraded(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                          <span className="text-sm font-bold text-slate-700">Vale Nota?</span>
                       </label>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Descrição</label>
                    <textarea required rows={3} value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Instruções para o aluno..."></textarea>
                 </div>
                 <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all">Criar Tarefa</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClassManager;