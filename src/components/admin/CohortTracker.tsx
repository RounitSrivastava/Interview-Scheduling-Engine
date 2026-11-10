import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Users, 
  AlertCircle, 
  CalendarCheck, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  Clock, 
  RotateCcw,
  FileText
} from 'lucide-react';
import { Student } from '../../types';

export const CohortTracker: React.FC = () => {
  const { students, bookings, sendNudge, flagMalpractice, auditLogs } = useInterview();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'UNBOOKED' | 'SCHEDULED' | 'COMPLETED' | 'FLAGGED'>('UNBOOKED');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Malpractice Modal State
  const [flaggingStudent, setFlaggingStudent] = useState<Student | null>(null);
  const [malpracticeReason, setMalpracticeReason] = useState(
    'Automated telemetry audit detected anomalous copy-paste velocity and 94% AST code duplication with an unauthorized external repo.'
  );

  // Cohort Stats
  const totalEligible = students.filter((s) => s.skillsCompleted === s.totalSkills).length;
  const unbookedCount = students.filter((s) => s.interviewStatus === 'ELIGIBLE_UNBOOKED').length;
  const scheduledCount = students.filter((s) => s.interviewStatus === 'SCHEDULED').length;
  const completedCount = students.filter((s) => ['PASSED', 'FAILED', 'RETAKE_REQUESTED'].includes(s.interviewStatus)).length;
  const flaggedCount = students.filter((s) => s.interviewStatus === 'MALPRACTICE_FLAGGED').length;

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
    if (activeFilter === 'FLAGGED') return student.interviewStatus === 'MALPRACTICE_FLAGGED';
    return true;
  });

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flaggingStudent) return;
    flagMalpractice(flaggingStudent.id, malpracticeReason);
    setFlaggingStudent(null);
  };

  const calculateDaysSinceEligible = (eligibleSince?: string) => {
    if (!eligibleSince) return 'Recently';
    const diffMs = Date.now() - new Date(eligibleSince).getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return days <= 0 ? 'Today' : `${days} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
              Operations Control
            </span>
            <span className="text-xs text-stone-500 font-medium">• Cohort Monitoring</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            Cohort Interview Funnel & Integrity Management
          </h1>
          <p className="text-xs text-stone-500">
            Monitor eligible students who have booked vs unbooked, dispatch automated nudges, and manage post-award malpractice audits.
          </p>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Eligible */}
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">
            <span>Total Eligible</span>
            <Users className="w-4 h-4 text-indigo-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{totalEligible}</div>
          <p className="text-[11px] text-stone-500 mt-1 font-medium">100% skills cleared</p>
        </div>

        {/* Priority: Eligible NOT Booked */}
        <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-amber-800 font-black uppercase tracking-wider mb-1">
            <span>Eligible Unbooked</span>
            <AlertCircle className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-amber-950">{unbookedCount}</div>
          <p className="text-[11px] text-amber-800 mt-1 font-bold">Requires booking nudge</p>
        </div>

        {/* Scheduled */}
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">
            <span>Scheduled</span>
            <CalendarCheck className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{scheduledCount}</div>
          <p className="text-[11px] text-stone-500 mt-1 font-medium">Slots confirmed</p>
        </div>

        {/* Evaluated / Completed */}
        <div className="bg-white border border-[#E8E1D5] rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">
            <span>Evaluated</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{completedCount}</div>
          <p className="text-[11px] text-emerald-700 mt-1 font-bold">Pass / Retake / Fail</p>
        </div>

        {/* Malpractice Nullified */}
        <div className="bg-rose-50/70 border-2 border-rose-300 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-rose-800 font-black uppercase tracking-wider mb-1">
            <span>Nullified Badges</span>
            <ShieldAlert className="w-4 h-4 text-rose-700" />
          </div>
          <div className="text-2xl font-black text-rose-900">{flaggedCount}</div>
          <p className="text-[11px] text-rose-800 mt-1 font-bold">Honor code revocations</p>
        </div>

      </div>

      {/* Cohort Table & Filter Bar */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl shadow-sm overflow-hidden">
        
        {/* Filter Controls & Search */}
        <div className="p-5 border-b border-[#E8E1D5] bg-[#F4EFE6]/70 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Tab Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5">
            <button
              onClick={() => setActiveFilter('UNBOOKED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                activeFilter === 'UNBOOKED'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Eligible - NOT Booked ({unbookedCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('SCHEDULED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                activeFilter === 'SCHEDULED'
                  ? 'bg-blue-700 text-white'
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
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Evaluated ({completedCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('FLAGGED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-sm ${
                activeFilter === 'FLAGGED'
                  ? 'bg-rose-700 text-white'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Malpractice / Revoked ({flaggedCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition shadow-sm ${
                activeFilter === 'ALL'
                  ? 'bg-stone-800 text-white'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:border-stone-400'
              }`}
            >
              All ({students.length})
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
              className="w-full bg-white border border-[#E8E1D5] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-indigo-600 shadow-sm"
            />
          </div>

        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-stone-500 uppercase font-black text-[10px] tracking-wider border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-5">Candidate</th>
                <th className="py-3 px-5">Track & Progress</th>
                <th className="py-3 px-5">Eligible Since</th>
                <th className="py-3 px-5">Interview Status</th>
                <th className="py-3 px-5 text-right">Ops Action</th>
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

                  return (
                    <tr key={student.id} className="hover:bg-[#FAF7F2] transition">
                      
                      {/* Candidate Profile */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src="/rounit-photo.png"
                            alt={student.name}
                            className="w-10 h-10 rounded-2xl object-cover ring-1 ring-[#DDD0BC] shadow-sm"
                          />
                          <div>
                            <div className="font-black text-stone-900 text-sm">
                              {student.id === 'stu-101' ? 'Rounit Srivastava' : student.name}
                            </div>
                            <div className="text-[11px] text-stone-500 font-mono font-medium">
                              {student.id === 'stu-101' ? '23051042' : student.rollNumber} • {student.college.split(',')[0]}
                            </div>
                            <div className="text-[10px] text-amber-700 font-black mt-0.5">
                              {student.currentMiles.toLocaleString()} Miles
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Track & Skills */}
                      <td className="py-4 px-5">
                        <div className="space-y-1">
                          <span className="font-bold text-stone-800 block">GenAI & Autonomous Agents</span>
                          <span className="text-[11px] text-emerald-700 font-black">
                            ✓ {student.skillsCompleted}/{student.totalSkills} Contests Cleared
                          </span>
                        </div>
                      </td>

                      {/* Days Elapsed */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span className="font-bold text-stone-700">
                            {calculateDaysSinceEligible(student.eligibleSince)}
                          </span>
                        </div>
                      </td>

                      {/* Status Tag */}
                      <td className="py-4 px-5">
                        {student.interviewStatus === 'ELIGIBLE_UNBOOKED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                            <span>Eligible - Not Booked</span>
                          </span>
                        )}

                        {student.interviewStatus === 'SCHEDULED' && (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-900 border border-blue-300">
                              <CalendarCheck className="w-3 h-3 text-blue-700" />
                              <span>Scheduled</span>
                            </span>
                            {activeBooking && (
                              <p className="text-[10px] text-stone-500 font-mono font-medium">
                                {activeBooking.date} • {activeBooking.startTime}
                              </p>
                            )}
                          </div>
                        )}

                        {student.interviewStatus === 'PASSED' && (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>Passed (Badge Issued)</span>
                            </span>
                            <p className="text-[10px] text-indigo-800 font-mono font-bold">
                              CR: GRIT-AI-9942
                            </p>
                          </div>
                        )}

                        {student.interviewStatus === 'RETAKE_REQUESTED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                            <RotateCcw className="w-3 h-3 text-amber-700" />
                            <span>Retake Later</span>
                          </span>
                        )}

                        {student.interviewStatus === 'FAILED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-100 text-rose-900 border border-rose-300">
                            <span>Failed (Cooling active)</span>
                          </span>
                        )}

                        {student.interviewStatus === 'MALPRACTICE_FLAGGED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-200 text-rose-950 border border-rose-400">
                            <ShieldAlert className="w-3 h-3 text-rose-700" />
                            <span>Badge Nullified (Cheating)</span>
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
                              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs flex items-center gap-1.5 transition shadow-sm"
                            >
                              <Send className="w-3 h-3" />
                              <span>Send Nudge</span>
                            </button>
                          )}

                          {/* Passed -> Option to Flag Malpractice if later discovered */}
                          {student.interviewStatus === 'PASSED' && (
                            <button
                              onClick={() => setFlaggingStudent(student)}
                              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>Audit / Nullify Badge</span>
                            </button>
                          )}

                          {student.interviewStatus === 'SCHEDULED' && (
                            <span className="text-stone-400 text-[11px] font-semibold">Awaiting Call</span>
                          )}

                          {student.interviewStatus === 'MALPRACTICE_FLAGGED' && (
                            <span className="text-rose-700 text-[11px] font-bold">Revocation Logged</span>
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

      {/* Real-time System Audit Trail */}
      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-700" />
            <h3 className="font-black text-stone-900 text-sm">System & Integrity Audit Trail</h3>
          </div>
          <span className="text-xs text-stone-500 font-mono font-medium">Immutable Log Buffer</span>
        </div>

        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className={`p-3.5 rounded-xl border text-xs flex items-start justify-between gap-4 ${
                log.action.includes('MALPRACTICE')
                  ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                  : log.action.includes('NUDGE')
                  ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                  : 'bg-[#FAF7F2] border-[#E8E1D5] text-stone-700'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="font-black uppercase tracking-wider text-stone-500">{log.action}</span>
                  <span>•</span>
                  <span className="text-indigo-800 font-bold">Actor: {log.actor}</span>
                </div>
                <p className="leading-relaxed font-medium">{log.details}</p>
              </div>
              <span className="text-[10px] text-stone-400 whitespace-nowrap font-mono font-bold">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Malpractice Flagging & Revocation Modal */}
      {flaggingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border-2 border-rose-300 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-[#E8E1D5] bg-rose-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 border border-rose-200 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 text-base">Nullify Badge: Integrity Review</h3>
                  <p className="text-xs text-rose-800 font-medium">
                    Candidate: <strong>{flaggingStudent.name}</strong> ({flaggingStudent.rollNumber})
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleFlagSubmit} className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-rose-100 border border-rose-300 text-xs text-rose-950 leading-relaxed font-medium">
                <strong>Attention:</strong> Submitting this action will immediately revoke the candidate's verified Track Badge, claw back the +500 GRIT Miles reward, and post an immutable violation record under NIAT Honor Code Section 4.2.
              </div>

              <div>
                <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
                  Malpractice Evidence & Violation Reason
                </label>
                <textarea
                  rows={4}
                  value={malpracticeReason}
                  onChange={(e) => setMalpracticeReason(e.target.value)}
                  className="w-full bg-white border border-[#E8E1D5] rounded-2xl p-3 text-xs text-stone-800 font-medium focus:outline-none focus:border-rose-500 shadow-sm"
                  placeholder="Detail the code similarity findings, IP anomalies, or telemetry violations..."
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFlaggingStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-700 hover:bg-rose-800 text-white shadow-md shadow-rose-700/20 flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Confirm Revocation & Nullify</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
