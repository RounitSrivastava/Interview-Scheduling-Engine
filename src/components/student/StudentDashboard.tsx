import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Video, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  ShieldAlert, 
  Check,
  Zap
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
    setStudentStatusOverride
  } = useInterview();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'SPLIT' | 'BEFORE' | 'AFTER'>('SPLIT');

  // Find active booking for student
  const activeBooking = bookings.find(
    (b) => b.studentId === currentStudent.id && b.status === 'SCHEDULED'
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
      <div className="bg-white border border-[#E2D8C9] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-100 text-orange-700 border border-orange-200">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 flex items-center gap-2">
              <span>Interactive State Simulator</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#F0EAE1] text-stone-700 font-bold border border-[#DFD5C4]">
                Current: {currentStudent.interviewStatus}
              </span>
            </h4>
            <p className="text-[11px] text-stone-500">
              Switch student states to test every screen & message in the candidate lifecycle.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleStateChange('ELIGIBLE_UNBOOKED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#ECE4D6]'
            }`}
          >
            1. Eligible Unbooked
          </button>

          <button
            onClick={() => handleStateChange('SCHEDULED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              currentStudent.interviewStatus === 'SCHEDULED'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#ECE4D6]'
            }`}
          >
            2. Slot Scheduled
          </button>

          <button
            onClick={() => handleStateChange('PASSED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              currentStudent.interviewStatus === 'PASSED'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#ECE4D6]'
            }`}
          >
            3. Passed (Badge Awarded)
          </button>

          <button
            onClick={() => handleStateChange('RETAKE_REQUESTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              currentStudent.interviewStatus === 'RETAKE_REQUESTED'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#ECE4D6]'
            }`}
          >
            4. Retake Later
          </button>

          <button
            onClick={() => handleStateChange('FAILED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              currentStudent.interviewStatus === 'FAILED'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#ECE4D6]'
            }`}
          >
            5. Failed
          </button>

          <button
            onClick={() => handleStateChange('MALPRACTICE_FLAGGED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-[#F4EFE6] text-stone-700 hover:bg-[#ECE4D6]'
            }`}
          >
            6. Malpractice Flagged
          </button>
        </div>
      </div>

      {/* Student Profile Card & Key Stats */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/5 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#E2D8C9] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900">{currentStudent.name}</h1>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F4EFE6] text-stone-700 border border-[#DDD0BC]">
                  {currentStudent.rollNumber}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">{currentStudent.college}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Miles Score */}
            <div className="flex-1 md:flex-none p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center min-w-[120px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">GRIT Miles</span>
              <div className="text-2xl font-black text-amber-600 mt-0.5">
                {currentStudent.currentMiles.toLocaleString()}
              </div>
            </div>

            {/* Leaderboard Rank */}
            <div className="flex-1 md:flex-none p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center min-w-[120px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Cohort Rank</span>
              <div className="text-2xl font-black text-stone-900 mt-0.5">#14</div>
            </div>

            {/* Global Readiness Trip Status */}
            <div className="hidden sm:block p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center min-w-[140px] shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Immersion Trip</span>
              <div className="text-xs font-bold text-emerald-700 mt-1.5 flex items-center justify-center gap-1">
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
      <div className="bg-[#FDFBF7] border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Assignment Deliverable: Student Messages</span>
            </div>
            <h2 className="text-lg font-black text-stone-900">
              The 3 Most Critical Messages in the Candidate Flow
            </h2>
            <p className="text-xs text-stone-500">
              Written exactly as they appear to engineering students in the production interface.
            </p>
          </div>
        </div>

        {/* Message 1: Eligibility & Invitation to Book Slot */}
        <div className={`p-5 rounded-2xl border-2 transition-all ${
          currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED'
            ? 'bg-orange-50/90 border-orange-300 shadow-md ring-1 ring-orange-200'
            : 'bg-white border-[#E8E1D5] opacity-75'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-200 text-orange-900 border border-orange-300">
                  Message 1 • Eligibility Trigger
                </span>
                <span className="text-xs text-stone-500">Sent immediately upon clearing the final skill contest</span>
              </div>
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>🎯 Track Badge Unlocked: You are eligible for your Final Interview!</span>
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed max-w-3xl font-medium">
                "Congratulations, <strong>{currentStudent.name}</strong>! You’ve cleared all 4 skill contests in the <strong>GenAI & Autonomous Agents Track</strong>. The final step to claim your verified <strong>Track Badge</strong> and <strong>+500 GRIT Miles</strong> is a 30-minute live code walkthrough with a senior engineer. Slots are available for the next 7 days. Pick your time slot now before capacity fills up."
              </p>
            </div>
            
            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-500/20 flex items-center gap-2 whitespace-nowrap transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Interview Slot</span>
              </button>
            )}
          </div>
        </div>

        {/* Message 2: Booking Confirmation & Prep Guide */}
        <div className={`p-5 rounded-2xl border-2 transition-all ${
          currentStudent.interviewStatus === 'SCHEDULED'
            ? 'bg-blue-50/90 border-blue-300 shadow-md ring-1 ring-blue-200'
            : 'bg-white border-[#E8E1D5] opacity-75'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-200 text-blue-900 border border-blue-300">
                  Message 2 • Booking Confirmation & Prep
                </span>
                <span className="text-xs text-stone-500">Displayed on student dashboard & sent via WhatsApp / Cal invitation</span>
              </div>
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>🗓️ Interview Confirmed: GenAI Track Badge Walkthrough</span>
              </h3>
              <div className="text-xs text-stone-700 leading-relaxed max-w-3xl space-y-1 font-medium">
                <p>
                  "You are scheduled with <strong>{activeBooking ? activeBooking.interviewerName : 'Siddharth Roy (Lead AI Architect)'}</strong> on <strong>{activeBooking ? `${activeBooking.date} at ${activeBooking.startTime} IST` : 'Thursday, Nov 14 at 04:30 PM IST'}</strong>."
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-stone-600 text-[11px]">
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
                className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-black shadow-md shadow-blue-700/20 flex items-center gap-2 whitespace-nowrap transition"
              >
                <Video className="w-4 h-4" />
                <span>Launch Google Meet</span>
              </a>
            )}
          </div>
        </div>

        {/* Message 3: Interview Outcome */}
        <div className={`p-5 rounded-2xl border-2 transition-all ${
          ['PASSED', 'RETAKE_REQUESTED', 'FAILED', 'MALPRACTICE_FLAGGED'].includes(currentStudent.interviewStatus)
            ? 'bg-emerald-50/90 border-emerald-300 shadow-md ring-1 ring-emerald-200'
            : 'bg-white border-[#E8E1D5] opacity-75'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 border border-emerald-300">
                Message 3 • Official Result & Badge Status
              </span>
              <span className="text-xs text-stone-500">Triggered dynamically based on interviewer evaluation outcome</span>
            </div>

            {/* Result variant 3A: PASSED */}
            {currentStudent.interviewStatus === 'PASSED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-emerald-800 flex items-center gap-2">
                  <span>🏆 Badge Awarded: GenAI Specialist Verified!</span>
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed max-w-3xl font-medium">
                  "Phenomenal work! Siddharth has approved your submission with an overall score of <strong>9.2/10</strong>. Your <strong>GenAI & Autonomous Agents Track Badge</strong> is now active on your public profile, and <strong>+500 Miles</strong> have been credited to your GRIT Leaderboard rank. Keep up the grit!"
                </p>
              </div>
            )}

            {/* Result variant 3B: RETAKE REQUESTED */}
            {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-amber-800 flex items-center gap-2">
                  <span>🔄 Retake Scheduled: Minor Refinements Needed</span>
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed max-w-3xl font-medium">
                  "Your interviewer noted great reasoning on Vector Search, but wants you to patch the agent memory leakage before approving your badge. No cooldown applied—select a 15-minute quick retake slot within the next 5 days."
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="mt-2 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Pick Retake Slot</span>
                </button>
              </div>
            )}

            {/* Result variant 3C: FAILED */}
            {currentStudent.interviewStatus === 'FAILED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-rose-800 flex items-center gap-2">
                  <span>❌ Interview Unsuccessful: Review & Re-attempt</span>
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed max-w-3xl font-medium">
                  "Thank you for your effort. The evaluator noted gaps in live debugging and RAG chunking trade-offs. Per NIAT competition guidelines, a 14-day learning cooldown is active. Your mentor has shared study modules in your portal."
                </p>
              </div>
            )}

            {/* Result variant 3D: MALPRACTICE FLAGGED */}
            {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
              <div className="space-y-1.5">
                <h3 className="text-base font-black text-rose-900 flex items-center gap-2">
                  <span>⚠️ Alert: Badge Nullified Due to Integrity Review</span>
                </h3>
                <p className="text-xs text-rose-900 leading-relaxed max-w-3xl bg-rose-100 p-3.5 rounded-xl border border-rose-300 font-medium">
                  "Notice: Post-interview automated proctoring & code similarity audits flagged irregular telemetry during your contest submission. In accordance with NIAT GRIT Honor Code Section 4.2, your GenAI Track Badge has been nullified. You may submit a formal dispute ticket within 48 hours."
                </p>
              </div>
            )}

            {/* Default display when in unbooked/scheduled state */}
            {['NOT_ELIGIBLE', 'ELIGIBLE_UNBOOKED', 'SCHEDULED'].includes(currentStudent.interviewStatus) && (
              <div className="text-xs text-stone-500 italic">
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
        <div className="lg:col-span-2 bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                <h3 className="font-black text-stone-900 text-base">{track.title}</h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">{track.description}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-stone-500">Skills Cleared</span>
              <div className="text-sm font-black text-emerald-700">
                {currentStudent.skillsCompleted} of {currentStudent.totalSkills} (100%)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {track.skills.map((skill, idx) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-stone-400 font-bold">#{idx + 1}</span>
                    <span className="text-xs font-bold text-stone-800">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                    <span>Cleared: {skill.clearedDate || 'Passed'}</span>
                    {skill.score && <span className="text-emerald-700 font-black">Score: {skill.score}%</span>}
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            ))}
          </div>

          {/* Eligibility Callout */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#DDD0BC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs font-black text-stone-900">All Contest Milestones Cleared</p>
                <p className="text-[11px] text-stone-500">Eligible for Badge Verification Interview</p>
              </div>
            </div>

            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            )}
          </div>
        </div>

        {/* Right 1 Col: Live Interview & Status Summary */}
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Interview Schedule</span>
          </h3>

          {activeBooking ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Scheduled Date</span>
                  <span className="text-xs font-black text-amber-700">{activeBooking.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Time Window</span>
                  <span className="text-xs font-black text-stone-900">{activeBooking.startTime} – {activeBooking.endTime}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E8E1D5]">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Evaluator</span>
                  <span className="text-xs font-bold text-stone-800">{activeBooking.interviewerName}</span>
                </div>
              </div>

              <a
                href={activeBooking.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Video className="w-4 h-4" />
                <span>Join Google Meet</span>
              </a>

              <button
                onClick={() => cancelBooking(activeBooking.id)}
                className="w-full py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EAE1] text-stone-600 hover:text-stone-900 border border-[#E8E1D5] text-xs font-bold transition"
              >
                Reschedule or Cancel Slot
              </button>
            </div>
          ) : currentStudent.interviewStatus === 'PASSED' ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-black text-emerald-950 text-sm">Interview Cleared!</h4>
              <p className="text-xs text-stone-600">
                You passed your technical evaluation. Your badge and +500 Miles are verified.
              </p>
              <div className="text-[10px] font-mono font-bold text-indigo-900 bg-white p-2 rounded-lg border border-indigo-200 shadow-sm">
                Credential: GRIT-AI-9942
              </div>
            </div>
          ) : currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="font-black text-rose-900 text-sm">Badge Nullified</h4>
              <p className="text-xs text-rose-800">
                Flagged for telemetry inconsistency under NIAT Honor Code.
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-center space-y-3">
              <Calendar className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-xs text-stone-600">
                No interview currently booked. Choose an available slot to get verified.
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition shadow-sm"
              >
                Select Slot
              </button>
            </div>
          )}

          {/* Quick Rules / Guidelines */}
          <div className="border-t border-[#E8E1D5] pt-4 space-y-2">
            <h5 className="text-[11px] font-extrabold uppercase text-stone-500 tracking-wider">Interview Protocol</h5>
            <ul className="text-[11px] text-stone-600 space-y-1.5 list-disc pl-3">
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
