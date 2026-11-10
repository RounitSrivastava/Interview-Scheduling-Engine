import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Save, 
  Check
} from 'lucide-react';

export const AvailabilityManager: React.FC = () => {
  const { activeInterviewer, updateInterviewerSlots } = useInterview();

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState<string[]>(activeInterviewer.availableDays);
  const [timeSlots, setTimeSlots] = useState<string[]>(activeInterviewer.timeSlots);
  const [newTimeInput, setNewTimeInput] = useState('');
  const [maxDaily, setMaxDaily] = useState(4);
  const [bufferMinutes, setBufferMinutes] = useState(15);
  const [isSaved, setIsSaved] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => 
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
    setIsSaved(false);
  };

  const addSlot = () => {
    if (!newTimeInput.trim() || timeSlots.includes(newTimeInput.trim())) return;
    setTimeSlots([...timeSlots, newTimeInput.trim()]);
    setNewTimeInput('');
    setIsSaved(false);
  };

  const removeSlot = (slotToRemove: string) => {
    setTimeSlots(timeSlots.filter((s) => s !== slotToRemove));
    setIsSaved(false);
  };

  const handleSave = () => {
    updateInterviewerSlots(activeInterviewer.id, selectedDays, timeSlots);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-orange-100 text-orange-800 border border-orange-200">
              Interviewer Control
            </span>
            <span className="text-xs text-stone-500 font-medium">• Capacity Calendar</span>
          </div>
          <h2 className="text-lg font-black text-stone-900 mt-1">
            Manage Availability & Weekly Schedule
          </h2>
          <p className="text-xs text-stone-500">
            Define your active evaluation windows, recurring time blocks, and anti-burnout slot throttles.
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm ${
            isSaved
              ? 'bg-emerald-700 text-white'
              : 'bg-indigo-700 hover:bg-indigo-600 text-white shadow-indigo-700/20'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Availability Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Schedule</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col: Days of the Week */}
        <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-800">
              1. Available Evaluation Days
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Select the weekdays candidates are allowed to book slots with you.
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {allDays.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`py-3 px-2 rounded-xl text-xs font-black border transition ${
                    isSelected
                      ? 'bg-orange-50 border-2 border-orange-600 text-orange-950 shadow-sm'
                      : 'bg-white border-[#E8E1D5] text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Slot Throttling Controls */}
          <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-700 font-bold">Daily Interview Cap</span>
              <span className="font-black text-amber-700">{maxDaily} slots/day</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={maxDaily}
              onChange={(e) => setMaxDaily(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-stone-700 font-bold">Buffer Between Sessions</span>
              <span className="font-black text-indigo-700">{bufferMinutes} mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={bufferMinutes}
              onChange={(e) => setBufferMinutes(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Col: Daily Time Slots */}
        <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-800">
              2. Daily Time Windows
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Define standard slot start times (30 mins per evaluation).
          </p>

          {/* Add custom slot */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. 03:30 PM"
              value={newTimeInput}
              onChange={(e) => setNewTimeInput(e.target.value)}
              className="flex-1 bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-stone-800 font-medium focus:outline-none focus:border-indigo-600 shadow-sm"
            />
            <button
              onClick={addSlot}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Slots List */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="p-3 rounded-xl bg-white border border-[#E8E1D5] flex items-center justify-between text-xs shadow-sm"
              >
                <div className="flex items-center gap-2 text-stone-800 font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{time}</span>
                  <span className="text-[10px] text-stone-500 font-sans font-medium">(30m window)</span>
                </div>
                <button
                  onClick={() => removeSlot(time)}
                  className="p-1 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
