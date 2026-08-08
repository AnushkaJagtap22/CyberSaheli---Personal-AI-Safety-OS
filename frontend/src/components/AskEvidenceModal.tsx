import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, CheckCircle2 } from 'lucide-react';
import type { ExtractedEntity } from '../services/agentOrchestrator';

interface AskEvidenceModalProps {
  evidence: ExtractedEntity | null;
  onClose: () => void;
}

export const AskEvidenceModal: React.FC<AskEvidenceModalProps> = ({ evidence, onClose }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!evidence) return null;

  const quickQuestions = [
    'Why is this suspicious?',
    'Translate this message',
    'Which part looks like blackmail?',
    'Who first requested money?',
    'Extract all phone numbers and links'
  ];

  const handleAskQuestion = (questionText: string) => {
    setSelectedQuestion(questionText);
    setIsAnalyzing(true);
    setAnswer('');

    setTimeout(() => {
      let reply = '';
      if (questionText.includes('suspicious')) {
        reply = `Analysis of "${evidence.label}": Suspicious due to advance-fee request before employment contract, unverified domain (.top), and emotional urgency.`;
      } else if (questionText.includes('Translate')) {
        reply = `Translation: "Please deposit Rs 4,999 for laptop dispatch before 5 PM to confirm your seat."`;
      } else if (questionText.includes('blackmail')) {
        reply = `Coercion flag: "If payment is not completed within 2 hours, your seat will be assigned to another applicant."`;
      } else if (questionText.includes('money')) {
        reply = `First money request occurred in WhatsApp message #14 from handle solicit@okaxis for Rs 4,999.`;
      } else {
        reply = `Extracted entities from "${evidence.label}": Phone +91 98123 45678, UPI solicit@okaxis, Domain http://amazon-verify-account.top.`;
      }
      setAnswer(reply);
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="titanium-card max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[rgba(255,255,255,0.12)] text-[#ffffff] font-sans text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#22d3ee]" />
              <div>
                <h3 className="text-sm font-extrabold text-[#ffffff]">Ask About This Evidence</h3>
                <span className="text-[11px] text-[#4f8cff] font-mono font-bold">{evidence.label} ({evidence.type})</span>
              </div>
            </div>

            <button onClick={onClose} className="p-1.5 rounded-xl bg-[#111214] text-[#8b909b] hover:text-[#ffffff] border border-[rgba(255,255,255,0.08)]">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Forensic Questions */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#8b909b] uppercase font-bold block">Select Forensic Query:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(q)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                    selectedQuestion === q
                      ? 'bg-[#4f8cff] text-white shadow-md'
                      : 'bg-[#111214] text-[#c6c8d1] border border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Progress or Answer */}
          {isAnalyzing && (
            <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#22d3ee] flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-spin text-[#4f8cff]" />
              <span>Analyzing evidence item &quot;{evidence.label}&quot;...</span>
            </div>
          )}

          {answer && !isAnalyzing && (
            <div className="p-4 rounded-2xl bg-[#4f8cff]/15 border border-[#4f8cff]/30 text-xs space-y-2">
              <span className="font-bold text-[#4f8cff] uppercase font-mono text-[10px] flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#22d3ee]" /> Forensic Finding:
              </span>
              <p className="text-[#ffffff] leading-relaxed font-medium">{answer}</p>
            </div>
          )}

          {/* Custom Query Input */}
          <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedQuestion) handleAskQuestion(selectedQuestion);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                placeholder="Ask custom question about this file..."
                className="flex-1 input-titanium text-xs placeholder-[#8b909b]"
              />
              <button
                type="submit"
                disabled={!selectedQuestion.trim() || isAnalyzing}
                className="btn-primary text-xs p-3 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
