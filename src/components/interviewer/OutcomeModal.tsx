import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Award, 
  Send
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
  const [coolingDays] = useState(14);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#DDD0BC] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-[#F4EFE6]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-800 border border-orange-200 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base">Record Interview Outcome</h3>
              <p className="text-xs text-stone-500 font-medium">
                Candidate: <strong className="text-stone-800">{booking.studentName}</strong> ({booking.studentRollNumber}) • {booking.trackTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          
          {/* Outcome Selector */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2.5">
              1. Final Decision
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setOutcome('PASS')}
                className={`p-4 rounded-2xl border transition flex flex-col items-center gap-1.5 ${
                  outcome === 'PASS'
                    ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 ring-1 ring-emerald-500 shadow-sm'
                    : 'bg-white border-[#E8E1D5] text-stone-600 hover:border-stone-400'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-black">PASS (Award Badge)</span>
                <span className="text-[10px] text-emerald-800 font-semibold">+500 Miles Credited</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('RETAKE')}
                className={`p-4 rounded-2xl border transition flex flex-col items-center gap-1.5 ${
                  outcome === 'RETAKE'
                    ? 'bg-amber-50 border-2 border-amber-600 text-amber-950 ring-1 ring-amber-500 shadow-sm'
                    : 'bg-white border-[#E8E1D5] text-stone-600 hover:border-stone-400'
                }`}
              >
                <RotateCcw className="w-5 h-5 text-amber-700" />
                <span className="text-xs font-black">RETAKE LATER</span>
                <span className="text-[10px] text-amber-800 font-semibold">Targeted re-attempt</span>
              </button>

              <button
                type="button"
                onClick={() => setOutcome('FAIL')}
                className={`p-4 rounded-2xl border transition flex flex-col items-center gap-1.5 ${
                  outcome === 'FAIL'
                    ? 'bg-rose-50 border-2 border-rose-600 text-rose-950 ring-1 ring-rose-500 shadow-sm'
                    : 'bg-white border-[#E8E1D5] text-stone-600 hover:border-stone-400'
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <span className="text-xs font-black">FAIL</span>
                <span className="text-[10px] text-rose-800 font-semibold">14-day cooling</span>
              </button>
            </div>
          </div>

          {/* Evaluation Rubric */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2.5">
              2. Competency Rubric (1 to 5)
            </label>
            <div className="bg-white border border-[#E8E1D5] rounded-2xl p-5 space-y-4 shadow-sm">
              
              {/* Metric 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-stone-900 block">Code Architecture & Modularity</span>
                  <span className="text-[10px] text-stone-500">Clean separation of prompts, vector store, and agent tool execution.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('codeArchitecture', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition ${
                        rubric.codeArchitecture >= score
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-[#F4EFE6] text-stone-600'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5]">
                <div>
                  <span className="text-xs font-black text-stone-900 block">System Knowledge & AI Theory</span>
                  <span className="text-[10px] text-stone-500">Understands RAG chunking, embeddings, fine-tuning loss curves.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('systemKnowledge', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition ${
                        rubric.systemKnowledge >= score
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-[#F4EFE6] text-stone-600'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5]">
                <div>
                  <span className="text-xs font-black text-stone-900 block">Problem Solving & Live Reasoning</span>
                  <span className="text-[10px] text-stone-500">Ability to debug agent edge cases and hallucination handling on the fly.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('problemSolving', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition ${
                        rubric.problemSolving >= score
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-[#F4EFE6] text-stone-600'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5]">
                <div>
                  <span className="text-xs font-black text-stone-900 block">Integrity & Technical Defense</span>
                  <span className="text-[10px] text-stone-500">Proven authorship; can explain arbitrary code segments convincingly.</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => handleScoreChange('integrityAndDefense', score)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition ${
                        rubric.integrityAndDefense >= score
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-[#F4EFE6] text-stone-600'
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
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              3. Interviewer Assessment & Constructive Feedback
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-[#E8E1D5] rounded-2xl p-3 text-xs text-stone-800 font-medium focus:outline-none focus:border-orange-500 shadow-sm"
              placeholder="Detail candidate technical strengths, answers to edge cases, and areas of improvement..."
            />
          </div>

          {/* Action Items / Instructions */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              4. Action Items & Next Steps for Candidate
            </label>
            <input
              type="text"
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              className="w-full bg-white border border-[#E8E1D5] rounded-2xl p-3 text-xs text-stone-800 font-medium focus:outline-none focus:border-orange-500 shadow-sm"
              placeholder="e.g. Verified for badge, or revise concurrency lecture 4..."
            />
          </div>

        </form>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E1D5] bg-[#F4EFE6]/90 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Outcome will instantly publish to Student Dashboard & Cohort Leaderboard.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md shadow-orange-600/20 flex items-center gap-2"
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
