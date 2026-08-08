import { useState, useEffect } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { 
  fetchLiveRiskRadarIntelligence, 
  type NewsStory, 
  type MaharashtraPulseDistrict,
  type CyberSaheliIntelligenceData 
} from '../services/radarEngine';

import { IntelligenceHero } from './intelligence/IntelligenceHero';
import { TrendingStory } from './intelligence/TrendingStory';
import { LiveSignals } from './intelligence/LiveSignals';
import { ThreatCategories } from './intelligence/ThreatCategories';
import { MaharashtraPulse } from './intelligence/MaharashtraPulse';
import { IncidentDrawer } from './intelligence/IncidentDrawer';
import { EmergingPattern } from './intelligence/EmergingPattern';
import { SafetyInsight } from './intelligence/SafetyInsight';
import { TrustedSources } from './intelligence/TrustedSources';

export function RiskRadar() {
  const [intel, setIntel] = useState<CyberSaheliIntelligenceData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Financial');
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<MaharashtraPulseDistrict | null>(null);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const [refreshMessage, setRefreshMessage] = useState<string | null>('Scanning trusted sources...');
  const [hasError, setHasError] = useState<boolean>(false);

  const loadLiveIntelligence = async () => {
    setIsRefreshing(true);
    setHasError(false);
    setRefreshMessage('Scanning trusted sources...');
    try {
      const data = await fetchLiveRiskRadarIntelligence();
      setIntel(data);
      setRefreshMessage('✓ Intelligence updated live');
      setTimeout(() => setRefreshMessage(null), 3000);
    } catch (e) {
      setHasError(true);
      setRefreshMessage('LIVE INTELLIGENCE TEMPORARILY UNAVAILABLE');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadLiveIntelligence();
  }, []);

  // 1. API FAILURE STATE
  if (hasError) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex flex-col items-center justify-center p-8 font-mono text-xs space-y-6">
        <div className="p-8 rounded-3xl bg-[#111317] border border-white/[0.08] max-w-md w-full space-y-4 text-center">
          <span className="text-[#EF4444] font-bold block text-sm">LIVE INTELLIGENCE TEMPORARILY UNAVAILABLE</span>
          <p className="text-[#8B909B] text-xs font-sans">
            Unable to connect to live RSS intelligence sources right now.
          </p>
          <span className="text-[#8B909B] text-[10px] block">Last verified update: {new Date().toLocaleTimeString()}</span>
          <button
            onClick={loadLiveIntelligence}
            className="w-full py-3 rounded-xl bg-[#4F8CFF] text-white font-bold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // 2. LOADING STATE
  if (!intel || isRefreshing) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex items-center justify-center p-6 font-mono text-xs">
        <div className="flex items-center gap-3 p-6 rounded-3xl bg-[#111317] border border-white/[0.08]">
          <RefreshCw className="h-5 w-5 text-[#4F8CFF] animate-spin" />
          <span>Scanning trusted sources from CERT-In & I4C...</span>
        </div>
      </div>
    );
  }

  // 3. EMPTY STATE
  if (!intel.topStory && intel.signals.length === 0) {
    return (
      <div className="min-h-screen bg-[#08090B] text-white flex flex-col items-center justify-center p-8 font-mono text-xs space-y-6">
        <div className="p-8 rounded-3xl bg-[#111317] border border-white/[0.08] max-w-md w-full space-y-4 text-center">
          <span className="text-white font-bold block text-sm">CYBERSAHELI INTELLIGENCE</span>
          <p className="text-[#8B909B] text-xs font-sans">
            No new verified signals right now.
          </p>
          <span className="text-[#8B909B] text-[10px] block">Last verified update: {intel.lastUpdated}</span>
          <button
            onClick={loadLiveIntelligence}
            className="w-full py-3 rounded-xl bg-[#4F8CFF] text-white font-bold hover:bg-[#3b82f6]"
          >
            Check again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F7FA] font-sans selection:bg-[#4F8CFF] selection:text-white relative overflow-hidden pb-32">
      
      {/* ATMOSPHERIC RADIAL BACKGROUND */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4F8CFF]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/3 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 pt-10 space-y-16 relative z-10">
        
        {/* 1. PREMIUM HERO */}
        <IntelligenceHero
          intel={intel}
          isRefreshing={isRefreshing}
          refreshMessage={refreshMessage}
          onRefresh={loadLiveIntelligence}
        />

        {/* 2. TRENDING CYBERCRIME STORY */}
        {intel.topStory && (
          <TrendingStory
            story={intel.topStory}
            onSelectStory={setSelectedStory}
          />
        )}

        {/* 3. LIVE CYBERCRIME SIGNALS */}
        <LiveSignals
          signals={intel.signals}
          onSelectStory={setSelectedStory}
        />

        {/* 4. THREAT CATEGORIES */}
        <ThreatCategories
          categories={intel.categories}
          categoryPatterns={intel.categoryPatterns}
          categoryWatchOut={intel.categoryWatchOut}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectStory={setSelectedStory}
        />

        {/* 5. MAHARASHTRA CYBERCRIME PULSE */}
        <MaharashtraPulse
          districts={intel.maharashtraDistricts}
          timeline={intel.maharashtraTimeline}
          onSelectDistrict={setSelectedDistrict}
        />

        {/* 6. EMERGING PATTERN */}
        <EmergingPattern pattern={intel.detectedPattern} />

        {/* 7. WHAT YOU SHOULD KNOW */}
        <SafetyInsight takeaway={intel.oneThingToRemember} />

        {/* 8. TRUSTED SOURCES */}
        <TrustedSources
          sources={intel.trustedSources}
          lastUpdated={intel.lastUpdated}
        />

      </div>

      {/* MAHARASHTRA DISTRICT INCIDENT DRAWER (440px) */}
      {selectedDistrict && (
        <IncidentDrawer
          district={selectedDistrict}
          onClose={() => setSelectedDistrict(null)}
        />
      )}

      {/* FULL-SCREEN EDITORIAL STORY READER MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in font-sans overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#111317] border border-white/[0.09] rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl text-white my-8">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <button
                onClick={() => setSelectedStory(null)}
                className="text-xs font-mono text-[#8B909B] hover:text-white flex items-center gap-1"
              >
                &larr; Back to CyberSaheli Intelligence
              </button>

              <span className="px-3 py-1 rounded-full bg-[#4F8CFF]/20 text-[#4F8CFF] text-xs font-mono font-bold">
                {selectedStory.verificationStatus}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#a78bfa] uppercase font-bold">{selectedStory.category} &bull; {selectedStory.location}</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                {selectedStory.headline}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
              <span className="text-[#4F8CFF] font-mono font-bold block uppercase">WHAT HAPPENED</span>
              <p className="text-[#8B909B] font-sans leading-relaxed text-sm">{selectedStory.whatHappened}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 space-y-2 text-xs">
              <span className="text-[#4F8CFF] font-mono font-bold block uppercase">WHY IT MATTERS</span>
              <p className="text-white font-sans leading-relaxed">{selectedStory.whyItMatters}</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#8B909B] uppercase font-bold block">HOW THE PATTERN WORKS</span>
              <div className="space-y-2 text-[#8B909B] font-sans">
                {selectedStory.howPatternWorks.map((item, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-[#4F8CFF] font-mono font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#8B909B] uppercase font-bold block">WHAT TO WATCH FOR</span>
              <div className="space-y-2 text-[#8B909B] font-sans">
                {selectedStory.whatToWatchFor.map((item, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-[#4F8CFF]">&bull;</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#10b981] uppercase font-bold block">WHAT YOU CAN DO</span>
              <div className="space-y-2 text-[#8B909B] font-sans">
                {selectedStory.whatYouCanDo.map((item, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-[#10b981]">&bull;</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#8B909B]">
              <span>Source: <strong className="text-white">{selectedStory.source}</strong></span>
              <a
                href={selectedStory.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#4F8CFF] font-bold hover:underline inline-flex items-center gap-1"
              >
                Read original source <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
