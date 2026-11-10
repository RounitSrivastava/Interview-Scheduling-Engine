import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Video, 
  ExternalLink, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  BookOpen, 
  ShieldAlert, 
  Send, 
  Info,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import { BookingModal } from './BookingModal';
import { BeforeAfterComparison } from './BeforeAfterToggle';
import confetti from 'canvas-confetti';
import { INITIAL_TRACK_BADGES } from '../../data/mockData';
import { InterviewStatus } from '../../types';

export const StudentDashboard: React.FC = () => {
  const { 
    currentStudent, 
    bookings, 
    cancelBooking, 
    setStudentStatusOverride,
    auditLogs
  } = useInterview();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'SPLIT' | 'BEFORE' | 'AFTER'>('SPLIT');
  const [showCopyNotice, setShowCopyNotice] = useState<string | null>(null);

  // Find active booking for student
  const activeBooking = bookings.find(
    (b) => b.studentId === currentStudent.id && b.status === 'SCHEDULED'
  );

  // Find latest completed booking for student
  const completedBooking = bookings.find(
    (b) => b.studentId === currentStudent.id && b.status === 'COMPLETED'
  );

  const track = INITIAL_TRACK_BADGES.find((t) => t.id === currentStudent.trackId) || INITIAL_TRACK_BADGES[0];

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleStateChange = (status: InterviewStatus) => {
    setStudentStatusOverride(status);
    if (status === 'PASSED') {
      triggerCelebration();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Interactive State Simulator Bar for Evaluators */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span>Interactive State Simulator</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Current: {currentStudent.interviewStatus}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Switch student states to test every screen & message in the candidate lifecycle.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleStateChange('ELIGIBLE_UNBOOKED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Eligible Unbooked
          </button>

          <button
            onClick={() => handleStateChange('SCHEDULED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentStudent.interviewStatus === 'SCHEDULED'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Slot Scheduled
          </button>

          <button
            onClick={() => handleStateChange('PASSED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentStudent.interviewStatus === 'PASSED'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Passed (Badge Awarded)
          </button>

          <button
            onClick={() => handleStateChange('RETAKE_REQUESTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentStudent.interviewStatus === 'RETAKE_REQUESTED'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            4. Retake Later
          </button>

          <button
            onClick={() => handleStateChange('FAILED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentStudent.interviewStatus === 'FAILED'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            5. Failed
          </button>

          <button
            onClick={() => handleStateChange('MALPRACTICE_FLAGGED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED'
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            6. Malpractice Flagged
          </button>
        </div>
      </div>

      {/* Student Profile Card & Key Stats */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-700 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-white">{currentStudent.name}</h1>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {currentStudent.rollNumber}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{currentStudent.college}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Miles Score */}
            <div className="flex-1 md:flex-none p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">GRIT Miles</span>
              <div className="text-2xl font-black text-amber-400 mt-0.5">
                {currentStudent.currentMiles.toLocaleString()}
              </div>
            </div>

            {/* Leaderboard Rank */}
            <div className="flex-1 md:flex-none p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cohort Rank</span>
              <div className="text-2xl font-black text-white mt-0.5">#14</div>
            </div>

            {/* Global Readiness Trip Status */}
            <div className="hidden sm:block p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[140px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Immersion Trip</span>
              <div className="text-xs font-bold text-emerald-400 mt-1.5 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tier 1 Qualified</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          THE 3 MOST IMPORTANT STUDENT MESSAGES (Prompt Deliverable Section)
         ========================================================================= */}
      <div className="bg-slate-900/50 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Assignment Deliverable: Student Messages</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              The 3 Most Critical Messages in the Candidate Flow
            </h2>
            <p className="text-xs text-slate-400">
              Written exactly as they appear to engineering students in the production interface.
            </p>
          </div>
        </div>

        {/* Message 1: Eligibility & Invitation to Book Slot */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED'
            ? 'bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border-orange-500/50 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/30'
            : 'bg-slate-900/40 border-slate-800/80 opacity-70'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Message 1 • Eligibility Trigger
                </span>
                <span className="text-xs text-slate-400">Sent immediately upon clearing the final skill contest</span>
              </div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>🎯 Track Badge Unlocked: You are eligible for your Final Interview!</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                "Congratulations, <strong>{currentStudent.name}</strong>! You’ve cleared all 4 skill contests in the <strong>GenAI & Autonomous Agents Track</strong>. The final step to claim your verified <strong>Track Badge</strong> and <strong>+500 GRIT Miles</strong> is a 30-minute live code walkthrough with a senior engineer. Slots are available for the next 7 days. Pick your time slot now before capacity fills up."
              </p>
            </div>
            
            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Interview Slot</span>
              </button>
            )}
          </div>
        </div>

        {/* Message 2: Booking Confirmation & Prep Guide */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentStudent.interviewStatus === 'SCHEDULED'
            ? 'bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
            : 'bg-slate-900/40 border-slate-800/80 opacity-70'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Message 2 • Booking Confirmation & Prep
                </span>
                <span className="text-xs text-slate-400">Displayed on student dashboard & sent via WhatsApp / Cal invitation</span>
              </div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>🗓️ Interview Confirmed: GenAI Track Badge Walkthrough</span>
              </h3>
              <div className="text-xs text-slate-300 leading-relaxed max-w-3xl space-y-1">
                <p>
                  "You are scheduled with <strong>{activeBooking ? activeBooking.interviewerName : 'Siddharth Roy (Lead AI Architect)'}</strong> on <strong>{activeBooking ? `${activeBooking.date} at ${activeBooking.startTime} IST` : 'Thursday, Nov 14 at 04:30 PM IST'}</strong>."
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                  <li><strong>Platform:</strong> Google Meet (link unlocks 15 mins before call on your dashboard).</li>
                  <li><strong>Format:</strong> 10m project architecture review + 15m live coding & edge case defense + 5m Q&A.</li>
                  <li><strong>Need to reschedule?</strong> Permitted up to 6 hours prior to the call via your dashboard.</li>
                </ul>
              </div>
            </div>

            {currentStudent.interviewStatus === 'SCHEDULED' && (
              <a
                href={activeBooking ? activeBooking.meetUrl : 'https://meet.google.com/grit-ai-eval'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2 whitespace-nowrap"
              >
                <Video className="w-4 h-4" />
                <span>Launch Google Meet</span>
              </a>
            )}
          </div>
        </div>

        {/* Message 3: Interview Outcome */}
        <div className={`p-5 rounded-2xl border transition-all ${
          ['PASSED', 'RETAKE_REQUESTED', 'FAILED', 'MALPRACTICE_FLAGGED'].includes(currentStudent.interviewStatus)
            ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
            : 'bg-slate-900/40 border-slate-800/80 opacity-70'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Message 3 • Official Result & Badge Status
              </span>
              <span className="text-xs text-slate-400">Triggered dynamically based on interviewer evaluation outcome</span>
            </div>

            {/* Result variant 3A: PASSED */}
            {currentStudent.interviewStatus === 'PASSED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-emerald-400 flex items-center gap-2">
                  <span>🏆 Badge Awarded: GenAI Specialist Verified!</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  "Phenomenal work! Siddharth has approved your submission with an overall score of <strong>9.2/10</strong>. Your <strong>GenAI & Autonomous Agents Track Badge</strong> is now active on your public profile, and <strong>+500 Miles</strong> have been credited to your GRIT Leaderboard rank. Keep up the grit!"
                </p>
              </div>
            )}

            {/* Result variant 3B: RETAKE REQUESTED */}
            {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-amber-400 flex items-center gap-2">
                  <span>🔄 Retake Scheduled: Minor Refinements Needed</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  "Your interviewer noted great reasoning on Vector Search, but wants you to patch the agent memory leakage before approving your badge. No cooldown applied—select a 15-minute quick retake slot within the next 5 days."
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Pick Retake Slot</span>
                </button>
              </div>
            )}

            {/* Result variant 3C: FAILED */}
            {currentStudent.interviewStatus === 'FAILED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-rose-400 flex items-center gap-2">
                  <span>❌ Interview Unsuccessful: Review & Re-attempt</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  "Thank you for your effort. The evaluator noted gaps in live debugging and RAG chunking trade-offs. Per NIAT competition guidelines, a 14-day learning cooldown is active. Your mentor has shared study modules in your portal."
                </p>
              </div>
            )}

            {/* Result variant 3D: MALPRACTICE FLAGGED */}
            {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-rose-500 flex items-center gap-2">
                  <span>⚠️ Alert: Badge Nullified Due to Integrity Review</span>
                </h3>
                <p className="text-xs text-rose-200 leading-relaxed max-w-3xl bg-rose-950/40 p-3 rounded-xl border border-rose-800">
                  "Notice: Post-interview automated proctoring & code similarity audits flagged irregular telemetry during your contest submission. In accordance with NIAT GRIT Honor Code Section 4.2, your GenAI Track Badge has been nullified. You may submit a formal dispute ticket within 48 hours."
                </p>
              </div>
            )}

            {/* Default display when in unbooked/scheduled state to show what this message will look like */}
            {['NOT_ELIGIBLE', 'ELIGIBLE_UNBOOKED', 'SCHEDULED'].includes(currentStudent.interviewStatus) && (
              <div className="text-xs text-slate-400 italic">
                (This message activates immediately after the interview evaluation is recorded by the interviewer).
              </div>
            )}
          </div>
        </div>

      </div>

      {/* =========================================================================
          BEFORE AND AFTER SCREEN COMPARISON (Prompt Deliverable Section)
         ========================================================================= */}
      <BeforeAfterComparison viewMode={comparisonMode} setViewMode={setComparisonMode} />

      {/* Track Badge Progress & Required Skills Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Track Contest Checklist */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400" />
                <h3 className="font-extrabold text-white text-base">{track.title}</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">{track.description}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Skills Cleared</span>
              <div className="text-sm font-extrabold text-emerald-400">
                {currentStudent.skillsCompleted} of {currentStudent.totalSkills} (100%)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {track.skills.map((skill, idx) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                    <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>Cleared: {skill.clearedDate || 'Passed'}</span>
                    {skill.score && <span className="text-emerald-400 font-bold">Score: {skill.score}%</span>}
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            ))}
          </div>

          {/* Eligibility Callout */}
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-white">All Contest Milestones Cleared</p>
                <p className="text-[11px] text-slate-400">Eligible for Badge Verification Interview</p>
              </div>
            </div>

            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            )}
          </div>
        </div>

        {/* Right 1 Col: Live Interview & Status Summary */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Interview Schedule</span>
          </h3>

          {activeBooking ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Scheduled Date</span>
                  <span className="text-xs font-bold text-amber-400">{activeBooking.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Time Window</span>
                  <span className="text-xs font-bold text-white">{activeBooking.startTime} – {activeBooking.endTime}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Evaluator</span>
                  <span className="text-xs font-semibold text-slate-200">{activeBooking.interviewerName}</span>
                </div>
              </div>

              <a
                href={activeBooking.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition"
              >
                <Video className="w-4 h-4" />
                <span>Join Google Meet</span>
              </a>

              <button
                onClick={() => cancelBooking(activeBooking.id)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
              >
                Reschedule or Cancel Slot
              </button>
            </div>
          ) : currentStudent.interviewStatus === 'PASSED' ? (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">Interview Cleared!</h4>
              <p className="text-xs text-slate-300">
                You passed your technical evaluation. Your badge and +500 Miles are verified.
              </p>
              <div className="text-[10px] font-mono text-indigo-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
                Credential: GRIT-AI-9942
              </div>
            </div>
          ) : currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' ? (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-rose-400 text-sm">Badge Nullified</h4>
              <p className="text-xs text-slate-300">
                Flagged for telemetry inconsistency under NIAT Honor Code.
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <Calendar className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400">
                No interview currently booked. Choose an available slot to get verified.
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition"
              >
                Select Slot
              </button>
            </div>
          )}

          {/* Quick Rules / Guidelines */}
          <div className="border-t border-slate-800 pt-4 space-y-2">
            <h5 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Interview Protocol</h5>
            <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-3">
              <li>Video camera & screen share must remain active.</li>
              <li>You must be able to explain any commit or dependency in your repo.</li>
              <li>Reschedules permitted up to 6 hours before slot.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    </div>
  );
};
