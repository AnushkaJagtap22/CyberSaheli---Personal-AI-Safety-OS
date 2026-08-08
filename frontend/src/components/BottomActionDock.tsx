import React from 'react';
import { Upload, MessageSquare, Download, Share2, AlertTriangle } from 'lucide-react';

interface BottomActionDockProps {
  onUpload?: () => void;
  onAskAI?: () => void;
  onGenerateReport?: () => void;
  onShareEvidence?: () => void;
  onEmergencySOS?: () => void;
}

export const BottomActionDock: React.FC<BottomActionDockProps> = ({
  onUpload,
  onAskAI,
  onGenerateReport,
  onShareEvidence,
  onEmergencySOS
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#17181c]/90 border border-[rgba(255,255,255,0.12)] backdrop-blur-2xl px-6 py-3 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center gap-3 font-sans text-xs select-none">
      <button
        onClick={onUpload}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111214] hover:bg-[#1e2026] text-[#ffffff] font-bold border border-[rgba(255,255,255,0.08)] transition-all duration-200 hover:scale-105"
      >
        <Upload className="h-4 w-4 text-[#4f8cff]" />
        <span>Upload</span>
      </button>

      <button
        onClick={onAskAI}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111214] hover:bg-[#1e2026] text-[#ffffff] font-bold border border-[rgba(255,255,255,0.08)] transition-all duration-200 hover:scale-105"
      >
        <MessageSquare className="h-4 w-4 text-[#22d3ee]" />
        <span>Ask AI</span>
      </button>

      <button
        onClick={onGenerateReport}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full btn-primary font-bold shadow-md transition-all duration-200 hover:scale-105"
      >
        <Download className="h-4 w-4" />
        <span>Generate Report</span>
      </button>

      <button
        onClick={onShareEvidence}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111214] hover:bg-[#1e2026] text-[#ffffff] font-bold border border-[rgba(255,255,255,0.08)] transition-all duration-200 hover:scale-105"
      >
        <Share2 className="h-4 w-4 text-[#8b5cf6]" />
        <span>Share Evidence</span>
      </button>

      <div className="h-4 w-[1px] bg-[rgba(255,255,255,0.12)] mx-1" />

      <button
        onClick={onEmergencySOS}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold shadow-lg transition-all duration-200 hover:scale-105"
      >
        <AlertTriangle className="h-4 w-4 text-white animate-pulse" />
        <span>Emergency SOS</span>
      </button>
    </div>
  );
};
