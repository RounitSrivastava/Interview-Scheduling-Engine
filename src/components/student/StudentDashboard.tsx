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
  Check,
  MapPin,
  Share2,
  FileCheck2,
  AlertCircle,
  ShieldAlert,
  ArrowRight
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
  const [comparisonMode, setComparisonMode] = useState<'SPLIT' | 'BEFORE' | 'AFTER'>('BEFORE');
  const [activeMessageTab, setActiveMessageTab] = useState<'M1' | 'M2' | 'M3'>('M1');
  const [outcomePreview, setOutcomePreview] = useState<'PASSED' | 'RETAKE' | 'FAILED'>('PASSED');

  const activeBooking = bookings.find(
    (b) => b.studentId === currentStudent.id && b.status === 'SCHEDULED'
  );

  const track = INITIAL_TRACK_BADGES.find((t) => t.id === currentStudent.trackId) || INITIAL_TRACK_BADGES[0];

  const studentName = currentStudent.id === 'stu-101' ? 'Rounit Srivastava' : currentStudent.name;
  const studentRoll = currentStudent.id === 'stu-101' ? '23051042' : currentStudent.rollNumber;
  const studentAvatar = rounitPhoto;

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleStateChange = (status: InterviewStatus) => {
    setStudentStatusOverride(status);
    if (status === 'PASSED') {
      triggerCelebration();
      setActiveMessageTab('M3');
      setOutcomePreview('PASSED');
      setComparisonMode('AFTER');
    } else if (status === 'SCHEDULED') {
      setActiveMessageTab('M2');
      setComparisonMode('BEFORE');
    } else if (status === 'ELIGIBLE_UNBOOKED') {
      setActiveMessageTab('M1');
      setComparisonMode('BEFORE');
    } else if (status === 'RETAKE_REQUESTED') {
      setActiveMessageTab('M3');
      setOutcomePreview('RETAKE');
      setComparisonMode('BEFORE');
    } else {
      setActiveMessageTab('M3');
      setOutcomePreview('FAILED');
      setComparisonMode('BEFORE');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* =========================================================================
          SLIM SIMULATOR TOOLBAR (Minimal, Lightweight Pill Bar)
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E8E1D5] px-4 py-2.5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-heading font-bold text-stone-700">Lifecycle Simulator:</span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FAF7F2] text-stone-700 font-semibold border border-[#E8E1D5]">
            {currentStudent.interviewStatus}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1 font-heading">
          {[
            { id: 'ELIGIBLE_UNBOOKED', label: '1. Unbooked', color: 'bg-orange-600 text-white' },
            { id: 'SCHEDULED', label: '2. Scheduled', color: 'bg-blue-700 text-white' },
            { id: 'PASSED', label: '3. Passed', color: 'bg-emerald-700 text-white' },
            { id: 'RETAKE_REQUESTED', label: '4. Retake', color: 'bg-amber-600 text-white' },
            { id: 'FAILED', label: '5. Failed', color: 'bg-rose-700 text-white' },
            { id: 'MALPRACTICE_FLAGGED', label: '6. Flagged', color: 'bg-red-800 text-white' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleStateChange(item.id as InterviewStatus)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                currentStudent.interviewStatus === item.id
                  ? item.color + ' shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF7F2]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Clean Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =========================================================================
            LEFT COLUMN: COMPACT PROFILE & IMMEDIATE ACTIONS (4 Cols)
           ========================================================================= */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          
          {/* Candidate Card */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 shadow-sm text-center">
            <div className="flex flex-col items-center">
              
              <div className="relative mb-3">
                <img
                  src={studentAvatar}
                  alt={studentName}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-stone-100 shadow-sm border border-[#E8E1D5]"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <h1 className="text-lg font-heading font-bold text-stone-900 tracking-tight flex items-center justify-center gap-1">
                <span>{studentName}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
              </h1>
              
              <p className="text-xs font-mono text-stone-500 font-medium mt-0.5">
                Roll: {studentRoll}
              </p>

              <div className="mt-2 text-xs text-stone-600 font-medium flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>KIIT University, Bhubaneswar</span>
              </div>

              {/* 2 Key Metrics */}
              <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-4 border-t border-[#F0EAE1]">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <span className="text-[10px] uppercase font-bold text-stone-500">GRIT Miles</span>
                  <div className="text-xl font-heading font-extrabold text-amber-600">
                    {currentStudent.interviewStatus === 'PASSED' ? (2950).toLocaleString() : currentStudent.currentMiles.toLocaleString()}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <span className="text-[10px] uppercase font-bold text-stone-500">Cohort Rank</span>
                  <div className="text-xl font-heading font-extrabold text-stone-800">
                    {currentStudent.interviewStatus === 'PASSED' ? '#8' : '#14'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Box */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 shadow-sm space-y-3">
            <span className="text-[11px] uppercase font-heading font-bold text-stone-500 tracking-wider block">
              Live Walkthrough Status
            </span>

            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Prerequisites cleared. Book your 30-min walkthrough with an Accenture evaluator.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-heading font-bold shadow-sm flex items-center justify-center gap-1.5 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Interview Slot</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'SCHEDULED' && activeBooking && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs space-y-1">
                  <div className="font-bold text-stone-900">{activeBooking.date} • {activeBooking.startTime}</div>
                  <div className="text-[11px] text-stone-600">Evaluator: {activeBooking.interviewerName} (Accenture)</div>
                </div>
                
                <a
                  href={activeBooking.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-heading font-bold shadow-sm flex items-center justify-center gap-1.5 transition"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch Google Meet</span>
                </a>

                <button
                  onClick={() => cancelBooking(activeBooking.id)}
                  className="w-full py-1.5 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-medium transition"
                >
                  Reschedule / Cancel
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'PASSED' && (
              <div className="text-center space-y-2 py-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Badge Verified (GRIT-AI-9942)</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-sm">
                    Share
                  </button>
                  <button className="flex-1 py-1.5 rounded-xl bg-white border border-[#E8E1D5] text-stone-700 text-xs font-bold hover:bg-stone-50 shadow-sm">
                    PDF Cert
                  </button>
                </div>
              </div>
            )}

            {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
              <div className="space-y-2">
                <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  Targeted retake requested on tool concurrency. No cooldown applied.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-heading font-bold shadow-sm flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Pick Retake Slot</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'FAILED' && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-0.5">
                <div className="font-bold">14-Day Cooldown Active</div>
                <div className="text-[11px] text-stone-600">Review learning modules before re-attempting.</div>
              </div>
            )}

            {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-950 space-y-0.5">
                <div className="font-bold">Honor Code Violation</div>
                <div className="text-[11px] text-stone-700">Code telemetry flagged AST duplication. Badge nullified.</div>
              </div>
            )}
          </div>

        </aside>

        {/* =========================================================================
            RIGHT COLUMN: STREAMLINED MAIN STAGE (8 Cols)
           ========================================================================= */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* =========================================================================
              CARD 1: TRACK PREREQUISITES & STATUS OVERVIEW (Compact & Light)
             ========================================================================= */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Applied AI
                  </span>
                  <span className="text-xs text-stone-400">• KIIT Skilling Cohort</span>
                </div>
                <h2 className="text-lg font-heading font-bold text-stone-900 mt-0.5">
                  {track.title}
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400">Prerequisites</span>
                <div className="text-xs font-heading font-bold text-emerald-700">
                  4 of 4 Skills Cleared (100%)
                </div>
              </div>
            </div>

            {/* 4 Skills inline pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans text-xs">
              {track.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between gap-1"
                >
                  <div className="truncate">
                    <div className="font-bold text-stone-800 text-[11px] truncate">{skill.name.split(' ')[0]} {skill.name.split(' ')[1] || ''}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">{skill.score}% Cleared</div>
                  </div>
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </div>
              ))}
            </div>

            {/* Dynamic 1-line stage notice */}
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between text-xs text-stone-700">
              <span className="truncate pr-2">
                {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && 'Prerequisites cleared. Ready for your 30-min live code walkthrough.'}
                {currentStudent.interviewStatus === 'SCHEDULED' && `Confirmed with Siddharth Roy (Accenture) for ${activeBooking?.date || 'Nov 12'}.`}
                {currentStudent.interviewStatus === 'PASSED' && 'Interview verified by Siddharth Roy (Accenture). Credential issued.'}
                {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && 'Targeted 15-min retake requested on tool concurrency.'}
                {currentStudent.interviewStatus === 'FAILED' && 'Cooldown active. Re-attempt available in 14 days.'}
                {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && 'Telemetry audit flagged duplication. Badge nullified.'}
              </span>
              {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="text-xs font-bold text-orange-700 hover:text-orange-800 whitespace-nowrap flex items-center gap-1"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* =========================================================================
              CARD 2: CANDIDATE COMMUNICATIONS (Clean Tabbed Message Center)
             ========================================================================= */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EAE1] pb-3">
              <div>
                <h3 className="text-sm font-heading font-bold text-stone-900">
                  Candidate Notifications
                </h3>
                <p className="text-xs text-stone-500">
                  Key official communication triggers in the interview journey.
                </p>
              </div>

              {/* 3 Message Switcher Tabs */}
              <div className="flex items-center bg-[#F4EFE6] p-0.5 rounded-xl font-heading text-xs">
                <button
                  onClick={() => setActiveMessageTab('M1')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMessageTab === 'M1' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  1. Eligibility
                </button>
                <button
                  onClick={() => setActiveMessageTab('M2')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMessageTab === 'M2' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  2. Confirmation
                </button>
                <button
                  onClick={() => setActiveMessageTab('M3')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMessageTab === 'M3' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  3. Outcome
                </button>
              </div>
            </div>

            {/* TAB 1: ELIGIBILITY MESSAGE */}
            {activeMessageTab === 'M1' && (
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                    Trigger: Cleared 4th Prerequisite Skill
                  </span>
                  <span>Channel: In-App & Email</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-stone-800 leading-relaxed space-y-1">
                  <div className="font-bold text-stone-900 text-sm">Track Badge Unlocked: You are eligible for your Final Interview!</div>
                  <p className="text-stone-600 pt-1">
                    "Congratulations, <strong>{studentName}</strong>! You've cleared all 4 skill contests in the <strong>GenAI & Autonomous Agents Track</strong>. The final step to claim your verified <strong>Track Badge</strong> and <strong>+500 GRIT Miles</strong> is a 30-minute live code walkthrough with a senior engineer. Slots are available for the next 7 days. Pick your time slot now before capacity fills up."
                  </p>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-heading font-bold shadow-sm transition"
                  >
                    Open Booking Window
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: CONFIRMATION MESSAGE */}
            {activeMessageTab === 'M2' && (
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Trigger: Slot Reservation Confirmed
                  </span>
                  <span>Channel: WhatsApp & Calendar</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-stone-800 leading-relaxed space-y-1.5">
                  <div className="font-bold text-stone-900 text-sm">Interview Confirmed: GenAI Track Badge Walkthrough</div>
                  <p className="text-stone-600 pt-1">
                    "You are scheduled with <strong>{activeBooking ? `${activeBooking.interviewerName} (${activeBooking.interviewerTitle}, Accenture)` : 'Siddharth Roy (Lead AI Architect, Accenture)'}</strong> on <strong>{activeBooking ? `${activeBooking.date} at ${activeBooking.startTime} IST` : 'Thursday, Nov 12 at 04:30 PM IST'}</strong>."
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-stone-500 text-[11px] pt-1">
                    <li>Platform: Google Meet (unlocks 15 mins prior to call).</li>
                    <li>Format: 10m architecture review + 15m live coding & defense + 5m Q&A.</li>
                    <li>Rescheduling: Allowed up to 6 hours before slot.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: OUTCOME MESSAGE */}
            {activeMessageTab === 'M3' && (
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Trigger: Evaluator Rubric Submission
                  </span>
                  {/* Small outcome selector pills */}
                  <div className="flex items-center gap-1 font-heading text-[11px]">
                    <button
                      onClick={() => setOutcomePreview('PASSED')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        outcomePreview === 'PASSED' ? 'bg-emerald-700 text-white' : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Passed
                    </button>
                    <button
                      onClick={() => setOutcomePreview('RETAKE')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        outcomePreview === 'RETAKE' ? 'bg-amber-600 text-white' : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Retake
                    </button>
                    <button
                      onClick={() => setOutcomePreview('FAILED')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        outcomePreview === 'FAILED' ? 'bg-rose-700 text-white' : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Failed
                    </button>
                  </div>
                </div>

                {outcomePreview === 'PASSED' && (
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-stone-800 leading-relaxed space-y-1">
                    <div className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Passed: Track Badge Verified & Miles Awarded</span>
                    </div>
                    <p className="text-stone-600 pt-1">
                      "Phenomenal work! Siddharth (Accenture) has approved your submission with an overall score of <strong>9.2/10</strong>. Your <strong>GenAI & Autonomous Agents Track Badge</strong> is now active on your public profile, and <strong>+500 Miles</strong> have been credited to your rank. Keep up the grit!"
                    </p>
                  </div>
                )}

                {outcomePreview === 'RETAKE' && (
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-stone-800 leading-relaxed space-y-1">
                    <div className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                      <RotateCcw className="w-4 h-4 text-amber-600" />
                      <span>Retake Requested: Targeted Re-attempt</span>
                    </div>
                    <p className="text-stone-600 pt-1">
                      "Your interviewer noted great reasoning on Vector Search, but wants you to patch the agent tool memory boundaries before approving your badge. No cooldown applied—select a 15-minute quick retake slot within 5 days."
                    </p>
                  </div>
                )}

                {outcomePreview === 'FAILED' && (
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-stone-800 leading-relaxed space-y-1">
                    <div className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Walkthrough Unsuccessful: 14-Day Cooldown</span>
                    </div>
                    <p className="text-stone-600 pt-1">
                      "Thank you for your effort. The evaluator noted gaps in live debugging and RAG chunking trade-offs. Per NIAT guidelines, a 14-day learning cooldown is active. Your mentor has shared study modules in your portal."
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* =========================================================================
              CARD 3: BEFORE VS AFTER SCREEN COMPARISON (Clean & Crisp)
             ========================================================================= */}
          <BeforeAfterComparison viewMode={comparisonMode} setViewMode={setComparisonMode} />

        </main>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    </div>
  );
};