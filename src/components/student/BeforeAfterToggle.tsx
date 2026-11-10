import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

interface BeforeAfterToggleProps {
  viewMode: 'SPLIT' | 'BEFORE' | 'AFTER';
  setViewMode: (mode: 'SPLIT' | 'BEFORE' | 'AFTER') => void;
}

export const BeforeAfterComparison: React.FC<BeforeAfterToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Interactive Design Deliverable
            </span>
            <span className="text-xs text-slate-400 font-medium">• Assignment Requirement</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Student Home Screen: Before vs. After Interview Result
          </h2>
          <p className="text-xs text-slate-400">
            Compare how the dashboard transforms once the interviewer records a passing outcome and verifies the badge.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('SPLIT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'SPLIT'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('BEFORE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'BEFORE'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Before Result
          </button>
          <button
            onClick={() => setViewMode('AFTER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'AFTER'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
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
          <div className="rounded-2xl border border-orange-500/30 bg-slate-900/70 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl border-l border-b border-orange-500/30 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>State 1: Before Result (Eligible / Scheduled)</span>
            </div>

            <div className="space-y-4">
              {/* Miles & Status */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Score</span>
                  <div className="text-2xl font-black text-slate-100 flex items-center gap-1.5">
                    <span>2,450</span>
                    <span className="text-xs font-bold text-amber-400">Miles</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Badge Status</span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    <span>Interview Scheduled</span>
                  </div>
                </div>
              </div>

              {/* Locked Badge Container */}
              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center justify-center text-slate-500 relative">
                  <Lock className="w-6 h-6 text-slate-400 mb-0.5" />
                  <span className="text-[9px] font-bold uppercase">Locked</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-200 text-sm">GenAI & Autonomous Agents Badge</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">Pending Interview</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    All 4 skills cleared. Earn +500 Miles upon passing live code defense.
                  </p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-300 block">Upcoming Call with Siddharth Roy</span>
                  <span className="text-[11px] text-slate-400">Thursday, Nov 14 at 4:30 PM IST (30 mins)</span>
                </div>
                <span className="text-xs font-semibold text-orange-400 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  Prep Checklist Active
                </span>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Contest Skills Cleared</span>
                  <span className="font-bold text-emerald-400">4 of 4 (100%)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Official Credential</span>
                  <span className="font-bold text-slate-400">Unissued (Awaiting Defense)</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* AFTER SCREEN (PASSED) */}
        {(viewMode === 'SPLIT' || viewMode === 'AFTER') && (
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-[#062016]/80 to-slate-900/90 p-5 relative overflow-hidden shadow-2xl shadow-emerald-950/40">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>State 2: After Result (Badge Verified)</span>
            </div>

            <div className="space-y-4">
              {/* Miles & Status */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Updated Score</span>
                  <div className="text-2xl font-black text-white flex items-center gap-1.5">
                    <span>2,950</span>
                    <span className="text-xs font-bold text-emerald-400">+500 Miles Earned!</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Badge Status</span>
                  <div className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VERIFIED & ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Unlocked Holographic Badge Container */}
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 flex items-center gap-4 relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 border-2 border-emerald-400/80 flex flex-col items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <Award className="w-8 h-8 drop-shadow-md text-amber-200" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-amber-100">VERIFIED</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-white text-sm">GenAI & Autonomous Agents Specialist</h4>
                  </div>
                  <p className="text-xs text-emerald-300/90 mt-1 font-medium">
                    Evaluated by Siddharth Roy • Overall Rubric: <strong className="text-white">9.2 / 10</strong>
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">
                    Credential ID: <span className="text-indigo-300">GRIT-AI-9942-VERIFIED</span>
                  </p>
                </div>
              </div>

              {/* Post-Result Action Bar */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300 font-medium">Official NIAT Certificate Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Badge</span>
                  </button>
                </div>
              </div>

              {/* Rubric Score Breakdown Unlocked */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-medium">Architecture</span>
                  <span className="font-bold text-emerald-400">5 / 5</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-medium">Theory</span>
                  <span className="font-bold text-emerald-400">5 / 5</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-medium">Problem Solv.</span>
                  <span className="font-bold text-emerald-400">4 / 5</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block font-medium">Code Defense</span>
                  <span className="font-bold text-emerald-400">5 / 5</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
