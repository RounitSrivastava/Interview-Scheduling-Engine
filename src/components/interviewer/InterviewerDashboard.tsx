import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle, 
  Sliders, 
  Check, 
  ExternalLink,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';
import { AvailabilityManager } from './AvailabilityManager';
import { OutcomeModal } from './OutcomeModal';
import { InterviewBooking } from '../../types';

export const InterviewerDashboard: React.FC = () => {
  const { activeInterviewer, bookings } = useInterview();

  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'AVAILABILITY' | 'PAST'>('SCHEDULE');
  const [evaluatingBooking, setEvaluatingBooking] = useState<InterviewBooking | null>(null);

  // Filter bookings for this interviewer
  const interviewerBookings = bookings.filter((b) => b.interviewerId === activeInterviewer.id);
  const scheduledBookings = interviewerBookings.filter((b) => b.status === 'SCHEDULED');
  const completedBookings = interviewerBookings.filter((b) => b.status === 'COMPLETED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Interviewer Header Card */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={activeInterviewer.avatar}
            alt={activeInterviewer.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{activeInterviewer.name}</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Official Evaluator
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {activeInterviewer.title} • {activeInterviewer.organization}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{activeInterviewer.rating} Evaluator Rating</span>
              </span>
              <span>•</span>
              <span>{activeInterviewer.interviewsConducted} Walkthroughs Completed</span>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('SCHEDULE')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === 'SCHEDULE'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Today's Schedule ({scheduledBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('AVAILABILITY')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === 'AVAILABILITY'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Availability Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('PAST')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === 'PAST'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Past Evaluations ({completedBookings.length})</span>
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'SCHEDULE' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Upcoming Evaluation Queue</h2>
              <p className="text-xs text-slate-400">
                Candidates booked for 30-minute Track Badge live code walkthroughs.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Active Timezone: <strong className="text-slate-200">{activeInterviewer.timezone}</strong>
            </span>
          </div>

          {scheduledBookings.length === 0 ? (
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-bold text-white text-base">No upcoming interviews today</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No candidates currently booked for this slot. Switch to student view to book a live slot or check your availability windows.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {scheduledBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex flex-col items-center justify-center font-bold text-xs">
                      <Clock className="w-4 h-4 mb-0.5" />
                      <span>{b.startTime.split(' ')[0]}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-white text-base">{b.studentName}</h3>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {b.studentRollNumber}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {b.trackTitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {b.studentCollege} • Booked for <strong>{b.date}</strong> at <strong>{b.startTime} – {b.endTime}</strong>
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-xs text-emerald-400 font-medium">
                        <span>✓ 4/4 Skill Contests Cleared</span>
                        <span>•</span>
                        <span>Contest Score: 94% Avg</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <a
                      href={b.meetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Video className="w-4 h-4 text-emerald-400" />
                      <span>Launch Google Meet</span>
                    </a>

                    <button
                      onClick={() => setEvaluatingBooking(b)}
                      className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
                    >
                      <Award className="w-4 h-4" />
                      <span>Record Outcome (Pass/Fail/Retake)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'AVAILABILITY' && <AvailabilityManager />}

      {activeTab === 'PAST' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Evaluated Interviews History</h2>
          
          {completedBookings.length === 0 ? (
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-10 text-center text-xs text-slate-400">
              No completed evaluations recorded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {completedBookings.map((b) => {
                const evalData = b.evaluation;
                if (!evalData) return null;

                return (
                  <div
                    key={b.id}
                    className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">{b.studentName}</h4>
                          <span className="text-xs text-slate-400 font-mono">({b.studentRollNumber})</span>
                          <span className="text-xs text-slate-400">• {b.studentCollege}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Evaluated on {new Date(evalData.evaluatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {evalData.outcome === 'PASS' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>PASS • Badge Issued</span>
                          </span>
                        )}
                        {evalData.outcome === 'RETAKE' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                            <span>RETAKE REQUESTED</span>
                          </span>
                        )}
                        {evalData.outcome === 'FAIL' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            <span>FAIL (14-day cooling)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rubric Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-medium">Architecture</span>
                        <span className="font-bold text-amber-400">{evalData.rubric.codeArchitecture} / 5</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-medium">AI Systems Theory</span>
                        <span className="font-bold text-amber-400">{evalData.rubric.systemKnowledge} / 5</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-medium">Problem Solving</span>
                        <span className="font-bold text-amber-400">{evalData.rubric.problemSolving} / 5</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-medium">Code Defense</span>
                        <span className="font-bold text-amber-400">{evalData.rubric.integrityAndDefense} / 5</span>
                      </div>
                    </div>

                    {/* Evaluator Notes */}
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Assessment Notes</span>
                      <p className="leading-relaxed">"{evalData.interviewerNotes}"</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Outcome Evaluation Modal */}
      {evaluatingBooking && (
        <OutcomeModal
          booking={evaluatingBooking}
          isOpen={!!evaluatingBooking}
          onClose={() => setEvaluatingBooking(null)}
        />
      )}

    </div>
  );
};
