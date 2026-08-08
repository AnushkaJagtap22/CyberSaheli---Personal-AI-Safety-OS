import React, { useState } from 'react';
import { CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import type { VerificationTask } from '../services/caseEngine';

interface VerificationWorkbenchProps {
  tasks: VerificationTask[];
  onTaskToggle?: (taskId: string) => void;
}

export const VerificationWorkbench: React.FC<VerificationWorkbenchProps> = ({ tasks, onTaskToggle }) => {
  const [taskList, setTaskList] = useState<VerificationTask[]>(tasks);

  const handleToggle = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    if (onTaskToggle) onTaskToggle(id);
  };

  const completedCount = taskList.filter((t) => t.completed).length;

  return (
    <div className="titanium-card p-6 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#4f8cff]" />
            Actionable Verification Workbench
          </span>
          <h3 className="text-base font-extrabold text-[#ffffff] mt-0.5">Identity Verification Tasks</h3>
        </div>

        <div className="px-3 py-1.5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#22c55e] font-bold">
          {completedCount}/{taskList.length} Verified
        </div>
      </div>

      <p className="text-xs text-[#8b909b]">
        Instead of guessing risk percentages, complete these targeted verification tasks to safely validate suspect claims.
      </p>

      <div className="space-y-3">
        {taskList.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggle(task.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 text-xs ${
              task.completed
                ? 'bg-[#22c55e]/15 border-[#22c55e] text-[#ffffff]'
                : 'bg-[#111214] border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`h-4 w-4 ${task.completed ? 'text-[#22c55e]' : 'text-[#8b909b]'}`} />
                <span className={`font-extrabold text-sm ${task.completed ? 'line-through text-[#22c55e]' : 'text-[#ffffff]'}`}>
                  {task.title}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[#4f8cff]/20 text-[#4f8cff] font-bold border border-[#4f8cff]/30">
                  Gain: {task.confidenceGain}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#17181c] text-[#8b909b] border border-[rgba(255,255,255,0.08)] flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {task.estimatedTime}
                </span>
              </div>
            </div>

            <p className="text-[#c6c8d1] leading-relaxed text-[11px] pl-6">{task.description}</p>
          </div>
        ))}
      </div>

      {completedCount === taskList.length && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e] text-xs font-bold text-[#ffffff] text-center flex items-center justify-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#22c55e]" />
          <span>All Identity Verification Tasks Complete! Case Health score updated.</span>
        </div>
      )}
    </div>
  );
};
