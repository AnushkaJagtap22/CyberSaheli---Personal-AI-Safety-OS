import React, { useState } from 'react';
import type { ExtractedEntity, EntityRelationship } from '../services/agentOrchestrator';
import { Network, Info } from 'lucide-react';

interface EvidenceCanvasProps {
  entities: ExtractedEntity[];
  relationships: EntityRelationship[];
}

export const EvidenceCanvas: React.FC<EvidenceCanvasProps> = ({ entities, relationships }) => {
  const [selectedEntity, setSelectedEntity] = useState<ExtractedEntity | null>(entities[0] || null);

  const getEntityBadgeColor = (type: string) => {
    switch (type) {
      case 'handle': return 'bg-[#4f8cff] text-white';
      case 'email': return 'bg-[#8b5cf6] text-white';
      case 'upi': return 'bg-[#ef4444] text-white';
      case 'url': return 'bg-[#22d3ee] text-[#0a0a0b]';
      default: return 'bg-[#1c1e23] text-[#ffffff]';
    }
  };

  return (
    <div className="titanium-card p-6 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-sm font-bold text-[#ffffff]">Digital Evidence Canvas (Visual Topology)</h3>
        </div>
        <span className="text-[10px] font-mono text-[#8b909b] font-bold">
          {entities.length} Evidence Nodes Connected
        </span>
      </div>

      {/* Visual Canvas Node Map */}
      <div className="p-6 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-6 relative overflow-hidden">
        <span className="text-[10px] uppercase font-mono text-[#8b909b] font-bold block">
          Interactive Node Map — Click Node to Inspect Connection Rationale:
        </span>

        {/* Node Chips Layout */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-6">
          {entities.map((node) => {
            const isSelected = selectedEntity?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedEntity(node)}
                className={`p-3.5 rounded-2xl border flex items-center gap-2.5 transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'bg-[#1e2026] text-white border-[#4f8cff] shadow-xl ring-1 ring-[#4f8cff]'
                    : 'bg-[#17181c] text-[#ffffff] border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]'
                }`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${getEntityBadgeColor(node.type)}`}>
                  {node.type.substring(0, 2).toUpperCase()}
                </span>
                <div className="text-left">
                  <span className="text-xs font-bold block text-[#ffffff]">{node.label}</span>
                  <span className="text-[9px] uppercase font-mono text-[#8b909b]">{node.type} • Risk {node.riskScore}/100</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Topology Connections List */}
        <div className="space-y-2 pt-3 border-t border-[rgba(255,255,255,0.08)] text-xs font-mono">
          <span className="text-[10px] uppercase text-[#8b909b] font-bold block">AI Verified Link Topology:</span>
          {relationships.map((rel, idx) => {
            const src = entities.find((e) => e.id === rel.source);
            const tgt = entities.find((e) => e.id === rel.target);
            return (
              <div key={idx} className="p-2.5 rounded-xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#4f8cff]">{src?.label || 'Source'}</span>
                <span className="text-[#8b5cf6] text-[10px] font-bold">──► {rel.relationship} ──►</span>
                <span className="font-bold text-[#ef4444]">{tgt?.label || 'Target'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Drawer */}
      {selectedEntity && (
        <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-2 font-bold">
            <span className="text-[#4f8cff] flex items-center gap-1.5">
              <Info className="h-4 w-4 text-[#22d3ee]" />
              Node Inspector: {selectedEntity.label}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[#ef4444] font-mono text-[10px] border border-[#ef4444]/30">
              Risk Score: {selectedEntity.riskScore}/100
            </span>
          </div>
          <p className="text-[#c6c8d1] leading-relaxed text-[11px]">
            This evidence node was extracted via Tesseract OCR and cross-referenced against CyberSaheli threat databases.
          </p>
        </div>
      )}

    </div>
  );
};
