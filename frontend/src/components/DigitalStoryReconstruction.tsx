import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, ChevronDown } from 'lucide-react';

interface StoryEvent {
  day: string;
  stage: string;
  summary: string;
  evidenceSnippet: string;
  technique: string;
}

export const DigitalStoryReconstruction: React.FC = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>('Monday');

  const storyEvents: StoryEvent[] = [
    { day: 'Monday', stage: 'Received Message', summary: 'Polite initial greeting on Instagram DM from @amazon_wfh_recruiter.', evidenceSnippet: '"Hi Anushka! We selected your profile for remote work ($450/week)."', technique: 'Rapport Building' },
    { day: 'Wednesday', stage: 'Built Trust & Love Bombing', summary: 'Excessive compliments and promises of rapid career promotion.', evidenceSnippet: '"You are our top candidate out of 400 applicants!"', technique: 'Love Bombing' },
    { day: 'Friday', stage: 'Moved to WhatsApp', summary: 'Insisted on moving conversation to private WhatsApp from unsaved number.', evidenceSnippet: '"Message me on WhatsApp +91 98123 45678 immediately."', technique: 'Isolation' },
    { day: 'Sunday', stage: 'Requested Money', summary: 'Demanded one-time refundable laptop registration fee of Rs 4,999 via UPI.', evidenceSnippet: '"Pay Rs 4999 to solicit@okaxis to receive your laptop tomorrow."', technique: 'Financial Solicit' },
    { day: 'Monday (Next)', stage: 'Threatened & Blocked', summary: 'Coerced victim with legal threats when payment was questioned.', evidenceSnippet: '"Pay now or legal action will be initiated against you!"', technique: 'Threat Escalation' }
  ];

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-base font-extrabold text-[#ffffff]">Digital Story Reconstruction (Documentary Mode)</h3>
        </div>
        <span className="text-xs font-mono text-[#8b909b] font-bold">5 Reconstructed Stages</span>
      </div>

      <div className="space-y-3">
        {storyEvents.map((ev) => {
          const isExpanded = expandedDay === ev.day;
          return (
            <div
              key={ev.day}
              onClick={() => setExpandedDay(isExpanded ? null : ev.day)}
              className="p-5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] shadow-sm cursor-pointer transition-all duration-200 hover:border-[#4f8cff]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-[#4f8cff] text-white font-mono text-xs font-bold">
                    {ev.day}
                  </span>
                  <h4 className="text-sm font-extrabold text-[#ffffff]">{ev.stage}</h4>
                </div>
                <ChevronDown className={`h-4 w-4 text-[#8b909b] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-[rgba(255,255,255,0.08)] mt-3 space-y-2 text-xs"
                  >
                    <p className="text-[#c6c8d1] font-medium">{ev.summary}</p>
                    <div className="p-3 rounded-xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] italic text-[#8b909b]">
                      {ev.evidenceSnippet}
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold text-[#8b5cf6] block">
                      Tactical Technique: {ev.technique}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
