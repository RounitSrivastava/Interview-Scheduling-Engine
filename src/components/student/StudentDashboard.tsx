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
  Zap,
  MapPin,
  ExternalLink,
  Share2,
  FileText
} from 'lucide-react';
import { BookingModal } from './BookingModal';
import { BeforeAfterComparison } from './BeforeAfterToggle';
import confetti from 'canvas-confetti';
import { INITIAL_TRACK_BADGES } from '../../data/mockData';
import { InterviewStatus } from '../../types';
import rounitPhoto from '../../assets/rounit-photo.png';

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

  const studentName = currentStudent.id === 'stu-101' ? 'Rounit Srivastava' : currentStudent.name;
  const studentRoll = currentStudent.id === 'stu-101' ? '21051042' : currentStudent.rollNumber;
  const studentAvatar = currentStudent.id === 'stu-101' ? rounitPhoto : (currentStudent.avatar || rounitPhoto);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top State Simulator Bar (Compact Command Pill Bar) */}
      <div className="bg-white border border-[#E2D8C9] rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-700 border border-orange-200">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-heading font-black text-stone-900 flex items-center gap-2">
              <span>Interactive State Simulator</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#F0EAE1] text-stone-800 font-bold border border-[#DFD5C4]">
                Status: {currentStudent.interviewStatus}
              </span>
            </h4>
            <p className="text-[11px] text-stone-500 font-sans">
              Switch states to evaluate how the student screens & messages transform.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-heading">
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

      {/* Main 2-Column Command Center Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================================================
            LEFT COLUMN (Sidebar / Candidate Command Profile - 4 Cols)
           ========================================================================= */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Candidate Identity Card with User Photo */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-sm relative overflow-hidden text-center">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-orange-100/60 via-[#FAF7F2] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Profile Photo */}
              <div className="relative mb-3.5">
                <img
                  src={currentStudent.id === 'stu-101' ? rounitPhoto : (currentStudent.avatar || rounitPhoto)}
                  alt={currentStudent.name}
                  className="w-28 h-28 rounded-3xl object-cover ring-4 ring-white shadow-md border border-[#E8E1D5]"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Candidate" />
              </div>

              {/* Name & Roll */}
              <h1 className="text-xl font-heading font-black text-stone-900 tracking-tight flex items-center justify-center gap-1.5">
                <span>{currentStudent.id === 'stu-101' ? 'Rounit Srivastava' : currentStudent.name}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              </h1>
              
              <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-stone-700 text-xs font-mono font-bold border border-[#DDD0BC]">
                <span>Roll: {currentStudent.id === 'stu-101' ? '21051042' : currentStudent.rollNumber}</span>
              </div>

              {/* College Badge */}
              <div className="mt-3 flex items-center justify-center gap-1 text-xs font-heading font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>KIIT University, Bhubaneswar</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1 font-medium">School of Computer Engineering</p>

              {/* Score KPIs */}
              <div className="grid grid-cols-2 gap-2 w-full mt-5 pt-5 border-t border-[#E8E1D5]">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                  <span className="text-[10px] uppercase font-heading font-bold text-stone-500 tracking-wider">GRIT Miles</span>
                  <div className="text-2xl font-heading font-black text-amber-600 mt-0.5">
                    {currentStudent.currentMiles.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                  <span className="text-[10px] uppercase font-heading font-bold text-stone-500 tracking-wider">Cohort Rank</span>
                  <div className="text-2xl font-heading font-black text-stone-900 mt-0.5">#14</div>
                </div>
              </div>

              {/* Immersion Status Tag */}
              <div className="w-full mt-3 p-2.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center gap-1.5 text-xs font-heading font-bold text-orange-900">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Tier 1: Global Readiness Immersion Nominee</span>
              </div>

            </div>
          </div>

          {/* Quick Action & Schedule Drawer */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <h3 className="font-heading font-black text-stone-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Interview Quick Actions</span>
              </h3>
            </div>

            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  All 4 skills cleared. You have 7 days to complete your live interview before slot availability resets.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-heading font-black shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Interview Slot Now</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'SCHEDULED' && activeBooking && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
                  <span className="font-bold block text-blue-900">Scheduled Call:</span>
                  <div className="font-heading font-black text-blue-900 text-sm">
                    {activeBooking.date} at {activeBooking.startTime}
                  </div>
                  <span className="text-[11px] text-blue-800">Evaluator: {activeBooking.interviewerName}</span>
                </div>
                
                <a
                  href={activeBooking.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-heading font-black shadow-md flex items-center justify-center gap-2 transition"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch Google Meet</span>
                </a>

                <button
                  onClick={() => cancelBooking(activeBooking.id)}
                  className="w-full py-2 rounded-xl bg-[#FAF7F2] hover:bg-stone-100 text-stone-600 text-xs font-bold border border-[#E8E1D5] transition"
                >
                  Reschedule / Cancel
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'PASSED' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-black text-emerald-950 text-sm">Track Badge Verified</h4>
                <p className="text-[11px] text-stone-600">
                  Credential ID: <strong>GRIT-AI-9942</strong> (KIIT Cohort)
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-lg bg-indigo-700 text-white text-[11px] font-heading font-bold flex items-center justify-center gap-1 shadow-sm">
                    <Share2 className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </button>
                  <button className="flex-1 py-1.5 rounded-lg bg-white border border-[#E8E1D5] text-stone-700 text-[11px] font-heading font-bold shadow-sm">
                    PDF Cert
                  </button>
                </div>
              </div>
            )}

            {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
              <div className="space-y-2">
                <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
                  Interviewer requested a 15-minute targeted retake on concurrency limits.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-heading font-black flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Select Retake Slot</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'FAILED' && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
                <span className="font-bold block text-rose-900">Learning Cooldown Active</span>
                <p className="text-[11px] text-stone-600">
                  14 days cooldown before you can re-attempt your code walkthrough.
                </p>
              </div>
            )}

            {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-950 space-y-1">
                <span className="font-bold block text-red-900">Honor Code Violation</span>
                <p className="text-[11px] text-stone-700">
                  Badge nullified due to post-contest code telemetry duplication.
                </p>
              </div>
            )}

          </div>

          {/* Quick KIIT Guidelines */}
          <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-3xl p-5 text-xs text-stone-600 space-y-2">
            <span className="font-heading font-black text-stone-800 block uppercase tracking-wider text-[11px]">
              KIIT Student Evaluation Checklist
            </span>
            <ul className="list-disc pl-4 space-y-1 text-[11px] font-medium text-stone-600">
              <li>Keep your KIIT student ID and webcam active.</li>
              <li>Walk through architecture choices without notes.</li>
              <li>Rescheduling locked 6h prior to slot.</li>
            </ul>
          </div>

        </aside>

        {/* =========================================================================
            RIGHT COLUMN (Main Stage - 8 Cols)
           ========================================================================= */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* =========================================================================
              THE 3 MOST IMPORTANT STUDENT MESSAGES (Prompt Deliverable Section)
             ========================================================================= */}
          <div className="bg-[#FDFBF7] border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-heading font-extrabold uppercase tracking-wider mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Assignment Deliverable: Student Messages</span>
                </div>
                <h2 className="text-lg font-heading font-black text-stone-900">
                  The 3 Most Critical Messages in the Candidate Flow
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Written exactly as they appear to KIIT engineering students in the production interface.
                </p>
              </div>
            </div>

            {/* Message 1: Eligibility & Invitation to Book Slot */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED'
                ? 'bg-orange-50/90 border-orange-400 shadow-md ring-1 ring-orange-200'
                : 'bg-white border-[#E8E1D5] opacity-75'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded bg-orange-200 text-orange-900 border border-orange-300">
                      Message 1 • Eligibility Trigger
                    </span>
                    <span className="text-xs text-stone-500 font-sans">Sent immediately upon clearing the final skill contest</span>
                  </div>
                  <h3 className="text-base font-heading font-black text-stone-900 flex items-center gap-2">
                    <span>🎯 Track Badge Unlocked: You are eligible for your Final Interview!</span>
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-medium font-sans">
                    "Congratulations, <strong>{studentName}</strong>! You’ve cleared all 4 skill contests in the <strong>GenAI & Autonomous Agents Track</strong>. The final step to claim your verified <strong>Track Badge</strong> and <strong>+500 GRIT Miles</strong> is a 30-minute live code walkthrough with a senior engineer. Slots are available for the next 7 days. Pick your time slot now before capacity fills up."
                  </p>
                </div>
                
                {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-heading font-black shadow-md shadow-orange-500/20 flex items-center gap-2 whitespace-nowrap transition"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Slot</span>
                  </button>
                )}
              </div>
            </div>

            {/* Message 2: Booking Confirmation & Prep Guide */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              currentStudent.interviewStatus === 'SCHEDULED'
                ? 'bg-blue-50/90 border-blue-400 shadow-md ring-1 ring-blue-200'
                : 'bg-white border-[#E8E1D5] opacity-75'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded bg-blue-200 text-blue-900 border border-blue-300">
                      Message 2 • Booking Confirmation & Prep
                    </span>
                    <span className="text-xs text-stone-500 font-sans">Displayed on student dashboard & sent via WhatsApp / Cal invitation</span>
                  </div>
                  <h3 className="text-base font-heading font-black text-stone-900 flex items-center gap-2">
                    <span>🗓️ Interview Confirmed: GenAI Track Badge Walkthrough</span>
                  </h3>
                  <div className="text-xs text-stone-700 leading-relaxed max-w-2xl space-y-1 font-medium font-sans">
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
                    className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-heading font-black shadow-md shadow-blue-700/20 flex items-center gap-2 whitespace-nowrap transition"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Meet</span>
                  </a>
                )}
              </div>
            </div>

            {/* Message 3: Interview Outcome */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              ['PASSED', 'RETAKE_REQUESTED', 'FAILED', 'MALPRACTICE_FLAGGED'].includes(currentStudent.interviewStatus)
                ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-1 ring-emerald-200'
                : 'bg-white border-[#E8E1D5] opacity-75'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 border border-emerald-300">
                    Message 3 • Official Result & Badge Status
                  </span>
                  <span className="text-xs text-stone-500 font-sans">Triggered dynamically based on interviewer evaluation outcome</span>
                </div>

                {/* Result variant 3A: PASSED */}
                {currentStudent.interviewStatus === 'PASSED' && (
                  <div className="space-y-1.5">
                    <h3 className="text-base font-heading font-black text-emerald-900 flex items-center gap-2">
                      <span>🏆 Badge Awarded: GenAI Specialist Verified!</span>
                    </h3>
                    <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-medium font-sans">
                      "Phenomenal work! Siddharth has approved your submission with an overall score of <strong>9.2/10</strong>. Your <strong>GenAI & Autonomous Agents Track Badge</strong> is now active on your public profile, and <strong>+500 Miles</strong> have been credited to your GRIT Leaderboard rank. Keep up the grit!"
                    </p>
                  </div>
                )}

                {/* Result variant 3B: RETAKE REQUESTED */}
                {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
                  <div className="space-y-1.5">
                    <h3 className="text-base font-heading font-black text-amber-900 flex items-center gap-2">
                      <span>🔄 Retake Scheduled: Minor Refinements Needed</span>
                    </h3>
                    <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-medium font-sans">
                      "Your interviewer noted great reasoning on Vector Search, but wants you to patch the agent memory leakage before approving your badge. No cooldown applied—select a 15-minute quick retake slot within the next 5 days."
                    </p>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="mt-2 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-heading font-black flex items-center gap-1.5 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Pick Retake Slot</span>
                    </button>
                  </div>
                )}

                {/* Result variant 3C: FAILED */}
                {currentStudent.interviewStatus === 'FAILED' && (
                  <div className="space-y-1.5">
                    <h3 className="text-base font-heading font-black text-rose-900 flex items-center gap-2">
                      <span>❌ Interview Unsuccessful: Review & Re-attempt</span>
                    </h3>
                    <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-medium font-sans">
                      "Thank you for your effort. The evaluator noted gaps in live debugging and RAG chunking trade-offs. Per NIAT competition guidelines, a 14-day learning cooldown is active. Your mentor has shared study modules in your portal."
                    </p>
                  </div>
                )}

                {/* Result variant 3D: MALPRACTICE FLAGGED */}
                {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
                  <div className="space-y-1.5">
                    <h3 className="text-base font-heading font-black text-rose-950 flex items-center gap-2">
                      <span>⚠️ Alert: Badge Nullified Due to Integrity Review</span>
                    </h3>
                    <p className="text-xs text-rose-900 leading-relaxed max-w-2xl bg-rose-100 p-3.5 rounded-xl border border-rose-300 font-medium font-sans">
                      "Notice: Post-interview automated proctoring & code similarity audits flagged irregular telemetry during your contest submission. In accordance with NIAT GRIT Honor Code Section 4.2, your GenAI Track Badge has been nullified. You may submit a formal dispute ticket within 48 hours."
                    </p>
                  </div>
                )}

                {/* Default display when in unbooked/scheduled state */}
                {['NOT_ELIGIBLE', 'ELIGIBLE_UNBOOKED', 'SCHEDULED'].includes(currentStudent.interviewStatus) && (
                  <div className="text-xs text-stone-500 italic font-sans">
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

          {/* Track Badge Skills Contest Matrix */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <h3 className="font-heading font-black text-stone-900 text-base">{track.title}</h3>
                </div>
                <p className="text-xs text-stone-500 mt-1 font-sans font-medium">{track.description}</p>
              </div>
              <div className="text-right font-heading">
                <span className="text-[10px] uppercase font-bold text-stone-500">Skills Cleared</span>
                <div className="text-sm font-black text-emerald-700">
                  {currentStudent.skillsCompleted} of {currentStudent.totalSkills} (100%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
              {track.skills.map((skill, idx) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between"
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
          </div>

        </main>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    </div>
  );
};
