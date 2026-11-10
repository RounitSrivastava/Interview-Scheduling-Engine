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
  FileText,
  ChevronRight,
  AlertCircle,
  Bell,
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
  const [comparisonMode, setComparisonMode] = useState<'SPLIT' | 'BEFORE' | 'AFTER'>('SPLIT');
  const [activeMessageTab, setActiveMessageTab] = useState<'M1' | 'M2' | 'M3'>('M1');

  // Find active booking for student
  const activeBooking = bookings.find(
    (b) => b.studentId === currentStudent.id && b.status === 'SCHEDULED'
  );

  const track = INITIAL_TRACK_BADGES.find((t) => t.id === currentStudent.trackId) || INITIAL_TRACK_BADGES[0];

  const studentName = currentStudent.id === 'stu-101' ? 'Rounit Srivastava' : currentStudent.name;
  const studentRoll = currentStudent.id === 'stu-101' ? '23051042' : currentStudent.rollNumber;
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
      setActiveMessageTab('M3');
    } else if (status === 'SCHEDULED') {
      setActiveMessageTab('M2');
    } else if (status === 'ELIGIBLE_UNBOOKED') {
      setActiveMessageTab('M1');
    } else {
      setActiveMessageTab('M3');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* =========================================================================
          TOP STREAMLINED STATE SIMULATOR BAR (Sleek Control Strip)
         ========================================================================= */}
      <div className="bg-white/90 backdrop-blur-md border border-[#E8E1D5] rounded-2xl p-3 sm:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 border border-orange-200 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-black text-stone-900 tracking-tight">Interactive State Simulator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F4EFE6] text-stone-800 font-bold border border-[#DDD0BC]">
                {currentStudent.interviewStatus}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              Simulate candidate lifecycle to test dynamic screens and notifications.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-heading text-xs">
          <button
            onClick={() => handleStateChange('ELIGIBLE_UNBOOKED')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED'
                ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-400/40'
                : 'bg-[#F7F3EB] text-stone-700 hover:bg-[#EDE6D8]'
            }`}
          >
            1. Unbooked
          </button>

          <button
            onClick={() => handleStateChange('SCHEDULED')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              currentStudent.interviewStatus === 'SCHEDULED'
                ? 'bg-blue-700 text-white shadow-sm ring-2 ring-blue-400/40'
                : 'bg-[#F7F3EB] text-stone-700 hover:bg-[#EDE6D8]'
            }`}
          >
            2. Scheduled
          </button>

          <button
            onClick={() => handleStateChange('PASSED')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              currentStudent.interviewStatus === 'PASSED'
                ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400/40'
                : 'bg-[#F7F3EB] text-stone-700 hover:bg-[#EDE6D8]'
            }`}
          >
            3. Passed (Verified)
          </button>

          <button
            onClick={() => handleStateChange('RETAKE_REQUESTED')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              currentStudent.interviewStatus === 'RETAKE_REQUESTED'
                ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/40'
                : 'bg-[#F7F3EB] text-stone-700 hover:bg-[#EDE6D8]'
            }`}
          >
            4. Retake
          </button>

          <button
            onClick={() => handleStateChange('FAILED')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              currentStudent.interviewStatus === 'FAILED'
                ? 'bg-rose-700 text-white shadow-sm ring-2 ring-rose-400/40'
                : 'bg-[#F7F3EB] text-stone-700 hover:bg-[#EDE6D8]'
            }`}
          >
            5. Failed
          </button>

          <button
            onClick={() => handleStateChange('MALPRACTICE_FLAGGED')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED'
                ? 'bg-red-800 text-white shadow-sm ring-2 ring-red-400/40'
                : 'bg-[#F7F3EB] text-stone-700 hover:bg-[#EDE6D8]'
            }`}
          >
            6. Malpractice
          </button>
        </div>
      </div>

      {/* Main 2-Column Command Center Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* =========================================================================
            LEFT COLUMN (Sidebar / Candidate Identity & Action Hub - 4 Cols)
           ========================================================================= */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Candidate Identity Card */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-sm relative overflow-hidden text-center">
            {/* Subtle warm decorative top glow */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-orange-100/60 via-[#FAF7F2] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Profile Photo with Status Indicator */}
              <div className="relative mb-3.5">
                <img
                  src={studentAvatar}
                  alt={studentName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white shadow-md border border-[#E8E1D5]"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm" title="Active Candidate" />
              </div>

              {/* Candidate Name & Verification Checkmark */}
              <h1 className="text-xl font-heading font-black text-stone-900 tracking-tight flex items-center justify-center gap-1.5">
                <span>{studentName}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 flex-shrink-0" />
              </h1>
              
              <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-full bg-[#F4EFE6] text-stone-700 text-xs font-mono font-bold border border-[#DDD0BC]">
                <span>Roll: {studentRoll}</span>
              </div>

              {/* College & Department */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-heading font-bold text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-xl border border-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>KIIT University, Bhubaneswar</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1 font-medium">School of Computer Engineering</p>

              {/* Score & Rank KPIs */}
              <div className="grid grid-cols-2 gap-2.5 w-full mt-5 pt-5 border-t border-[#E8E1D5]">
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                  <span className="text-[10px] uppercase font-heading font-bold text-stone-500 tracking-wider">GRIT Miles</span>
                  <div className="text-2xl font-heading font-black text-amber-600 mt-0.5">
                    {currentStudent.interviewStatus === 'PASSED' ? (2950).toLocaleString() : currentStudent.currentMiles.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                  <span className="text-[10px] uppercase font-heading font-bold text-stone-500 tracking-wider">Cohort Rank</span>
                  <div className="text-2xl font-heading font-black text-stone-900 mt-0.5">
                    {currentStudent.interviewStatus === 'PASSED' ? '#8' : '#14'}
                  </div>
                </div>
              </div>

              {/* Immersion Status Tag */}
              <div className="w-full mt-3 p-2.5 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-center justify-center gap-1.5 text-xs font-heading font-bold text-orange-900">
                <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span>Tier 1: Global Immersion Nominee</span>
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
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500">Live Status</span>
            </div>

            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <div className="space-y-3">
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  All 4 skills cleared. Book your live walkthrough with an Accenture evaluator before capacity fills up.
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
                <div className="p-3 rounded-xl bg-blue-50/90 border border-blue-200 text-xs text-blue-950 space-y-1">
                  <span className="font-bold block text-blue-900">Confirmed Slot:</span>
                  <div className="font-heading font-black text-blue-900 text-sm">
                    {activeBooking.date} • {activeBooking.startTime}
                  </div>
                  <span className="text-[11px] text-blue-800">
                    Evaluator: {activeBooking.interviewerName} (Accenture)
                  </span>
                </div>
                
                <a
                  href={activeBooking.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-heading font-black shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition"
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
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-black text-emerald-950 text-sm">Track Badge Verified</h4>
                <p className="text-[11px] text-stone-600">
                  Credential ID: <strong>GRIT-AI-9942</strong> (KIIT Cohort)
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-[11px] font-heading font-bold flex items-center justify-center gap-1 shadow-sm transition">
                    <Share2 className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </button>
                  <button className="flex-1 py-1.5 rounded-lg bg-white border border-[#E8E1D5] text-stone-700 hover:bg-stone-50 text-[11px] font-heading font-bold shadow-sm transition">
                    PDF Cert
                  </button>
                </div>
              </div>
            )}

            {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
              <div className="space-y-2.5">
                <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
                  Evaluator requested a 15-minute targeted retake on tool-calling concurrency boundaries.
                </p>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-heading font-black flex items-center justify-center gap-2 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Select Retake Slot</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'FAILED' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
                <span className="font-bold block text-rose-900">Learning Cooldown Active</span>
                <p className="text-[11px] text-stone-600">
                  14 days cooldown before you can re-attempt your code walkthrough. Study modules are linked below.
                </p>
              </div>
            )}

            {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs text-red-950 space-y-1">
                <span className="font-bold block text-red-900">Honor Code Violation</span>
                <p className="text-[11px] text-stone-700">
                  Badge nullified due to post-contest code similarity flag. Contact ops team for review.
                </p>
              </div>
            )}

          </div>

          {/* Quick KIIT Guidelines */}
          <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-3xl p-5 text-xs text-stone-600 space-y-2.5">
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
        <main className="lg:col-span-8 space-y-6 lg:space-y-8">
          
          {/* =========================================================================
              CARD 1: TRACK JOURNEY HERO & REAL-TIME STAGE BANNER
             ========================================================================= */}
          <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-200">
                    Applied AI Track
                  </span>
                  <span className="text-xs text-stone-500 font-medium">KIIT Skilling Competition</span>
                </div>
                <h2 className="text-xl font-heading font-black text-stone-900 mt-1">
                  {track.title}
                </h2>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  {track.description}
                </p>
              </div>

              <div className="text-left sm:text-right font-heading">
                <span className="text-[10px] uppercase font-bold text-stone-500">Skills Cleared</span>
                <div className="text-base font-black text-emerald-700">
                  {currentStudent.skillsCompleted} of {currentStudent.totalSkills} (100%)
                </div>
              </div>
            </div>

            {/* Dynamic Stage Banner based on Status */}
            {currentStudent.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎯</span>
                    <h3 className="font-heading font-black text-orange-950 text-sm">
                      Prerequisites Complete: Ready for Live Code Walkthrough
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 max-w-xl font-medium">
                    You have unlocked your interview window! Book a 30-minute slot with an Accenture evaluator to earn your verified badge and <strong>+500 GRIT Miles</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-heading font-black shadow-md shadow-orange-600/20 flex items-center gap-2 whitespace-nowrap transition flex-shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Slot Now</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'SCHEDULED' && activeBooking && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🗓️</span>
                    <h3 className="font-heading font-black text-blue-950 text-sm">
                      Walkthrough Scheduled: {activeBooking.date} at {activeBooking.startTime} IST
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 max-w-xl font-medium">
                    Evaluator: <strong>{activeBooking.interviewerName}</strong> (Lead AI Architect, Accenture). Google Meet link activates 15 mins prior to call.
                  </p>
                </div>
                <a
                  href={activeBooking.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-heading font-black shadow-md shadow-blue-700/20 flex items-center gap-2 whitespace-nowrap transition flex-shrink-0"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch Meet</span>
                </a>
              </div>
            )}

            {currentStudent.interviewStatus === 'PASSED' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏆</span>
                    <h3 className="font-heading font-black text-emerald-950 text-sm">
                      Track Badge Verified & Awarded!
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 max-w-xl font-medium">
                    Evaluated by Siddharth Roy (Accenture). Score: <strong>9.2/10</strong>. Your verified credential is active and <strong>+500 Miles</strong> have been credited.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-heading font-black text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Credential Issued</span>
                </div>
              </div>
            )}

            {currentStudent.interviewStatus === 'RETAKE_REQUESTED' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🔄</span>
                    <h3 className="font-heading font-black text-amber-950 text-sm">
                      Targeted Retake Requested
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 max-w-xl font-medium">
                    Evaluator requested a 15-minute quick re-attempt on concurrency boundaries. No cooldown period penalty.
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-heading font-black shadow-sm flex items-center gap-2 whitespace-nowrap transition flex-shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Select Retake Slot</span>
                </button>
              </div>
            )}

            {currentStudent.interviewStatus === 'FAILED' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
                <h3 className="font-heading font-black text-rose-950 text-sm flex items-center gap-2">
                  <span>❌</span>
                  <span>Interview Unsuccessful — 14-Day Cooldown Active</span>
                </h3>
                <p className="text-stone-700 font-medium">
                  Review the study modules shared in your portal before booking your next walkthrough attempt.
                </p>
              </div>
            )}

            {currentStudent.interviewStatus === 'MALPRACTICE_FLAGGED' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-300 text-xs text-red-950 space-y-1">
                <h3 className="font-heading font-black text-red-950 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Honor Code Violation — Badge Nullified</span>
                </h3>
                <p className="text-stone-800 font-medium">
                  Telemetry audit detected AST duplication. In accordance with GRIT Honor Code, badge nullified.
                </p>
              </div>
            )}

            {/* 4/4 Cleared Skills Matrix */}
            <div className="pt-2">
              <span className="text-[11px] uppercase font-heading font-bold text-stone-500 tracking-wider block mb-2.5">
                Cleared Track Prerequisite Skills (4/4 Completed)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
                {track.skills.map((skill, idx) => (
                  <div
                    key={skill.id}
                    className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-stone-400 font-bold">#{idx + 1}</span>
                        <span className="text-xs font-bold text-stone-800">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                        <span>Cleared: {skill.clearedDate || 'Passed'}</span>
                        {skill.score && <span className="text-emerald-700 font-black">Score: {skill.score}%</span>}
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* =========================================================================
              CARD 2: CANDIDATE NOTIFICATIONS & INTERVIEW COMMUNICATIONS
             ========================================================================= */}
          <div className="bg-[#FDFBF7] border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-heading font-bold uppercase tracking-wider mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Interview Communications</span>
                </div>
                <h3 className="text-lg font-heading font-black text-stone-900">
                  Key Candidate Notifications & Updates
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Official status triggers sent to KIIT engineering students throughout the interview journey.
                </p>
              </div>

              {/* Message Tab Switcher */}
              <div className="flex items-center bg-[#F0EAE1] border border-[#DFD5C4] p-1 rounded-xl font-heading text-xs">
                <button
                  onClick={() => setActiveMessageTab('M1')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMessageTab === 'M1'
                      ? 'bg-stone-800 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Message 1
                </button>
                <button
                  onClick={() => setActiveMessageTab('M2')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMessageTab === 'M2'
                      ? 'bg-stone-800 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Message 2
                </button>
                <button
                  onClick={() => setActiveMessageTab('M3')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    activeMessageTab === 'M3'
                      ? 'bg-stone-800 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Message 3
                </button>
              </div>
            </div>

            {/* TAB CONTENT: MESSAGE 1 */}
            {activeMessageTab === 'M1' && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E1D5] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
                      Message 1 • Eligibility Trigger
                    </span>
                    <span className="text-xs text-stone-500">Sent immediately upon clearing the 4th skill contest</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">Trigger: Automated Event</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-heading font-black text-stone-900 flex items-center gap-2">
                    <span>🎯 Track Badge Unlocked: You are eligible for your Final Interview!</span>
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5]">
                    "Congratulations, <strong>{studentName}</strong>! You’ve cleared all 4 skill contests in the <strong>GenAI & Autonomous Agents Track</strong>. The final step to claim your verified <strong>Track Badge</strong> and <strong>+500 GRIT Miles</strong> is a 30-minute live code walkthrough with a senior engineer. Slots are available for the next 7 days. Pick your time slot now before capacity fills up."
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-stone-500">Notification Channel: In-App Banner & Email</span>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-heading font-black shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Open Booking Modal</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: MESSAGE 2 */}
            {activeMessageTab === 'M2' && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E1D5] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      Message 2 • Booking Confirmation & Prep
                    </span>
                    <span className="text-xs text-stone-500">Sent via WhatsApp & Google Calendar Invite</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">Trigger: Slot Reservation</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-heading font-black text-stone-900 flex items-center gap-2">
                    <span>🗓️ Interview Confirmed: GenAI Track Badge Walkthrough</span>
                  </h4>
                  <div className="text-xs text-stone-700 leading-relaxed font-sans bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] space-y-2">
                    <p>
                      "You are scheduled with <strong>{activeBooking ? `${activeBooking.interviewerName} (${activeBooking.interviewerTitle}, Accenture)` : 'Siddharth Roy (Lead AI Architect, Accenture)'}</strong> on <strong>{activeBooking ? `${activeBooking.date} at ${activeBooking.startTime} IST` : 'Thursday, Nov 12 at 04:30 PM IST'}</strong>."
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
                      <li><strong>Platform:</strong> Google Meet (link unlocks 15 mins before call on your dashboard).</li>
                      <li><strong>Format:</strong> 10m project architecture review + 15m live coding & edge case defense + 5m Q&A.</li>
                      <li><strong>Need to reschedule?</strong> Permitted up to 6 hours prior to the call via your dashboard.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-stone-500">Notification Channel: In-App Dashboard & WhatsApp</span>
                  <a
                    href={activeBooking ? activeBooking.meetUrl : 'https://meet.google.com/grit-ai-eval'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-heading font-black shadow-md shadow-blue-700/20 flex items-center gap-1.5 transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Preview Google Meet</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB CONTENT: MESSAGE 3 */}
            {activeMessageTab === 'M3' && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E1D5] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Message 3 • Official Result & Badge Status
                    </span>
                    <span className="text-xs text-stone-500">Triggered dynamically based on evaluator outcome</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">Trigger: Evaluator Submission</span>
                </div>

                <div className="space-y-3 font-sans">
                  {/* Result variant 3A: PASSED */}
                  <div className={`p-4 rounded-xl border transition ${
                    currentStudent.interviewStatus === 'PASSED'
                      ? 'bg-emerald-50/90 border-emerald-300 ring-1 ring-emerald-200'
                      : 'bg-[#FAF7F2] border-[#E8E1D5]'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                      <span>🏆 Variant 3A: Passed (Badge Verified & Miles Awarded)</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      "Phenomenal work! Siddharth (Accenture) has approved your submission with an overall score of <strong>9.2/10</strong>. Your <strong>GenAI & Autonomous Agents Track Badge</strong> is now active on your public profile, and <strong>+500 Miles</strong> have been credited to your rank. Keep up the grit!"
                    </p>
                  </div>

                  {/* Result variant 3B: RETAKE */}
                  <div className={`p-4 rounded-xl border transition ${
                    currentStudent.interviewStatus === 'RETAKE_REQUESTED'
                      ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-200'
                      : 'bg-[#FAF7F2] border-[#E8E1D5]'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                      <span>🔄 Variant 3B: Retake Later (Minor Refinements)</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      "Your interviewer noted great reasoning on Vector Search, but wants you to patch the agent tool memory boundaries before approving your badge. No cooldown applied—select a 15-minute quick retake slot within 5 days."
                    </p>
                  </div>

                  {/* Result variant 3C: FAILED */}
                  <div className={`p-4 rounded-xl border transition ${
                    currentStudent.interviewStatus === 'FAILED'
                      ? 'bg-rose-50/90 border-rose-300 ring-1 ring-rose-200'
                      : 'bg-[#FAF7F2] border-[#E8E1D5]'
                  }`}>
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-900 mb-1">
                      <span>❌ Variant 3C: Failed (14-Day Cooldown)</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      "Thank you for your effort. The evaluator noted gaps in live debugging and RAG chunking trade-offs. Per NIAT guidelines, a 14-day learning cooldown is active. Your mentor has shared study modules in your portal."
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 pt-1">
                  💡 <em>Use the State Simulator above to watch the candidate view update live.</em>
                </div>
              </div>
            )}

          </div>

          {/* =========================================================================
              CARD 3: BEFORE AND AFTER SCREEN COMPARISON
             ========================================================================= */}
          <BeforeAfterComparison viewMode={comparisonMode} setViewMode={setComparisonMode} />

        </main>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    </div>
  );
};