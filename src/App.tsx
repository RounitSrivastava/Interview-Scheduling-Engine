import React from 'react';
import { InterviewProvider, useInterview } from './context/InterviewContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { StudentDashboard } from './components/student/StudentDashboard';
import { InterviewerDashboard } from './components/interviewer/InterviewerDashboard';
import { CohortTracker } from './components/admin/CohortTracker';

const MainLayout: React.FC = () => {
  const { currentPersona } = useInterview();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 selection:bg-orange-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-1 pb-16">
        {currentPersona === 'STUDENT' && <StudentDashboard />}
        {currentPersona === 'INTERVIEWER' && <InterviewerDashboard />}
        {currentPersona === 'ADMIN_OPS' && <CohortTracker />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E1D5] bg-[#F4EFE6]/80 py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center font-heading font-black text-white text-xs shadow-sm">
              G
            </div>
            <span className="font-medium text-stone-600">
              GRIT (Global Readiness Immersion Trips) • KIIT University & NIAT Engineering Initiative
            </span>
          </div>

          <div className="flex items-center gap-3 font-heading text-stone-500 font-semibold">
            <span>KIIT University • School of Computer Engineering</span>
            <span className="text-stone-300">•</span>
            <span>Rounit Srivastava (23051042)</span>
          </div>
        </div>
      </footer>

      {/* Global Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <InterviewProvider>
      <MainLayout />
    </InterviewProvider>
  );
}

export default App;
