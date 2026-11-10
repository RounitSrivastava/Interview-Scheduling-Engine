import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Star, 
  Award, 
  FileText,
  Send,
  ShieldCheck
} from 'lucide-react';
import { InterviewBooking, OutcomeType } from '../../types';

interface OutcomeModalProps {
  booking: InterviewBooking;
  isOpen: boolean;
  onClose: () => void;
}

export const OutcomeModal: React.FC<OutcomeModalProps> = ({ booking, isOpen, onClose }) => {
  const { recordOutcome } = useInterview();

  const [outcome, setOutcome] = useState<OutcomeType>('PASS');
  const [rubric, setRubric] = useState({
    codeArchitecture: 5,
    systemKnowledge: 4,
    problemSolving: 5,
    integrityAndDefense: 5
  });
  const [notes, setNotes] = useState(
    'Demonstrated clear understanding of RAG chunking trade-offs and agent tool calling protocols. Confidently explained why FAISS was chosen over Chroma for latency.'
  );
  const [actionItems, setActionItems] = useState(
    'Verified for GenAI Track Badge. Awarded +500 GRIT Miles to student leaderboard rank.'
  );
  const [coolingDays, setCoolingDays] = useState(14);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      recordOutcome(booking.id, outcome, rubric, notes, actionItems, coolingDays);
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  const handleScoreChange = (field: keyof typeof rubric, score: number) => {
    setRubric((prev) => ({ ...prev, [field]: score }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Record Interview Outcome</h3>
              <p className="text-xs text-slate-400">
                Candidate: <strong className="text-slate-200">{booking.studentName}</strong> ({booking.studentRollNumber}) • {booking.trackTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          
          {/* Outcome Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              1. Final Decision
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setOutcome('PASS')}
                className={`p-3.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                  outcome === 'PASS'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500 shadow-lg shadow-emerald-950/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">PASS (Award Badge)</span>
                <span className="text-[10px] text-slate-400">+500 Miles Credited</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('RETAKE')}
                className={`p-3.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                  outcome === 'RETAKE'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-300 ring-1 ring-amber-500 shadow-lg shadow-amber-950/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <RotateCcw className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold">RETAKE LATER</span>
                <span className="text-[10px] text-slate-400">Targeted re-attempt</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('FAIL')}
                className={`p-3.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                  outcome === 'FAIL'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500 shadow-lg shadow-rose-950/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-bold">FAIL</span>
                <span className="text-[10px] text-slate-400">14-day learning cooldown</span>
              </button>
            </div>
          </div>

          {/* Evaluation Rubric */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              2. Competency Rubric (1 to 5)
            </label>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3.5">
              
              {/* Metric 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Code Architecture & Modularity</span>
                  <span className="text-[10px] text-slate-400">Clean separation of prompts, vector store, and agent tool execution.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('codeArchitecture', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        rubric.codeArchitecture >= score
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">System Knowledge & AI Theory</span>
                  <span className="text-[10px] text-slate-400">Understands RAG chunking, embeddings, fine-tuning loss curves.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('systemKnowledge', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        rubric.systemKnowledge >= score
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Problem Solving & Live Reasoning</span>
                  <span className="text-[10px] text-slate-400">Ability to debug agent edge cases and hallucination handling on the fly.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('problemSolving', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        rubric.problemSolving >= score
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Integrity & Technical Defense</span>
                  <span className="text-[10px] text-slate-400">Proven authorship; can explain arbitrary code segments convincingly.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('integrityAndDefense', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        rubric.integrityAndDefense >= score
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Feedback Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              3. Interviewer Assessment & Constructive Feedback
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans"
              placeholder="Detail candidate technical strengths, answers to edge cases, and areas of improvement..."
            />
          </div>

          {/* Action Items / Instructions */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              4. Action Items & Next Steps for Candidate
            </label>
            <input
              type="text"
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Verified for badge, or revise concurrency lecture 4..."
            />
          </div>

        </form>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Outcome will instantly publish to Student Dashboard & Cohort Leaderboard.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Evaluation</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
