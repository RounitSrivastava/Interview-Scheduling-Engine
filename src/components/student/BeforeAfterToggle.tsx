import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  Share2, 
  FileCheck2
} from 'lucide-react';

interface BeforeAfterToggleProps {
  viewMode: 'SPLIT' | 'BEFORE' | 'AFTER';
  setViewMode: (mode: 'SPLIT' | 'BEFORE' | 'AFTER') => void;
}

export const BeforeAfterComparison: React.FC<BeforeAfterToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E8E1D5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
              Dashboard Evolution
            </span>
            <span className="text-xs text-stone-500 font-medium">• Live State Transition</span>
          </div>
          <h2 className="text-lg font-heading font-black text-stone-900 mt-1">
            Student Home Screen: Before vs. After Interview Result
          </h2>
          <p className="text-xs text-stone-500 font-sans">
            Compare how the KIIT dashboard transforms once the interviewer records a passing outcome and verifies the badge.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#F0EAE1] border border-[#DFD5C4] p-1 rounded-xl font-heading">
          <button
            onClick={() => setViewMode('SPLIT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'SPLIT'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('BEFORE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'BEFORE'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Before Result
          </button>
          <button
            onClick={() => setViewMode('AFTER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'AFTER'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            After Result (Passed)
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`mt-6 grid gap-6 ${viewMode === 'SPLIT' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* BEFORE SCREEN */}
        {(viewMode === 'SPLIT' || viewMode === 'BEFORE') && (
          <div className="rounded-2xl border-2 border-orange-200 bg-[#FFFDF9] p-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl border-l border-b border-orange-200 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>State 1: Before Result (Eligible / Scheduled)</span>
            </div>

            <div className="space-y-4">
              {/* Miles & Status */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Current Score</span>
                  <div className="text-2xl font-black text-stone-900 flex items-center gap-1.5">
                    <span>2,450</span>
                    <span className="text-xs font-bold text-amber-600">Miles</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Badge Status</span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-orange-800 bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3 text-orange-600" />
                    <span>Interview Scheduled</span>
                  </div>
                </div>
              </div>

              {/* Locked Badge Container */}
              <div className="p-4 rounded-xl border border-dashed border-[#DFD5C4] bg-[#FAF7F2] flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#ECE4D6] border border-[#DDD0BC] flex flex-col items-center justify-center text-stone-500 relative shadow-inner">
                  <Lock className="w-6 h-6 text-stone-500 mb-0.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Locked</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-stone-900 text-sm">GenAI & Autonomous Agents Badge</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-bold">Pending Interview</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    All 4 skills cleared. Earn +500 Miles upon passing live code defense.
                  </p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-950 block">Upcoming Call with Siddharth Roy</span>
                  <span className="text-[11px] text-orange-800">Thursday, Nov 14 at 4:30 PM IST (30 mins)</span>
                </div>
                <span className="text-xs font-bold text-orange-700 px-3 py-1 rounded-lg bg-white border border-orange-300 shadow-sm">
                  Prep Checklist Active
                </span>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E8E1D5] shadow-sm">
                  <span className="text-[10px] text-stone-500 block font-semibold">Contest Skills Cleared</span>
                  <span className="font-extrabold text-emerald-700 text-sm">4 of 4 (100%)</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E8E1D5] shadow-sm">
                  <span className="text-[10px] text-stone-500 block font-semibold">Official Credential</span>
                  <span className="font-bold text-stone-500">Unissued (Awaiting Defense)</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* AFTER SCREEN (PASSED) */}
        {(viewMode === 'SPLIT' || viewMode === 'AFTER') && (
          <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-b from-emerald-50/70 via-white to-white p-6 relative overflow-hidden shadow-md shadow-emerald-950/5">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>State 2: After Result (Badge Verified)</span>
            </div>

            <div className="space-y-4">
              {/* Miles & Status */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Updated Score</span>
                  <div className="text-2xl font-black text-stone-900 flex items-center gap-1.5">
                    <span>2,950</span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">+500 Miles Earned!</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Badge Status</span>
                  <div className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>VERIFIED & ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Unlocked Holographic Badge Container */}
              <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center gap-4 relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 border-2 border-emerald-300 flex flex-col items-center justify-center text-white shadow-md shadow-emerald-600/20">
                  <Award className="w-8 h-8 drop-shadow text-amber-100" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white">VERIFIED</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm">GenAI & Autonomous Agents Specialist</h4>
                  </div>
                  <p className="text-xs text-emerald-900 mt-1 font-medium">
                    Evaluated by Siddharth Roy • Overall Rubric: <strong className="text-emerald-950 font-black">9.2 / 10</strong>
                  </p>
                  <p className="text-[10px] font-mono text-stone-600 mt-1 font-semibold">
                    Credential ID: <span className="text-indigo-800">GRIT-AI-9942-VERIFIED</span>
                  </p>
                </div>
              </div>

              {/* Post-Result Action Bar */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs text-stone-800 font-bold">Official KIIT Credential Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-bold text-white bg-indigo-700 hover:bg-indigo-600 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Badge</span>
                  </button>
                </div>
              </div>

              {/* Rubric Score Breakdown Unlocked */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] shadow-sm">
                  <span className="text-[9px] text-stone-500 block font-semibold">Architecture</span>
                  <span className="font-black text-emerald-700 text-sm">5 / 5</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] shadow-sm">
                  <span className="text-[9px] text-stone-500 block font-semibold">Theory</span>
                  <span className="font-black text-emerald-700 text-sm">5 / 5</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] shadow-sm">
                  <span className="text-[9px] text-stone-500 block font-semibold">Problem Solv.</span>
                  <span className="font-black text-emerald-700 text-sm">4 / 5</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] shadow-sm">
                  <span className="text-[9px] text-stone-500 block font-semibold">Code Defense</span>
                  <span className="font-black text-emerald-700 text-sm">5 / 5</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
