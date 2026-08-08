import React from 'react';
import { Image, MessageSquare, Globe, FileText } from 'lucide-react';

export interface EvidenceChipData {
  id: string;
  type: 'image' | 'message' | 'link' | 'pdf';
  label: string;
  targetId?: string;
}

interface EvidenceChipProps {
  chip: EvidenceChipData;
  onClick?: (chip: EvidenceChipData) => void;
}

export const EvidenceChip: React.FC<EvidenceChipProps> = ({ chip, onClick }) => {
  const getIcon = () => {
    switch (chip.type) {
      case 'image':
        return <Image className="h-3.5 w-3.5 text-[#22d3ee]" />;
      case 'message':
        return <MessageSquare className="h-3.5 w-3.5 text-[#4f8cff]" />;
      case 'link':
        return <Globe className="h-3.5 w-3.5 text-[#8b5cf6]" />;
      case 'pdf':
        return <FileText className="h-3.5 w-3.5 text-[#ef4444]" />;
    }
  };

  return (
    <button
      onClick={() => onClick && onClick(chip)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 mx-1 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.12)] hover:border-[#4f8cff] text-[#ffffff] font-mono text-[11px] font-bold transition-all duration-200 hover:scale-105 shadow-md"
      title={`Click to inspect ${chip.label} in Evidence Desk`}
    >
      {getIcon()}
      <span>{chip.label}</span>
    </button>
  );
};
