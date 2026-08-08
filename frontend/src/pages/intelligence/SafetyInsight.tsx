import { ShieldCheck } from 'lucide-react';

interface Props {
  takeaway: string;
}

export function SafetyInsight({ takeaway }: Props) {
  return (
    <div className="p-8 rounded-3xl bg-[#10b981]/10 border border-[#10b981]/30 backdrop-blur-xl space-y-3 font-mono text-xs text-[#e2e8f0]">
      <div className="flex items-center gap-2 text-[#10b981] font-bold uppercase tracking-wider">
        <ShieldCheck className="h-4 w-4" /> WHAT YOU SHOULD KNOW
      </div>
      <p className="text-white font-sans text-lg font-bold leading-relaxed">{takeaway}</p>
    </div>
  );
}
