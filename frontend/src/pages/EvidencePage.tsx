import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck2, 
  Upload, 
  Hash, 
  FileText, 
  Sparkles
} from 'lucide-react';
import { evidenceProcessor } from '../services/evidenceProcessor';
import type { ProcessedEvidence } from '../services/evidenceProcessor';

export const EvidencePage: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<ProcessedEvidence[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    try {
      const file = files[0];
      const processed = await evidenceProcessor.processFile(file);
      setEvidenceList((prev) => [processed, ...prev]);
    } catch (err) {
      console.error('Evidence processing error:', err);
    } finally {
      setIsProcessing(false);
    }
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
            <FileCheck2 className="h-4 w-4 text-[#4f8cff]" />
            Forensic Evidence Intake & Inventory
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Cryptographic Evidence Vault</h1>
        </div>
      </div>

      {/* Real Upload Drop Zone */}
      <div className="titanium-card p-8 border-2 border-dashed border-[rgba(255,255,255,0.15)] hover:border-[#4f8cff] text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#4f8cff]/10 text-[#4f8cff] flex items-center justify-center mx-auto border border-[#4f8cff]/20">
          <Upload className="h-7 w-7" />
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-[#ffffff]">
            Upload Evidence File (Images, PDFs, Chat Exports, Audio, ZIPs)
          </h3>
          <p className="text-xs text-[#8b909b]">
            CyberSaheli automatically calculates SHA-256 cryptographic hashes, extracts EXIF metadata, and runs Tesseract OCR.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 btn-primary text-xs cursor-pointer">
          <span>{isProcessing ? 'Processing SHA-256 & OCR...' : 'Select File to Seal'}</span>
          <input type="file" onChange={handleFileUpload} disabled={isProcessing} className="hidden" />
        </label>
      </div>

      {/* Processed Evidence List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#ffffff] flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#22d3ee]" />
          Processed Evidence Inventory ({evidenceList.length})
        </h3>

        {evidenceList.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] text-center text-xs text-[#8b909b]">
            No evidence uploaded in this turn yet. Upload a file above to observe the real SHA-256 forensic processing pipeline.
          </div>
        ) : (
          <div className="space-y-4">
            {evidenceList.map((item) => (
              <div key={item.id} className="p-6 rounded-3xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] shadow-xl space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                  <div>
                    <span className="font-extrabold text-[#ffffff] text-sm block">{item.fileName}</span>
                    <span className="text-[#8b909b] text-[10px]">{(item.fileSize / 1024).toFixed(1)} KB • {item.fileType}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${
                    item.riskScore > 70 ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30' : 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30'
                  }`}>
                    Risk {item.riskScore}/100
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-1">
                  <span className="text-[#22d3ee] font-bold text-[10px] uppercase block flex items-center gap-1">
                    <Hash className="h-3 w-3" /> SHA-256 Cryptographic Hash:
                  </span>
                  <p className="text-[#8b909b] text-[11px] break-all">{item.sha256Hash}</p>
                </div>

                {item.ocrText && (
                  <div className="p-3.5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-1">
                    <span className="text-[#4f8cff] font-bold text-[10px] uppercase block flex items-center gap-1">
                      <FileText className="h-3 w-3" /> Tesseract OCR Extracted Text:
                    </span>
                    <p className="text-[#c6c8d1] italic text-[11px] leading-relaxed">&quot;{item.ocrText}&quot;</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </motion.div>
  );
};
