import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  Clock
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  incident: string;
  evidence: string;
  outcome: string;
  resolution: string;
  recommendations: string[];
}

export const SafetyCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('ent_1');

  const journalEntries: JournalEntry[] = [
    {
      id: 'ent_1',
      date: 'August 4, 2026',
      incident: 'Instagram Extortion & Fake Amazon Job Scam',
      evidence: '2 Screenshots, 1 UPI Handle (solicit@okaxis), 1 URL (.top)',
      outcome: 'Critical Threat Flagged & Blocked (Risk Score 94/100)',
      resolution: 'UPI Handle reported to bank helpline; Police FIR Complaint generated.',
      recommendations: [
        'Reported UPI handle to National Cyber Crime Portal (1930)',
        'Enabled Multi-Factor Authentication on Instagram',
        'Sealed evidence in Cryptographic Vault'
      ]
    },
    {
      id: 'ent_2',
      date: 'July 28, 2026',
      incident: 'Suspicious WhatsApp Voice Clone Emergency Call',
      evidence: '1 Audio Recording (Synthetic Frequency Warp Detected)',
      outcome: 'Deepfake Audio Neutralized (96% Confidence)',
      resolution: 'Verified relative primary phone number; confirmed imposter scam.',
      recommendations: [
        'Asked secret family verification question',
        'Blocked imposter number on WhatsApp'
      ]
    }
  ];

  const filtered = journalEntries.filter(
    (e) =>
      e.incident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.resolution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-16 font-sans text-[#232323] selection:bg-[#5b6b47] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[#e4decb] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5b6b47] flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#c96a4a]" />
            Apple Health Style Safety Journal
          </span>
          <h1 className="text-3xl font-extrabold text-[#232323] tracking-tight mt-1">Safety Record Journal</h1>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66605a]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search journal entries..."
            className="w-full pl-10 pr-4 py-2 bg-[#fffdf8] border border-[#e4decb] rounded-2xl text-xs text-[#232323] focus:outline-none focus:border-[#5b6b47]"
          />
        </div>
      </div>

      {/* Expanding Chronological Entries */}
      <div className="space-y-4">
        {filtered.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <div
              key={entry.id}
              className="p-6 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-md transition-all hover:border-[#5b6b47] cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : entry.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#66605a] font-mono block">{entry.date}</span>
                  <h3 className="text-base font-bold text-[#232323]">{entry.incident}</h3>
                </div>
                <ChevronDown className={`h-5 w-5 text-[#66605a] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-[#e4decb] mt-4 space-y-3 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-2xl bg-[#f1ece2] border border-[#e4decb]">
                        <span className="text-[10px] text-[#66605a] uppercase font-mono block font-bold">Evidence Collected</span>
                        <p className="text-[#232323] font-medium mt-0.5">{entry.evidence}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#f1ece2] border border-[#e4decb]">
                        <span className="text-[10px] text-[#66605a] uppercase font-mono block font-bold">Forensic Outcome</span>
                        <p className="text-[#a34739] font-bold mt-0.5">{entry.outcome}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#f1ece2] border border-[#e4decb]">
                      <span className="text-[10px] text-[#66605a] uppercase font-mono block font-bold">Resolution Summary</span>
                      <p className="text-[#232323] font-medium mt-0.5">{entry.resolution}</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#5b6b47]">AI Recommendations Followed:</span>
                      {entry.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[#232323]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#7c9a6d]" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </motion.div>
  );
};
