import { Radio, RefreshCw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import type { CyberSaheliIntelligenceData } from '../../services/radarEngine';

interface Props {
  intel: CyberSaheliIntelligenceData;
  isRefreshing: boolean;
  refreshMessage: string | null;
  onRefresh: () => void;
}

export function IntelligenceHero({ intel, isRefreshing, refreshMessage, onRefresh }: Props) {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('CyberSaheli Intelligence Briefing', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Last Updated: ${intel.lastUpdated}`, 14, 30);
    doc.text(`Active Signals: ${intel.signals.length} High-Impact Indicators`, 14, 36);

    doc.setFont('helvetica', 'bold');
    doc.text('Top Intelligence Story:', 14, 48);
    doc.setFont('helvetica', 'normal');
    doc.text(`Title: ${intel.topStory.headline}`, 14, 56);
    doc.text(`Location: ${intel.topStory.location} | Source: ${intel.topStory.source}`, 14, 62);
    doc.text(`Verification: ${intel.topStory.verificationStatus}`, 14, 68);

    doc.setFont('helvetica', 'bold');
    doc.text('Key Takeaway:', 14, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(intel.oneThingToRemember, 14, 88);

    doc.save(`CyberSaheli_Intelligence_Brief_${Date.now()}.pdf`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-white/[0.07] pb-10">
      <div className="space-y-4 max-w-xl">
        {/* STEP 8 VERIFICATION BANNER */}
        <div className="p-3 rounded-xl bg-[#4F8CFF]/20 border border-[#4F8CFF] text-xs font-mono text-[#4F8CFF] font-bold">
          BUILD TEST: RISK RADAR V2 &bull; ROUTE DIAGNOSTICS SUCCESSFUL
        </div>

        <span className="text-[11px] font-mono text-[#8B909B] uppercase font-bold tracking-widest block">
          CYBERSAHELI INTELLIGENCE — NEW BUILD
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Know what's changing.<br />Stay one step ahead.
        </h1>
        <p className="text-sm text-[#8B909B] leading-relaxed">
          CyberSaheli monitors trusted cybercrime sources and turns emerging threats into simple, actionable intelligence.
        </p>
      </div>

      {/* 🔮 MINIMAL TITANIUM INTELLIGENCE PULSE ORB */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="flex items-center gap-4 p-5 rounded-3xl bg-[#111317] border border-white/[0.07] backdrop-blur-2xl">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/40 shadow-xl shadow-[#4F8CFF]/10">
            <div className="w-7 h-7 rounded-full bg-[#4F8CFF]/30 blur-sm animate-pulse" />
            <Radio className="h-5 w-5 text-[#4F8CFF] absolute" />
          </div>
          <div className="text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#10b981] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" /> ● LIVE
            </div>
            <span className="text-[#8B909B] text-[10px]">Updated {intel.lastUpdated}</span>
          </div>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white transition-all disabled:opacity-50"
            title="Refresh Live Intelligence"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-[#4F8CFF]' : ''}`} />
          </button>
        </div>

        <button
          onClick={handleExportPDF}
          className="px-4 py-2 rounded-xl bg-white/[0.06] text-xs font-mono text-white hover:bg-white/[0.1] flex items-center gap-1.5 border border-white/[0.07]"
        >
          <Download className="h-3.5 w-3.5" /> Intelligence Brief (PDF)
        </button>

        {refreshMessage && (
          <span className="text-[11px] font-mono text-[#10b981] animate-fade-in">{refreshMessage}</span>
        )}
      </div>
    </div>
  );
}
