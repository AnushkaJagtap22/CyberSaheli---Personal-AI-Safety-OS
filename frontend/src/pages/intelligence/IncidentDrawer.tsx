import { X, ExternalLink } from 'lucide-react';
import type { MaharashtraPulseDistrict } from '../../services/radarEngine';

interface Props {
  district: MaharashtraPulseDistrict;
  onClose: () => void;
}

export function IncidentDrawer({ district, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-full max-w-[440px] bg-[#111317] border-l border-white/[0.08] p-8 space-y-8 shadow-2xl h-full overflow-y-auto text-white animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <span className="text-[11px] font-mono text-[#8B909B] uppercase font-bold">MAHARASHTRA PULSE</span>
            <h3 className="text-2xl font-bold text-white">{district.name} District</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.06] text-[#8B909B] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#4F8CFF] font-bold">{district.incidentCount} Verified Incident Report</span>
            <span className="text-[#10b981]">{district.latestReport.verificationStatus}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
            <span className="text-xs font-mono text-[#a78bfa] font-bold uppercase block">{district.latestReport.category}</span>
            <h4 className="text-sm font-bold text-white leading-snug">{district.latestReport.headline}</h4>
            <p className="text-xs text-[#8B909B] leading-relaxed">{district.latestReport.whatHappened}</p>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs border-t border-white/[0.06] pt-6">
          <span className="text-white font-semibold block mb-1 font-sans">What to watch for:</span>
          {district.latestReport.whatToWatchFor.map((item, idx) => (
            <p key={idx} className="text-[#8B909B] font-sans flex items-start gap-2">
              <span className="text-[#4F8CFF]">&bull;</span>
              <span>{item}</span>
            </p>
          ))}
        </div>

        <div className="pt-6 border-t border-white/[0.06] space-y-4">
          <div className="text-xs font-mono text-[#8B909B]">
            <span>Source: <strong className="text-white">{district.latestReport.source}</strong></span>
          </div>

          <a
            href={district.latestReport.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-semibold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20 flex items-center justify-center gap-2"
          >
            Read original report <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
