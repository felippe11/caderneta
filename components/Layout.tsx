import React, { useState } from 'react';
import { User, UserRole, School } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap,
  CalendarCheck,
  FileText,
  MessageSquare,
  Lock,
  BarChart2
} from 'lucide-react';

interface LayoutProps {
  user: User;
  school: School;
  children: React.ReactNode;
  onLogout: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, school, children, onLogout, activePath, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if student access is globally enabled
  const studentAccessEnabled = school.config.studentAccess?.enabled ?? true;

  const getNavItems = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return [
          { label: 'Painel Geral', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Estrutura', path: '/structure', icon: Users },
          { label: 'Relatórios', path: '/reports', icon: BarChart2 },
          { label: 'Calendário', path: '/calendar', icon: CalendarCheck },
          { label: 'Comunicação', path: '/communication', icon: MessageSquare },
          { label: 'Configurações', path: '/settings', icon: Settings },
        ];
      case UserRole.PROFESSOR:
        return [
          { label: 'Visão Geral', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Minhas Turmas', path: '/classes', icon: BookOpen },
          { label: 'Calendário', path: '/calendar', icon: CalendarCheck },
          { label: 'Comunicação', path: '/communication', icon: MessageSquare },
        ];
      case UserRole.STUDENT:
        // If disabled, return empty or specific item
        if (!studentAccessEnabled) {
          return [{ label: 'Acesso Restrito', path: '/grades', icon: Lock }];
        }
        return [
          { label: 'Resumo', path: '/dashboard', icon: LayoutDashboard },
          { label: 'Meu Portal', path: '/grades', icon: FileText },
          { label: 'Calendário', path: '/calendar', icon: CalendarCheck },
          { label: 'Avisos', path: '/communication', icon: MessageSquare },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-blue-50 border-r border-blue-100 text-slate-600 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-xl md:shadow-none`}>
        <div className="flex flex-col h-full">
          {/* Logo / School Name */}
          <div className="p-8 pb-6">
            <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-slate-800 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl shadow-lg shadow-blue-600/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="truncate">{school.name}</span>
            </div>
            
            <div className="px-4 py-3 bg-white border border-blue-100 rounded-xl shadow-sm flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                  {user.name.charAt(0)}
               </div>
               <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-800 truncate leading-none mb-1">{user.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    {user.role === 'ADMIN' ? 'Administrador' : user.role === 'PROFESSOR' ? 'Professor' : 'Estudante'}
                  </p>
               </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
            <div className="px-4 pb-2 text-xs font-bold text-blue-400 uppercase tracking-widest">Menu Principal</div>
            {navItems.map((item) => {
              const isActive = activePath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-600 hover:bg-white hover:text-blue-700 hover:shadow-sm'
                  }`}
                >
                  <item.icon size={20} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`} />
                  {item.label}
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-100">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:bg-white hover:text-red-600 hover:shadow-sm rounded-xl transition-all group"
            >
              <LogOut size={18} className="group-hover:text-red-500 transition-colors" />
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full bg-[#f8fafc]">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-100 md:hidden flex items-center justify-between px-4 py-4 sticky top-0 z-30 shadow-sm">
           <div className="flex items-center gap-3 font-bold text-slate-800">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="truncate max-w-[200px] text-sm">{school.name}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-300">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;