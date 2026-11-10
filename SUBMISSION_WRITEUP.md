# GRIT Track Badge Interview Scheduling Engine — Product & Architecture Specification

**Author:** AI Product Engineer Candidate  
**Program:** Global Readiness Immersion Trips (GRIT) — KIIT University & NIAT Engineering Initiative  
**Student Cohort:** School of Computer Engineering, KIIT University, Bhubaneswar  
**Deliverable:** 2-Page Executive Technical & Product Write-Up  
**Live Working Prototype:** Built with React 18, TypeScript, Tailwind CSS (Interactive Multi-Persona Application)

---

## Page 1: Lifecycle State Machine & Edge Cases

### 1. States: Student Interview Journey

The student interview lifecycle is governed by a deterministic Finite State Machine (FSM). State transitions enforce strict authorization guards, eliminating stale slot claims, illegal skips, and unverified credentials.

```
[NOT_ELIGIBLE] ──(Clears all 4 skills)──► [ELIGIBLE_UNBOOKED]
                                                  │
                            ┌─────────────────────┴─────────────────────┐
                            ▼ (Selects Slot & Holds Mutex)              ▼ (Idle > 48h)
                       [SCHEDULED]                                 [OPS_NUDGE_SENT]
                            │ (Conducts 30-min live code defense)
                            ▼
           ┌────────────────┼────────────────┐
           ▼ (Score ≥ 70%)  ▼ (Borderline)   ▼ (Score < 70%)
       [PASSED]     [RETAKE_REQUESTED]    [FAILED]
           │ (Audit flags)  │ (Quick slot)   │ (14-day cooldown)
           ▼                ▼                ▼
[MALPRACTICE_FLAGGED]  [SCHEDULED]    [ELIGIBLE_UNBOOKED]
(Badge Nullified)
```

| State | Entry Condition / Trigger | Primary Actor | Exit Guard & Next State |
| :--- | :--- | :--- | :--- |
| **`NOT_ELIGIBLE`** | Student is working through skill contests (e.g., 2/4 cleared). | Automated Evaluation Engine | `cleared_skills == total_required_skills` ➔ Transitions to `ELIGIBLE_UNBOOKED`. |
| **`ELIGIBLE_UNBOOKED`** | Cleared 100% of track skills. Invitation issued. | Student / Ops Team | Student selects slot ➔ Transitions to `SCHEDULED`. If idle > 48 hours, Ops dispatches multi-channel nudge. |
| **`SCHEDULED`** | Slot chosen; atomic row lock acquired; calendar link generated. | Student & Interviewer | Interview concluded. Evaluator enters rubric ➔ Transitions to `PASSED`, `RETAKE_REQUESTED`, or `FAILED`. |
| **`PASSED`** | Interview score ≥ 70% (evaluated across 4 rubric dimensions). | Assigned Evaluator | Official Track Badge minted, +500 GRIT Miles credited. Status remains `ACTIVE` unless flagged by post-interview audit. |
| **`RETAKE_REQUESTED`** | Environmental glitch, network drop, or narrow conceptual gap. | Evaluator | Cooling period waived. Fast-track 15-minute slot unlocked within 5 days ➔ Transitions back to `SCHEDULED`. |
| **`FAILED`** | Score < 70%; candidate unable to defend codebase/architecture. | Evaluator | 14-day learning cooldown initiated. Mentor modules assigned. Cooldown expiry ➔ Transitions to `ELIGIBLE_UNBOOKED`. |
| **`MALPRACTICE_FLAGGED`**| Post-award audit detects code clone, AI impersonation, or telemetry leak. | Integrity / Proctoring Team | Immediate clawback: Badge status set to `REVOKED`, -500 Miles deducted, violation logged. 48h appeal window open. |

---

### 2. Edge Cases Handled & Product Assumptions

#### Real-World Edge Cases Addressed
1. **Candidate or Interviewer No-Show:**
   - *Student No-Show:* If a student fails to join within 10 minutes, the session is marked `STUDENT_NO_SHOW`. The slot is released, and the student is placed on a 48-hour reschedule delay to discourage time-wasting.
   - *Interviewer No-Show:* If the interviewer has not joined within 5 minutes, an automated alert routes the candidate to a secondary floating backup interviewer or prioritizes immediate rebooking.
