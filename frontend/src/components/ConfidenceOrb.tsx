import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';

interface ConfidenceOrbProps {
  score: number; // 0 - 100
  label?: string;
  reasons?: string[];
}

export const ConfidenceOrb: React.FC<ConfidenceOrbProps> = ({ score, label = "AI Confidence", reasons }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Color mapping based on score
  let orbColor = "from-[#7c9a6d] to-[#5b6b47]"; // Sage Olive (Safe)
  let statusText = "High Certainty";

  if (score > 80) {
    orbColor = "from-[#a34739] to-[#c96a4a]"; // Burnt Red (High Risk)
    statusText = "Critical Risk";
  } else if (score > 50) {
    orbColor = "from-[#c8a86b] to-[#c96a4a]"; // Warm Gold (Warning)
    statusText = "Moderate Certainty";
  }

  return (
    <div className="relative inline-flex flex-col items-center">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        className={`w-24 h-24 rounded-full bg-gradient-to-tr ${orbColor} p-1 shadow-lg animate-confidence-orb cursor-pointer relative flex items-center justify-center`}
      >
        <div className="w-full h-full rounded-full bg-[#fffdf8] flex flex-col items-center justify-center text-center p-2">
          {score > 80 ? (
            <AlertTriangle className="h-4 w-4 text-[#a34739] mb-0.5" />
          ) : (
            <ShieldCheck className="h-4 w-4 text-[#5b6b47] mb-0.5" />
          )}
          <span className="text-xl font-extrabold text-[#232323] leading-none">{score}%</span>
          <span className="text-[9px] uppercase font-mono font-bold text-[#66605a] mt-0.5">{statusText}</span>
        </div>
      </motion.div>

      {/* Hover Tooltip explaining why confidence changed */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-28 z-40 w-64 p-4 rounded-2xl bg-[#fffdf8] border border-[#e4decb] shadow-2xl text-xs text-[#232323] space-y-2 font-sans"
          >
            <div className="flex items-center gap-1.5 font-bold text-[#5b6b47]">
              <Info className="h-4 w-4" />
              <span>{label} Explanation</span>
            </div>
            <p className="text-[11px] text-[#66605a] leading-relaxed">
              Confidence score is dynamically evaluated against 40,000+ threat signatures, domain reputation, and language patterns.
            </p>
            {reasons && reasons.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-[#e4decb]">
                {reasons.map((r, idx) => (
                  <div key={idx} className="text-[10px] text-[#232323] font-medium">• {r}</div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
