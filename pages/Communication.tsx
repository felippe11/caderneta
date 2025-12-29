import React, { useState } from 'react';
import { User, UserRole, Announcement, AnnouncementType, AnnouncementTarget } from '../types';
import { MOCK_ANNOUNCEMENTS, MOCK_CLASSES } from '../services/mockData';
import { MessageSquare, Send, Bell, ListTodo, Calendar, Plus, X, User as UserIcon } from 'lucide-react';

interface CommunicationProps {
  user: User;
}

const Communication: React.FC<CommunicationProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'INBOX' | 'SENT'>('INBOX');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Create Announcement State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<AnnouncementType>('NOTICE');
  const [newTarget, setNewTarget] = useState<AnnouncementTarget>('ALL');
  const [newTargetClass, setNewTargetClass] = useState('');

  // Filtering Logic
  const myInbox = MOCK_ANNOUNCEMENTS.filter(ann => {
    if (user.role === UserRole.ADMIN) return true; // Admins see all
    if (ann.targetType === 'ALL') return true;
    if (user.role === UserRole.PROFESSOR && ann.targetType === 'TEACHERS') return true;
    if (user.role === UserRole.STUDENT && ann.targetType === 'STUDENTS') return true;
    if (ann.targetType === 'CLASS') return true; 
    return false;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const mySent = MOCK_ANNOUNCEMENTS.filter(ann => ann.senderId === user.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Comunicado enviado com sucesso! (Simulação)");
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const getTypeStyles = (type: AnnouncementType) => {
    switch (type) {
      case 'NOTICE': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'TASK': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'EVENT': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const getTypeIcon = (type: AnnouncementType) => {
    switch (type) {
      case 'NOTICE': return <Bell size={14} />;
      case 'TASK': return <ListTodo size={14} />;
      case 'EVENT': return <Calendar size={14} />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Comunicação</h1>
           <p className="text-slate-500 mt-1">Mural de avisos e tarefas escolares</p>
        </div>
        {user.role !== UserRole.STUDENT && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 font-semibold active:scale-95"
          >
            <Plus size={18} /> Novo Comunicado
          </button>
        )}
      </div>

      {/* Modern Tabs */}
      <div className="flex gap-8 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('INBOX')}
          className={`pb-4 font-semibold text-sm transition-all relative ${activeTab === 'INBOX' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Caixa de Entrada
          {activeTab === 'INBOX' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t-full" />}
        </button>
        {user.role !== UserRole.STUDENT && (
          <button 
            onClick={() => setActiveTab('SENT')}
            className={`pb-4 font-semibold text-sm transition-all relative ${activeTab === 'SENT' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Enviados
            {activeTab === 'SENT' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-t-full" />}
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-5 animate-in fade-in duration-300">
        {(activeTab === 'INBOX' ? myInbox : mySent).map(ann => (
          <div key={ann.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
               <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getTypeStyles(ann.type).split(' ')[2]} ${getTypeStyles(ann.type).split(' ')[0]}`}>
                    <div className={getTypeStyles(ann.type).split(' ')[1]}>
                      {getTypeIcon(ann.type)}
                    </div>
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{ann.title}</h3>
                   <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                     <span className="font-medium">{ann.senderName}</span>
                     <span>•</span>
                     <span>{new Date(ann.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</span>
                   </div>
                 </div>
               </div>
               <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getTypeStyles(ann.type)}`}>
                 {ann.type === 'NOTICE' ? 'Aviso' : ann.type === 'TASK' ? 'Tarefa' : 'Evento'}
               </span>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed pl-[56px]">
              {ann.content}
            </p>

            {activeTab === 'SENT' && (
              <div className="mt-4 pl-[56px] pt-4 border-t border-slate-50 flex justify-end">
                 <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                   Para: <span className="text-slate-600">{ann.targetType === 'ALL' ? 'Todos' : ann.targetType}</span>
                 </span>
              </div>
            )}
          </div>
        ))}
        
        {(activeTab === 'INBOX' ? myInbox : mySent).length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <MessageSquare className="w-8 h-8 opacity-20" />
             </div>
             <p className="font-medium">Nenhum comunicado encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 text-lg">Novo Comunicado</h3>
               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                 <X size={20} />
               </button>
            </div>
            
            <form onSubmit={handleSend} className="p-6 space-y-5">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Título</label>
                 <input 
                   required
                   value={newTitle}
                   onChange={e => setNewTitle(e.target.value)}
                   className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-slate-800" 
                   placeholder="Ex: Entrega de Boletins"
                 />
               </div>

               <div className="grid grid-cols-2 gap-5">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipo</label>
                    <select 
                      value={newType}
                      onChange={e => setNewType(e.target.value as AnnouncementType)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium text-slate-700"
                    >
                      <option value="NOTICE">Aviso Geral</option>
                      <option value="TASK">Tarefa/Atividade</option>
                      <option value="EVENT">Evento</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Destinatário</label>
                    <select 
                      value={newTarget}
                      onChange={e => setNewTarget(e.target.value as AnnouncementTarget)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium text-slate-700"
                    >
                      <option value="ALL">Toda a Escola</option>
                      <option value="CLASS">Turma Específica</option>
                      {user.role === UserRole.ADMIN && <option value="TEACHERS">Professores</option>}
                      {user.role === UserRole.ADMIN && <option value="PARENTS">Pais/Responsáveis</option>}
                    </select>
                 </div>
               </div>

               {newTarget === 'CLASS' && (
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Selecione a Turma</label>
                    <select 
                      value={newTargetClass}
                      onChange={e => setNewTargetClass(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium text-slate-700"
                    >
                      <option value="">Selecione...</option>
                      {MOCK_CLASSES.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name} - {cls.subject}</option>
                      ))}
                    </select>
                 </div>
               )}

               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Conteúdo</label>
                 <textarea 
                   required
                   value={newContent}
                   onChange={e => setNewContent(e.target.value)}
                   rows={4}
                   className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-all text-slate-700"
                   placeholder="Digite a mensagem..."
                 />
               </div>
               
               <div className="pt-2">
                 <button 
                   type="submit"
                   className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98] flex justify-center items-center gap-2"
                 >
                   <Send size={18} /> Enviar Mensagem
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communication;