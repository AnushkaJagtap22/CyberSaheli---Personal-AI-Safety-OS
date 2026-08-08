import React from 'react';
import type { CaseDiaryEntry } from '../services/caseEngine';
import { Clock } from 'lucide-react';

interface CaseDiaryProps {
  diary: CaseDiaryEntry[];
}

export const CaseDiary: React.FC<CaseDiaryProps> = ({ diary }) => {
  return (
    <div className="titanium-card p-6 space-y-4 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-sm font-bold text-[#ffffff]">AI Case Diary (Living Investigation Journal)</h3>
        </div>
        <span className="text-[10px] font-mono text-[#8b909b] font-bold">
          {diary.length} Action Logs Recorded
        </span>
      </div>

      <div className="space-y-3 pl-3 border-l-2 border-[#4f8cff] text-xs">
        {diary.map((entry) => (
          <div key={entry.id} className="relative pl-4 space-y-0.5">
            <span className="text-[10px] text-[#8b909b] font-mono font-bold block">{entry.timestamp} • {entry.agentName}</span>
            <p className="font-semibold text-[#ffffff]">{entry.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
