import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck
} from 'lucide-react';
import type { DigitalTrustAssessment } from '../services/trustEngine';

interface TrustAssessmentCardProps {
  assessment: DigitalTrustAssessment;
}

export const TrustAssessmentCard: React.FC<TrustAssessmentCardProps> = ({ assessment }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const scoreColor = getScoreColor(assessment.overallScore);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="titanium-card p-8 space-y-6 text-left shadow-2xl text-xs font-sans text-[#ffffff]"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#22d3ee] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="h-4 w-4 text-[#4f8cff]" />
            Digital Trust Assessment Engine
          </span>
          <h3 className="text-xl font-extrabold text-[#ffffff] mt-1">{assessment.handleOrUrl}</h3>
        </div>

        {/* Circular Trust Score Ring */}
        <div className="flex items-center gap-4 bg-[#111214] p-3 rounded-2xl border border-[rgba(255,255,255,0.08)]">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="transparent" />
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                stroke={scoreColor} 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * assessment.overallScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-mono font-extrabold text-sm text-[#ffffff]">{assessment.overallScore}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-[#8b909b] uppercase block">Trust Rating</span>
            <span className="font-bold text-[#ffffff] text-xs block">{assessment.status}</span>
          </div>
        </div>
      </div>

      {/* Positive Signals & Potential Risk Concerns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Positive Signals */}
        <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2">
          <span className="font-bold text-[#22c55e] uppercase font-mono text-[10px] flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Positive Identity Signals ({assessment.positiveSignals.length})
          </span>
          <div className="space-y-1.5">
            {assessment.positiveSignals.map((sig, idx) => (
              <div key={idx} className="text-[11px] text-[#c6c8d1] flex items-start gap-2">
                <span className="text-[#22c55e] font-bold">•</span>
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Risk Concerns */}
        <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2">
          <span className="font-bold text-[#f59e0b] uppercase font-mono text-[10px] flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> Identity Risk Concerns ({assessment.potentialConcerns.length})
          </span>
          <div className="space-y-1.5">
            {assessment.potentialConcerns.map((con, idx) => (
              <div key={idx} className="text-[11px] text-[#c6c8d1] flex items-start gap-2">
                <span className="text-[#f59e0b] font-bold">•</span>
                <span>{con}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Suggested Verification Steps */}
      <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
        <span className="font-bold text-[#ffffff] uppercase font-mono text-[10px] block">Suggested Verification Methods:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
          {assessment.suggestedVerifications.map((m: string, idx: number) => (
            <div key={idx} className="p-3 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <span className="text-[#c6c8d1]">{m}</span>
              <span className="text-[#4f8cff] font-bold text-[10px]">RECOMMENDED</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
