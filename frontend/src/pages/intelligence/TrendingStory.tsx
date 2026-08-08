import type { NewsStory } from '../../services/radarEngine';

interface Props {
  story: NewsStory;
  onSelectStory: (story: NewsStory) => void;
}

export function TrendingStory({ story, onSelectStory }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">
          WHAT'S HAPPENING NOW
        </h2>
      </div>

      <div
        onClick={() => onSelectStory(story)}
        className="p-8 md:p-10 rounded-[28px] bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/50 cursor-pointer transition-all space-y-6 group shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#EF4444] font-bold tracking-widest uppercase">
            TRENDING
          </span>
          <span className="px-3 py-1 rounded-full bg-[#4F8CFF]/20 text-[#4F8CFF] text-xs font-mono font-bold">
            {story.verificationStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#4F8CFF] transition-colors leading-snug">
              {story.headline}
            </h3>
            <p className="text-sm text-[#8B909B] leading-relaxed">{story.summary}</p>
          </div>

          {/* AI-GENERATED ABSTRACT VISUALIZATION */}
          {story.visualSteps && (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2 font-mono text-xs text-[#4F8CFF]">
              <span className="text-[10px] text-[#8B909B] uppercase font-bold mb-1">Threat Pattern Sequence</span>
              {story.visualSteps.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-white font-sans text-xs w-full text-center">
                    {step}
                  </span>
                  {idx < (story.visualSteps?.length || 0) - 1 && (
                    <span className="text-[#8B909B] py-0.5">&darr;</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs font-mono text-[#8B909B]">
          <span>{story.location} &bull; {story.publishedAt} &bull; Source: <strong className="text-white">{story.source}</strong></span>
          <span className="text-[#4F8CFF] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read intelligence &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
