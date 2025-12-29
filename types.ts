export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSOR = 'PROFESSOR',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  schoolId: string;
}

export interface School {
  id: string;
  name: string;
  logoUrl?: string;
  config: {
    periodType: 'BIMESTER' | 'TRIMESTER' | 'SEMESTER';
    gradingScale: 'NUMERIC' | 'CONCEPT'; // 0-10 or A/B/C
    passingGrade: number;
    academicYear: number;
    // Attendance Rules
    minAttendance: number; // Percentage (e.g., 75)
    lateCountsAsAbsence: boolean;
    excusedCountsAsAbsence: boolean;
    // Student Portal Access Rules
    studentAccess: {
      enabled: boolean;
      viewGrades: boolean;
      viewAttendance: boolean;
      viewContent: boolean;
      viewTasks: boolean;
    }
  }
}

export interface Student {
  id: string;
  name: string;
  enrollmentId: string;
  attendanceRate: number;
}

export interface ClassGroup {
  id: string;
  name: string; // e.g., "2º Ano A"
  subject: string; // e.g., "Matemática"
  studentsCount: number;
  nextClass?: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
}

export interface GradeRecord {
  studentId: string;
  assessmentId: string;
  value: number;
}

export interface Assessment {
  id: string;
  name: string; // "Prova 1", "Trabalho"
  date: string;
  maxScore: number;
  weight: number;
}

export interface ClassContent {
  id: string;
  date: string;
  description: string;
  attachments: number;
}

export interface ClassTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isGraded: boolean;
}

// --- New Types for Communication & Calendar ---

export interface AcademicPeriod {
  id: string;
  name: string; // "1º Bimestre", "2º Trimestre"
  startDate: string;
  endDate: string;
  isClosed: boolean;
}

export type AnnouncementType = 'NOTICE' | 'TASK' | 'EVENT';
export type AnnouncementTarget = 'ALL' | 'TEACHERS' | 'STUDENTS' | 'PARENTS' | 'CLASS';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  date: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  targetType: AnnouncementTarget;
  targetClassId?: string; // Optional, if target is a specific class
}

// --- Calendar Types ---

export type EventType = 'ACADEMIC' | 'HOLIDAY' | 'MEETING' | 'EVENT' | 'VACATION';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  type: EventType;
}