import React, { useState } from 'react';
import type { ExtractedEntity, EntityRelationship } from '../services/agentOrchestrator';
import { Network } from 'lucide-react';

interface RelationshipGraphProps {
  entities: ExtractedEntity[];
  relationships: EntityRelationship[];
}

export const RelationshipGraph: React.FC<RelationshipGraphProps> = ({ entities, relationships }) => {
  const [selectedEntity, setSelectedEntity] = useState<ExtractedEntity | null>(entities[0] || null);

  const getEntityIconColor = (type: string) => {
    switch (type) {
      case 'handle': return 'bg-[#5b6b47] text-white';
      case 'email': return 'bg-[#c96a4a] text-white';
      case 'upi': return 'bg-[#a34739] text-white';
      case 'url': return 'bg-[#c8a86b] text-white';
      default: return 'bg-[#7c9a6d] text-white';
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-xl space-y-5 font-sans text-[#232323]">
      <div className="flex items-center justify-between border-b border-[#e4decb] pb-3">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-[#5b6b47]" />
          <h3 className="text-sm font-bold text-[#232323]">Interactive Entity Relationship Graph</h3>
        </div>
        <span className="text-[10px] font-mono text-[#66605a] font-bold">
          {entities.length} Nodes • {relationships.length} Links
        </span>
      </div>

      {/* Visual Graph Node Connections Layout */}
      <div className="p-6 rounded-2xl bg-[#f1ece2] border border-[#e4decb] space-y-4">
        <span className="text-[10px] uppercase font-mono text-[#66605a] block font-bold">Connected Suspect Network Topology:</span>

        <div className="flex flex-wrap items-center justify-center gap-3 py-4">
          {entities.map((entity) => {
            const isSelected = selectedEntity?.id === entity.id;
            return (
              <button
                key={entity.id}
                onClick={() => setSelectedEntity(entity)}
                className={`p-3 rounded-2xl border flex items-center gap-2 transition-all hover:scale-105 ${
                  isSelected
                    ? 'bg-[#5b6b47] text-white border-[#5b6b47] shadow-lg'
                    : 'bg-[#fffdf8] text-[#232323] border-[#e4decb]'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${getEntityIconColor(entity.type)}`}>
                  {entity.type.substring(0, 2).toUpperCase()}
                </span>
                <div className="text-left">
                  <span className="text-xs font-bold block">{entity.label}</span>
                  <span className="text-[9px] uppercase font-mono opacity-80">{entity.type}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Link Relationships List */}
        <div className="space-y-1.5 pt-2 border-t border-[#e4decb] text-xs font-mono">
          <span className="text-[10px] uppercase text-[#66605a] font-bold block">Verified Intelligence Linkages:</span>
          {relationships.map((rel, idx) => {
            const src = entities.find((e) => e.id === rel.source);
            const tgt = entities.find((e) => e.id === rel.target);
            return (
              <div key={idx} className="p-2 rounded-xl bg-[#fffdf8] border border-[#e4decb] flex items-center justify-between text-[11px] text-[#232323]">
                <span className="font-bold text-[#5b6b47]">{src?.label}</span>
                <span className="text-[#66605a] text-[10px]">&rarr; {rel.relationship} &rarr;</span>
                <span className="font-bold text-[#c96a4a]">{tgt?.label}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
