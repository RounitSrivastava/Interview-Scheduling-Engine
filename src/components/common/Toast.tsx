import React from 'react';
import { useInterview } from '../../context/InterviewContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useInterview();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-blue-500/30 bg-[#0F172A]/95 text-blue-200';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500/40 bg-[#062016]/95 text-emerald-100 shadow-emerald-950/50';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/40 bg-[#241705]/95 text-amber-100 shadow-amber-950/50';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500/40 bg-[#25080E]/95 text-rose-100 shadow-rose-950/50';
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderClass} flex items-start gap-3`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs">
              <h4 className="font-bold text-sm tracking-tight mb-0.5">{toast.title}</h4>
              <p className="opacity-90 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
