import { AlertTriangle } from 'lucide-react';

interface Props {
  pattern?: {
    title: string;
    sequence: string[];
    watchOut: string;
  };
}

export function EmergingPattern({ pattern }: Props) {
  if (!pattern) return null;

  return (
    <div className="p-8 rounded-3xl bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <h3 className="text-xs font-mono text-[#a78bfa] font-bold uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-[#a78bfa]" /> EMERGING PATTERN
        </h3>
        <span className="text-[10px] font-mono text-[#8B909B]">Multi-Source Synthesis</span>
      </div>

      <div className="space-y-4 font-sans">
        <h4 className="text-xl font-bold text-white">{pattern.title}</h4>
        <p className="text-xs text-[#8B909B]">CyberSaheli identified similar characteristics across multiple recent reports.</p>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 font-mono text-xs">
          <span className="text-white font-bold block mb-1">Sequence:</span>
          {pattern.sequence.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="h-5 w-5 rounded-full bg-[#7c3aed]/20 text-[#a78bfa] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-[#e2e8f0] font-sans text-xs pt-0.5">{step}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 text-xs font-sans">
          <span className="text-[#4F8CFF] font-mono font-bold block uppercase mb-1">WHAT TO WATCH FOR</span>
          <p className="text-[#e2e8f0] leading-relaxed font-semibold">{pattern.watchOut}</p>
        </div>
      </div>
    </div>
  );
}
