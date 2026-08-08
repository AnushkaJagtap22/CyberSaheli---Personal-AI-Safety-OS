import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, CheckCircle2, AlertTriangle } from 'lucide-react';
import { extractTextFromImage } from '../services/ocrService';
import { analyzeTextContent } from '../services/nlpEngine';
import type { NLPAnalysisResult } from '../services/nlpEngine';

export const ScamSimulator: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customAnalysis, setCustomAnalysis] = useState<{
    text: string;
    result: NLPAnalysisResult;
  } | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const ocrRes = await extractTextFromImage(file);
      const nlpRes = analyzeTextContent(ocrRes.extractedText);
      setCustomAnalysis({
        text: ocrRes.extractedText,
        result: nlpRes
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-16 font-sans text-[#232323] selection:bg-[#5b6b47] selection:text-white"
    >
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,.pdf" className="hidden" />

      {/* Header */}
      <div className="border-b border-[#e4decb] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5b6b47] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#c96a4a]" />
            Real Training & Educational System
          </span>
          <h1 className="text-3xl font-extrabold text-[#232323] tracking-tight mt-1">Interactive Scam Simulator</h1>
        </div>
      </div>

      {/* Real Upload Analysis Zone */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="p-8 rounded-3xl bg-[#fffdf8] border-2 border-dashed border-[#5b6b47]/40 shadow-xl text-center space-y-3 cursor-pointer hover:border-[#5b6b47] transition-all"
      >
        <Upload className="h-8 w-8 text-[#5b6b47] mx-auto animate-bounce" />
        <h3 className="text-base font-bold text-[#232323]">Upload Your Real Scam Email, Chat, or URL to Learn</h3>
        <p className="text-xs text-[#66605a]">Drop any suspicious screenshot. AI extracts text via Tesseract OCR & teaches safer alternatives.</p>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="p-4 rounded-2xl bg-[#f1ece2] border border-[#e4decb] text-xs font-mono text-[#5b6b47] text-center font-bold">
          Extracting text via Tesseract.js OCR & analyzing psychological scam triggers...
        </div>
      )}

      {/* Educational Analysis Output */}
      {customAnalysis && (
        <div className="p-8 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4decb] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5b6b47]">EDUCATIONAL FORENSIC FEEDBACK</span>
            <span className="px-3 py-1 rounded-full bg-[#a34739]/20 text-[#a34739] font-bold text-xs font-mono">
              Risk Score: {customAnalysis.result.riskScore}/100
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f1ece2] border border-[#e4decb] text-xs italic">
            &quot;{customAnalysis.text}&quot;
          </div>

          <div className="space-y-3 text-xs">
            <span className="font-bold text-[#232323] block">1. Why This Content is Suspicious:</span>
            <p className="text-[#66605a] leading-relaxed">
              Detected threat category: <strong className="text-[#a34739]">{customAnalysis.result.threatCategory}</strong>. Scammers pair urgent psychological panic with unverified transfer requests.
            </p>

            <span className="font-bold text-[#232323] block pt-2">2. Missed Indicators to Watch For:</span>
            <div className="space-y-1.5">
              {customAnalysis.result.explainableReasons.map((r, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#f1ece2] border border-[#e4decb] flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#a34739] flex-shrink-0" />
                  <span>{r.flag}: {r.explanation}</span>
                </div>
              ))}
            </div>

            <span className="font-bold text-[#232323] block pt-2">3. Safer Action Alternatives:</span>
            <div className="p-3 rounded-2xl bg-[#7c9a6d]/20 border border-[#7c9a6d]/40 text-[#232323] font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#7c9a6d] flex-shrink-0" />
              <span>Verify recipient identity through secondary phone calls or official bank apps before transferring money.</span>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};
