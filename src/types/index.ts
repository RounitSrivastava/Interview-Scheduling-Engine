export type InterviewStatus = 
  | 'NOT_ELIGIBLE' 
  | 'ELIGIBLE_UNBOOKED' 
  | 'BOOKING_HELD' 
  | 'SCHEDULED' 
  | 'IN_PROGRESS' 
  | 'PASSED' 
  | 'FAILED' 
  | 'RETAKE_REQUESTED' 
  | 'MALPRACTICE_FLAGGED';

export type OutcomeType = 'PASS' | 'FAIL' | 'RETAKE';

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  avatar: string;
  college: string;
  currentMiles: number;
  trackId: string;
  skillsCompleted: number;
  totalSkills: number;
  eligibleSince?: string;
  interviewStatus: InterviewStatus;
  currentInterviewId?: string;
  malpracticeHistory?: {
    flaggedAt: string;
    reason: string;
    badgeNullified: boolean;
  };
}

export interface TrackBadge {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: {
    id: string;
    name: string;
    cleared: boolean;
    clearedDate?: string;
    score?: number;
  }[];
  milesReward: number;
  icon: string;
}

export interface Interviewer {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatar: string;
  rating: number;
  interviewsConducted: number;
  timezone: string;
  availableDays: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  timeSlots: string[]; // e.g. ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
  isActive: boolean;
}

export interface Slot {
  id: string;
  interviewerId: string;
  interviewerName: string;
  interviewerTitle: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "04:30 PM"
  endTime: string; // e.g. "05:00 PM"
  status: 'AVAILABLE' | 'HELD' | 'BOOKED';
  heldByStudentId?: string;
  heldUntil?: number; // timestamp
}

export interface InterviewEvaluation {
  outcome: OutcomeType;
  rubric: {
    codeArchitecture: number; // 1-5
    systemKnowledge: number; // 1-5
    problemSolving: number; // 1-5
    integrityAndDefense: number; // 1-5
  };
  interviewerNotes: string;
  actionItems: string;
  coolingDays?: number;
  evaluatedAt: string;
  interviewerName: string;
}

export interface InterviewBooking {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentRollNumber: string;
  studentCollege: string;
  trackId: string;
  trackTitle: string;
  interviewerId: string;
  interviewerName: string;
  interviewerTitle: string;
  interviewerAvatar: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  meetUrl: string;
  bookedAt: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  evaluation?: InterviewEvaluation;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  badgeRevoked?: boolean;
}