2. **Cancellation & Rescheduling Guardrails:**
   - Self-serve rescheduling is permitted up to **6 hours prior** to the slot. Inside the 6-hour window, slots are locked to prevent interviewer idle blocks. Max 1 self-serve reschedule per track badge.
3. **The "Retake Later" Pathway vs. Outright Failure:**
   - Rather than treating every suboptimal call as a fail, `RETAKE_REQUESTED` handles borderline evaluations (e.g., strong code architecture, but minor bug in memory leaks). It eliminates candidate demoralization while safeguarding NIAT badge rigor.
4. **Post-Award Malpractice Nullification:**
   - Plagiarism, unauthorized proxy assistance, or secondary AST code duplication audits may resolve days after an interview. The data model supports an explicit `badge_issuances.status = 'REVOKED'` event that voids the public cryptographic credential and claws back the 500 Miles reward.

#### Engineering & Product Assumptions
- **Standardized Session Window:** 30 minutes total (10m system architecture defense + 15m live coding & edge case probing + 5m Q&A and rubric entry).
- **Throttled Evaluator Capacity:** Interviewers configure recurring windows and cap daily throughput (default: max 4 slots/day) with mandatory 15-minute buffers between calls to prevent cognitive fatigue.
- **Timezone Normalization:** All slots, holds, and bookings are stored in UTC and rendered in Asia/Kolkata (IST).

---

## Page 2: Data Model, Concurrency Safeguards & User Experience

### 3. Data Model & Key Fields

```sql
-- 1. TRACK BADGES
CREATE TABLE track_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL, -- e.g. 'genai-autonomous-agents'
    title VARCHAR(128) NOT NULL,
    required_skills_count INT NOT NULL DEFAULT 4,
    miles_reward INT NOT NULL DEFAULT 500,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. INTERVIEWERS & RECURRING AVAILABILITY
CREATE TABLE interviewers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    max_daily_slots INT NOT NULL DEFAULT 4,
    buffer_minutes INT NOT NULL DEFAULT 15,
    timezone VARCHAR(64) DEFAULT 'Asia/Kolkata',
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. INTERVIEW SLOTS (The Concurrency Anchor)
CREATE TABLE interview_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interviewer_id UUID NOT NULL REFERENCES interviewers(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE', -- 'AVAILABLE', 'HELD', 'BOOKED', 'CANCELLED'
    version INT NOT NULL DEFAULT 1, -- Optimistic lock version counter
    held_by_student_id UUID REFERENCES students(id),
    held_expires_at TIMESTAMPTZ,
    CONSTRAINT unique_interviewer_slot UNIQUE (interviewer_id, start_time),
    CONSTRAINT valid_slot_window CHECK (end_time > start_time)
);

-- 4. INTERVIEW BOOKINGS
CREATE TABLE interview_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID NOT NULL UNIQUE REFERENCES interview_slots(id),
    student_id UUID NOT NULL REFERENCES students(id),
    track_id UUID NOT NULL REFERENCES track_badges(id),
    interviewer_id UUID NOT NULL REFERENCES interviewers(id),
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED', -- 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'
    meet_url VARCHAR(255) NOT NULL,
    booked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EVALUATIONS & RUBRICS
CREATE TABLE interview_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL UNIQUE REFERENCES interview_bookings(id),
    outcome VARCHAR(20) NOT NULL, -- 'PASS', 'FAIL', 'RETAKE'
    rubric_scores JSONB NOT NULL, -- { architecture: 5, theory: 4, problem_solving: 5, integrity: 5 }
    feedback_notes TEXT NOT NULL,
    action_items TEXT,
    cooling_days INT DEFAULT 14,
    evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BADGE ISSUANCES & INTEGRITY REVOCATION
CREATE TABLE badge_issuances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    track_id UUID NOT NULL REFERENCES track_badges(id),
    credential_hash VARCHAR(64) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'REVOKED'
    revocation_reason TEXT,
    revoked_at TIMESTAMPTZ,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_active_badge UNIQUE (student_id, track_id)
);
```

---

