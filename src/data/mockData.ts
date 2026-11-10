import { Student, TrackBadge, Interviewer, Slot, InterviewBooking } from '../types';

export const INITIAL_TRACK_BADGES: TrackBadge[] = [
  {
    id: 'track-genai',
    title: 'GenAI & Autonomous Agents',
    category: 'Applied AI',
    description: 'Mastery of LLM orchestrations, RAG pipelines, agentic workflows, and production model evaluation.',
    milesReward: 500,
    icon: 'Brain',
    skills: [
      { id: 's1', name: 'Prompt Engineering & Few-Shot Reasoning', cleared: true, clearedDate: '2026-10-24', score: 96 },
      { id: 's2', name: 'Vector DBs & Hybrid RAG Pipelines', cleared: true, clearedDate: '2026-10-28', score: 92 },
      { id: 's3', name: 'Fine-Tuning Open LLMs (LoRA/QLoRA)', cleared: true, clearedDate: '2026-11-02', score: 88 },
      { id: 's4', name: 'Multi-Agent Systems & Tool Calling', cleared: true, clearedDate: '2026-11-06', score: 94 },
    ]
  },
  {
    id: 'track-fullstack',
    title: 'Cloud-Native Full Stack',
    category: 'Software Engineering',
    description: 'Microservices architecture, event streaming with Kafka, distributed caching, and zero-downtime deployment.',
    milesReward: 450,
    icon: 'Layers',
    skills: [
      { id: 'fs1', name: 'Distributed Caching & Redis Patterns', cleared: true, clearedDate: '2026-10-15', score: 90 },
      { id: 'fs2', name: 'API Gateway & JWT Microservice Auth', cleared: true, clearedDate: '2026-10-22', score: 85 },
      { id: 'fs3', name: 'Docker & Kubernetes Pod Orchestration', cleared: false },
      { id: 'fs4', name: 'CI/CD Pipelines & Observability', cleared: false }
    ]
  }
];

export const INITIAL_INTERVIEWERS: Interviewer[] = [
  {
    id: 'int-1',
    name: 'Siddharth Roy',
    title: 'Lead AI Architect',
    organization: 'Accenture',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    rating: 4.9,
    interviewsConducted: 84,
    timezone: 'Asia/Kolkata (IST)',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'],
    isActive: true
  },
  {
    id: 'int-2',
    name: 'Ananya Sharma',
    title: 'Principal Systems Engineer',
    organization: 'Accenture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    rating: 4.8,
    interviewsConducted: 62,
    timezone: 'Asia/Kolkata (IST)',
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    timeSlots: ['11:00 AM', '03:00 PM', '05:00 PM'],
    isActive: true
  },
  {
    id: 'int-3',
    name: 'Rahul Varma',
    title: 'Staff Systems Architect',
    organization: 'Accenture',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    rating: 4.7,
    interviewsConducted: 47,
    timezone: 'Asia/Kolkata (IST)',
    availableDays: ['Tue', 'Thu', 'Fri'],
    timeSlots: ['02:30 PM', '04:00 PM', '05:30 PM'],
    isActive: true
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-101',
    name: 'Rounit Srivastava',
    rollNumber: '23051042',
    email: 'rounit.srivastava@kiit.ac.in',
    avatar: '/rounit-photo.png',
    college: 'KIIT University, Bhubaneswar',
    currentMiles: 2450,
    trackId: 'track-genai',
    skillsCompleted: 4,
    totalSkills: 4,
    eligibleSince: '2026-11-06T10:00:00Z',
    interviewStatus: 'ELIGIBLE_UNBOOKED'
  },
  {
    id: 'stu-102',
    name: 'Sneha Patel',
    rollNumber: '23051180',
    email: 'sneha.23051180@kiit.ac.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    college: 'KIIT University, Bhubaneswar',
    currentMiles: 2600,
    trackId: 'track-genai',
    skillsCompleted: 4,
    totalSkills: 4,
    eligibleSince: '2026-11-04T14:30:00Z',
    interviewStatus: 'SCHEDULED',
    currentInterviewId: 'book-201'
  },
  {
    id: 'stu-103',
    name: 'Vikram Malhotra',
    rollNumber: '23050914',
    email: 'vikram.23050914@kiit.ac.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    college: 'KIIT University, Bhubaneswar',
    currentMiles: 3100,
    trackId: 'track-genai',
    skillsCompleted: 4,
    totalSkills: 4,
    eligibleSince: '2026-10-30T09:00:00Z',
    interviewStatus: 'PASSED',
    currentInterviewId: 'book-202'
  },
  {
    id: 'stu-104',
    name: 'Rohan Mehta',
    rollNumber: '23050755',
    email: 'rohan.23050755@kiit.ac.in',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    college: 'KIIT University, Bhubaneswar',
    currentMiles: 1980,
    trackId: 'track-genai',
    skillsCompleted: 4,
    totalSkills: 4,
    eligibleSince: '2026-11-03T11:20:00Z',
    interviewStatus: 'ELIGIBLE_UNBOOKED'
  },
  {
    id: 'stu-105',
    name: 'Tanya Reddy',
    rollNumber: '23051342',
    email: 'tanya.23051342@kiit.ac.in',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    college: 'KIIT University, Bhubaneswar',
    currentMiles: 2200,
    trackId: 'track-genai',
    skillsCompleted: 4,
    totalSkills: 4,
    eligibleSince: '2026-11-01T15:00:00Z',
    interviewStatus: 'RETAKE_REQUESTED',
    currentInterviewId: 'book-203'
  },
  {
    id: 'stu-106',
    name: 'Devansh Joshi',
    rollNumber: '23051501',
    email: 'devansh.23051501@kiit.ac.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    college: 'KIIT University, Bhubaneswar',
    currentMiles: 2950,
    trackId: 'track-genai',
    skillsCompleted: 4,
    totalSkills: 4,
    eligibleSince: '2026-10-25T12:00:00Z',
    interviewStatus: 'PASSED',
    currentInterviewId: 'book-204'
  }
];

