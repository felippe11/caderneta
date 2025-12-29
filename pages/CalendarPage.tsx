import React, { useState } from 'react';
import { User, UserRole, CalendarEvent, EventType } from '../types';
import { MOCK_CALENDAR_EVENTS } from '../services/mockData';
import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon, MapPin, AlignLeft, Clock, ArrowRight } from 'lucide-react';

interface CalendarPageProps {
  user: User;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<EventType>('ACADEMIC');
  const [newEventDesc, setNewEventDesc] = useState('');

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    
    // Always open modal to view events. If Admin, can create.
    setIsModalOpen(true);
    
    // Reset form
    setNewEventTitle('');
    setNewEventType('ACADEMIC');
    setNewEventDesc('');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !selectedDate) return;

    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEventTitle,
      type: newEventType,
      description: newEventDesc,
      date: selectedDate
    };

    setEvents([...events, newEvent]);
    // Close modal? Or keep open? Let's keep open to see the new event
    setNewEventTitle('');
    setNewEventDesc('');
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getTypeColor = (type: EventType) => {
    switch (type) {
      case 'ACADEMIC': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'HOLIDAY': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'MEETING': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'EVENT': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'VACATION': return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getTypeLabel = (type: EventType) => {
    switch (type) {
      case 'ACADEMIC': return 'Acadêmico';
      case 'HOLIDAY': return 'Feriado';
      case 'MEETING': return 'Reunião';
      case 'EVENT': return 'Evento';
      case 'VACATION': return 'Férias';
    }
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // Events for the selected date (for the modal)
  const selectedDateEvents = events.filter(e => e.date === selectedDate);

  // Logic for Upcoming Events (Next 5 events from today)
  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingEvents = events
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Calendário Escolar</h1>
            <p className="text-slate-500 mt-1">
              {user.role === UserRole.ADMIN ? 'Gerencie eventos e datas importantes.' : 'Fique por dentro das datas importantes.'}
            </p>
         </div>
         <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm self-end md:self-auto">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold text-slate-800 w-32 text-center select-none capitalize">
              {monthNames[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
              <ChevronRight size={20} />
            </button>
         </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Main Calendar Grid */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-[100px] sm:auto-rows-[120px]">
              {/* Blank cells for prev month */}
              {blanks.map(blank => (
                <div key={`blank-${blank}`} className="bg-slate-50/30 border-b border-r border-slate-100"></div>
              ))}

              {/* Days */}
              {days.map(day => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                return (
                  <div 
                    key={day} 
                    onClick={() => handleDayClick(day)}
                    className={`
                      relative border-b border-r border-slate-100 p-1 sm:p-2 transition-all cursor-pointer group hover:bg-blue-50/30
                      ${isToday ? 'bg-blue-50/30' : ''}
                    `}
                  >
                    <div className={`
                      w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold mb-1 sm:mb-2
                      ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-700 group-hover:text-blue-600'}
                    `}>
                      {day}
                    </div>

                    <div className="space-y-1 overflow-hidden max-h-[60px] sm:max-h-[70px]">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id} 
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded truncate border hidden sm:block ${getTypeColor(event.type)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {/* Mobile Dots */}
                      <div className="flex sm:hidden gap-1 flex-wrap justify-center">
                         {dayEvents.map(event => (
                           <div key={event.id} className={`w-1.5 h-1.5 rounded-full ${getTypeColor(event.type).replace('bg-', 'bg-').split(' ')[0].replace('100', '500')}`} />
                         ))}
                      </div>
                      
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] text-slate-400 font-bold pl-1 hidden sm:block">+ {dayEvents.length - 3} mais</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center bg-white p-4 rounded-xl border border-slate-200">
            {(['ACADEMIC', 'HOLIDAY', 'MEETING', 'EVENT', 'VACATION'] as EventType[]).map(type => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(type).replace('text-', 'bg-').split(' ')[0].replace('100', '500')}`}></div>
                <span className="text-xs font-medium text-slate-600 capitalize">{getTypeLabel(type)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Upcoming Events */}
        <div className="w-full xl:w-96 shrink-0">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Próximos Eventos
              </h3>

              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map(event => {
                    const dateObj = new Date(event.date + 'T00:00:00'); // Force local time to avoid timezone offset
                    return (
                      <div key={event.id} className="flex gap-4 group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors" onClick={() => { setSelectedDate(event.date); setIsModalOpen(true); }}>
                        <div className="flex flex-col items-center justify-center min-w-[3.5rem] h-14 bg-slate-100 rounded-xl border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                          <span className="text-xs font-bold text-slate-500 uppercase">{dateObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span>
                          <span className="text-xl font-bold text-slate-800 group-hover:text-blue-700">{dateObj.getDate()}</span>
                        </div>
                        <div className="flex-1 min-w-0 py-0.5">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-slate-800 truncate pr-2 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                          </div>
                          <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide mt-1 border ${getTypeColor(event.type)}`}>
                             {getTypeLabel(event.type)}
                          </span>
                          {event.description && (
                            <p className="text-xs text-slate-500 mt-1 truncate">{event.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <CalendarIcon size={32} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Sem eventos futuros.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100">
                 <button className="w-full py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 group">
                   Ver calendário completo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                   <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                     <CalendarIcon size={18} className="text-slate-500" />
                     {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                   </h3>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                   <X size={20} />
                 </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                 {/* List existing events */}
                 {selectedDateEvents.length > 0 ? (
                   <div className="space-y-3 mb-6">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Eventos do Dia</h4>
                     {selectedDateEvents.map(ev => (
                       <div key={ev.id} className={`p-3 rounded-xl border flex items-start gap-3 ${getTypeColor(ev.type)}`}>
                          <div className={`p-2 rounded-lg bg-white/50`}>
                             <CalendarIcon size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{ev.title}</p>
                            <span className="text-[10px] font-bold uppercase opacity-80">{getTypeLabel(ev.type)}</span>
                            {ev.description && <p className="text-xs mt-1 opacity-90">{ev.description}</p>}
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-6 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 mb-6">
                     <p className="text-sm">Nenhum evento registrado.</p>
                   </div>
                 )}

                 {/* Admin Create Form */}
                 {user.role === UserRole.ADMIN && (
                   <div className="pt-6 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Plus size={16} className="text-blue-600" /> Adicionar Novo Evento
                      </h4>
                      <form onSubmit={handleAddEvent} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nome do Evento</label>
                          <input 
                            required
                            type="text" 
                            value={newEventTitle}
                            onChange={e => setNewEventTitle(e.target.value)}
                            placeholder="Ex: Reunião Pedagógica" 
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tipo</label>
                          <select 
                             value={newEventType}
                             onChange={e => setNewEventType(e.target.value as EventType)}
                             className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                          >
                             <option value="ACADEMIC">Acadêmico</option>
                             <option value="HOLIDAY">Feriado</option>
                             <option value="MEETING">Reunião</option>
                             <option value="EVENT">Evento</option>
                             <option value="VACATION">Férias</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Descrição</label>
                          <textarea 
                            value={newEventDesc}
                            onChange={e => setNewEventDesc(e.target.value)}
                            rows={3} 
                            placeholder="Detalhes adicionais..."
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" 
                          />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                           Salvar Evento
                        </button>
                      </form>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;