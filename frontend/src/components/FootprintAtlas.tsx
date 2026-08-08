import React, { useState } from 'react';
import { Globe, ZoomIn, ZoomOut, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AtlasNode {
  id: string;
  name: string;
  category: 'social' | 'code' | 'portfolio' | 'imageMatch';
  status: 'verified' | 'concern';
  details: string;
  x: number;
  y: number;
}

export const FootprintAtlas: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  const atlasNodes: AtlasNode[] = [
    { id: 'a1', name: 'Target: Rahul Sharma', category: 'social', status: 'verified', details: 'Root Identity Subject', x: 50, y: 50 },
    { id: 'a2', name: 'Instagram (@rahul_dev)', category: 'social', status: 'verified', details: '1,420 Followers • Active since 2022', x: 25, y: 25 },
    { id: 'a3', name: 'LinkedIn (in/rahul-sharma)', category: 'social', status: 'verified', details: 'Senior Software Engineer at Tech Corp', x: 75, y: 25 },
    { id: 'a4', name: 'GitHub (rahul-dev)', category: 'code', status: 'verified', details: '42 Public Repositories', x: 25, y: 75 },
    { id: 'a5', name: 'Reverse Image Match', category: 'imageMatch', status: 'concern', details: '⚠ Avatar photo reused on 2 stock sites', x: 75, y: 75 }
  ];

  const [selectedNode, setSelectedNode] = useState<AtlasNode>(atlasNodes[0]);

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-base font-extrabold text-[#ffffff]">Digital Footprint Atlas (Investigative OSINT Map)</h3>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.min(z + 0.1, 1.3))} className="p-2 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]">
            <ZoomIn className="h-4 w-4 text-[#4f8cff]" />
          </button>
          <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.8))} className="p-2 rounded-xl bg-[#111214] border border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]">
            <ZoomOut className="h-4 w-4 text-[#4f8cff]" />
          </button>
        </div>
      </div>

      {/* Palantir-Style Pannable Map Canvas */}
      <div className="p-8 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] min-h-[300px] relative overflow-hidden flex flex-col justify-between">
        <span className="text-[10px] uppercase font-mono text-[#8b909b] font-bold block text-center">
          Zoomable OSINT Intelligence Canvas:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 py-8 transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
          {atlasNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all duration-200 hover:scale-105 space-y-1 ${
                  isSelected
                    ? 'bg-[#1e2026] text-white border-[#4f8cff] shadow-xl ring-1 ring-[#4f8cff]'
                    : node.status === 'concern'
                    ? 'bg-[#ef4444]/15 border-[#ef4444] text-[#ef4444]'
                    : 'bg-[#17181c] border-[rgba(255,255,255,0.08)] text-[#ffffff]'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {node.status === 'verified' ? (
                    <CheckCircle2 className="h-4 w-4 text-[#22c55e]" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />
                  )}
                  <span className="truncate">{node.name.split(' ')[0]}</span>
                </div>
                <span className="text-[9px] uppercase font-mono block text-[#8b909b]">{node.category}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Inspector */}
        <div className="p-4 rounded-xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] text-xs space-y-1">
          <span className="font-bold text-[#4f8cff] block">Atlas Inspector: {selectedNode.name}</span>
          <p className="text-[#c6c8d1] font-medium">{selectedNode.details}</p>
        </div>
      </div>
    </div>
  );
};
