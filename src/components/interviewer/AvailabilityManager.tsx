import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  Sliders, 
  ShieldCheck,
  UserCheck
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
    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Interviewer Control
            </span>
            <span className="text-xs text-slate-400">• Assignment Requirement</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Manage Availability & Weekly Schedule
          </h2>
          <p className="text-xs text-slate-400">
            Define your active evaluation windows, recurring time blocks, and anti-burnout slot throttles.
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg ${
            isSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
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
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              1. Available Evaluation Days
            </h3>
          </div>
          <p className="text-xs text-slate-400">
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
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition ${
                    isSelected
                      ? 'bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Slot Throttling Controls */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Daily Interview Cap</span>
              <span className="font-bold text-amber-400">{maxDaily} slots/day</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={maxDaily}
              onChange={(e) => setMaxDaily(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-300 font-medium">Buffer Between Sessions</span>
              <span className="font-bold text-indigo-400">{bufferMinutes} mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={bufferMinutes}
              onChange={(e) => setBufferMinutes(parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Col: Daily Time Slots */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              2. Daily Time Windows
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Define standard slot start times (30 mins per evaluation).
          </p>

          {/* Add custom slot */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. 03:30 PM"
              value={newTimeInput}
              onChange={(e) => setNewTimeInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={addSlot}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition"
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
                className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 text-slate-200 font-mono font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{time}</span>
                  <span className="text-[10px] text-slate-500 font-sans">(30m window)</span>
                </div>
                <button
                  onClick={() => removeSlot(time)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
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
