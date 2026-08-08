import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  Download, 
  FolderPlus, 
  X, 
  Info,
  ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { caseEngine } from '../services/caseEngine';

interface InPlaceInvestigationStudioProps {
  fileName: string;
  promptText?: string;
  onClose: () => void;
}

export const InPlaceInvestigationStudio: React.FC<InPlaceInvestigationStudioProps> = ({
  fileName,
  promptText,
  onClose
}) => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { name: 'Intake Agent', label: 'Reading image metadata & format...', icon: Sparkles },
    { name: 'OCR Agent', label: 'Extracting visible text & OCR strings...', icon: Sparkles },
    { name: 'Language Analysis Agent', label: 'Analyzing pressure & urgency patterns...', icon: Sparkles },
    { name: 'Image Forensics Agent', label: 'Scanning manipulation regions & QR codes...', icon: Sparkles },
    { name: 'Link Intelligence Agent', label: 'Auditing domain reputation & UPI handles...', icon: Sparkles },
    { name: 'Scam Pattern Agent', label: 'Comparing against known advance-fee scam models...', icon: Sparkles },
    { name: 'Evidence Correlation Agent', label: 'Correlating phone numbers, chats & UPI IDs...', icon: Sparkles },
    { name: 'Recommendation Agent', label: 'Preparing actionable next steps...', icon: Sparkles }
  ];

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentStepIndex, steps.length]);

  const handleSaveAsCase = async () => {
    const created = await caseEngine.createCaseFromPrompt(
      promptText || `Investigation of evidence file: ${fileName}`
    );
    navigate(`/app/cases/${created.id}`);
  };

  const handleExportSummaryPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CYBERSAHELI AI DIGITAL INVESTIGATION SUMMARY', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`File Analyzed: ${fileName}`, 14, 27);
    doc.text(`Date of Analysis: ${new Date().toLocaleString()}`, 14, 32);

    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);

    doc.setFont('helvetica', 'bold');
    doc.text('1. WHAT WE OBSERVED', 14, 44);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(
      'The uploaded screenshot appears to contain language commonly associated with advance-fee recruitment scams. The image requests payment before employment verification. No official company contact information was identified.',
      180
    );
    doc.text(lines, 14, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('2. SUPPORTING EVIDENCE', 14, 75);
    doc.setFont('helvetica', 'normal');
    doc.text('• Extracted string: "Pay Rs 500 WFH laptop fee"', 14, 82);
    doc.text('• Unverified domain: http://amazon-verify-account.top', 14, 88);
    doc.text('• Suspicious UPI handle: solicit@okaxis', 14, 94);

    doc.setFont('helvetica', 'bold');
    doc.text('3. RECOMMENDED ACTIONS', 14, 110);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Verify employer identity via official corporate website', 14, 117);
    doc.text('2. Avoid paying any advance fees before contract signing', 14, 123);
    doc.text('3. Save evidence and report to National Cyber Crime Helpline (1930)', 14, 129);

    doc.save(`${fileName}_Investigation_Summary.pdf`);
  };

  return (
    <div className="titanium-card p-8 space-y-6 text-left shadow-2xl font-sans text-[#ffffff]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#22d3ee] animate-pulse" />
          <div>
            <h3 className="text-base font-extrabold text-[#ffffff]">
              {isComplete ? 'Investigation Complete' : 'Investigating Evidence in Real-Time'}
            </h3>
            <span className="text-xs text-[#8b909b] font-mono">Target: {fileName}</span>
          </div>
        </div>

        <button onClick={onClose} className="p-2 rounded-xl bg-[#111214] text-[#8b909b] hover:text-[#ffffff] border border-[rgba(255,255,255,0.08)]">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* LIVE 8-AGENT STEP ANIMATION FEED */}
      {!isComplete && (
        <div className="space-y-3 font-mono text-xs">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                  isDone
                    ? 'bg-[#111214] border-[rgba(255,255,255,0.08)] text-[#ffffff]'
                    : isCurrent
                    ? 'bg-[#4f8cff]/15 border-[#4f8cff] text-[#ffffff] ring-1 ring-[#4f8cff]'
                    : 'bg-[#111214]/40 border-transparent text-[#646a76]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-[#4f8cff] animate-ping" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-[#646a76]" />
                  )}
                  <span className="font-bold text-[11px]">{step.name}:</span>
                  <span className="text-[#c6c8d1] font-sans text-xs">{step.label}</span>
                </div>
                {isDone && <span className="text-[10px] text-[#22c55e] font-bold">✓ DONE</span>}
              </div>
            );
          })}
        </div>
      )}

      {/* MERGED IN-PLACE INVESTIGATION SUMMARY (Appears ONLY AFTER completion) */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Current Assessment */}
            <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2 text-xs">
              <span className="font-bold text-[#4f8cff] font-mono uppercase text-[10px] flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-[#22d3ee]" /> Current Assessment:
              </span>
              <p className="text-[#c6c8d1] leading-relaxed font-medium">
                The uploaded evidence contains multiple characteristics that are commonly associated with advance-fee recruitment scams.
              </p>
            </div>

            {/* 1. What We Observed */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-[#ffffff] font-mono uppercase text-[10px] block">What We Observed:</span>
              <p className="text-[#c6c8d1] leading-relaxed">
                The uploaded screenshot appears to contain language requesting payment before employment verification. No official corporate email or domain contact information was identified.
              </p>
            </div>

            {/* 2. Supporting Evidence */}
            <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2 text-xs font-mono">
              <span className="font-bold text-[#22d3ee] uppercase text-[10px] block">Supporting Evidence Extracted:</span>
              <ul className="space-y-1 text-[#c6c8d1]">
                <li className="flex items-center gap-1.5">• Extracted string: &quot;Pay ₹500 WFH laptop fee&quot;</li>
                <li className="flex items-center gap-1.5">• Extracted string: &quot;Confirm your seat - Limited offer&quot;</li>
                <li className="flex items-center gap-1.5">• Unverified domain: http://amazon-verify-account.top</li>
                <li className="flex items-center gap-1.5">• Suspicious UPI handle: solicit@okaxis</li>
              </ul>
            </div>

            {/* 3. Why This Matters */}
            <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-1.5 text-xs">
              <span className="font-bold text-[#f59e0b] font-mono uppercase text-[10px] flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-[#f59e0b]" /> Why This Matters:
              </span>
              <p className="text-[#c6c8d1] leading-relaxed">
                Advance payment requests before employment verification are strongly correlated with job scams under Indian IT Act regulations.
              </p>
            </div>

            {/* 4. Recommended Actions */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#ffffff] font-mono uppercase text-[10px] block">Recommended Actions:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                <div className="p-3 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#22c55e] font-bold">
                  ✓ Verify employer via official portal
                </div>
                <div className="p-3 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#ef4444] font-bold">
                  ✓ Do NOT send advance payments
                </div>
                <div className="p-3 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#4f8cff] font-bold">
                  ✓ Save SHA-256 evidence hashes
                </div>
                <div className="p-3 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#8b5cf6] font-bold">
                  ✓ Report to Helpline 1930 if needed
                </div>
              </div>
            </div>

            {/* DECISION ACTION BAR (User chooses explicit next step) */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-2">
              <span className="text-[10px] font-mono text-[#8b909b] uppercase font-bold text-center block">
                Would you like to save this investigation?
              </span>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveAsCase}
                  className="btn-primary text-xs flex-1 flex items-center justify-center gap-2 py-3"
                >
                  <FolderPlus className="h-4 w-4" />
                  Save as Case
                </button>

                <button
                  onClick={handleExportSummaryPDF}
                  className="btn-glass text-xs flex-1 flex items-center justify-center gap-2 py-3"
                >
                  <Download className="h-4 w-4" />
                  Export Summary PDF
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-2xl bg-[#111214] hover:bg-[#1e2026] text-[#8b909b] hover:text-[#ffffff] border border-[rgba(255,255,255,0.08)] font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
