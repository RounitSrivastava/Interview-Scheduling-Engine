import React from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  GraduationCap, 
  CalendarCheck, 
  ShieldCheck, 
  FileText, 
  RotateCcw
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
    interviewers,
    activeInterviewerId,
    setActiveInterviewerId,
    resetAllData
  } = useInterview();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-600 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 font-heading font-black text-white text-lg tracking-wider">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg text-stone-900 tracking-tight">GRIT</span>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  KIIT University
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">Track Badge Interview Engine</p>
            </div>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="flex items-center p-1 bg-[#ECE4D6] rounded-xl border border-[#DFD5C4]">
            <button
              onClick={() => setCurrentPersona('STUDENT')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all duration-200 ${
                currentPersona === 'STUDENT'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student View</span>
            </button>

            <button
              onClick={() => setCurrentPersona('INTERVIEWER')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all duration-200 ${
                currentPersona === 'INTERVIEWER'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Interviewer Portal</span>
            </button>

            <button
              onClick={() => setCurrentPersona('ADMIN_OPS')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all duration-200 ${
                currentPersona === 'ADMIN_OPS'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
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
              <div className="flex items-center gap-2 bg-white border border-[#E2D8C9] px-2.5 py-1 rounded-xl shadow-sm">
                <span className="text-[11px] text-stone-500 font-semibold">Student:</span>
                <select
                  value={activeStudentId}
                  onChange={(e) => setActiveStudentId(e.target.value)}
                  className="bg-transparent text-xs text-stone-800 font-heading font-bold focus:outline-none cursor-pointer"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id} className="bg-white text-stone-800">
                      {s.name} ({s.rollNumber})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentPersona === 'INTERVIEWER' && (
              <div className="flex items-center gap-2 bg-white border border-[#E2D8C9] px-2.5 py-1 rounded-xl shadow-sm">
                <span className="text-[11px] text-stone-500 font-semibold">Interviewer:</span>
                <select
                  value={activeInterviewerId}
                  onChange={(e) => setActiveInterviewerId(e.target.value)}
                  className="bg-transparent text-xs text-stone-800 font-heading font-bold focus:outline-none cursor-pointer"
                >
                  {interviewers.map((i) => (
                    <option key={i.id} value={i.id} className="bg-white text-stone-800">
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 2-Page Write-up Modal Button */}
            <button
              onClick={onOpenWriteup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F4EFE6] text-stone-700 hover:text-orange-700 border border-[#D8CEBF] text-xs font-heading font-bold shadow-sm transition"
            >
              <FileText className="w-3.5 h-3.5 text-orange-600" />
              <span>2-Page Write-Up</span>
            </button>

            {/* Reset data */}
            <button
              onClick={resetAllData}
              title="Reset prototype to initial state"
              className="p-1.5 rounded-xl bg-white hover:bg-[#F4EFE6] text-stone-500 hover:text-stone-800 border border-[#D8CEBF] shadow-sm transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
