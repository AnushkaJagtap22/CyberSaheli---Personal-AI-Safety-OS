import React, { useState } from 'react';
import { HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const SafeDecisionSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'money' | 'link' | 'qr'>('money');

  const scenarios = {
    money: {
      question: "What happens if I send ₹10,000 to solicit@okaxis?",
      simulationOutcome: "High Likelihood of Financial Loss & Follow-up Demands",
      attackPath: "Attackers escalate demands after initial payment, claiming further registration/clearance fees are required.",
      safeAlternative: "Do not send any money. Request official corporate GST billing and verify the HR email domain first."
    },
    link: {
      question: "What if I click this http://amazon-verify-account.top link?",
      simulationOutcome: "Credential Harvesting & Session Hijacking",
      attackPath: "The page mimics Amazon login to capture your password and MFA code.",
      safeAlternative: "Never click external link. Navigate directly to official amazon.jobs in your browser."
    },
    qr: {
      question: "What if I scan a QR code to receive money?",
      simulationOutcome: "Instant Account Debit",
      attackPath: "QR codes only deduct money from your account, they cannot deposit funds into your account.",
      safeAlternative: "Refuse QR code scans for receiving payments. Sharing your UPI ID or phone number is sufficient to receive money."
    }
  };

  const current = scenarios[selectedScenario];

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-[#f59e0b]" />
          <h3 className="text-base font-extrabold text-[#ffffff]">Safe Decision Simulator</h3>
        </div>
        <span className="text-xs font-mono text-[#8b909b]">Educational Attack Path Analysis</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setSelectedScenario('money')}
          className={`px-4 py-2 rounded-xl transition-all duration-200 ${selectedScenario === 'money' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
        >
          Send ₹10,000?
        </button>
        <button
          onClick={() => setSelectedScenario('link')}
          className={`px-4 py-2 rounded-xl transition-all duration-200 ${selectedScenario === 'link' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
        >
          Click Unverified Link?
        </button>
        <button
          onClick={() => setSelectedScenario('qr')}
          className={`px-4 py-2 rounded-xl transition-all duration-200 ${selectedScenario === 'qr' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
        >
          Scan QR to Receive Money?
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-4 text-xs">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-[#8b909b] block">Simulated Question:</span>
          <h4 className="text-sm font-extrabold text-[#ffffff] mt-0.5">{current.question}</h4>
        </div>

        <div className="p-3 rounded-xl bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] font-bold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>Outcome: {current.simulationOutcome}</span>
        </div>

        <div className="space-y-1">
          <span className="font-bold text-[#ffffff] block">Attack Vector Breakdown:</span>
          <p className="text-[#c6c8d1] leading-relaxed">{current.attackPath}</p>
        </div>

        <div className="p-3 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] font-bold flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#22c55e]" />
          <span>Safer Alternative: {current.safeAlternative}</span>
        </div>
      </div>
    </div>
  );
};
