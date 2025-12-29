import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfessorClasses from './pages/ProfessorClasses';
import ClassManager from './pages/ClassManager';
import StudentGrades from './pages/StudentGrades';
import AdminStructure from './pages/AdminStructure';
import AdminSettings from './pages/AdminSettings';
import AdminReports from './pages/AdminReports'; // Added Import
import Communication from './pages/Communication';
import CalendarPage from './pages/CalendarPage';
import { User, School } from './types';
import { SCHOOLS } from './services/mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Helper to find school based on user
  const currentSchool = user ? SCHOOLS.find(s => s.id === user.schoolId) : null;

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user || !currentSchool) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout 
        user={user} 
        school={currentSchool} 
        onLogout={handleLogout}
        activePath={window.location.hash.replace('#', '') || '/dashboard'}
        onNavigate={(path) => window.location.hash = path}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/communication" element={<Communication user={user} />} />
          <Route path="/calendar" element={<CalendarPage user={user} />} />
          
          {/* Professor Routes */}
          {user.role === 'PROFESSOR' && (
            <>
              <Route path="/classes" element={<ProfessorClasses />} />
              <Route path="/classes/:classId" element={<ClassManager />} />
            </>
          )}

          {/* Student Routes */}
          {user.role === 'STUDENT' && (
             <>
               <Route path="/grades" element={<StudentGrades />} />
             </>
          )}

          {/* Admin Routes */}
          {user.role === 'ADMIN' && (
             <>
               <Route path="/structure" element={<AdminStructure />} />
               <Route path="/settings" element={<AdminSettings school={currentSchool} />} />
               <Route path="/reports" element={<AdminReports />} /> 
             </>
          )}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;