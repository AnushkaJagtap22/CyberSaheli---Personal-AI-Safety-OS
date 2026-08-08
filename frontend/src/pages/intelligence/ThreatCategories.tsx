import type { NewsStory } from '../../services/radarEngine';

interface Props {
  categories: { [key: string]: NewsStory[] };
  categoryPatterns: { [key: string]: string[] };
  categoryWatchOut: { [key: string]: string[] };
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectStory: (story: NewsStory) => void;
}

export function ThreatCategories({
  categories,
  categoryPatterns,
  categoryWatchOut,
  selectedCategory,
  onSelectCategory,
  onSelectStory
}: Props) {
  const activeStories = categories[selectedCategory] || categories['Financial'] || [];
  const activePatterns = categoryPatterns[selectedCategory] || categoryPatterns['Financial'] || [];
  const activeWatchOut = categoryWatchOut[selectedCategory] || categoryWatchOut['Financial'] || [];

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <h3 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">THREAT CATEGORIES</h3>
        <span className="text-xs font-mono text-[#8B909B]">Explore Intelligence</span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {['Financial', 'Scams', 'UPI Fraud', 'Women Safety', 'Deepfakes'].map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl transition-all ${
              selectedCategory === cat
                ? 'bg-[#4F8CFF] text-white font-bold shadow-lg shadow-[#4F8CFF]/20'
                : 'bg-[#111317] text-[#8B909B] hover:text-white border border-white/[0.07]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DYNAMICALLY REPLACED CATEGORY INTELLIGENCE CONTENT */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h4 className="text-2xl font-bold text-white uppercase tracking-tight">{selectedCategory}</h4>
            <span className="text-xs font-mono text-[#8B909B]">Latest developments</span>
          </div>
          <span className="text-xs font-mono text-[#4F8CFF] font-bold">{activePatterns.length} emerging patterns</span>
        </div>

        {/* Emerging Patterns */}
        <div className="space-y-3 font-mono text-xs">
          <span className="text-[#8B909B] uppercase block">Emerging Patterns</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activePatterns.map((pat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white font-sans font-semibold">
                {pat}
              </div>
            ))}
          </div>
        </div>

        {/* Latest Reports Grid */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono text-[#8B909B] uppercase block">Current Stories</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#4F8CFF]/40 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#4F8CFF] font-bold uppercase">{story.category}</span>
                  <span className="text-[#8B909B]">{story.publishedAt}</span>
                </div>

                <h5 className="text-sm font-semibold text-white group-hover:text-[#4F8CFF] transition-colors leading-snug">
                  {story.headline}
                </h5>

                <p className="text-xs text-[#8B909B] leading-relaxed line-clamp-2">{story.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT TO WATCH FOR */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 font-mono text-xs">
          <span className="text-[#4F8CFF] font-bold uppercase block">WHAT TO WATCH FOR</span>
          <div className="space-y-2 font-sans text-xs text-[#8B909B]">
            {activeWatchOut.map((item, idx) => (
              <p key={idx} className="flex items-start gap-2">
                <span className="text-[#4F8CFF]">&bull;</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
