import type { NewsStory } from '../../services/radarEngine';

interface Props {
  signals: NewsStory[];
  onSelectStory: (story: NewsStory) => void;
}

export function LiveSignals({ signals, onSelectStory }: Props) {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
        <h3 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">LIVE SIGNALS</h3>
        <span className="text-xs font-mono text-[#8B909B]">Curated Indicators</span>
      </div>

      <div className="divide-y divide-white/[0.07]">
        {signals.map((story, idx) => (
          <div
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group hover:bg-white/[0.01] transition-all px-2 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <span className="text-xs font-mono text-[#8B909B] font-bold pt-1">0{idx + 1}</span>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase">{story.category}</span>
                <h4 className="text-base font-semibold text-white group-hover:text-[#4F8CFF] transition-colors leading-snug">
                  {story.headline}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0 text-xs font-mono text-[#8B909B]">
              <span>{story.multiSourceCount ? `${story.multiSourceCount} verified sources` : 'Verified'} &bull; {story.publishedAt}</span>
              <span className="text-[#4F8CFF] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
