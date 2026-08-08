import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface VerificationStep {
  id: string;
  stepName: string;
  description: string;
  scoreBonus: number;
  completed: boolean;
}

export const VerificationJourney: React.FC = () => {
  const [steps, setSteps] = useState<VerificationStep[]>([
    { id: 'v1', stepName: 'Verify Identity via Live Video Call', description: 'Request a 1-minute live video call to confirm real-world physical match with profile photos.', scoreBonus: 15, completed: false },
    { id: 'v2', stepName: 'Confirm Employment via Corporate Email Domain', description: 'Ask the recruiter to send email from official @company.com domain.', scoreBonus: 12, completed: false },
    { id: 'v3', stepName: 'Perform Reverse Image Match on Profile Photo', description: 'Run avatar photo through search engines to verify it is not stolen from stock sites.', scoreBonus: 10, completed: false },
    { id: 'v4', stepName: 'Audit Professional LinkedIn / GitHub Profile', description: 'Verify at least 2 years of public professional posting history.', scoreBonus: 10, completed: false }
  ]);

  const baseScore = 52;
  const currentBonus = steps.filter((s) => s.completed).reduce((acc, curr) => acc + curr.scoreBonus, 0);
  const totalScore = Math.min(baseScore + currentBonus, 100);

  const toggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5 font-mono">
            <Sparkles className="h-4 w-4 text-[#4f8cff]" />
            Interactive AI Verification Journey
          </span>
          <h3 className="text-xl font-extrabold text-[#ffffff] mt-0.5">Ethical Decision-Support Checklist</h3>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-center font-mono">
          <span className="text-3xl font-extrabold text-[#4f8cff]">{totalScore}</span>
          <span className="text-[10px] text-[#8b909b] block">/ 100 Live Score</span>
        </div>
      </div>

      <p className="text-xs text-[#c6c8d1] leading-relaxed">
        Complete these verification steps to safely confirm the subject&apos;s digital identity. As you check off completed steps, CyberSaheli updates the Digital Trust Assessment in real time.
      </p>

      {/* Verification Steps List */}
      <div className="space-y-3">
        {steps.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleStep(item.id)}
            className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
              item.completed
                ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#ffffff]'
                : 'bg-[#111214] border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]'
            }`}
          >
            <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 ${item.completed ? 'text-[#22c55e]' : 'text-[#8b909b]'}`} />
            <div className="space-y-0.5 flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className={`font-bold text-sm ${item.completed ? 'line-through opacity-80 text-[#22c55e]' : 'text-[#ffffff]'}`}>
                  {item.stepName}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#4f8cff]/20 text-[#4f8cff] font-mono text-[10px] font-bold border border-[#4f8cff]/30">
                  +{item.scoreBonus} Trust Points
                </span>
              </div>
              <p className="text-[#8b909b] leading-relaxed text-[11px]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {totalScore >= 80 && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e] text-xs font-bold text-[#ffffff] text-center flex items-center justify-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#22c55e]" />
          <span>Identity Verification Complete! Trust Assessment updated to High Trust.</span>
        </div>
      )}

    </div>
  );
};
