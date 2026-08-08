import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const TrustEvolutionTimeline: React.FC = () => {
  const evolutionStages = [
    { stage: 'Initial Profile Impression', stars: 5, score: 95, note: 'Polite initial conversation & standard display name.' },
    { stage: 'After Reverse Image Search', stars: 3, score: 65, note: '⚠ Avatar photo matched 2 stock photography sites.' },
    { stage: 'After Chat & OCR Analysis', stars: 2, score: 45, note: 'Urgent payment demand & Rs 4,999 registration fee flagged.' },
    { stage: 'After Metadata & Domain Audit', stars: 1, score: 15, note: 'High-risk overseas domain .top registered 4 days ago.' }
  ];

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-base font-extrabold text-[#ffffff]">Trust Evolution Timeline</h3>
        </div>
        <span className="text-xs font-mono text-[#8b909b] font-bold">Dynamic Confidence Decay</span>
      </div>

      <p className="text-xs text-[#c6c8d1]">
        Observe how CyberSaheli AI dynamically updated trust assessment as new forensic evidence was uncovered.
      </p>

      <div className="space-y-3">
        {evolutionStages.map((st, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#ffffff] text-sm block">{st.stage}</span>
              <p className="text-[#8b909b]">{st.note}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < st.stars ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#646a76]'}`}
                  />
                ))}
              </div>
              <span className="px-3 py-1 rounded-full bg-[#4f8cff]/20 text-[#4f8cff] font-mono font-bold border border-[#4f8cff]/30">
                {st.score}/100
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
