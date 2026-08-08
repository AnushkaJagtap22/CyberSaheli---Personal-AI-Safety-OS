import React, { useState } from 'react';
import { Network, CheckCircle2, AlertTriangle, Info, ExternalLink } from 'lucide-react';

interface FootprintNode {
  id: string;
  name: string;
  type: 'subject' | 'social' | 'code' | 'portfolio' | 'imageMatch';
  status: 'verified' | 'concern';
  url?: string;
  evidenceText: string;
}

export const FootprintGraph: React.FC = () => {
  const nodes: FootprintNode[] = [
    { id: 'n1', name: 'Rahul Sharma', type: 'subject', status: 'verified', evidenceText: 'Subject Entity Profile' },
    { id: 'n2', name: 'Instagram (@rahul_dev)', type: 'social', status: 'verified', url: 'https://instagram.com', evidenceText: 'Active account since 2022 with 1,420 followers.' },
    { id: 'n3', name: 'LinkedIn (in/rahul-sharma)', type: 'social', status: 'verified', url: 'https://linkedin.com', evidenceText: 'Senior Software Engineer at Tech Corp.' },
    { id: 'n4', name: 'GitHub (github.com/rahul-dev)', type: 'code', status: 'verified', url: 'https://github.com', evidenceText: '42 Public Repositories with active commit history.' },
    { id: 'n5', name: 'Personal Portfolio (rahulsharma.dev)', type: 'portfolio', status: 'verified', url: 'https://rahulsharma.dev', evidenceText: 'Custom domain registered 3 years ago.' },
    { id: 'n6', name: 'Reverse Image Observation', type: 'imageMatch', status: 'concern', evidenceText: '⚠ Similar portrait photo found on 2 stock photography sites.' }
  ];

  const [selectedNode, setSelectedNode] = useState<FootprintNode>(nodes[0]);

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-base font-bold text-[#ffffff]">Digital Footprint Graph</h3>
        </div>
        <span className="text-xs font-mono text-[#8b909b] font-bold">{nodes.length} Footprint Nodes Linked</span>
      </div>

      {/* Visual Footprint Topology */}
      <div className="p-6 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-6">
        <span className="text-[10px] uppercase font-mono text-[#8b909b] font-bold block text-center">
          Interactive Footprint Graph — Click Node to Inspect Evidence:
        </span>

        {/* Central Root Subject */}
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedNode(nodes[0])}
            className="btn-primary text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
            {nodes[0].name} (Target Subject)
          </button>
        </div>

        {/* Connected Branch Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4">
          {nodes.slice(1).map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3.5 rounded-2xl border text-center text-xs font-bold transition-all duration-200 hover:scale-105 space-y-1 ${
                  isSelected
                    ? 'bg-[#1e2026] text-white border-[#4f8cff] shadow-xl ring-1 ring-[#4f8cff]'
                    : node.status === 'concern'
                    ? 'bg-[#ef4444]/15 border-[#ef4444] text-[#ef4444]'
                    : 'bg-[#17181c] border-[rgba(255,255,255,0.08)] text-[#ffffff]'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {node.status === 'verified' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 text-[#f59e0b]" />
                  )}
                  <span className="truncate">{node.name.split(' ')[0]}</span>
                </div>
                <span className="text-[9px] uppercase font-mono block text-[#8b909b]">{node.type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Supporting Evidence Drawer */}
      <div className="p-5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2 font-bold">
          <span className="text-[#4f8cff] flex items-center gap-1.5">
            <Info className="h-4 w-4 text-[#22d3ee]" />
            Supporting Evidence: {selectedNode.name}
          </span>
          {selectedNode.url && (
            <a href={selectedNode.url} target="_blank" rel="noopener noreferrer" className="text-[#4f8cff] hover:underline flex items-center gap-1 font-mono text-[10px]">
              Open Link <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        <p className="text-[#c6c8d1] leading-relaxed text-xs font-medium">{selectedNode.evidenceText}</p>
      </div>

    </div>
  );
};
