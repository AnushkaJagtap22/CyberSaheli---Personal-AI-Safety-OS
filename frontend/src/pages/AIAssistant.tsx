import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Database, HelpCircle, Film, Network } from 'lucide-react';
import { caseEngine } from '../services/caseEngine';
import type { CyberCase } from '../services/caseEngine';

import { EvidenceGraphStudio } from '../components/EvidenceGraphStudio';
import { DigitalStoryReconstruction } from '../components/DigitalStoryReconstruction';
import { FootprintAtlas } from '../components/FootprintAtlas';
import { TrustEvolutionTimeline } from '../components/TrustEvolutionTimeline';
import { CyberMemory } from '../components/CyberMemory';
import { SafeDecisionSimulator } from '../components/SafeDecisionSimulator';

export const AIAssistant: React.FC = () => {
  const [activeCase, setActiveCase] = useState<CyberCase>(caseEngine.getCaseById('case-9814')!);
  const [activeView, setActiveView] = useState<'graph' | 'story' | 'atlas' | 'evolution' | 'memory' | 'simulator'>('graph');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isProcessing) return;
    setIsProcessing(true);

    try {
      const newCase = await caseEngine.createCaseFromPrompt(inputPrompt);
      setActiveCase(newCase);
      setInputPrompt('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-6xl mx-auto space-y-8 pb-16 font-sans text-[#ffffff] selection:bg-[#4f8cff] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#4f8cff]" />
            Adaptive Investigation Studio
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Multi-Agent AI Forensics Studio</h1>
        </div>

        {/* View Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#17181c] border border-[rgba(255,255,255,0.08)] rounded-2xl text-xs font-bold shadow-sm">
          {[
            { key: 'graph', label: 'Evidence Graph', icon: Network },
            { key: 'story', label: 'Story Reconstruction', icon: Film },
            { key: 'atlas', label: 'Footprint Atlas', icon: Sparkles },
            { key: 'evolution', label: 'Trust Evolution', icon: Sparkles },
            { key: 'memory', label: 'Cyber Memory', icon: Database },
            { key: 'simulator', label: 'Decision Simulator', icon: HelpCircle }
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setActiveView(v.key as any)}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                activeView === v.key ? 'bg-[#4f8cff] text-white shadow-md' : 'text-[#8b909b] hover:bg-[#1e2026] hover:text-[#ffffff]'
              }`}
            >
              <v.icon className="h-3.5 w-3.5" />
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Canvas Drop Bar */}
      <div className="titanium-card p-6 space-y-3 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4f8cff] block">
          AI Command Studio — Drop Evidence or Describe Incident:
        </span>
        <form onSubmit={handlePromptSubmit} className="flex gap-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="e.g. 'I received suspicious extortion threats on WhatsApp from +91 98123 45678'..."
            className="flex-1 input-titanium text-xs placeholder-[#8b909b]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isProcessing}
            className="btn-primary text-xs flex items-center gap-2 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Analyze
          </button>
        </form>
      </div>

      {/* Dynamic View Showcase */}
      {activeView === 'graph' && (
        <EvidenceGraphStudio entities={activeCase.entities} relationships={activeCase.relationships} />
      )}

      {activeView === 'story' && (
        <DigitalStoryReconstruction />
      )}

      {activeView === 'atlas' && (
        <FootprintAtlas />
      )}

      {activeView === 'evolution' && (
        <TrustEvolutionTimeline />
      )}

      {activeView === 'memory' && (
        <CyberMemory />
      )}

      {activeView === 'simulator' && (
        <SafeDecisionSimulator />
      )}

    </motion.div>
  );
};
