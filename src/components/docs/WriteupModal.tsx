import React from 'react';
import { 
  X, 
  Printer, 
  Layers, 
  ShieldCheck, 
  Database, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';

interface WriteupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WriteupModal: React.FC<WriteupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#DDD0BC] rounded-3xl w-full max-w-4xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-[#F4EFE6]/95 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-600 to-orange-700 flex items-center justify-center font-black text-white text-base shadow-sm">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-stone-900 text-base sm:text-lg">
                  GRIT: Track Badge Interview Engine Architecture
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  Round 1 Submission
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Author: Rounit Srivastava (KIIT) • Write up of (2 pages max)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-[#D8CEBF] text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 text-stone-800 font-sans leading-relaxed text-sm bg-[#FAF7F2]">
          
          {/* Document Title Banner */}
          <div className="border-b border-[#E8E1D5] pb-6">
            <span className="text-xs font-mono font-bold text-orange-700 uppercase tracking-widest block mb-1">
              PAGE 1 OF 2: CORE ARCHITECTURE & LIFECYCLE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Write up of (2 pages max): GRIT Track Badge Interview Engine
            </h1>
            <p className="text-xs text-stone-500 mt-2 font-medium">
              KIIT University Cohort • Scalable, High Integrity Slot Allocation System
            </p>
          </div>

          {/* SECTION 1: STATES & TRANSITION MATRIX */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-800">
              <Layers className="w-5 h-5" />
              <h2 className="text-base font-black text-stone-900 uppercase tracking-wider">
                1. Student Interview Journey: State Machine
              </h2>
            </div>
            
            <p className="text-xs text-stone-600 font-medium">
              A student’s interview journey represents a finite state machine with strict transition guards preventing unauthorized progression, deadlocks, and stale slot claims.
            </p>

            {/* State Diagram / Flow Representation */}
            <div className="p-5 rounded-2xl bg-[#24211E] text-amber-100 font-mono text-xs overflow-x-auto shadow-md space-y-2 border border-stone-800">
              <div className="text-amber-400 font-bold">// Finite State Progression:</div>
              <div>[NOT_ELIGIBLE] ──(Clears all 4 skills)──► [ELIGIBLE_UNBOOKED]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌──────────────┴──────────────┐</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Atomic Reservation)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Idle &gt; 48h)</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SCHEDULED]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[OPS_NUDGE_SENT]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Conduct Live Code Walkthrough)</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───────────────────┼───────────────────┐</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Score &gt;= 70%)&nbsp;&nbsp;&nbsp;&nbsp;▼ (Borderline/Tech)&nbsp;▼ (Score &lt; 70%)</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[PASSED]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[RETAKE_REQUESTED]&nbsp;&nbsp;&nbsp;&nbsp;[FAILED]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Audit flags)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Fast slot)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (14d cooldown)</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;[MALPRACTICE_FLAGGED]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SCHEDULED]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ELIGIBLE_UNBOOKED]</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;(Badge Revoked & Nullified)</div>
            </div>

            {/* Detailed State Table */}
            <div className="overflow-x-auto border border-[#E8E1D5] rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F5EE] text-stone-600 font-black text-[10px] uppercase tracking-wider border-b border-[#E8E1D5]">
                  <tr>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4">Entry Trigger</th>
                    <th className="py-3 px-4">Primary Actor</th>
                    <th className="py-3 px-4">Exit Guard & Next State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E1D5] text-stone-700">
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-stone-500">NOT_ELIGIBLE</td>
                    <td className="py-3 px-4">Student working through skills contests</td>
                    <td className="py-3 px-4">System / Automated Grader</td>
                    <td className="py-3 px-4"><code>cleared_skills == total_skills</code> ➔ ELIGIBLE_UNBOOKED</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-black text-amber-700">ELIGIBLE_UNBOOKED</td>
                    <td className="py-3 px-4">Final skill contest passed; invite issued</td>
                    <td className="py-3 px-4">Student / Ops Team</td>
                    <td className="py-3 px-4">Selects valid slot ➔ SCHEDULED. If idle &gt; 48h, Ops dispatches nudge.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-black text-blue-700">SCHEDULED</td>
                    <td className="py-3 px-4">Slot confirmed; atomic lock acquired</td>
                    <td className="py-3 px-4">Student & Interviewer</td>
                    <td className="py-3 px-4">Interviewer concludes call and enters rubric ➔ PASSED / RETAKE / FAILED.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-black text-emerald-700">PASSED</td>
                    <td className="py-3 px-4">Interviewer verifies code walkthrough (≥70%)</td>
                    <td className="py-3 px-4">Interviewer</td>
                    <td className="py-3 px-4">Badge minted, +500 Miles credited. Remains ACTIVE unless flagged.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-black text-amber-700">RETAKE_REQUESTED</td>
                    <td className="py-3 px-4">Technical glitch or specific localized gap</td>
                    <td className="py-3 px-4">Interviewer</td>
                    <td className="py-3 px-4">Fast-track retake slot booked without 14-day penalty ➔ SCHEDULED.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-black text-rose-700">FAILED</td>
                    <td className="py-3 px-4">Sub-rubric threshold, inability to explain repo</td>
                    <td className="py-3 px-4">Interviewer</td>
                    <td className="py-3 px-4">14-day cooling period timer expires ➔ Re-enters ELIGIBLE_UNBOOKED.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-black text-red-700">MALPRACTICE_FLAGGED</td>
                    <td className="py-3 px-4">Post-award telemetry/plagiarism audit</td>
                    <td className="py-3 px-4">Integrity Team</td>
                    <td className="py-3 px-4">Terminal or 48h dispute window. Badge nullified; Miles revoked.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 2: EDGE CASES & ASSUMPTIONS */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-800">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-base font-black text-stone-900 uppercase tracking-wider">
                2. Edge Cases Handled & Engineering Assumptions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5 shadow-sm">
                <h3 className="font-black text-stone-900 flex items-center gap-1.5 text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>1. Candidate or Interviewer No-Show</span>
                </h3>
                <p className="text-stone-600 leading-relaxed font-medium">
                  <strong>Handling:</strong> If a student doesn't join within 10 minutes, the session marks as <code>STUDENT_NO_SHOW</code>. The student is moved back to unbooked with a 48-hour reschedule delay. If the interviewer fails to join, the slot is instantly flagged as high priority and re-routed to a floating backup interviewer.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5 shadow-sm">
                <h3 className="font-black text-stone-900 flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-indigo-700" />
                  <span>2. Rescheduling Time Window Guard</span>
                </h3>
                <p className="text-stone-600 leading-relaxed font-medium">
                  <strong>Handling:</strong> Self-serve rescheduling is permitted up to <strong>6 hours before</strong> the slot. Within 6 hours, self-serve is disabled to protect interviewer calendar commitments; emergency exceptions require Ops approval. Max 1 reschedule allowed per candidate per track.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5 shadow-sm">
                <h3 className="font-black text-stone-900 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>3. Retake vs. Outright Fail Distinction</span>
                </h3>
                <p className="text-stone-600 leading-relaxed font-medium">
                  <strong>Handling:</strong> A "Retake" is designated for environmental/connectivity issues or a single targeted missing concept (e.g. agent memory lifecycle). It waives the 14-day cooling period and unlocks a 15-minute quick-slot within 5 days. "Fail" requires full track review.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5 shadow-sm">
                <h3 className="font-black text-stone-900 flex items-center gap-1.5 text-sm">
                  <Lock className="w-4 h-4 text-rose-700" />
                  <span>4. Post-Award Malpractice Nullification</span>
                </h3>
                <p className="text-stone-600 leading-relaxed font-medium">
                  <strong>Handling:</strong> If static code analysis, keystroke rhythm, or secondary human audit flags plagiarism after a badge is already issued, the system executes an automated clawback: badge status ➔ <code>REVOKED</code>, Miles deducted (-500), and public verification URL displays a revocation banner.
                </p>
              </div>

            </div>

            {/* Assumptions */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] text-xs text-stone-600 space-y-2 shadow-sm font-medium">
              <span className="font-black text-stone-800 block uppercase tracking-wider text-[11px]">
                Key Product Assumptions
              </span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Interview Duration:</strong> Standardized at 30 minutes (10m architecture review + 15m live code defense + 5m Q&A/rubric entry).</li>
                <li><strong>Interviewer Capacity:</strong> Interviewers specify their recurring weekly windows and daily caps (default max 4/day) to prevent evaluator fatigue.</li>
                <li><strong>Timezone Normalization:</strong> All slot queries, holds, and bookings are persisted in UTC and localized to Asia/Kolkata (IST) in the frontend.</li>
              </ul>
            </div>
          </section>

          {/* PAGE 2 BREAK */}
          <div className="border-t border-[#E8E1D5] pt-6">
            <span className="text-xs font-mono font-bold text-indigo-800 uppercase tracking-widest block mb-1">
              PAGE 2 OF 2: DATA MODEL & CONCURRENCY SAFEGUARDS
            </span>
          </div>

          {/* SECTION 3: DATA MODEL */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-800">
              <Database className="w-5 h-5" />
              <h2 className="text-base font-black text-stone-900 uppercase tracking-wider">
                3. Relational Data Model & Schema
              </h2>
            </div>

            <p className="text-xs text-stone-600 font-medium">
              Normalized schema ensuring ACID compliance, auditable state transitions, and high-performance indexing for cohort filtering.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <div className="text-amber-800 font-bold">TABLE interview_slots</div>
                <div className="text-stone-600 space-y-1 text-[11px]">
                  <div>id: UUID (PK)</div>
                  <div>interviewer_id: UUID (FK ➔ interviewers)</div>
                  <div>start_time: TIMESTAMPTZ (NOT NULL)</div>
                  <div>end_time: TIMESTAMPTZ (NOT NULL)</div>
                  <div>status: ENUM('AVAILABLE','HELD','BOOKED')</div>
                  <div>held_by_student_id: UUID (NULLABLE)</div>
                  <div>held_expires_at: TIMESTAMPTZ (NULLABLE)</div>
                  <div>version: INT (Optimistic Lock)</div>
                  <div className="text-emerald-700 font-bold pt-1">
                    CONSTRAINT unique_interviewer_slot UNIQUE(interviewer_id, start_time)
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <div className="text-amber-800 font-bold">TABLE interview_bookings</div>
                <div className="text-stone-600 space-y-1 text-[11px]">
                  <div>id: UUID (PK)</div>
                  <div>slot_id: UUID (FK ➔ interview_slots, UNIQUE)</div>
                  <div>student_id: UUID (FK ➔ students)</div>
                  <div>track_id: UUID (FK ➔ track_badges)</div>
                  <div>interviewer_id: UUID (FK ➔ interviewers)</div>
                  <div>status: ENUM('SCHEDULED','COMPLETED','CANCELLED')</div>
                  <div>meet_url: VARCHAR(255)</div>
                  <div>created_at: TIMESTAMPTZ</div>
                  <div className="text-emerald-700 font-bold pt-1">
                    INDEX idx_active_bookings(student_id, track_id) WHERE status='SCHEDULED'
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <div className="text-amber-800 font-bold">TABLE interview_evaluations</div>
                <div className="text-stone-600 space-y-1 text-[11px]">
                  <div>id: UUID (PK)</div>
                  <div>booking_id: UUID (FK ➔ interview_bookings, UNIQUE)</div>
                  <div>outcome: ENUM('PASS','FAIL','RETAKE')</div>
                  <div>rubric_scores: JSONB (Architecture, Theory, Defense)</div>
                  <div>feedback_notes: TEXT</div>
                  <div>cooling_days: INT (DEFAULT 14)</div>
                  <div>evaluated_by: UUID (FK ➔ interviewers)</div>
                  <div>evaluated_at: TIMESTAMPTZ</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <div className="text-amber-800 font-bold">TABLE badge_issuances</div>
                <div className="text-stone-600 space-y-1 text-[11px]">
                  <div>id: UUID (PK)</div>
                  <div>student_id: UUID (FK ➔ students)</div>
                  <div>track_id: UUID (FK ➔ track_badges)</div>
                  <div>credential_hash: VARCHAR(64) UNIQUE</div>
                  <div>status: ENUM('ACTIVE','REVOKED')</div>
                  <div>revocation_reason: TEXT (NULLABLE)</div>
                  <div>revoked_at: TIMESTAMPTZ (NULLABLE)</div>
                  <div>revoked_by: UUID (NULLABLE)</div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4: DOUBLE-BOOKING PREVENTION */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-800">
              <Lock className="w-5 h-5" />
              <h2 className="text-base font-black text-stone-900 uppercase tracking-wider">
                4. Preventing Double-Booking (Concurrency Architecture)
              </h2>
            </div>

            <p className="text-xs text-stone-600 font-medium">
              In high-traffic cohorts, hundreds of students become eligible simultaneously. To ensure that <strong>two students never book the same slot</strong>, we employ a 3-layer defensive concurrency strategy:
            </p>

            <div className="space-y-3 text-xs">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <h4 className="font-black text-stone-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono font-bold">1</span>
                  <span>Database Level: Pessimistic Row Locking (`SELECT ... FOR UPDATE`)</span>
                </h4>
                <p className="text-stone-600 leading-relaxed font-medium">
                  When a student clicks "Confirm Booking", the request is wrapped in an isolated database transaction. We acquire an exclusive row lock on the target slot row, preventing concurrent transactions from reading or mutating it until the transaction commits:
                </p>
                <div className="p-4 rounded-xl bg-[#24211E] font-mono text-[11px] text-amber-100 overflow-x-auto shadow-inner">
                  <span className="text-amber-300 font-bold">BEGIN TRANSACTION</span>;<br/>
                  <span className="text-stone-400">-- Acquire exclusive row lock; fails fast if already locked</span><br/>
                  <span className="text-orange-400">SELECT</span> id, status, version <span className="text-orange-400">FROM</span> interview_slots<br/>
                  <span className="text-orange-400">WHERE</span> id = :slot_id <span className="text-orange-400">AND</span> status = <span className="text-emerald-400">'AVAILABLE'</span><br/>
                  <span className="text-rose-400 font-bold">FOR UPDATE NOWAIT</span>;<br/><br/>
                  <span className="text-stone-400">-- If row found, atomic state update</span><br/>
                  <span className="text-orange-400">UPDATE</span> interview_slots <span className="text-orange-400">SET</span> status = <span className="text-emerald-400">'BOOKED'</span>, version = version + 1 <span className="text-orange-400">WHERE</span> id = :slot_id;<br/>
                  <span className="text-orange-400">INSERT INTO</span> interview_bookings (slot_id, student_id, track_id, status) <span className="text-orange-400">VALUES</span> (:slot_id, :student_id, :track_id, <span className="text-emerald-400">'SCHEDULED'</span>);<br/>
                  <span className="text-amber-300 font-bold">COMMIT</span>;
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <h4 className="font-black text-stone-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono font-bold">2</span>
                  <span>Composite Unique Constraint (Hard Invariant Safety Net)</span>
                </h4>
                <p className="text-stone-600 leading-relaxed font-medium">
                  Even if an application layer bug bypassed the transaction lock, the database enforces a physical composite unique constraint: <code>UNIQUE(interviewer_id, start_time)</code> on active bookings. The database will reject a duplicate booking with a Postgres error code <code>23505 (unique_violation)</code>, returning a graceful "Slot claimed" response to the client.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-2 shadow-sm">
                <h4 className="font-black text-stone-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono font-bold">3</span>
                  <span>Redis Distributed Mutex (High-Traffic Buffer)</span>
                </h4>
                <p className="text-stone-600 leading-relaxed font-medium">
                  During peak contest conclusion waves, a lightweight distributed lock in Redis: <code>SET lock:slot:{"{slot_id}"} {"{student_id}"} NX EX 30</code> acquires a 30-second lease before hitting the database, protecting the relational store from connection pool exhaustion.
                </p>
              </div>

            </div>
          </section>

          {/* SECTION 5: OPS VISIBILITY & FUNNEL */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-800">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="text-base font-black text-stone-900 uppercase tracking-wider">
                5. Ops Team Funnel & Malpractice Audit Trail
              </h2>
            </div>

            <p className="text-xs text-stone-600 font-medium">
              To guarantee that no student falls through the cracks, the Operations Dashboard partitions the cohort into actionable segments:
            </p>

            <ul className="list-disc pl-4 space-y-2 text-xs text-stone-600 font-medium">
              <li>
                <strong>Cohort Supply vs. Demand Monitoring:</strong> Operations tracks the ratio of unbooked eligible candidates to available weekly interviewer slots. If demand exceeds 80% capacity, alerts prompt the recruitment of additional interviewers.
              </li>
              <li>
                <strong>Automated Multi-Channel Nudge Dispatch:</strong> When an eligible student remains unbooked for &gt;48 hours, an automated sequence sends WhatsApp and email prompts with deep links directly to the booking drawer.
              </li>
              <li>
                <strong>Post-Award Integrity Revocation:</strong> The integrity team maintains an immutable audit trail. When malpractice is confirmed, a single cryptographic transaction revokes the badge, resets leaderboard miles, and publishes a verifiable nullification record.
              </li>
            </ul>
          </section>

          {/* Signoff */}
          <div className="border-t border-[#E8E1D5] pt-6 text-xs text-stone-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-medium">
            <span>Prepared for NIAT GRIT Engineering Selection • Round 1 Assignment</span>
            <span className="font-mono font-bold text-stone-700">Live Working Prototype Built & Verified</span>
          </div>

        </div>

      </div>
    </div>
  );
};