export const INITIAL_BOOKINGS: InterviewBooking[] = [
  {
    id: 'book-101',
    studentId: 'stu-101',
    studentName: 'Rounit Srivastava',
    studentEmail: 'rounit.srivastava@kiit.ac.in',
    studentRollNumber: '23051042',
    studentCollege: 'KIIT University, Bhubaneswar',
    trackId: 'track-genai',
    trackTitle: 'GenAI & Autonomous Agents',
    interviewerId: 'int-1',
    interviewerName: 'Siddharth Roy',
    interviewerTitle: 'Lead AI Architect',
    interviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    slotId: 'slot-pre-rounit',
    date: '2026-11-12',
    startTime: '04:30 PM',
    endTime: '05:00 PM',
    meetUrl: 'https://meet.google.com/grit-ai-eval',
    bookedAt: '2026-11-06T10:15:00Z',
    status: 'SCHEDULED'
  },
  {
    id: 'book-201',
    studentId: 'stu-102',
    studentName: 'Sneha Patel',
    studentEmail: 'sneha.23051180@kiit.ac.in',
    studentRollNumber: '23051180',
    studentCollege: 'KIIT University, Bhubaneswar',
    trackId: 'track-genai',
    trackTitle: 'GenAI & Autonomous Agents',
    interviewerId: 'int-1',
    interviewerName: 'Siddharth Roy',
    interviewerTitle: 'Lead AI Architect',
    interviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    slotId: 'slot-pre-1',
    date: '2026-11-12',
    startTime: '05:30 PM',
    endTime: '06:00 PM',
    meetUrl: 'https://meet.google.com/grit-ai-eval',
    bookedAt: '2026-11-05T10:15:00Z',
    status: 'SCHEDULED'
  },
  {
    id: 'book-202',
    studentId: 'stu-103',
    studentName: 'Vikram Malhotra',
    studentEmail: 'vikram.23050914@kiit.ac.in',
    studentRollNumber: '23050914',
    studentCollege: 'KIIT University, Bhubaneswar',
    trackId: 'track-genai',
    trackTitle: 'GenAI & Autonomous Agents',
    interviewerId: 'int-1',
    interviewerName: 'Siddharth Roy',
    interviewerTitle: 'Lead AI Architect',
    interviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    slotId: 'slot-pre-2',
    date: '2026-11-08',
    startTime: '11:30 AM',
    endTime: '12:00 PM',
    meetUrl: 'https://meet.google.com/grit-ai-eval',
    bookedAt: '2026-11-02T16:00:00Z',
    status: 'COMPLETED',
    evaluation: {
      outcome: 'PASS',
      rubric: {
        codeArchitecture: 5,
        systemKnowledge: 5,
        problemSolving: 4,
        integrityAndDefense: 5
      },
      interviewerNotes: 'Outstanding understanding of LangChain and agent loop boundaries. Defended QLoRA rank choices with benchmark data.',
      actionItems: 'Track Badge verified. Credited +500 GRIT Miles.',
      evaluatedAt: '2026-11-08T12:05:00Z',
      interviewerName: 'Siddharth Roy'
    }
  },
  {
    id: 'book-203',
    studentId: 'stu-105',
    studentName: 'Tanya Reddy',
    studentEmail: 'tanya.23051342@kiit.ac.in',
    studentRollNumber: '23051342',
    studentCollege: 'KIIT University, Bhubaneswar',
    trackId: 'track-genai',
    trackTitle: 'GenAI & Autonomous Agents',
    interviewerId: 'int-2',
    interviewerName: 'Ananya Sharma',
    interviewerTitle: 'Principal Systems Engineer',
    interviewerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    slotId: 'slot-pre-3',
    date: '2026-11-07',
    startTime: '03:00 PM',
    endTime: '03:30 PM',
    meetUrl: 'https://meet.google.com/grit-ai-eval',
    bookedAt: '2026-11-03T09:20:00Z',
    status: 'COMPLETED',
    evaluation: {
      outcome: 'RETAKE',
      rubric: {
        codeArchitecture: 4,
        systemKnowledge: 3,
        problemSolving: 3,
        integrityAndDefense: 4
      },
      interviewerNotes: 'Candidate demonstrates strong grasp of vector chunking, but struggled to explain multi-agent deadlock handling in their tool orchestrator.',
      actionItems: 'Requested 15-minute targeted retake on concurrency boundaries. No cooling period penalty.',
      evaluatedAt: '2026-11-07T15:35:00Z',
      interviewerName: 'Ananya Sharma'
    }
  },
  {
    id: 'book-204',
    studentId: 'stu-106',
    studentName: 'Devansh Joshi',
    studentEmail: 'devansh.23051501@kiit.ac.in',
    studentRollNumber: '23051501',
    studentCollege: 'KIIT University, Bhubaneswar',
    trackId: 'track-genai',
    trackTitle: 'GenAI & Autonomous Agents',
    interviewerId: 'int-3',
    interviewerName: 'Rahul Varma',
    interviewerTitle: 'Staff Platform Engineer',
    interviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    slotId: 'slot-pre-4',
    date: '2026-11-05',
    startTime: '04:00 PM',
    endTime: '04:30 PM',
    meetUrl: 'https://meet.google.com/grit-ai-eval',
    bookedAt: '2026-10-31T12:00:00Z',
    status: 'COMPLETED',
    evaluation: {
      outcome: 'PASS',
      rubric: {
        codeArchitecture: 4,
        systemKnowledge: 4,
        problemSolving: 4,
        integrityAndDefense: 3
      },
      interviewerNotes: 'Passed baseline code walkthrough.',
      actionItems: 'Track Badge Issued.',
      evaluatedAt: '2026-11-05T16:35:00Z',
      interviewerName: 'Rahul Varma'
    }
  }
];

export const generateAvailableSlots = (): Slot[] => {
  const slots: Slot[] = [];
  const today = new Date();
  
  for (let d = 1; d <= 5; d++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + d);
    const dayOfWeek = targetDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    const dateStr = targetDate.toISOString().split('T')[0];
    
    INITIAL_INTERVIEWERS.forEach((interviewer) => {
      interviewer.timeSlots.forEach((time, idx) => {
        if (d === 2 && interviewer.id === 'int-1' && time === '04:30 PM') {
          slots.push({
            id: 'slot-pre-1',
            interviewerId: interviewer.id,
            interviewerName: interviewer.name,
            interviewerTitle: interviewer.title,
            date: dateStr,
            startTime: '04:30 PM',
            endTime: '05:00 PM',
            status: 'BOOKED'
          });
          return;
        }

        slots.push({
          id: `slot-${interviewer.id}-${dateStr}-${idx}`,
          interviewerId: interviewer.id,
          interviewerName: interviewer.name,
          interviewerTitle: interviewer.title,
          date: dateStr,
          startTime: time,
          endTime: time.replace('00', '30').replace('30', '00'),
          status: 'AVAILABLE'
        });
      });
    });
  }

  return slots;
};
