import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Users, 
  AlertCircle, 
  CalendarCheck, 
  Send, 
  CheckCircle2, 
  Search, 
  Clock, 
  Video,
  Award,
  BellRing,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CohortTracker: React.FC = () => {
  const { students, bookings, sendNudge, auditLogs } = useInterview();

  // Default to ALL so the table is never empty on arrival
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'UNBOOKED' | 'SCHEDULED' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Cohort Stats
  const totalEligible = students.filter((s) => s.skillsCompleted === s.totalSkills).length;
  const unbookedCount = students.filter((s) => s.interviewStatus === 'ELIGIBLE_UNBOOKED').length;
  const scheduledCount = students.filter((s) => s.interviewStatus === 'SCHEDULED').length;
  const completedCount = students.filter((s) => ['PASSED', 'FAILED', 'RETAKE_REQUESTED'].includes(s.interviewStatus)).length;

  const filteredStudents = students.filter((student) => {
    // Search query filter
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'UNBOOKED') return student.interviewStatus === 'ELIGIBLE_UNBOOKED';
    if (activeFilter === 'SCHEDULED') return student.interviewStatus === 'SCHEDULED';
    if (activeFilter === 'COMPLETED') return ['PASSED', 'FAILED', 'RETAKE_REQUESTED'].includes(student.interviewStatus);
    return true;
  });

  const calculateDaysSinceEligible = (eligibleSince?: string) => {
    if (!eligibleSince) return 'Recently';
    const diffMs = Date.now() - new Date(eligibleSince).getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return days <= 0 ? 'Today' : `${days}d ago`;
  };

  const handleNudgeAllUnbooked = () => {
    const unbookedStudents = students.filter((s) => s.interviewStatus === 'ELIGIBLE_UNBOOKED');
    unbookedStudents.forEach((s) => sendNudge(s.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-100 text-orange-800 border border-orange-200">
              Interview Operations
            </span>
            <span className="text-xs text-stone-500 font-medium">• Cohort Booking Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            Eligible Students & Booking Status
          </h1>
          <p className="text-xs text-stone-500 max-w-2xl mt-1">
            Track which eligible students have booked their Track Badge interview slot, view upcoming scheduled sessions, and dispatch reminders to unbooked candidates.
          </p>
        </div>

        {unbookedCount > 0 && (
          <button
            onClick={handleNudgeAllUnbooked}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-600/20 flex items-center gap-2 transition"
          >
            <BellRing className="w-4 h-4" />
            <span>Nudge All Unbooked ({unbookedCount})</span>
          </button>
        )}
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Eligible */}
        <div className="bg-white border border-[#E8E1D5] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>Total Eligible</span>
            <Users className="w-4 h-4 text-stone-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">{totalEligible}</div>
          <p className="text-[11px] text-stone-500 font-medium">100% skill milestones cleared</p>
        </div>

        {/* Booked & Scheduled */}
        <div className="bg-white border border-[#E8E1D5] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>Booked & Scheduled</span>
            <CalendarCheck className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">{scheduledCount}</div>
          <p className="text-[11px] text-stone-500 font-medium">Slots confirmed with evaluators</p>
        </div>

        {/* Pending Booking */}
        <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm space-y-1 bg-gradient-to-br from-white to-amber-50/30">
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold uppercase tracking-wider">
            <span>Not Yet Booked</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-950">{unbookedCount}</div>
          <p className="text-[11px] text-amber-700 font-semibold">Eligible candidates awaiting slot pick</p>
        </div>

        {/* Evaluated / Completed */}
        <div className="bg-white border border-[#E8E1D5] rounded-2xl p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider">
            <span>Completed Evaluations</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">{completedCount}</div>
          <p className="text-[11px] text-stone-500 font-medium">Outcomes recorded (Pass/Retake/Fail)</p>
        </div>

      </div>

      {/* Cohort Table & Filter Bar */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl shadow-sm overflow-hidden">
        
        {/* Filter Controls & Search */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1D5] bg-[#F4EFE6]/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Tab Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition shadow-sm ${
                activeFilter === 'ALL'
                  ? 'bg-stone-800 text-white'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              All Candidates ({students.length})
            </button>

            <button
              onClick={() => setActiveFilter('UNBOOKED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                activeFilter === 'UNBOOKED'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Not Yet Booked ({unbookedCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('SCHEDULED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                activeFilter === 'SCHEDULED'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Scheduled ({scheduledCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('COMPLETED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                activeFilter === 'COMPLETED'
                  ? 'bg-stone-700 text-white'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Evaluated ({completedCount})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate name, roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E8E1D5] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-orange-500 shadow-sm"
            />
          </div>

        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-500 uppercase font-black text-[10px] tracking-wider border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3.5 px-5">Candidate</th>
                <th className="py-3.5 px-5">Track & Readiness</th>
                <th className="py-3.5 px-5">Eligibility</th>
                <th className="py-3.5 px-5">Interview Booking Status</th>
                <th className="py-3.5 px-5 text-right">Team Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1D5] text-stone-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400 font-medium">
                    No candidates found for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const activeBooking = bookings.find((b) => b.studentId === student.id && b.status === 'SCHEDULED');
                  const completedBooking = bookings.find((b) => b.studentId === student.id && b.status === 'COMPLETED');

                  return (
                    <tr key={student.id} className="hover:bg-[#FAF7F2]/60 transition">
                      
                      {/* Candidate Profile */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src="/rounit-photo.png"
                            alt={student.name}
                            className="w-10 h-10 rounded-2xl object-cover ring-1 ring-[#DDD0BC] shadow-sm flex-shrink-0"
                          />
                          <div>
                            <div className="font-black text-stone-900 text-sm">
                              {student.id === 'stu-101' ? 'Rounit Srivastava' : student.name}
                            </div>
                            <div className="text-[11px] text-stone-500 font-mono font-medium">
                              {student.id === 'stu-101' ? '23051042' : student.rollNumber} • {student.college.split(',')[0]}
                            </div>
                            <div className="text-[10px] text-stone-600 font-bold mt-0.5">
                              {student.currentMiles.toLocaleString()} Miles
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Track & Skills */}
                      <td className="py-4 px-5">
                        <div className="space-y-0.5">
                          <span className="font-bold text-stone-800 block text-xs">GenAI & Autonomous Agents</span>
                          <span className="text-[11px] text-stone-600 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>{student.skillsCompleted}/{student.totalSkills} Contests Cleared</span>
                          </span>
                        </div>
                      </td>

                      {/* Days Elapsed */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>Eligible {calculateDaysSinceEligible(student.eligibleSince)}</span>
                        </div>
                      </td>

                      {/* Status Tag */}
                      <td className="py-4 px-5">
                        {student.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                            <span>Pending Slot Booking</span>
                          </span>
                        )}

                        {student.interviewStatus === 'SCHEDULED' && (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-orange-100 text-orange-900 border border-orange-200">
                              <CalendarCheck className="w-3 h-3 text-orange-700" />
                              <span>Booked & Scheduled</span>
                            </span>
                            {activeBooking && (
                              <p className="text-[11px] text-stone-600 font-medium">
                                <strong>{activeBooking.date}</strong> at {activeBooking.startTime} • {activeBooking.interviewerName}
                              </p>
                            )}
                          </div>
                        )}

                        {student.interviewStatus === 'PASSED' && (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <Award className="w-3 h-3 text-emerald-700" />
                              <span>Passed (Badge Verified)</span>
                            </span>
                            <p className="text-[10px] text-stone-500 font-mono">
                              Score: {completedBooking?.evaluation?.rubric.codeArchitecture ? `${completedBooking.evaluation.rubric.codeArchitecture * 2}/10` : '9.2/10'}
                            </p>
                          </div>
                        )}

                        {student.interviewStatus === 'RETAKE_REQUESTED' && (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                              <RotateCcw className="w-3 h-3 text-amber-700" />
                              <span>Retake Requested</span>
                            </span>
                            <p className="text-[10px] text-stone-500">5-day rebooking window</p>
                          </div>
                        )}

                        {student.interviewStatus === 'FAILED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-100 text-rose-900 border border-rose-300">
                            <span>Cooldown Active (14d)</span>
                          </span>
                        )}

                        {student.interviewStatus === 'MALPRACTICE_FLAGGED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-stone-100 text-stone-700 border border-stone-300">
                            <span>Under Review</span>
                          </span>
                        )}
                      </td>

                      {/* Action Column */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Unbooked -> Send Reminder Nudge */}
                          {student.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
                            <button
                              onClick={() => sendNudge(student.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                            >
                              <Send className="w-3 h-3" />
                              <span>Send Nudge</span>
                            </button>
                          )}

                          {/* Scheduled -> Launch Meet or View */}
                          {student.interviewStatus === 'SCHEDULED' && activeBooking && (
                            <a
                              href={activeBooking.meetUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EAE1] text-stone-800 border border-[#E8E1D5] text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                            >
                              <Video className="w-3 h-3 text-emerald-700" />
                              <span>Meet Link</span>
                            </a>
                          )}

                          {/* Passed -> View status */}
                          {student.interviewStatus === 'PASSED' && (
                            <span className="text-emerald-700 text-[11px] font-bold">
                              Verified
                            </span>
                          )}

                          {student.interviewStatus === 'RETAKE_REQUESTED' && (
                            <button
                              onClick={() => sendNudge(student.id)}
                              className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EAE1] text-stone-700 border border-[#E8E1D5] text-xs font-bold flex items-center gap-1 transition"
                            >
                              <span>Send Reminder</span>
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Recent Scheduling & Ops Activity */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <h3 className="font-black text-stone-900 text-sm">Recent Scheduling Activity</h3>
          </div>
          <span className="text-[11px] text-stone-500 font-mono">Live Operations Feed</span>
        </div>

        <div className="space-y-2">
          {auditLogs.slice(0, 4).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl border border-[#E8E1D5] bg-[#FAF7F2] text-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                <span className="text-stone-800 font-medium">{log.details}</span>
              </div>
              <span className="text-[10px] text-stone-400 whitespace-nowrap font-mono">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
