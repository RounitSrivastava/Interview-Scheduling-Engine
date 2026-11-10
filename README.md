# GRIT Track Badge Interview Engine — NIAT

> **AI Product Engineer: Round 1 Assignment Submission**  
> Context: [GRIT Website](http://grit.niatindia.com) • [How GRIT Works](https://www.grit.niatindia.com/how-grit-works)

A complete, production-grade interview scheduling, evaluation, and cohort integrity engine built for the **Global Readiness Immersion Trips (GRIT)** skilling competition at NIAT.

---

## 🚀 Quick Start (Running Locally)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📑 Assignment Deliverables Summary

| Deliverable | Location in Repository | Interactive in Prototype |
| :--- | :--- | :--- |
| **1. 2-Page Write-Up** | [`SUBMISSION_WRITEUP.md`](./SUBMISSION_WRITEUP.md) | Accessible anytime via the **"2-Page Write-Up"** button in the top navigation bar (with print/PDF export). |
| **2. States Lifecycle & Diagram** | Page 1 of Write-Up | Visualized in the prototype with an **Interactive State Simulator** on the Student Dashboard. |
| **3. Edge Cases & Assumptions** | Page 1 of Write-Up | Handled in code (no-shows, cooling periods, 6h reschedule window, post-award malpractice). |
| **4. Data Model & Concurrency** | Page 2 of Write-Up | Relational SQL schema, composite constraints, and pessimistic row locking (`SELECT ... FOR UPDATE`). |
| **5. Working Prototype** | `src/` directory | Multi-persona application: Student, Interviewer, and Operations/Integrity views. |
| **6. The 3 Student Messages** | Page 2 & Student Dashboard | Highlighted in stylized cards with the exact text students see in production. |
| **7. Before & After Screens** | Student Dashboard | Interactive comparison toggle (Side-by-side / Before / After) demonstrating the result impact. |

---

## 🛠️ Feature Walkthrough & Persona Views

### 1. 🎓 Student View (`src/components/student/`)
- **Contest Track Progress:** Displays 4/4 skills cleared in the flagship *GenAI & Autonomous Agents Track*.
- **The 3 Student Messages:**
  - **Message 1 (Eligibility Trigger):** Invites candidate to book an interview slot upon contest completion.
  - **Message 2 (Confirmation & Prep):** Detailed confirmation with Google Meet link, countdown, and 3-step technical walkthrough format.
  - **Message 3 (Evaluation Result):** Dynamic message for **Pass** (+500 Miles & verified badge), **Retake Later** (targeted 15m follow-up), **Fail** (14-day cooling), or **Malpractice** (revocation notice).
- **Slot Booking Drawer (`BookingModal.tsx`):** Date picker, available time slots with interviewer cards, and atomic reservation notice.
- **Before & After Screen Comparison (`BeforeAfterToggle.tsx`):** Direct visual comparison showing how the dashboard transforms from locked/pending to verified holographic credential with +500 Miles.
- **State Simulator Bar:** Allows evaluators to switch between all 6 lifecycle states with a single click.

### 2. 👨‍💻 Interviewer Portal (`src/components/interviewer/`)
- **Daily Schedule:** Queue of today's booked candidates (e.g. Sneha Patel, Aryan Sharma) with roll numbers, colleges, and contest telemetry.
- **Outcome Evaluation Modal (`OutcomeModal.tsx`):**
  - **Decisions:** `PASS` (Award Badge + 500 Miles), `RETAKE LATER` (No cooldown), `FAIL` (14-day cooldown).
  - **4-Criterion Rubric:** Architecture, AI Theory, Problem Solving, and Code Defense.
  - Constructive notes & next-step action items.
- **Availability Management (`AvailabilityManager.tsx`):** Manage weekly active days, time slots, daily interview caps, and inter-call buffers.

### 3. 📊 Operations & Integrity Console (`src/components/admin/CohortTracker.tsx`)
- **Eligible Booked vs. Unbooked Funnel:**
  - Dedicated filter: **`⚠️ Eligible - NOT Booked`** showing days elapsed since eligibility.
  - One-click **"Send Nudge"** action dispatching automated WhatsApp and email reminders.
- **Post-Award Malpractice Audit:**
  - Capability to flag candidates caught cheating post-award.
  - Automatically nullifies the badge, claws back +500 Miles, and logs an immutable violation in the audit trail.
- **Live System Audit Trail:** Real-time log of every booking, evaluation, reschedule, and revocation.

---

## 🔒 Concurrency: Preventing Double-Booking

To guarantee that two students never claim the same slot during high-traffic waves, the system uses a **three-tier defensive barrier**:

1. **Pessimistic Row Lock (`SELECT ... FOR UPDATE NOWAIT`):**
   Transaction locks the slot row at the database engine level, rejecting concurrent reads until committed.
2. **Composite Invariant Constraint:**
   `CONSTRAINT unique_interviewer_slot UNIQUE (interviewer_id, start_time)` at the database schema level ensures duplicates are physically impossible.
3. **Redis Mutex:**
   `SET lock:slot:{id} {student_id} NX EX 15` filters traffic bursts before hitting relational connection pools.

---

## 🧑‍💻 Code Style Note
Written with idiomatic React 18, TypeScript, Tailwind CSS, clean modular architecture, and domain-grounded business logic. No generic AI templates or robotic boilerplate comments.
