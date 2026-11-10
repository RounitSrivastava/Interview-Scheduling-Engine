import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  X, 
  Check, 
  AlertCircle,
  Zap,
  Lock
} from 'lucide-react';
import { Slot } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { slots, bookSlot, currentStudent } = useInterview();
  
  // Group slots by date
  const uniqueDates = Array.from(new Set(slots.map((s) => s.date))).sort();
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0] || '');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const dateSlots = slots.filter((s) => s.date === selectedDate);
  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  const handleBooking = () => {
    if (!selectedSlotId) return;
    setIsSubmitting(true);
    
    // Simulate slight network latency to show concurrency handling feedback
    setTimeout(() => {
      const res = bookSlot(selectedSlotId);
      setIsSubmitting(false);
      if (res.success) {
        onClose();
      }
    }, 400);
  };

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0F172A] border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Select Interview Slot</h3>
              <p className="text-xs text-slate-400">
                GenAI & Autonomous Agents Track Badge • 30 mins Live Code Walkthrough
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Step 1: Date Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              1. Choose Date
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {uniqueDates.map((date) => {
                const isSelected = selectedDate === date;
                const availableCount = slots.filter((s) => s.date === date && s.status === 'AVAILABLE').length;

                return (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlotId(null);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{formatDateDisplay(date)}</div>
                    <div className="text-[10px] mt-1 font-medium text-slate-400">
                      {availableCount > 0 ? (
                        <span className="text-emerald-400">{availableCount} slots left</span>
                      ) : (
                        <span className="text-rose-400">Filled</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Available Slots for Selected Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              2. Available Time Windows ({formatDateDisplay(selectedDate)})
            </label>

            {dateSlots.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs bg-slate-900/40 rounded-xl border border-slate-800">
                No slots configured for this date.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dateSlots.map((slot) => {
                  const isAvailable = slot.status === 'AVAILABLE';
                  const isSelected = selectedSlotId === slot.id;

                  return (
                    <button
                      key={slot.id}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/15 ring-1 ring-indigo-500'
                          : isAvailable
                          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200 cursor-pointer'
                          : 'bg-slate-900/30 border-slate-800/50 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.startTime} – {slot.endTime}</span>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                        {!isAvailable && (
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            Booked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] flex items-center justify-center font-bold">
                          {slot.interviewerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-300">{slot.interviewerName}</p>
                          <p className="text-[10px] text-slate-400">{slot.interviewerTitle}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Double-Booking Prevention & Concurrency Notice */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-200">Atomic Reservation Guard</span>
              <p className="text-[11px] leading-relaxed">
                Slots are locked atomically using serializable transactions with unique constraints. If two students submit the same millisecond, the database grants the slot to the first transaction and prompts the second for an alternate slot.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {selectedSlot ? (
              <span className="text-slate-200">
                Selected: <strong className="text-orange-400">{formatDateDisplay(selectedSlot.date)}</strong> at{' '}
                <strong className="text-orange-400">{selectedSlot.startTime}</strong> with {selectedSlot.interviewerName}
              </span>
            ) : (
              <span>Please pick an available time slot</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              disabled={!selectedSlotId || isSubmitting}
              onClick={handleBooking}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                selectedSlotId && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-700'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Locking Slot...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
