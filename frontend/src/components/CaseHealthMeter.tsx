import React from 'react';
import { CheckCircle2, AlertTriangle, FileCheck } from 'lucide-react';
import type { CaseHealth, EvidenceCompleteness } from '../services/caseEngine';

interface CaseHealthMeterProps {
  health: CaseHealth;
  completeness: EvidenceCompleteness;
}

export const CaseHealthMeter: React.FC<CaseHealthMeterProps> = ({ health, completeness }) => {
  return (
    <div className="titanium-card p-6 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5">
            <FileCheck className="h-4 w-4 text-[#4f8cff]" />
            Forensic Case Health & Evidence Completeness
          </span>
          <h3 className="text-base font-extrabold text-[#ffffff] mt-0.5">Investigation Quality Assessment</h3>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-center font-mono">
          <span className="text-2xl font-extrabold text-[#4f8cff]">{health.overallHealthScore}%</span>
          <span className="text-[9px] text-[#8b909b] block uppercase">Case Health</span>
        </div>
      </div>

      {/* 4 Health Dimension Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">Evidence Quality</span>
          <span className="font-extrabold text-[#22c55e] block">{health.evidenceQuality}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">Timeline Status</span>
          <span className="font-extrabold text-[#4f8cff] block">{health.timelineStatus}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">Identity Verification</span>
          <span className="font-extrabold text-[#f59e0b] block">{health.identityVerification}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">Media Analysis</span>
          <span className="font-extrabold text-[#22c55e] block">{health.mediaAnalysis}</span>
        </div>
      </div>

      {/* Evidence Completeness Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8b909b]">Case Evidence Completeness:</span>
          <span className="font-extrabold text-[#22d3ee]">{completeness.completenessPercentage}% Collected</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#111214] border border-[rgba(255,255,255,0.08)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4f8cff] to-[#22d3ee] rounded-full transition-all duration-500"
            style={{ width: `${completeness.completenessPercentage}%` }}
          />
        </div>
      </div>

      {/* Collected vs Missing Evidence Items with Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Collected Items */}
        <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2">
          <span className="font-bold text-[#22c55e] font-mono uppercase text-[10px] flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" /> Collected Evidence ({completeness.collected.length}):
          </span>
          <ul className="space-y-1 text-[#c6c8d1]">
            {completeness.collected.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5 font-medium">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Items & Why They Matter */}
        <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2">
          <span className="font-bold text-[#f59e0b] font-mono uppercase text-[10px] flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-[#f59e0b]" /> Recommended Missing Items ({completeness.missing.length}):
          </span>
          <div className="space-y-2">
            {completeness.missing.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="font-bold text-[#ffffff] block">• {m.item}</span>
                <p className="text-[#8b909b] text-[11px] leading-relaxed italic">{m.whyItMatters}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
