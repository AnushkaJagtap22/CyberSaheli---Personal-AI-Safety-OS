import React from 'react';
import type { AgentStatus } from '../services/agentOrchestrator';
import { ShieldCheck, CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';

interface LiveAgentPanelProps {
  statuses: AgentStatus[];
}

export const LiveAgentPanel: React.FC<LiveAgentPanelProps> = ({ statuses }) => {
  return (
    <div className="p-5 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-xl space-y-4 font-sans text-[#232323]">
      <div className="flex items-center justify-between border-b border-[#e4decb] pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#5b6b47]" />
          <h3 className="text-sm font-bold text-[#232323]">Live AI Agent Activity Panel</h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#5b6b47]/10 text-[#5b6b47]">
          12 Active Specialists
        </span>
      </div>

      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {statuses.map((agent) => (
          <div
            key={agent.id}
            className={`p-3 rounded-2xl border text-xs flex items-start justify-between gap-2 transition-all ${
              agent.status === 'running'
                ? 'bg-[#5b6b47]/10 border-[#5b6b47] text-[#232323]'
                : agent.status === 'flagged'
                ? 'bg-[#a34739]/15 border-[#a34739] text-[#a34739]'
                : agent.status === 'completed'
                ? 'bg-[#fffdf8] border-[#e4decb] text-[#232323]'
                : 'bg-[#f1ece2] border-[#e4decb] text-[#66605a] opacity-60'
            }`}
          >
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center gap-1.5 font-bold">
                {agent.status === 'running' && <RefreshCw className="h-3.5 w-3.5 text-[#5b6b47] animate-spin" />}
                {agent.status === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-[#7c9a6d]" />}
                {agent.status === 'flagged' && <AlertTriangle className="h-3.5 w-3.5 text-[#a34739]" />}
                <span>{agent.name}</span>
              </div>
              <span className="text-[10px] text-[#66605a] font-mono block">{agent.role}</span>
              {agent.outputMessage && (
                <p className="text-[10px] italic text-[#232323] mt-1 font-sans">{agent.outputMessage}</p>
              )}
            </div>

            <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#fffdf8] border border-[#e4decb]">
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
