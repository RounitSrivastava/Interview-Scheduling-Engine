import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Student, 
  Interviewer, 
  Slot, 
  InterviewBooking, 
  OutcomeType, 
  AuditLog,
  InterviewStatus
} from '../types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_INTERVIEWERS, 
  INITIAL_BOOKINGS, 
  generateAvailableSlots,
  INITIAL_TRACK_BADGES
} from '../data/mockData';

export type Persona = 'STUDENT' | 'INTERVIEWER' | 'ADMIN_OPS';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface InterviewContextType {
  // State
  currentPersona: Persona;
  setCurrentPersona: (p: Persona) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  currentStudent: Student;
  activeInterviewerId: string;
  setActiveInterviewerId: (id: string) => void;
  activeInterviewer: Interviewer;
  students: Student[];
  interviewers: Interviewer[];
  slots: Slot[];
  bookings: InterviewBooking[];
  auditLogs: AuditLog[];
  toasts: Toast[];
  beforeAfterMode: 'BEFORE' | 'AFTER';
  setBeforeAfterMode: (mode: 'BEFORE' | 'AFTER') => void;
  
  // Actions
  bookSlot: (slotId: string) => { success: boolean; message: string };
  cancelBooking: (bookingId: string, reason?: string) => void;
  recordOutcome: (
    bookingId: string, 
    outcome: OutcomeType, 
    rubric: { codeArchitecture: number; systemKnowledge: number; problemSolving: number; integrityAndDefense: number },
    notes: string,
    actionItems: string,
    coolingDays?: number
  ) => void;
  flagMalpractice: (studentId: string, reason: string) => void;
  sendNudge: (studentId: string) => void;
  updateInterviewerSlots: (interviewerId: string, days: string[], times: string[]) => void;
  dismissToast: (id: string) => void;
  resetAllData: () => void;
  setStudentStatusOverride: (status: InterviewStatus) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

const STORAGE_KEY = 'grit_interview_system_v5_rounit_kiit';

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage or defaults
  const [students, setStudents] = useState<Student[]>(() => {
    // Clean old caches if any
    try {
      localStorage.removeItem('grit_interview_system_v1_students');
      localStorage.removeItem('grit_interview_system_v2_students');
    } catch (_) {}

    const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
    if (!saved) return INITIAL_STUDENTS;
    try {
      const parsed: Student[] = JSON.parse(saved);
      return parsed.map((s) => 
        s.id === 'stu-101' 
          ? { 
              ...s, 
              name: 'Rounit Srivastava', 
              rollNumber: '21051042', 
              email: 'rounit.srivastava@kiit.ac.in', 
              college: 'KIIT University, Bhubaneswar', 
              avatar: '/rounit-photo.png' 
            } 
          : s
      );
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [interviewers, setInterviewers] = useState<Interviewer[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_interviewers`);
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWERS;
  });

  const [slots, setSlots] = useState<Slot[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_slots`);
    return saved ? JSON.parse(saved) : generateAvailableSlots();
  });

  const [bookings, setBookings] = useState<InterviewBooking[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
        action: 'OUTCOME_RECORDED',
        actor: 'Siddharth Roy',
        details: 'Evaluated Vikram Malhotra (21BCS0914) - Result: PASS (Score: 9.2/10). Track Badge Issued.',
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        action: 'OUTCOME_RECORDED',
        actor: 'Ananya Sharma',
        details: 'Evaluated Tanya Reddy (21BCE1342) - Result: RETAKE_REQUESTED. Concurrency test re-attempt.',
      }
    ];
  });

  const [currentPersona, setCurrentPersona] = useState<Persona>('STUDENT');
  const [activeStudentId, setActiveStudentId] = useState<string>('stu-101'); // Aryan Sharma
  const [activeInterviewerId, setActiveInterviewerId] = useState<string>('int-1'); // Siddharth Roy
  const [beforeAfterMode, setBeforeAfterMode] = useState<'BEFORE' | 'AFTER'>('BEFORE');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_interviewers`, JSON.stringify(interviewers));
  }, [interviewers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_slots`, JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentStudent = students.find((s) => s.id === activeStudentId) || students[0];
  const activeInterviewer = interviewers.find((i) => i.id === activeInterviewerId) || interviewers[0];

  // Concurrency-safe slot booking implementation
  const bookSlot = (slotId: string): { success: boolean; message: string } => {
    // 1. Guard: Check slot existence and availability
    const slot = slots.find((s) => s.id === slotId);
    if (!slot) {
      addToast('error', 'Booking Failed', 'The selected slot was not found.');
      return { success: false, message: 'Slot not found' };
    }

    if (slot.status !== 'AVAILABLE') {
      addToast('error', 'Race Condition Prevented', 'This slot was just claimed by another candidate. Please select another slot.');
      return { success: false, message: 'Slot already taken' };
    }

    // 2. Guard: Check candidate eligibility
    if (currentStudent.interviewStatus === 'SCHEDULED') {
      addToast('warning', 'Already Scheduled', 'You already have an active scheduled interview.');
      return { success: false, message: 'Student already has an interview booked' };
    }

    // 3. Atomic state update
    const bookingId = `book-${Date.now()}`;
    const newBooking: InterviewBooking = {
      id: bookingId,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      studentEmail: currentStudent.email,
      studentRollNumber: currentStudent.rollNumber,
      studentCollege: currentStudent.college,
      trackId: currentStudent.trackId,
      trackTitle: INITIAL_TRACK_BADGES.find(t => t.id === currentStudent.trackId)?.title || 'GenAI Track',
      interviewerId: slot.interviewerId,
      interviewerName: slot.interviewerName,
      interviewerTitle: slot.interviewerTitle,
      interviewerAvatar: interviewers.find(i => i.id === slot.interviewerId)?.avatar || '',
      slotId: slot.id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      meetUrl: `https://meet.google.com/grit-${Math.random().toString(36).substring(2, 6)}-eval`,
      bookedAt: new Date().toISOString(),
      status: 'SCHEDULED'
    };

    // Update slots
    setSlots((prev) => prev.map((s) => s.id === slotId ? { ...s, status: 'BOOKED' } : s));

    // Update bookings
    setBookings((prev) => [newBooking, ...prev]);

    // Update student status
    setStudents((prev) => prev.map((s) => 
      s.id === currentStudent.id 
        ? { ...s, interviewStatus: 'SCHEDULED', currentInterviewId: bookingId } 
        : s
    ));

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'SLOT_BOOKED',
        actor: currentStudent.name,
        details: `Booked slot on ${slot.date} at ${slot.startTime} with ${slot.interviewerName}`,
      },
      ...prev
    ]);

    addToast('success', 'Interview Confirmed!', `Slot booked with ${slot.interviewerName} on ${slot.date} at ${slot.startTime}. Calendar invitation generated.`);
    return { success: true, message: 'Interview scheduled successfully' };
  };

  const cancelBooking = (bookingId: string, reason = 'Student initiated reschedule') => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // Release slot
    setSlots((prev) => prev.map((s) => s.id === booking.slotId ? { ...s, status: 'AVAILABLE' } : s));

    // Mark booking cancelled
    setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));

    // Reset student status to eligible unbooked
    setStudents((prev) => prev.map((s) => 
      s.id === booking.studentId 
        ? { ...s, interviewStatus: 'ELIGIBLE_UNBOOKED', currentInterviewId: undefined } 
        : s
    ));

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'BOOKING_CANCELLED',
        actor: booking.studentName,
        details: `Cancelled booking for ${booking.date} at ${booking.startTime}. Reason: ${reason}`,
      },
      ...prev
    ]);

    addToast('info', 'Slot Released', 'Your previous slot has been freed. You can pick another slot anytime.');
  };

  const recordOutcome = (
    bookingId: string,
    outcome: OutcomeType,
    rubric: { codeArchitecture: number; systemKnowledge: number; problemSolving: number; integrityAndDefense: number },
    notes: string,
    actionItems: string,
    coolingDays = 14
  ) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const evaluation = {
      outcome,
      rubric,
      interviewerNotes: notes,
      actionItems,
      coolingDays: outcome === 'FAIL' ? coolingDays : undefined,
      evaluatedAt: new Date().toISOString(),
      interviewerName: activeInterviewer.name
    };

    // Update booking
    setBookings((prev) => prev.map((b) => 
      b.id === bookingId 
        ? { ...b, status: 'COMPLETED', evaluation } 
        : b
    ));

    // Calculate miles bonus if passed
    const milesDelta = outcome === 'PASS' ? 500 : 0;

    // Update student status & miles
    setStudents((prev) => prev.map((s) => {
      if (s.id !== booking.studentId) return s;

      let nextStatus: InterviewStatus = 'PASSED';
      if (outcome === 'FAIL') nextStatus = 'FAILED';
      if (outcome === 'RETAKE') nextStatus = 'RETAKE_REQUESTED';

      return {
        ...s,
        interviewStatus: nextStatus,
        currentMiles: s.currentMiles + milesDelta,
        currentInterviewId: bookingId
      };
    }));

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'OUTCOME_RECORDED',
        actor: activeInterviewer.name,
        details: `Recorded outcome ${outcome} for ${booking.studentName} (${booking.studentRollNumber}). Notes: "${notes.substring(0, 60)}..."`,
      },
      ...prev
    ]);

    addToast(
      outcome === 'PASS' ? 'success' : outcome === 'RETAKE' ? 'warning' : 'info',
      `Outcome Recorded: ${outcome}`,
      `Evaluation submitted for ${booking.studentName}. Result is now live on the student dashboard.`
    );
  };

  // Flag Malpractice / Revoke Badge
  const flagMalpractice = (studentId: string, reason: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const wasPassed = student.interviewStatus === 'PASSED';

    setStudents((prev) => prev.map((s) => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        interviewStatus: 'MALPRACTICE_FLAGGED',
        currentMiles: wasPassed ? Math.max(0, s.currentMiles - 500) : s.currentMiles,
        malpracticeHistory: {
          flaggedAt: new Date().toISOString(),
          reason,
          badgeNullified: wasPassed
        }
      };
    }));

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'BADGE_NULLIFIED_MALPRACTICE',
        actor: 'Integrity & Proctoring Team',
        details: `Flagged ${student.name} (${student.rollNumber}). Reason: ${reason}. Badge NULLIFIED. Miles deducted: ${wasPassed ? '500' : '0'}.`,
        badgeRevoked: wasPassed
      },
      ...prev
    ]);

    addToast('error', 'Malpractice Flagged', `Track Badge for ${student.name} was nullified and logged into the integrity audit trail.`);
  };

  const sendNudge = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: 'NUDGE_SENT',
        actor: 'GRIT Ops Automation',
        details: `Sent priority reminder email & WhatsApp notification to ${student.name} (${student.email}) to book interview slot.`,
      },
      ...prev
    ]);

    addToast('info', 'Reminder Dispatched', `Booking reminder sent to ${student.name} via Email & WhatsApp.`);
  };

  const updateInterviewerSlots = (interviewerId: string, days: string[], times: string[]) => {
    setInterviewers((prev) => prev.map((i) => 
      i.id === interviewerId 
        ? { ...i, availableDays: days, timeSlots: times }
        : i
    ));

    addToast('success', 'Availability Saved', 'Your weekly interview windows have been updated for new bookings.');
  };

  const setStudentStatusOverride = (status: InterviewStatus) => {
    setStudents((prev) => prev.map((s) => 
      s.id === activeStudentId ? { ...s, interviewStatus: status } : s
    ));
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_students`);
    localStorage.removeItem(`${STORAGE_KEY}_interviewers`);
    localStorage.removeItem(`${STORAGE_KEY}_slots`);
    localStorage.removeItem(`${STORAGE_KEY}_bookings`);
    localStorage.removeItem(`${STORAGE_KEY}_audit`);
    setStudents(INITIAL_STUDENTS);
    setInterviewers(INITIAL_INTERVIEWERS);
    setSlots(generateAvailableSlots());
    setBookings(INITIAL_BOOKINGS);
    addToast('info', 'Data Reset', 'All records restored to clean initial seed data.');
  };

  return (
    <InterviewContext.Provider
      value={{
        currentPersona,
        setCurrentPersona,
        activeStudentId,
        setActiveStudentId,
        currentStudent,
        activeInterviewerId,
        setActiveInterviewerId,
        activeInterviewer,
        students,
        interviewers,
        slots,
        bookings,
        auditLogs,
        toasts,
        beforeAfterMode,
        setBeforeAfterMode,
        bookSlot,
        cancelBooking,
        recordOutcome,
        flagMalpractice,
        sendNudge,
        updateInterviewerSlots,
        dismissToast,
        resetAllData,
        setStudentStatusOverride
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};

