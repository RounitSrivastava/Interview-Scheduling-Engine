import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Calendar, 
  Clock, 
  X, 
  Check, 
  Zap,
  Lock
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { slots, bookSlot } = useInterview();
  
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#DDD0BC] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-[#F4EFE6]/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-100 text-orange-800 border border-orange-200">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-stone-900 text-base">Select Interview Slot</h3>
              <p className="text-xs text-stone-500 font-medium">
                GenAI & Autonomous Agents Track Badge • 30 mins Live Code Walkthrough
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Step 1: Date Selector */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2.5">
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
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-orange-50 border-2 border-orange-600 text-orange-950 shadow-sm'
                        : 'bg-white border-[#E8E1D5] text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-black">{formatDateDisplay(date)}</div>
                    <div className="text-[10px] mt-1 font-bold">
                      {availableCount > 0 ? (
                        <span className="text-emerald-700">{availableCount} slots left</span>
                      ) : (
                        <span className="text-rose-600">Filled</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Available Slots for Selected Date */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2.5">
              2. Available Time Windows ({formatDateDisplay(selectedDate)})
            </label>

            {dateSlots.length === 0 ? (
              <div className="p-6 text-center text-stone-500 text-xs bg-white rounded-2xl border border-[#E8E1D5]">
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
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'bg-indigo-50 border-2 border-indigo-600 text-stone-900 shadow-md ring-1 ring-indigo-600'
                          : isAvailable
                          ? 'bg-white border-[#E8E1D5] hover:border-stone-400 text-stone-900 cursor-pointer shadow-sm'
                          : 'bg-stone-100 border-stone-200 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-700">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.startTime} – {slot.endTime}</span>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                        {!isAvailable && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-200 text-stone-600">
                            Booked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-stone-200">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-[10px] flex items-center justify-center font-black">
                          {slot.interviewerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900">{slot.interviewerName}</p>
                          <p className="text-[10px] text-stone-500 font-medium">{slot.interviewerTitle}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Double-Booking Prevention & Concurrency Notice */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-black text-emerald-900">Atomic Reservation Guard</span>
              <p className="text-[11px] leading-relaxed text-emerald-800 font-medium">
                Slots are locked atomically using serializable transactions with unique constraints. If two students submit the same millisecond, the database grants the slot to the first transaction and prompts the second for an alternate slot.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8E1D5] bg-[#F4EFE6]/90 flex items-center justify-between">
          <div className="text-xs text-stone-600 font-medium">
            {selectedSlot ? (
              <span className="text-stone-900">
                Selected: <strong className="text-orange-700">{formatDateDisplay(selectedSlot.date)}</strong> at{' '}
                <strong className="text-orange-700">{selectedSlot.startTime}</strong> with {selectedSlot.interviewerName}
              </span>
            ) : (
              <span>Please pick an available time slot</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition"
            >
              Cancel
            </button>
            <button
              disabled={!selectedSlotId || isSubmitting}
              onClick={handleBooking}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                selectedSlotId && !isSubmitting
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20 hover:from-orange-700 hover:to-amber-700'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
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
