import { User, UserRole, School, ClassGroup, Student, Assessment, GradeRecord, AttendanceRecord, ClassContent, ClassTask, Announcement, AcademicPeriod, CalendarEvent } from '../types';

// Mock Schools
export const SCHOOLS: School[] = [
  {
    id: 's1',
    name: 'Colégio Futuro',
    config: { 
      periodType: 'BIMESTER', 
      gradingScale: 'NUMERIC', 
      passingGrade: 6.0, 
      academicYear: 2024,
      minAttendance: 75,
      lateCountsAsAbsence: false,
      excusedCountsAsAbsence: false,
      studentAccess: {
        enabled: true,
        viewGrades: true,
        viewAttendance: true,
        viewContent: true,
        viewTasks: true
      }
    }
  },
  {
    id: 's2',
    name: 'Escola Primária São José',
    config: { 
      periodType: 'TRIMESTER', 
      gradingScale: 'CONCEPT', 
      passingGrade: 5.0, 
      academicYear: 2024,
      minAttendance: 70,
      lateCountsAsAbsence: true,
      excusedCountsAsAbsence: true,
      studentAccess: {
        enabled: true,
        viewGrades: true,
        viewAttendance: false,
        viewContent: false,
        viewTasks: true
      }
    }
  }
];

// Mock Users
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Ana Silva', email: 'admin@futuro.com', role: UserRole.ADMIN, schoolId: 's1' },
  { id: 'u2', name: 'Carlos Professor', email: 'prof@futuro.com', role: UserRole.PROFESSOR, schoolId: 's1' },
  { id: 'u3', name: 'João Aluno', email: 'aluno@futuro.com', role: UserRole.STUDENT, schoolId: 's1' },
  { id: 'u4', name: 'Maria Souza', email: 'prof2@futuro.com', role: UserRole.PROFESSOR, schoolId: 's1' },
  { id: 'u5', name: 'Pedro Santos', email: 'pedro@futuro.com', role: UserRole.STUDENT, schoolId: 's1' },
];

// Mock Classes for Professor
export const MOCK_CLASSES: ClassGroup[] = [
  { id: 'c1', name: '9º Ano A', subject: 'Matemática', studentsCount: 28, nextClass: '08:00' },
  { id: 'c2', name: '9º Ano B', subject: 'Matemática', studentsCount: 25, nextClass: '10:00' },
  { id: 'c3', name: '1º Ano Médio', subject: 'Física', studentsCount: 30 },
];

// Mock Full Classes list for Admin
export const MOCK_ALL_CLASSES: ClassGroup[] = [
  ...MOCK_CLASSES,
  { id: 'c4', name: '8º Ano A', subject: 'História', studentsCount: 22 },
  { id: 'c5', name: '3º Ano Médio', subject: 'Química', studentsCount: 28 },
];

// Mock Students in a Class
export const MOCK_STUDENTS: Student[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `st${i + 1}`,
  name: `Aluno ${i + 1} Sobrenome`,
  enrollmentId: `202400${i + 1}`,
  attendanceRate: 85 + Math.floor(Math.random() * 15)
}));

// Mock Assessments
export const MOCK_ASSESSMENTS: Assessment[] = [
  { id: 'a1', name: 'Prova Mensal', date: '2024-03-10', maxScore: 10, weight: 1 },
  { id: 'a2', name: 'Trabalho em Grupo', date: '2024-03-25', maxScore: 10, weight: 1 },
  { id: 'a3', name: 'Prova Bimestral', date: '2024-04-15', maxScore: 10, weight: 2 },
];

// Mock Grades (Random generation for visual pop)
export const MOCK_GRADES: GradeRecord[] = [];
MOCK_STUDENTS.forEach(student => {
  MOCK_ASSESSMENTS.forEach(assessment => {
    MOCK_GRADES.push({
      studentId: student.id,
      assessmentId: assessment.id,
      value: Math.floor(Math.random() * 5) + 5 // Grades between 5 and 10
    });
  });
});

