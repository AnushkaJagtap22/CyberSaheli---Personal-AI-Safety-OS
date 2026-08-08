import React from 'react';
import { ChevronUp, CheckCircle2, ArrowRight } from 'lucide-react';
import type { CyberCase } from '../services/caseEngine';

interface ProgressiveSummaryCardProps {
  activeCase: CyberCase;
  showDetails: boolean;
  onToggleDetails: () => void;
  language?: 'en' | 'hi' | 'mr';
}

export const ProgressiveSummaryCard: React.FC<ProgressiveSummaryCardProps> = ({
  activeCase,
  showDetails,
  onToggleDetails,
  language = 'en'
}) => {
  const getLocalizedText = () => {
    if (language === 'hi') {
      return {
        completeTitle: 'जांच पूर्ण हुई',
        caseTypeTitle: 'मामले का प्रकार',
        caseType: activeCase.category || 'संभावित भर्ती घोटाला',
        confidenceTitle: 'विश्वास स्तर',
        confidence: 'उच्च (High)',
        evidenceTitle: 'सहायक साक्ष्य',
        nextStepTitle: 'अगला सर्वोत्तम कदम',
        nextStep: 'भुगतान से पहले सत्यापन करें',
        estimatedTime: 'अनुमानित समय: 3 मिनट',
        viewDetails: 'विस्तृत जांच देखें →',
        hideDetails: 'विस्तृत जांच छिपाएं ↑'
      };
    } else if (language === 'mr') {
      return {
        completeTitle: 'तपास पूर्ण झाला',
        caseTypeTitle: 'प्रकरणाचा प्रकार',
        caseType: activeCase.category || 'संभाव्य भरती फसवणूक',
        confidenceTitle: 'विश्वासार्हता',
        confidence: 'उच्च (High)',
        evidenceTitle: 'सहाय्यक पुरावे',
        nextStepTitle: 'पुढील सर्वोत्तम पाऊल',
        nextStep: 'पैसे भरण्यापूर्वी पडताळणी करा',
        estimatedTime: 'अंदाजे वेळ: 3 मिनिटे',
        viewDetails: 'तपशीलवार तपास पहा →',
        hideDetails: 'तपशीलवार तपास लपवा ↑'
      };
    } else {
      return {
        completeTitle: 'Investigation Complete',
        caseTypeTitle: 'Case Type',
        caseType: activeCase.category || 'Likely Recruitment Scam',
        confidenceTitle: 'Confidence',
        confidence: 'High',
        evidenceTitle: 'Supporting Evidence',
        nextStepTitle: 'Next Step',
        nextStep: 'Verify before payment',
        estimatedTime: 'Estimated Time: 3 minutes',
        viewDetails: 'View Detailed Investigation →',
        hideDetails: 'Hide Detailed Investigation ↑'
      };
    }
  };

  const text = getLocalizedText();

  return (
    <div className="titanium-card p-6 space-y-5 font-sans text-[#ffffff] shadow-2xl border-[#4f8cff]/40 bg-[#17181c]">
      {/* Top Complete Badge */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#22c55e]" />
          <span className="font-extrabold text-sm text-[#ffffff] font-mono">{text.completeTitle}</span>
        </div>
        <span className="text-[10px] font-mono text-[#8b909b]">{text.estimatedTime}</span>
      </div>

      {/* 4 Key Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">{text.caseTypeTitle}</span>
          <span className="font-extrabold text-[#ffffff] truncate block text-[11px]">{text.caseType}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">{text.confidenceTitle}</span>
          <span className="font-extrabold text-[#22c55e] block text-[11px]">{text.confidence}</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">{text.evidenceTitle}</span>
          <span className="font-extrabold text-[#4f8cff] block text-[11px]">
            {activeCase.entities.length} Items
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-0.5">
          <span className="text-[10px] text-[#8b909b] uppercase block">{text.nextStepTitle}</span>
          <span className="font-extrabold text-[#22d3ee] truncate block text-[11px]">{text.nextStep}</span>
        </div>
      </div>

      {/* Progressive Disclosure Reveal Button */}
      <button
        onClick={onToggleDetails}
        className="w-full btn-glass text-xs flex items-center justify-center gap-2 py-3 font-mono font-bold text-[#4f8cff] hover:text-[#ffffff] transition-all"
      >
        <span>{showDetails ? text.hideDetails : text.viewDetails}</span>
        {showDetails ? <ChevronUp className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );
};
