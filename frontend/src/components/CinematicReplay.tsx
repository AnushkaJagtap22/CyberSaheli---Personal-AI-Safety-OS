import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export const CinematicReplay: React.FC = () => {
  const steps = [
    { title: "1. Evidence Uploaded", desc: "Screenshot imported & sealed with SHA-256 cryptographic hash." },
    { title: "2. OCR Extracted Entities", desc: "Tesseract.js extracted UPI handle solicit@okaxis and phone +91 98123 45678." },
    { title: "3. Metadata Reviewed", desc: "Exif timestamps verified against Indian standard time." },
    { title: "4. Chat Analyzed", desc: "Extortion demand & psychological urgency triggers flagged." },
    { title: "5. Connections Identified", desc: "Built Digital Evidence Canvas topology linking Instagram DM to UPI handle." },
    { title: "6. Timeline Built", desc: "Minute-by-minute chronological case history compiled." },
    { title: "7. Risk Assessment Generated", desc: "Overall case risk score set to 94/100 Critical." },
    { title: "8. Case Report Finalized", desc: "Police FIR Complaint PDF draft ready for export." }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      let step = currentStep;
      const timer = setInterval(() => {
        step += 1;
        if (step >= steps.length) {
          clearInterval(timer);
          setIsPlaying(false);
        } else {
          setCurrentStep(step);
        }
      }, 1500);
    }
  };

  return (
    <div className="titanium-card p-6 space-y-5 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8b5cf6]" />
          <h3 className="text-sm font-bold text-[#ffffff]">Cinematic Case Investigation Replay</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3.5"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isPlaying ? 'Pause Replay' : 'Play Cinematic Replay'}
          </button>
          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="p-2 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#8b909b] hover:text-[#ffffff]"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Active Step Showcase */}
      <div className="p-6 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-center space-y-3 min-h-[140px] flex flex-col justify-center">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <span className="text-[10px] uppercase font-mono font-bold text-[#22d3ee] block">
            STAGE {currentStep + 1} OF {steps.length}
          </span>
          <h4 className="text-lg font-extrabold text-[#ffffff]">{steps[currentStep].title}</h4>
          <p className="text-xs text-[#c6c8d1] max-w-md mx-auto">{steps[currentStep].desc}</p>
        </motion.div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-between text-xs font-mono pt-2">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-all duration-200 ${
              idx === currentStep
                ? 'bg-[#4f8cff] text-white scale-110 shadow-md'
                : idx < currentStep
                ? 'bg-[#22c55e] text-white'
                : 'bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#8b909b]'
            }`}
          >
            {idx < currentStep ? '✓' : idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