// Mock Data for Student Report Card (Boletim)
export const MOCK_STUDENT_REPORT = [
  { subject: 'Matemática', p1: 7.5, p2: 8.0, p3: 6.5, p4: 9.0, final: 7.8, attendance: 92, status: 'Aprovado' },
  { subject: 'Português', p1: 8.0, p2: 8.5, p3: 9.0, p4: 8.5, final: 8.5, attendance: 96, status: 'Aprovado' },
  { subject: 'História', p1: 6.0, p2: 5.5, p3: 7.0, p4: 6.5, final: 6.2, attendance: 88, status: 'Aprovado' },
  { subject: 'Geografia', p1: 9.0, p2: 9.5, p3: 9.0, p4: 10.0, final: 9.4, attendance: 98, status: 'Aprovado' },
  { subject: 'Física', p1: 5.0, p2: 4.5, p3: 6.0, p4: 5.5, final: 5.2, attendance: 85, status: 'Recuperação' },
  { subject: 'Química', p1: 7.0, p2: 6.5, p3: 7.5, p4: 7.0, final: 7.0, attendance: 90, status: 'Aprovado' },
];

// Mock Content
export const MOCK_CONTENTS: ClassContent[] = [
  { id: 'ct1', date: '2024-05-20', description: 'Introdução à Álgebra Linear: Vetores e Matrizes', attachments: 2 },
  { id: 'ct2', date: '2024-05-18', description: 'Revisão para a Prova Bimestral', attachments: 0 },
  { id: 'ct3', date: '2024-05-15', description: 'Resolução de exercícios da lista 4', attachments: 1 },
];

// Mock Tasks
export const MOCK_TASKS: ClassTask[] = [
  { id: 't1', title: 'Lista de Exercícios 05', description: 'Resolver páginas 45 a 48 do livro didático. Entregar em folha separada.', dueDate: '2024-05-25', isGraded: true },
  { id: 't2', title: 'Pesquisa: História da Álgebra', description: 'Pesquisar sobre Al-Khwarizmi e trazer um resumo de 1 página.', dueDate: '2024-05-28', isGraded: false },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [];

// Mock Announcements
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1',
    title: 'Reunião de Pais e Mestres',
    content: 'A reunião trimestral ocorrerá no próximo sábado, dia 25, às 09:00 no auditório principal.',
    type: 'EVENT',
    date: '2024-05-20',
    senderId: 'u1',
    senderName: 'Diretoria Escolar',
    senderRole: UserRole.ADMIN,
    targetType: 'ALL'
  },
  {
    id: 'ann2',
    title: 'Trabalho de Geometria',
    content: 'Trazer régua, compasso e transferidor para a aula de amanhã. O trabalho valerá 2,0 pontos.',
    type: 'TASK',
    date: '2024-05-21',
    senderId: 'u2',
    senderName: 'Carlos Professor',
    senderRole: UserRole.PROFESSOR,
    targetType: 'CLASS',
    targetClassId: 'c1'
  },
  {
    id: 'ann3',
    title: 'Manutenção do Sistema',
    content: 'O sistema ficará indisponível domingo das 02:00 às 04:00 para atualização.',
    type: 'NOTICE',
    date: '2024-05-18',
    senderId: 'u1',
    senderName: 'Suporte Técnico',
    senderRole: UserRole.ADMIN,
    targetType: 'ALL'
  }
];

// Mock Academic Periods
export const MOCK_PERIODS: AcademicPeriod[] = [
  { id: 'p1', name: '1º Bimestre', startDate: '2024-02-01', endDate: '2024-04-15', isClosed: true },
  { id: 'p2', name: '2º Bimestre', startDate: '2024-04-16', endDate: '2024-06-30', isClosed: false },
  { id: 'p3', name: '3º Bimestre', startDate: '2024-08-01', endDate: '2024-09-30', isClosed: false },
  { id: 'p4', name: '4º Bimestre', startDate: '2024-10-01', endDate: '2024-12-15', isClosed: false },
];

// Mock Calendar Events
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Início das Aulas',
    date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05`,
    type: 'ACADEMIC',
    description: 'Início oficial do ano letivo para todas as turmas.'
  },
  {
    id: 'e2',
    title: 'Feriado Nacional',
    date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`,
    type: 'HOLIDAY',
    description: 'Não haverá aula.'
  },
  {
    id: 'e3',
    title: 'Conselho de Classe',
    date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-25`,
    type: 'MEETING',
    description: 'Reunião pedagógica com todos os professores.'
  },
  {
    id: 'e4',
    title: 'Festa Junina',
    date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`,
    type: 'EVENT',
    description: 'Evento aberto para a comunidade.'
  }
];

// Service Functions
export const loginMock = async (email: string, schoolId: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && u.schoolId === schoolId);
      resolve(user || null);
    }, 800);
  });
};