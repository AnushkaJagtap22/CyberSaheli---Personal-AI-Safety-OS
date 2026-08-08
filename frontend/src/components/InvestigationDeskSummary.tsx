import React from 'react';
import { ShieldCheck, ArrowRight, FileCheck } from 'lucide-react';
import type { CyberCase } from '../services/caseEngine';

interface InvestigationDeskSummaryProps {
  activeCase: CyberCase;
}

export const InvestigationDeskSummary: React.FC<InvestigationDeskSummaryProps> = ({ activeCase }) => {
  return (
    <div className="space-y-4 font-sans text-[#ffffff]">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#4f8cff]" />
          Investigation Summary
        </span>
        <span className="text-[10px] font-mono text-[#8b909b]">4 Desk Cards</span>
      </div>

      {/* CARD 1: Current Status */}
      <div className="titanium-card p-5 space-y-1.5 shadow-xl">
        <span className="text-[10px] font-mono text-[#8b909b] uppercase font-bold block">1. Current Status</span>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="font-extrabold text-sm text-[#ffffff]">Investigation Active</span>
        </div>
        <p className="text-[11px] text-[#8b909b]">8 Invisible AI Specialists currently analyzing case signals.</p>
      </div>

      {/* CARD 2: Key Findings */}
      <div className="titanium-card p-5 space-y-2 shadow-xl">
        <span className="text-[10px] font-mono text-[#8b909b] uppercase font-bold block">2. Key Findings</span>
        <ul className="space-y-1.5 text-xs text-[#c6c8d1]">
          <li className="flex items-start gap-2 font-medium">
            <span className="text-[#ef4444] font-bold">•</span>
            <span>Repeated payment requests before onboarding</span>
          </li>
          <li className="flex items-start gap-2 font-medium">
            <span className="text-[#f59e0b] font-bold">•</span>
            <span>Urgent deadline & coercion language detected</span>
          </li>
          <li className="flex items-start gap-2 font-medium">
            <span className="text-[#22d3ee] font-bold">•</span>
            <span>Identity could not be verified on corporate portal</span>
          </li>
        </ul>
      </div>

      {/* CARD 3: Next Best Action */}
      <div className="titanium-card p-5 space-y-2 border-[#4f8cff]/40 shadow-xl bg-[#4f8cff]/10">
        <span className="text-[10px] font-mono text-[#4f8cff] uppercase font-bold block flex items-center gap-1">
          <ArrowRight className="h-3.5 w-3.5 text-[#22d3ee]" /> 3. Next Best Action
        </span>
        <p className="text-xs font-bold text-[#ffffff] leading-relaxed">
          Verify official company email before making any payment.
        </p>
      </div>

      {/* CARD 4: Investigation Health */}
      <div className="titanium-card p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#8b909b] uppercase font-bold flex items-center gap-1">
            <FileCheck className="h-3.5 w-3.5 text-[#4f8cff]" /> 4. Investigation Health
          </span>
          <span className="text-xs font-mono font-extrabold text-[#22d3ee]">
            {activeCase.caseHealth?.overallHealthScore || 80}%
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[#8b909b]">Evidence Completeness</span>
            <span className="text-[#ffffff] font-bold">80%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#111214] border border-[rgba(255,255,255,0.08)] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4f8cff] to-[#22d3ee] rounded-full w-[80%]" />
          </div>
        </div>

        <p className="text-[11px] text-[#8b909b] leading-relaxed italic border-t border-[rgba(255,255,255,0.08)] pt-2">
          One additional payment screenshot would strengthen this investigation.
        </p>
      </div>

    </div>
  );
};
