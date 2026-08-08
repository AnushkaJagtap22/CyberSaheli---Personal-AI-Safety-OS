import React, { useState } from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export const LearningHub: React.FC = () => {
  const lessons = [
    {
      title: "Spotting Psychological Urgency Scams",
      tactic: "Artificial Panic & Immediate Threats",
      rule: "Legitimate organizations never give a 15-minute deadline via SMS to prevent service cuts.",
      checklist: [
        "Check if sender email matches official domain (e.g. @sbi.co.in vs @sbi-help.top)",
        "Never tap links sent via SMS claiming electricity/SIM blackout",
        "Verify directly by searching official customer support numbers"
      ]
    },
    {
      title: "Identifying Work-From-Home Registration Fraud",
      tactic: "Laptop & Security Deposit Demands",
      rule: "Real companies pay employees; employees NEVER pay employers for job laptops.",
      checklist: [
        "Be wary of recruiters contacting exclusively on Telegram or WhatsApp",
        "Never pay registration or training fees upfront",
        "Search recruiter name + company on official LinkedIn pages"
      ]
    },
    {
      title: "Recognizing AI Deepfake Voice Imposter Calls",
      tactic: "Cloned Relative Voice Emergency",
      rule: "Scammers clone voices from 3-second Instagram audio clips to simulate accidents.",
      checklist: [
        "Ask a personal secret question only your real relative knows",
        "Hang up and dial the relative's official phone number directly",
        "Never send urgent UPI transfers without secondary verification"
      ]
    }
  ];

  const [activeLesson, setActiveLesson] = useState(0);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6 font-sans text-zinc-100">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-extrabold text-white">Saheli AI Cyber Learning Hub</h2>
        </div>
        <span className="text-xs text-zinc-500 font-mono">Educational Defense Module</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {lessons.map((l, idx) => (
          <button
            key={idx}
            onClick={() => setActiveLesson(idx)}
            className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
              activeLesson === idx
                ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <span className="text-[10px] uppercase font-mono text-purple-400 block">LESSON {idx + 1}</span>
            <h3 className="text-xs font-bold text-white line-clamp-1">{l.title}</h3>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div>
          <span className="text-xs text-amber-400 font-mono uppercase font-bold">Scammer Psychological Tactic:</span>
          <h3 className="text-lg font-bold text-white mt-0.5">{lessons[activeLesson].title}</h3>
          <p className="text-xs text-zinc-400 mt-1 italic">&quot;{lessons[activeLesson].tactic}&quot;</p>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 font-medium">
          🛡️ Golden Rule: {lessons[activeLesson].rule}
        </div>

        <div className="space-y-2 text-xs">
          <span className="font-bold text-zinc-300 block">Defense Checklist:</span>
          {lessons[activeLesson].checklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
