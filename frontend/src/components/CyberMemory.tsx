import React, { useState } from 'react';
import { Search, Database, FileText, ArrowRight } from 'lucide-react';

export const CyberMemory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleVaultRecords = [
    { query: 'UPI', title: 'solicit@okaxis', caseId: 'CASE-9814', date: '2026-08-04', snippet: 'Demanded Rs 4,999 WFH laptop registration fee.' },
    { query: 'Telegram', title: 't.me/wfh_recruiter_fast', caseId: 'CASE-9814', date: '2026-08-04', snippet: 'Moved conversation to bypass Instagram reporting.' },
    { query: 'Blackmail', title: 'Legal Extortion Threat', caseId: 'CASE-9814', date: '2026-08-05', snippet: 'Threatened police complaint if fee is not paid within 2 hours.' }
  ];

  const filtered = searchQuery.trim()
    ? sampleVaultRecords.filter((r) => r.query.toLowerCase().includes(searchQuery.toLowerCase()) || r.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : sampleVaultRecords;

  return (
    <div className="titanium-card p-8 space-y-6 font-sans text-[#ffffff] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-[#4f8cff]" />
          <h3 className="text-base font-extrabold text-[#ffffff]">Cyber Memory (Global Evidence Search)</h3>
        </div>
        <span className="text-xs font-mono text-[#8b909b]">Encrypted Index Active</span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-4 h-4 w-4 text-[#4f8cff]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search past evidence by keyword (e.g. 'UPI', 'Telegram', 'Blackmail')..."
          className="w-full input-titanium text-xs pl-11 placeholder-[#8b909b]"
        />
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filtered.map((rec, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs hover:border-[#4f8cff] transition-all duration-200">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-[#8b5cf6]" />
              <div>
                <span className="font-bold text-[#ffffff] block">{rec.title}</span>
                <span className="text-[#8b909b] font-mono text-[10px]">{rec.caseId} • {rec.date} • &quot;{rec.snippet}&quot;</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#4f8cff]" />
          </div>
        ))}
      </div>
    </div>
  );
};
