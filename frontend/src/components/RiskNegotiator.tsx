import React, { useState } from 'react';
import { MessageSquare, Copy, CheckCircle2 } from 'lucide-react';

export const RiskNegotiator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'job' | 'verify' | 'marketplace'>('job');
  const [copied, setCopied] = useState(false);

  const responseTemplates = {
    job: "Thank you for the opportunity. Please provide the official corporate GST registration details and HR email domain before any registration fee is discussed.",
    verify: "I take digital security seriously. Please confirm your identity by calling me directly on my primary phone number or providing a official verification badge.",
    marketplace: "I will only proceed with cash on delivery or in-person verification at a public police station area. I do not pay advance registration fees."
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseTemplates[selectedScenario]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="titanium-card p-6 space-y-4 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-sm font-bold text-[#ffffff]">AI Risk Negotiator (Safe Response Generator)</h3>
        </div>
        <span className="text-[10px] font-mono text-[#f59e0b] font-bold">Review Before Sending</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setSelectedScenario('job')}
          className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${selectedScenario === 'job' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
        >
          Decline Job Fee
        </button>
        <button
          onClick={() => setSelectedScenario('verify')}
          className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${selectedScenario === 'verify' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
        >
          Ask ID Verification
        </button>
        <button
          onClick={() => setSelectedScenario('marketplace')}
          className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${selectedScenario === 'marketplace' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
        >
          Marketplace Buyer
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-xs leading-relaxed space-y-3">
        <p className="text-[#c6c8d1] italic font-medium">&quot;{responseTemplates[selectedScenario]}&quot;</p>
        <button
          onClick={handleCopy}
          className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3.5"
        >
          {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied to Clipboard!' : 'Copy Response Draft'}
        </button>
      </div>
    </div>
  );
};
