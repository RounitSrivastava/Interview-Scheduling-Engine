import React, { useState } from 'react';
import { InterviewProvider, useInterview } from './context/InterviewContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { StudentDashboard } from './components/student/StudentDashboard';
import { InterviewerDashboard } from './components/interviewer/InterviewerDashboard';
import { CohortTracker } from './components/admin/CohortTracker';
import { WriteupModal } from './components/docs/WriteupModal';

const MainLayout: React.FC = () => {
  const { currentPersona } = useInterview();
  const [isWriteupOpen, setIsWriteupOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100">
      {/* Top Navbar */}
      <Navbar onOpenWriteup={() => setIsWriteupOpen(true)} />

      {/* Main View Container */}
      <main className="flex-1 pb-16">
        {currentPersona === 'STUDENT' && <StudentDashboard />}
        {currentPersona === 'INTERVIEWER' && <InterviewerDashboard />}
        {currentPersona === 'ADMIN_OPS' && <CohortTracker />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0B0F19] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center font-black text-white text-xs">
              G
            </div>
            <span>
              GRIT (Global Readiness Immersion Trips) • National Institute of Applied Technology (NIAT)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsWriteupOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition"
            >
              Read 2-Page Product Architecture Doc
            </button>
            <span>•</span>
            <span className="text-slate-400">AI Product Engineer Candidate Prototype</span>
          </div>
        </div>
      </footer>

      {/* Global Notifications */}
      <ToastContainer />

      {/* 2-Page Writeup Modal */}
      <WriteupModal isOpen={isWriteupOpen} onClose={() => setIsWriteupOpen(false)} />
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
