import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Share2, 
  FileCheck2
} from 'lucide-react';

interface BeforeAfterToggleProps {
  viewMode: 'SPLIT' | 'BEFORE' | 'AFTER';
  setViewMode: (mode: 'SPLIT' | 'BEFORE' | 'AFTER') => void;
}

export const BeforeAfterComparison: React.FC<BeforeAfterToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F0EAE1] pb-3">
        <div>
          <h3 className="text-sm font-heading font-bold text-stone-900">
            Student Dashboard Evolution
          </h3>
          <p className="text-xs text-stone-500 font-sans">
            How the student screen transforms once an Accenture evaluator records a passing outcome.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#F4EFE6] p-0.5 rounded-xl font-heading text-xs">
          <button
            onClick={() => setViewMode('SPLIT')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              viewMode === 'SPLIT' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('BEFORE')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              viewMode === 'BEFORE' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Before Result
          </button>
          <button
            onClick={() => setViewMode('AFTER')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              viewMode === 'AFTER' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            After Result
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`grid gap-4 ${viewMode === 'SPLIT' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* BEFORE SCREEN */}
        {(viewMode === 'SPLIT' || viewMode === 'BEFORE') && (
          <div className="rounded-2xl border border-stone-200 bg-[#FAF7F2] p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading font-bold uppercase text-stone-500 tracking-wider">
                State: Eligible / Scheduled
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 bg-white border border-[#E8E1D5] px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Pending Defense</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400">Miles Accumulated</span>
                <div className="text-xl font-heading font-extrabold text-stone-900">2,450 Miles</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400">Badge Status</span>
                <div className="text-xs font-bold text-stone-600 flex items-center gap-1 justify-end">
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Locked</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E8E1D5] text-xs space-y-1">
              <div className="font-bold text-stone-800">Walkthrough Scheduled: Siddharth Roy (Accenture)</div>
              <div className="text-[11px] text-stone-500">Thursday, Nov 12 at 04:30 PM IST (30 mins)</div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-[#EDE5D6]">
              <span>Contest Skills: <strong>4 of 4 (100%)</strong></span>
              <span>Credential: <strong>Unissued</strong></span>
            </div>
          </div>
        )}

        {/* AFTER SCREEN (PASSED) */}
        {(viewMode === 'SPLIT' || viewMode === 'AFTER') && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading font-bold uppercase text-emerald-800 tracking-wider">
                State: Evaluated (Passed)
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                <span>Verified & Active</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500">Updated Miles</span>
                <div className="text-xl font-heading font-extrabold text-stone-900 flex items-center gap-1.5">
                  <span>2,950</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">+500 Miles!</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-stone-500">Rubric Score</span>
                <div className="text-sm font-heading font-black text-emerald-800">9.2 / 10</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs space-y-1">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>GenAI & Autonomous Agents Specialist Verified</span>
              </div>
              <div className="text-[11px] text-stone-500">Evaluated by Siddharth Roy (Accenture) • Credential ID: GRIT-AI-9942</div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-emerald-100">
              <span className="text-stone-600">Digital Certificate: <strong>Ready</strong></span>
              <div className="flex gap-2">
                <button className="text-xs font-bold text-indigo-700 hover:text-indigo-800 flex items-center gap-1">
                  <Share2 className="w-3 h-3" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};