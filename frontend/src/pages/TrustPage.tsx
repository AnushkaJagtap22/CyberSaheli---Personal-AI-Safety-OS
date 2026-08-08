import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search } from 'lucide-react';
import { evaluateDigitalTrust } from '../services/trustEngine';
import type { DigitalTrustAssessment } from '../services/trustEngine';
import { TrustAssessmentCard } from '../components/TrustAssessmentCard';

export const TrustPage: React.FC = () => {
  const [inputTarget, setInputTarget] = useState('');
  const [assessment, setAssessment] = useState<DigitalTrustAssessment>(
    evaluateDigitalTrust('@rahul_dev_official')
  );

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTarget.trim()) return;
    const evaluated = evaluateDigitalTrust(inputTarget);
    setAssessment(evaluated);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-5xl mx-auto space-y-8 pb-16 font-sans text-[#ffffff] selection:bg-[#4f8cff] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#22d3ee] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#4f8cff]" />
            Standalone Digital Trust Assessment
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Multi-Platform Profile Trust Report</h1>
        </div>
      </div>

      {/* Target Handle Input Form */}
      <div className="titanium-card p-8 shadow-xl space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4f8cff] block">
          Paste Public Handle or Profile Link (Instagram, LinkedIn, Matrimony, GitHub):
        </span>

        <form onSubmit={handleEvaluate} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-4 h-4 w-4 text-[#4f8cff]" />
            <input
              type="text"
              value={inputTarget}
              onChange={(e) => setInputTarget(e.target.value)}
              placeholder="e.g. '@rahul_dev_official', 'linkedin.com/in/rahul-sharma', 'solicit@okaxis'..."
              className="w-full input-titanium text-xs pl-11 placeholder-[#8b909b]"
            />
          </div>
          <button
            type="submit"
            className="btn-primary text-xs flex items-center justify-center font-bold px-6 py-3.5"
          >
            Evaluate Trust
          </button>
        </form>
      </div>

      {/* Trust Assessment Card Component */}
      <TrustAssessmentCard assessment={assessment} />

    </motion.div>
  );
};
