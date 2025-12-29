import React, { useState } from 'react';
import { MOCK_USERS, MOCK_ALL_CLASSES } from '../services/mockData';
import { Users, BookOpen, Layers, Plus, Search, Edit2, Trash2 } from 'lucide-react';

type Tab = 'USERS' | 'CLASSES' | 'SUBJECTS';

const AdminStructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('USERS');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClasses = MOCK_ALL_CLASSES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <h1 className="text-2xl font-bold text-slate-900">Estrutura Escolar</h1>
         <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('USERS')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'USERS' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              <Users size={16} /> Usuários
            </button>
            <button 
              onClick={() => setActiveTab('CLASSES')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'CLASSES' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              <Layers size={16} /> Turmas
            </button>
         </div>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
           <input 
             type="text" 
             placeholder="Buscar..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={18} /> 
          {activeTab === 'USERS' ? 'Novo Usuário' : 'Nova Turma'}
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {activeTab === 'USERS' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-600 text-sm">Nome</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Email</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Perfil</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{user.name}</td>
                    <td className="p-4 text-slate-600 text-sm">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'PROFESSOR' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                       <button className="p-1.5 hover:bg-slate-200 rounded text-slate-500 hover:text-blue-600"><Edit2 size={16} /></button>
                       <button className="p-1.5 hover:bg-red-100 rounded text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'CLASSES' && (
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-600 text-sm">Turma</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Disciplina</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm text-center">Alunos</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(cls => (
                  <tr key={cls.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{cls.name}</td>
                    <td className="p-4 text-slate-600 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      {cls.subject}
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-bold">
                        {cls.studentsCount}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                       <button className="p-1.5 hover:bg-slate-200 rounded text-slate-500 hover:text-blue-600"><Edit2 size={16} /></button>
                       <button className="p-1.5 hover:bg-red-100 rounded text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStructure;