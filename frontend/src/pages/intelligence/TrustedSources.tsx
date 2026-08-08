import { ExternalLink } from 'lucide-react';

interface SourceItem {
  name: string;
  type: string;
  url: string;
}

interface Props {
  sources: SourceItem[];
  lastUpdated: string;
}

export function TrustedSources({ sources, lastUpdated }: Props) {
  return (
    <div className="pt-10 border-t border-white/[0.07] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider font-bold">TRUSTED SOURCES</h3>
          <span className="text-xs text-[#A1A6B1]">Cross-referenced with verified official & security sources.</span>
        </div>

        <div className="text-xs font-mono text-[#8B909B] flex items-center gap-2">
          <span className="text-[#10b981] font-bold">✓ Source verified</span>
          <span>&bull;</span>
          <span>Retrieved {lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sources.map((src, idx) => (
          <a
            key={idx}
            href={src.url}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/40 transition-all flex items-center justify-between text-xs font-mono group"
          >
            <div>
              <span className="text-white font-bold block group-hover:text-[#4F8CFF] transition-colors">{src.name}</span>
              <span className="text-[#8B909B] text-[11px] font-sans block pt-0.5">{src.type}</span>
            </div>
            <ExternalLink className="h-4 w-4 text-[#8B909B] group-hover:text-[#4F8CFF] transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
