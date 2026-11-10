import React from 'react';
import { useInterview, Persona } from '../../context/InterviewContext';
import { 
  GraduationCap, 
  CalendarCheck, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  UserCheck, 
  Sparkles,
  Award
} from 'lucide-react';

interface NavbarProps {
  onOpenWriteup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWriteup }) => {
  const { 
    currentPersona, 
    setCurrentPersona, 
    students, 
    activeStudentId, 
    setActiveStudentId,
    currentStudent,
    interviewers,
    activeInterviewerId,
    setActiveInterviewerId,
    resetAllData
  } = useInterview();

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-orange-500/20 font-black text-white text-lg tracking-wider">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">GRIT</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  NIAT Skilling
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Track Badge Interview Engine</p>
            </div>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentPersona('STUDENT')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                currentPersona === 'STUDENT'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student View</span>
            </button>

            <button
              onClick={() => setCurrentPersona('INTERVIEWER')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                currentPersona === 'INTERVIEWER'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Interviewer Portal</span>
            </button>

            <button
              onClick={() => setCurrentPersona('ADMIN_OPS')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                currentPersona === 'ADMIN_OPS'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ops & Integrity</span>
            </button>
          </div>

          {/* Persona Context & Writeup Action */}
          <div className="flex items-center gap-3">
            {/* Quick Persona User Selector */}
            {currentPersona === 'STUDENT' && (
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg">
                <span className="text-[11px] text-slate-400 font-medium">Student:</span>
                <select
                  value={activeStudentId}
                  onChange={(e) => setActiveStudentId(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                      {s.name} ({s.interviewStatus.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentPersona === 'INTERVIEWER' && (
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg">
                <span className="text-[11px] text-slate-400 font-medium">Interviewer:</span>
                <select
                  value={activeInterviewerId}
                  onChange={(e) => setActiveInterviewerId(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer"
                >
                  {interviewers.map((i) => (
                    <option key={i.id} value={i.id} className="bg-slate-900 text-slate-200">
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 2-Page Write-up Modal Button */}
            <button
              onClick={onOpenWriteup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>2-Page Write-Up</span>
            </button>

            {/* Reset data */}
            <button
              onClick={resetAllData}
              title="Reset prototype to initial state"
              className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
