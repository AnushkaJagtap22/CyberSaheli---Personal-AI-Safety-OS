import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Download
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { caseEngine } from '../services/caseEngine';
import type { CyberCase } from '../services/caseEngine';

export const CasesPage: React.FC = () => {
  const [casesList, setCasesList] = useState<CyberCase[]>(caseEngine.getCases());
  const [selectedCase, setSelectedCase] = useState<CyberCase>(casesList[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'sealed'>('all');

  const filteredCases = casesList.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || c.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleExportPDF = (c: CyberCase) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CYBERSAHELI CYBER CRIME INVESTIGATION DOSSIER', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Case ID: ${c.id}`, 14, 27);
    doc.text(`Incident Title: ${c.title}`, 14, 32);

    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);

    doc.setFont('helvetica', 'bold');
    doc.text('1. EXECUTIVE SUMMARY & FORENSIC FINDINGS', 14, 44);
    doc.setFont('helvetica', 'normal');
    doc.text(c.commandSummary, 14, 50);

    doc.save(`${c.id}_Investigation_Dossier.pdf`);
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
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#22d3ee] flex items-center gap-1.5">
            <FolderKanban className="h-4 w-4 text-[#4f8cff]" />
            Persistent Cases Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Incident Cases & Dossiers</h1>
        </div>

        <button
          onClick={() => {
            const newC = caseEngine.getCaseById('case-9814')!;
            setCasesList([newC, ...casesList]);
          }}
          className="btn-primary text-xs flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Incident Case
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] shadow-xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#4f8cff]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by title, category, or evidence keyword..."
            className="w-full input-titanium text-xs pl-11 placeholder-[#8b909b]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold font-mono">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl transition-all duration-200 ${activeFilter === 'all' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
          >
            All Cases
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-xl transition-all duration-200 ${activeFilter === 'active' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveFilter('sealed')}
            className={`px-4 py-2 rounded-xl transition-all duration-200 ${activeFilter === 'sealed' ? 'bg-[#4f8cff] text-white shadow-md' : 'bg-[#111214] text-[#8b909b] border border-[rgba(255,255,255,0.08)] hover:text-[#ffffff]'}`}
          >
            Sealed / Archived
          </button>
        </div>
      </div>

      {/* Cases List & Active Workspace Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cases List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCases.map((c) => {
            const isSelected = selectedCase.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all duration-200 space-y-2 text-xs ${
                  isSelected
                    ? 'bg-[#1e2026] border-[#4f8cff] shadow-2xl ring-1 ring-[#4f8cff]'
                    : 'bg-[#17181c] border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#22d3ee] uppercase font-bold">{c.id}</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#ef4444]/20 text-[#ef4444] font-mono text-[10px] font-bold border border-[#ef4444]/30">
                    Risk {c.riskScore}/100
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-[#ffffff]">{c.title}</h4>
                <p className="text-[#8b909b] text-[11px] line-clamp-2">{c.commandSummary}</p>
              </div>
            );
          })}
        </div>

        {/* Active Case Detail Workspace */}
        <div className="lg:col-span-7 titanium-card p-8 shadow-2xl space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#22d3ee] font-bold uppercase">{selectedCase.category}</span>
              <h3 className="text-xl font-extrabold text-[#ffffff] mt-0.5">{selectedCase.title}</h3>
            </div>

            <button
              onClick={() => handleExportPDF(selectedCase)}
              className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4"
            >
              <Download className="h-3.5 w-3.5" />
              Export PDF
            </button>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#ffffff] uppercase font-mono block">Executive Summary & Findings:</span>
            <p className="text-[#c6c8d1] leading-relaxed font-medium">{selectedCase.commandSummary}</p>
          </div>

          {/* Evidence Hashes Inventory */}
          <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
            <span className="font-bold text-[#ffffff] uppercase font-mono block">Attached Evidence Entities ({selectedCase.entities.length}):</span>
            <div className="space-y-2 font-mono">
              {selectedCase.entities.map((e) => (
                <div key={e.id} className="p-3.5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                  <span className="font-bold text-[#ffffff]">{e.label}</span>
                  <span className="text-[#8b909b] text-[10px] uppercase">{e.type} • Risk {e.riskScore}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </motion.div>
  );
};
