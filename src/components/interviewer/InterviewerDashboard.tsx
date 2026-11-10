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
  Star
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
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={activeInterviewer.avatar}
            alt={activeInterviewer.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#E2D8C9] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900">{activeInterviewer.name}</h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                Official Evaluator
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              {activeInterviewer.title} • {activeInterviewer.organization}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-stone-500 font-semibold">
              <span className="flex items-center gap-1 text-amber-700 font-black">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{activeInterviewer.rating} Evaluator Rating</span>
              </span>
              <span>•</span>
              <span>{activeInterviewer.interviewsConducted} Walkthroughs Completed</span>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center bg-[#F0EAE1] border border-[#DFD5C4] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('SCHEDULE')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition flex items-center gap-2 ${
              activeTab === 'SCHEDULE'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Today's Schedule ({scheduledBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('AVAILABILITY')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition flex items-center gap-2 ${
              activeTab === 'AVAILABILITY'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Availability Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('PAST')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition flex items-center gap-2 ${
              activeTab === 'PAST'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
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
              <h2 className="text-lg font-black text-stone-900">Upcoming Evaluation Queue</h2>
              <p className="text-xs text-stone-500">
                Candidates booked for 30-minute Track Badge live code walkthroughs.
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              Active Timezone: <strong className="text-stone-800">{activeInterviewer.timezone}</strong>
            </span>
          </div>

          {scheduledBookings.length === 0 ? (
            <div className="bg-white border border-[#E8E1D5] rounded-3xl p-12 text-center space-y-3 shadow-sm">
              <Calendar className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-black text-stone-900 text-base">No upcoming interviews today</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No candidates currently booked for this slot. Switch to student view to book a live slot or check your availability windows.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {scheduledBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-[#E8E1D5] hover:border-[#D8CEBF] rounded-2xl p-6 shadow-sm transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src="/rounit-photo.png"
                      alt={b.studentName}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-200 border border-[#E8E1D5] shadow-sm flex-shrink-0"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-stone-900 text-base">{b.studentName}</h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F4EFE6] text-stone-700 border border-[#DDD0BC]">
                          {b.studentRollNumber}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
                          {b.trackTitle}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium">
                        {b.studentCollege} • Booked for <strong className="text-stone-800">{b.date}</strong> at <strong className="text-stone-800">{b.startTime} to {b.endTime}</strong>
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-xs text-emerald-700 font-bold">
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
                      className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EAE1] text-stone-800 border border-[#E8E1D5] text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      <Video className="w-4 h-4 text-emerald-700" />
                      <span>Launch Google Meet</span>
                    </a>

                    <button
                      onClick={() => setEvaluatingBooking(b)}
                      className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 transition"
                    >
                      <Award className="w-4 h-4" />
                      <span>Record Outcome (Pass, Fail, Retake)</span>
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
          <h2 className="text-lg font-black text-stone-900">Evaluated Interviews History</h2>
          
          {completedBookings.length === 0 ? (
            <div className="bg-white border border-[#E8E1D5] rounded-3xl p-10 text-center text-xs text-stone-500 shadow-sm">
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
                    className="bg-white border border-[#E8E1D5] rounded-2xl p-6 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E8E1D5] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-stone-900 text-base">{b.studentName}</h4>
                          <span className="text-xs text-stone-500 font-mono">({b.studentRollNumber})</span>
                          <span className="text-xs text-stone-500">• {b.studentCollege}</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Evaluated on {new Date(evalData.evaluatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {evalData.outcome === 'PASS' && (
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>PASS • Badge Issued</span>
                          </span>
                        )}
                        {evalData.outcome === 'RETAKE' && (
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                            <span>RETAKE REQUESTED</span>
                          </span>
                        )}
                        {evalData.outcome === 'FAIL' && (
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                            <span>FAIL (14-day cooling)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rubric Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                        <span className="text-[10px] text-stone-500 block font-semibold">Architecture</span>
                        <span className="font-black text-amber-700 text-sm">{evalData.rubric.codeArchitecture} / 5</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                        <span className="text-[10px] text-stone-500 block font-semibold">AI Systems Theory</span>
                        <span className="font-black text-amber-700 text-sm">{evalData.rubric.systemKnowledge} / 5</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                        <span className="text-[10px] text-stone-500 block font-semibold">Problem Solving</span>
                        <span className="font-black text-amber-700 text-sm">{evalData.rubric.problemSolving} / 5</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-center">
                        <span className="text-[10px] text-stone-500 block font-semibold">Code Defense</span>
                        <span className="font-black text-amber-700 text-sm">{evalData.rubric.integrityAndDefense} / 5</span>
                      </div>
                    </div>

                    {/* Evaluator Notes */}
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-stone-700 space-y-1">
                      <span className="text-[10px] uppercase font-black text-stone-500 block">Assessment Notes</span>
                      <p className="leading-relaxed font-medium">"{evalData.interviewerNotes}"</p>
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
