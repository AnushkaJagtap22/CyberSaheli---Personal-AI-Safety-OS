import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Send, 
  Sparkles, 
  Share2,
  Save,
  X,
  Pin,
  Clock,
  Globe,
  Upload,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { caseEngine } from '../services/caseEngine';
import type { CyberCase } from '../services/caseEngine';
import type { ExtractedEntity } from '../services/agentOrchestrator';

import { EvidenceChip } from '../components/EvidenceChip';
import type { EvidenceChipData } from '../components/EvidenceChip';
import { DigitalDetectiveSummary } from '../components/DigitalDetectiveSummary';
import { ProgressiveSummaryCard } from '../components/ProgressiveSummaryCard';
import { CaseNotebookStudio } from '../components/CaseNotebookStudio';
import { BottomActionDock } from '../components/BottomActionDock';
import { AskEvidenceModal } from '../components/AskEvidenceModal';

export const CaseWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeCase] = useState<CyberCase>(
    caseEngine.getCaseById(id || 'case-9814')!
  );

  const [promptInput, setPromptInput] = useState('');
  const [selectedChip, setSelectedChip] = useState<EvidenceChipData | null>(null);
  const [targetEvidenceModal, setTargetEvidenceModal] = useState<ExtractedEntity | null>(null);
  const [showDetailedInvestigation, setShowDetailedInvestigation] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [isProcessing, setIsProcessing] = useState(false);

  // Conversation Stream Messages
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; chips?: EvidenceChipData[] }[]
  >([
    {
      sender: 'user',
      text: 'Someone claiming to be an HR recruiter from Infosys is asking me for ₹500.'
    },
    {
      sender: 'ai',
      text: 'This appears to be an advance-fee recruiter scam because of unverified payment requests and urgency wording. Review the supporting evidence chips below:',
      chips: [
        { id: 'c1', type: 'image', label: '🖼 Screenshot #2' },
        { id: 'c2', type: 'message', label: '💬 Message #14' },
        { id: 'c3', type: 'link', label: '🌐 Profile Link' },
        { id: 'c4', type: 'pdf', label: '📄 Offer Letter PDF' }
      ]
    }
  ]);

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isProcessing) return;
    const userText = promptInput.trim();
    setPromptInput('');

    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsProcessing(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzed evidence for: "${userText}". Identified unverified UPI handle solicit@okaxis and domain .top. Supporting evidence attached:`,
          chips: [
            { id: `c_${Date.now()}_1`, type: 'image', label: '🖼 Extortion Screenshot' },
            { id: `c_${Date.now()}_2`, type: 'link', label: '🌐 solicit@okaxis' }
          ]
        }
      ]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleChipClick = (chip: EvidenceChipData) => {
    setSelectedChip(chip);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CYBERSAHELI AI INVESTIGATION DOSSIER', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Case ID: ${activeCase.id}`, 14, 27);
    doc.text(`Title: ${activeCase.title}`, 14, 32);

    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);

    doc.setFont('helvetica', 'bold');
    doc.text('1. EXECUTIVE SUMMARY & FORENSIC FINDINGS', 14, 44);
    doc.setFont('helvetica', 'normal');
    doc.text(activeCase.commandSummary, 14, 50);

    doc.save(`${activeCase.id}_Digital_Case_Dossier.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-6xl mx-auto space-y-6 pb-24 font-sans text-[#ffffff] selection:bg-[#4f8cff] selection:text-white"
    >
      {/* 1. HEADER TITLE BAR */}
      <header className="border-b border-[rgba(255,255,255,0.08)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight">CyberSaheli Investigation</h1>
          <p className="text-xs text-[#8b909b] font-medium mt-0.5">
            Describe your situation or upload evidence. CyberSaheli will organize, analyze and guide you.
          </p>
        </div>

        {/* Multilingual Selector & Actions */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1 p-1 bg-[#111214] border border-[rgba(255,255,255,0.08)] rounded-xl">
            <Globe className="h-3.5 w-3.5 text-[#4f8cff] ml-1.5" />
            <button
              onClick={() => setActiveLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${activeLang === 'en' ? 'bg-[#4f8cff] text-white font-bold' : 'text-[#8b909b]'}`}
            >
              EN
            </button>
            <button
              onClick={() => setActiveLang('hi')}
              className={`px-2.5 py-1 rounded-lg transition-all ${activeLang === 'hi' ? 'bg-[#4f8cff] text-white font-bold' : 'text-[#8b909b]'}`}
            >
              HI
            </button>
            <button
              onClick={() => setActiveLang('mr')}
              className={`px-2.5 py-1 rounded-lg transition-all ${activeLang === 'mr' ? 'bg-[#4f8cff] text-white font-bold' : 'text-[#8b909b]'}`}
            >
              MR
            </button>
          </div>

          <button
            onClick={() => alert("Shareable investigation link copied to clipboard!")}
            className="px-3.5 py-2 rounded-xl bg-[#111214] hover:bg-[#1e2026] text-[#c6c8d1] border border-[rgba(255,255,255,0.08)] flex items-center gap-1.5 font-bold transition-all"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl bg-[#111214] hover:bg-[#1e2026] text-[#c6c8d1] border border-[rgba(255,255,255,0.08)] flex items-center gap-1.5 font-bold transition-all"
          >
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button
            onClick={() => alert("Case progress saved to memory vault!")}
            className="btn-primary text-xs flex items-center gap-1.5 py-2 px-3.5"
          >
            <Save className="h-3.5 w-3.5" /> Save
          </button>
          <button
            onClick={() => navigate('/app')}
            className="p-2 rounded-xl bg-[#111214] hover:bg-[#1e2026] text-[#8b909b] hover:text-[#ffffff] border border-[rgba(255,255,255,0.08)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* 2. HERO DRAG & DROP UPLOAD + CHATGPT PROMPT BAR */}
      <div className="titanium-card p-6 space-y-4 shadow-2xl">
        <div 
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = (e: any) => {
              if (e.target.files?.length) {
                alert(`Uploaded evidence file: ${e.target.files[0].name}`);
              }
            };
            input.click();
          }}
          className="p-6 rounded-2xl border-2 border-dashed border-[rgba(255,255,255,0.12)] hover:border-[#4f8cff] text-center space-y-2 cursor-pointer transition-all duration-200"
        >
          <Upload className="h-6 w-6 text-[#4f8cff] mx-auto animate-bounce" />
          <h4 className="text-xs font-extrabold text-[#ffffff]">
            Describe your situation... or Upload Evidence (Images, Chats, Videos, PDFs, Emails, URLs)
          </h4>
          <p className="text-[11px] text-[#8b909b]">Drop your evidence files or click to select from device.</p>
        </div>

        <form onSubmit={handlePromptSubmit} className="flex gap-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Tell CyberSaheli what happened... ('Someone is blackmailing me...')"
            className="flex-1 input-titanium text-xs placeholder-[#8b909b]"
          />
          <button
            type="submit"
            disabled={!promptInput.trim() || isProcessing}
            className="btn-primary text-xs flex items-center gap-2 px-6 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Start Investigation
          </button>
        </form>
      </div>

      {/* 3. LIVE INVESTIGATION STREAM (HUMAN NON-JARGON PROGRESS) */}
      <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[#8b909b] font-bold">LIVE INVESTIGATION STREAM:</span>
          <span className="text-[#ffffff]">Reading uploaded evidence… Finding important info… Checking links… Preparing recommendations…</span>
        </div>
        <span className="text-[#22c55e] font-bold">✓ STREAM ACTIVE</span>
      </div>

      {/* 4. ⭐ WOW FEATURE: PROGRESSIVE DISCLOSURE SUMMARY CARD */}
      <ProgressiveSummaryCard
        activeCase={activeCase}
        showDetails={showDetailedInvestigation}
        onToggleDetails={() => setShowDetailedInvestigation(!showDetailedInvestigation)}
        language={activeLang}
      />

      {/* 5. DETAILED INVESTIGATION VIEW (Revealed via Progressive Disclosure) */}
      {showDetailedInvestigation && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2"
        >
          {/* LEFT: EVIDENCE DESK & CHATS */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Selected Evidence Highlight Inspection Card */}
            {selectedChip && (
              <div className="titanium-card p-5 border-[#4f8cff] space-y-2 shadow-2xl bg-[#4f8cff]/10">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#4f8cff] uppercase">Inspecting Chip: {selectedChip.label}</span>
                  <button onClick={() => setSelectedChip(null)} className="text-[#8b909b] hover:text-[#ffffff]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-[#c6c8d1]">
                  Extracted evidence entity: Extortion fee request of ₹500 via unverified UPI handle solicit@okaxis.
                </p>
              </div>
            )}

            {/* Evidence Cards + "Ask About This Evidence" WOW Feature */}
            <div className="titanium-card p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee]">Evidence Cards</span>
                <span className="text-xs text-[#8b909b] font-mono">{activeCase.entities.length} Items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCase.entities.map((e) => (
                  <div key={e.id} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-2 text-xs font-mono flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#4f8cff]">{e.type}</span>
                        <Pin className="h-3.5 w-3.5 text-[#22d3ee]" />
                      </div>
                      <span className="font-bold text-[#ffffff] truncate block text-sm">{e.label}</span>
                      <span className="text-[#8b909b] text-[10px] block mt-0.5">Related: Screenshot 2 & WhatsApp</span>
                    </div>

                    {/* ⭐ WOW FEATURE BUTTON: Ask About This Evidence */}
                    <button
                      onClick={() => setTargetEvidenceModal(e)}
                      className="w-full mt-2 py-1.5 px-2 rounded-xl bg-[#4f8cff]/20 hover:bg-[#4f8cff]/30 text-[#4f8cff] border border-[#4f8cff]/30 font-bold text-[10px] flex items-center justify-center gap-1 transition-all"
                    >
                      <HelpCircle className="h-3 w-3" />
                      Ask About This Evidence
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Conversation Stream */}
            <div className="titanium-card p-6 space-y-4 shadow-2xl">
              <span className="text-xs font-mono font-bold uppercase text-[#4f8cff] flex items-center gap-1.5 border-b border-[rgba(255,255,255,0.08)] pb-3">
                <Sparkles className="h-4 w-4 text-[#22d3ee]" />
                Smart Conversation Stream
              </span>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl text-xs space-y-2 ${
                      m.sender === 'user'
                        ? 'bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[#ffffff]'
                        : 'bg-[#4f8cff]/10 border border-[#4f8cff]/30 text-[#ffffff]'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#8b909b] uppercase block font-bold">
                      {m.sender === 'user' ? 'You' : 'CyberSaheli AI Detective'}
                    </span>
                    <p className="leading-relaxed font-medium">{m.text}</p>

                    {m.chips && (
                      <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                        <span className="text-[10px] font-mono text-[#22d3ee] block font-bold mb-1">Supporting Evidence Chips:</span>
                        <div className="flex flex-wrap gap-1">
                          {m.chips.map((chip) => (
                            <EvidenceChip key={chip.id} chip={chip} onClick={handleChipClick} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Apple Journal Style Vertical Timeline */}
            <div className="titanium-card p-6 space-y-4 shadow-2xl font-mono text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4f8cff] block flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#22d3ee]" /> Apple Journal Vertical Timeline
              </span>

              <div className="space-y-4 relative border-l-2 border-[rgba(255,255,255,0.08)] pl-4">
                <div className="space-y-0.5 relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#4f8cff]" />
                  <span className="text-[10px] text-[#8b909b]">Yesterday 10:15 AM</span>
                  <span className="font-bold text-[#ffffff] block">Initial Contact via Instagram DM</span>
                </div>
                <div className="space-y-0.5 relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#8b5cf6]" />
                  <span className="text-[10px] text-[#8b909b]">Yesterday 10:32 AM</span>
                  <span className="font-bold text-[#ffffff] block">Conversation Moved to WhatsApp</span>
                </div>
                <div className="space-y-0.5 relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-[10px] text-[#8b909b]">Yesterday 10:50 AM</span>
                  <span className="font-bold text-[#ffffff] block">₹500 WFH Laptop Fee Requested</span>
                </div>
                <div className="space-y-0.5 relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                  <span className="text-[10px] text-[#8b909b]">Today 09:15 AM</span>
                  <span className="font-bold text-[#ffffff] block">CyberSaheli Investigation Opened</span>
                </div>
              </div>
            </div>

            {/* Case Notebook */}
            <CaseNotebookStudio initialNotes={activeCase.vaultNotes} />
          </div>

          {/* RIGHT: DIGITAL DETECTIVE SUMMARY & FINDINGS */}
          <div className="lg:col-span-6 space-y-6">
            <DigitalDetectiveSummary activeCase={activeCase} language={activeLang} />

            {/* Personal Recovery Checklist */}
            <div className="titanium-card p-6 space-y-4 font-sans text-xs">
              <span className="font-bold text-[#ffffff] uppercase font-mono block flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#22c55e]" /> Personal Recovery Checklist
              </span>

              <div className="space-y-2 font-mono">
                <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[#22c55e]">
                  <span>Save Evidence Screenshots</span>
                  <span className="font-bold">✓ Complete</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[#ffffff]">
                  <span>Do NOT Send Advance Payments</span>
                  <span className="font-bold text-[#f59e0b]">○ Recommended</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[#ffffff]">
                  <span>Verify Employer Corporate Email</span>
                  <span className="font-bold text-[#f59e0b]">○ Recommended</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[#ffffff]">
                  <span>Enable Two-Factor Authentication</span>
                  <span className="font-bold text-[#f59e0b]">○ Recommended</span>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      )}

      {/* 6. BOTTOM FLOATING ACTION DOCK */}
      <BottomActionDock
        onUpload={() => navigate('/app')}
        onAskAI={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onGenerateReport={handleExportPDF}
        onShareEvidence={() => alert("Shareable evidence link copied to clipboard!")}
        onEmergencySOS={() => navigate('/app/emergency')}
      />

      {/* ⭐ WOW FEATURE MODAL: Ask About This Evidence */}
      <AskEvidenceModal
        evidence={targetEvidenceModal}
        onClose={() => setTargetEvidenceModal(null)}
      />

    </motion.div>
  );
};