### 4. How to Prevent Two Students from Booking the Same Slot

To make race conditions impossible under concurrent high load, we implement a **three-tier defensive concurrency barrier**:

1. **Pessimistic Row-Level Lock (`SELECT ... FOR UPDATE NOWAIT`):**
   When a student submits a booking, the transaction locks the slot row immediately. Any concurrent transaction attempting to read the same slot for update is blocked or rejected:
   ```sql
   BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;

   -- 1. Acquire exclusive lock on target slot
   SELECT id, status, version 
   FROM interview_slots 
   WHERE id = :slot_id AND status = 'AVAILABLE'
   FOR UPDATE NOWAIT;

   -- If slot is already locked or status != 'AVAILABLE', transaction aborts with 409 Conflict.

   -- 2. Transition slot to BOOKED
   UPDATE interview_slots 
   SET status = 'BOOKED', version = version + 1 
   WHERE id = :slot_id;

   -- 3. Insert confirmed booking record
   INSERT INTO interview_bookings (slot_id, student_id, track_id, interviewer_id, meet_url, status)
   VALUES (:slot_id, :student_id, :track_id, :interviewer_id, :meet_url, 'SCHEDULED');

   COMMIT;
   ```
2. **Database Hard Invariant:**
   The composite constraint `CONSTRAINT unique_interviewer_slot UNIQUE (interviewer_id, start_time)` and the foreign key unique constraint on `interview_bookings.slot_id` act as a hardware-level mathematical guarantee that duplicate active rows can never exist.
3. **Application-Level Redis Mutex:**
   Before invoking the database, the API gateway executes `SET lock:slot:{slot_id} {student_id} NX EX 15`. This filters high-frequency click bursts at memory speed, keeping the database thread pool healthy.

---

### 5. The 3 Most Important Messages a Student Sees

#### Message 1: Eligibility & Invitation to Book Slot
> **Header:** 🎯 Track Badge Unlocked: You are eligible for your Final Interview!  
> **Body:** "Congratulations, **Rounit**! You’ve cleared all 4 skill contests in the **GenAI & Autonomous Agents Track**. The final step to claim your verified **Track Badge** and **+500 GRIT Miles** is a 30-minute live code walkthrough with a senior engineer. Slots are available for the next 7 days. Pick your time slot now before capacity fills up."  
> **Action:** `[Schedule Interview Slot →]`

#### Message 2: Booking Confirmation & Technical Prep Guide
> **Header:** 🗓️ Interview Confirmed: GenAI Track Badge Walkthrough  
> **Body:** "You are scheduled with **Siddharth Roy (Lead AI Architect)** on **Thursday, Nov 14 at 04:30 PM IST**."  
> • **Platform:** Google Meet (link unlocks 15 mins before call on your dashboard).  
> • **Format:** 10m project architecture review + 15m live coding & edge case defense + 5m Q&A.  
> • **Need to reschedule?** Permitted up to 6 hours prior to the call via your dashboard.  
> **Action:** `[Launch Google Meet] [Add to Google Calendar]`

#### Message 3: Official Outcome & Verified Badge Status
> *(Pass Result)*:  
> **Header:** 🏆 Badge Awarded: GenAI Specialist Verified!  
> **Body:** "Phenomenal work! Siddharth has approved your submission with an overall score of **9.2/10**. Your **GenAI & Autonomous Agents Track Badge** is now active on your public profile, and **+500 Miles** have been credited to your GRIT Leaderboard rank. Keep up the grit!"  
> **Action:** `[View Credential #GRIT-AI-9942] [Share to LinkedIn]`

---

### 6. Summary of Working Prototype Screens
- **Student Dashboard:** Track progress (4/4 skills cleared), interactive state switcher, slot booking drawer, meeting launcher, and side-by-side **Before vs. After result comparison**.
- **Interviewer Portal:** Daily schedule queue, candidate repository inspection, availability manager (weekly days, slots, buffer sliders), and 4-metric outcome evaluation modal.
- **Ops & Integrity Console:** Real-time cohort funnel tracking "Eligible - Unbooked" vs "Booked", one-click WhatsApp/email nudges, and post-award malpractice audit modal with automatic badge revocation.

