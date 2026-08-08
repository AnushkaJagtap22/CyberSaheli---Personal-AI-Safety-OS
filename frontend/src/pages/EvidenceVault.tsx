import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Lock, 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Copy, 
  Trash2, 
  FileCheck
} from 'lucide-react';
import jsPDF from 'jspdf';

interface VaultItem {
  id: string;
  name: string;
  category: 'Screenshot' | 'Message' | 'Document' | 'Audio' | 'Video' | 'Payment';
  size: string;
  addedTimestamp: string;
  sha256Hash: string;
  integrityVerified: boolean;
  fileUrl?: string;
  ocrText: string;
  findings: string[];
  connectedInvestigationId?: string;
  connectedInvestigationName?: string;
  evidenceGroup: string;
  activityLog: { timestamp: string; action: string }[];
}

export function EvidenceVault() {
  const navigate = useNavigate();

  // Initial Seeded Vault Items
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([
    {
      id: 'EV-2026-00421',
      name: 'Instagram_Profile_Screenshot.png',
      category: 'Screenshot',
      size: '2.4 MB',
      addedTimestamp: '08 Aug 2026, 12:42 PM',
      sha256Hash: '8f91c4d7e3a2b109485c29410d8a6f4e19875c123490812b7f5e1a3b4c5d6e7f',
      integrityVerified: true,
      ocrText: '@career_opportunities Sarah Sharma. Work from home opportunities & mentoring.',
      findings: ['Suspicious payment request pattern', 'Organization claim requires verification'],
      connectedInvestigationId: 'INV-2026-019',
      connectedInvestigationName: 'Advance-Fee Recruitment Fraud',
      evidenceGroup: 'Recruitment Scam',
      activityLog: [
        { timestamp: '12:42 PM', action: 'Evidence uploaded and stored' },
        { timestamp: '12:42 PM', action: 'SHA-256 cryptographic hash generated' },
        { timestamp: '12:43 PM', action: 'Metadata extracted & text indexed' },
        { timestamp: '12:43 PM', action: 'Linked to Recruitment Scam investigation' }
      ]
    },
    {
      id: 'EV-2026-00422',
      name: 'WhatsApp_Recruiter_Chat.png',
      category: 'Message',
      size: '1.8 MB',
      addedTimestamp: '08 Aug 2026, 12:46 PM',
      sha256Hash: '3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef012',
      integrityVerified: true,
      ocrText: 'Pay ₹4,999 to lock your slot immediately via UPI handle solicit@okaxis.',
      findings: ['Upfront registration payment request', 'Urgency pressure applied'],
      connectedInvestigationId: 'INV-2026-019',
      connectedInvestigationName: 'Advance-Fee Recruitment Fraud',
      evidenceGroup: 'Recruitment Scam',
      activityLog: [
        { timestamp: '12:46 PM', action: 'Evidence uploaded and stored' },
        { timestamp: '12:46 PM', action: 'SHA-256 cryptographic hash generated' },
        { timestamp: '12:47 PM', action: 'Metadata extracted & text indexed' }
      ]
    },
    {
      id: 'EV-2026-00423',
      name: 'Payment_Receipt_UPI.pdf',
      category: 'Payment',
      size: '540 KB',
      addedTimestamp: '08 Aug 2026, 12:51 PM',
      sha256Hash: '90123456789abcdef0123456789abcdef0123456789abcdef0123456789abcde',
      integrityVerified: true,
      ocrText: 'UPI Payment Confirmation: ₹4,999 transferred to solicit@okaxis. Transaction ID: 394820194820.',
      findings: ['Payment recipient matches flagged fraud VPA'],
      connectedInvestigationId: 'INV-2026-019',
      connectedInvestigationName: 'Advance-Fee Recruitment Fraud',
      evidenceGroup: 'Recruitment Scam',
      activityLog: [
        { timestamp: '12:51 PM', action: 'Evidence uploaded and stored' },
        { timestamp: '12:51 PM', action: 'SHA-256 cryptographic hash generated' }
      ]
    }
  ]);

  // Modals & Active State
  const [showPreserveModal, setShowPreserveModal] = useState<boolean>(false);
  const [selectedFileToPreserve, setSelectedFileToPreserve] = useState<File | null>(null);
  const [isPreserving, setIsPreserving] = useState<boolean>(false);
  const [preserveStepIndex, setPreserveStepIndex] = useState<number>(0);

  const [activeItem, setActiveItem] = useState<VaultItem | null>(null);
  const [detailTab, setDetailTab] = useState<'original' | 'ai'>('original');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const [deleteConfirmItem, setDeleteConfirmItem] = useState<VaultItem | null>(null);

  const preserveSteps = [
    'File received & stored in encrypted storage',
    'Generating SHA-256 cryptographic fingerprint',
    'Recording timestamp & chain-of-custody log',
    'Extracting metadata & text indexing',
    'Generating unique Evidence ID'
  ];

  const handlePreserveFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileToPreserve(e.target.files[0]);
    }
  };

  const handleStartPreservation = () => {
    if (!selectedFileToPreserve) return;
    setIsPreserving(true);
    setPreserveStepIndex(0);

    const interval = setInterval(() => {
      setPreserveStepIndex(prev => (prev < preserveSteps.length - 1 ? prev + 1 : prev));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);

      const newItem: VaultItem = {
        id: `EV-2026-00${424 + vaultItems.length}`,
        name: selectedFileToPreserve.name,
        category: selectedFileToPreserve.type.includes('image') ? 'Screenshot' : selectedFileToPreserve.type.includes('pdf') ? 'Document' : 'Message',
        size: `${(selectedFileToPreserve.size / 1024 / 1024).toFixed(2)} MB`,
        addedTimestamp: new Date().toLocaleString(),
        sha256Hash: Array.from(new Uint8Array(32)).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        integrityVerified: true,
        fileUrl: URL.createObjectURL(selectedFileToPreserve),
        ocrText: `Extracted text from ${selectedFileToPreserve.name}`,
        findings: ['Evidence preserved with SHA-256 hash'],
        evidenceGroup: 'General Evidence',
        activityLog: [
          { timestamp: new Date().toLocaleTimeString(), action: 'Evidence uploaded and stored' },
          { timestamp: new Date().toLocaleTimeString(), action: 'SHA-256 cryptographic hash generated' }
        ]
      };

      setVaultItems(prev => [newItem, ...prev]);
      setIsPreserving(false);
      setShowPreserveModal(false);
      setSelectedFileToPreserve(null);
    }, 3000);
  };

  const handleDeleteItem = () => {
    if (!deleteConfirmItem) return;
    setVaultItems(prev => prev.filter(i => i.id !== deleteConfirmItem.id));
    if (activeItem?.id === deleteConfirmItem.id) setActiveItem(null);
    setDeleteConfirmItem(null);
  };

  const handleExportPackage = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('CyberSaheli Evidence Package & Chain of Custody', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Total Preserved Items: ${vaultItems.length}`, 14, 36);

    let y = 48;
    vaultItems.forEach((item, idx) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. [${item.id}] ${item.name}`, 14, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`   Category: ${item.category} | Size: ${item.size} | Added: ${item.addedTimestamp}`, 14, y);
      y += 6;
      doc.text(`   SHA-256: ${item.sha256Hash}`, 14, y);
      y += 10;
    });

    doc.save(`CyberSaheli_Evidence_Package_${Date.now()}.pdf`);
  };

  // Filter & Search Logic
  const filteredItems = vaultItems.filter(item => {
    const matchesCategory = activeCategoryFilter === 'All' || item.category === activeCategoryFilter;
    const matchesQuery = !searchQuery.trim() || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ocrText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.evidenceGroup.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 font-sans text-white pb-24 selection:bg-[#7c3aed] selection:text-white">
      
      {/* 🔮 HERO SECTION */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#171927] to-[#0f1017] border border-[rgba(255,255,255,0.08)] shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-xs font-mono font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> DIGITAL FORENSICS EVIDENCE VAULT
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Evidence Vault
            </h1>
            <p className="text-sm text-[#94a3b8] max-w-xl leading-relaxed">
              Your Evidence. Preserved. Protected. Ready When You Need It. Keep original screenshots, messages, and files safely organized with SHA-256 integrity hashes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPreserveModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-[#7c3aed]/20"
            >
              <Upload className="h-4 w-4" /> + Preserve Evidence
            </button>
            <button
              onClick={handleExportPackage}
              className="px-5 py-3.5 rounded-2xl bg-[#171a27] text-white text-xs font-bold hover:bg-[#22273a] border border-[rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
            >
              <Download className="h-4 w-4 text-[#a78bfa]" /> Export Package (PDF)
            </button>
          </div>
        </div>

        {/* OVERVIEW STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)] font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
            <span className="text-[#94a3b8] text-[10px] block">Evidence Items</span>
            <span className="text-xl font-extrabold text-white">{vaultItems.length} Preserved</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
            <span className="text-[#94a3b8] text-[10px] block">Investigations</span>
            <span className="text-xl font-extrabold text-[#60a5fa]">4 Connected</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
            <span className="text-[#94a3b8] text-[10px] block">Evidence Sets</span>
            <span className="text-xl font-extrabold text-[#a78bfa]">2 Active</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
            <span className="text-[#94a3b8] text-[10px] block">Integrity Status</span>
            <span className="text-xl font-extrabold text-[#10b981]">100% Verified</span>
          </div>
        </div>
      </div>

      {/* 🔍 NATURAL LANGUAGE SEARCH & CATEGORY FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#64748b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search evidence (e.g. "payment requests", "threats", "phone numbers")...'
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] text-white text-xs focus:outline-none focus:border-[#7c3aed]"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {['All', 'Screenshot', 'Message', 'Payment', 'Document'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeCategoryFilter === cat
                    ? 'bg-[#7c3aed] text-white font-bold shadow-lg shadow-[#7c3aed]/20'
                    : 'bg-[#13151f] text-[#94a3b8] hover:text-white border border-[rgba(255,255,255,0.06)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📦 EMPTY STATE OR EVIDENCE LIST */}
      {filteredItems.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] text-center space-y-4 shadow-2xl">
          <div className="p-4 rounded-2xl bg-[#7c3aed]/15 text-[#a78bfa] w-fit mx-auto">
            <Lock className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Your Evidence Vault</h3>
          <p className="text-xs text-[#94a3b8] max-w-md mx-auto leading-relaxed">
            Nothing has been preserved yet matching your criteria. When something suspicious happens, save original evidence here before deleting or forwarding.
          </p>
          <button
            onClick={() => setShowPreserveModal(true)}
            className="px-6 py-3 rounded-2xl bg-[#7c3aed] text-white text-xs font-bold shadow-lg shadow-[#7c3aed]/20"
          >
            + Preserve Evidence
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] hover:border-[#7c3aed]/50 transition-all space-y-4 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#7c3aed]/15 text-[#a78bfa] text-[10px] font-mono font-bold border border-[#7c3aed]/30">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#10b981] flex items-center gap-1">
                    <FileCheck className="h-3.5 w-3.5" /> SHA-256 Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:underline truncate">{item.name}</h3>
                  <span className="text-[11px] text-[#94a3b8] font-mono">{item.addedTimestamp} &bull; {item.size}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] text-[11px] text-[#cbd5e1] font-mono space-y-1">
                  <span className="text-[#a78bfa] font-bold block text-[10px] uppercase">SHA-256 Fingerprint</span>
                  <p className="truncate text-[#94a3b8]">{item.sha256Hash.slice(0, 24)}...</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <button
                  onClick={() => { setActiveItem(item); setDetailTab('original'); }}
                  className="text-xs font-mono font-bold text-[#a78bfa] hover:underline flex items-center gap-1"
                >
                  <Eye className="h-3.5 w-3.5" /> View Evidence &rarr;
                </button>

                <button
                  onClick={() => setDeleteConfirmItem(item)}
                  className="p-2 rounded-xl text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🖼️ EVIDENCE DETAIL WORKSPACE MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
          <div className="w-full max-w-3xl bg-[#13151f] border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#10b981] font-bold">✓ INTEGRITY VERIFIED</span>
                  <span className="text-[10px] font-mono text-[#64748b]">[{activeItem.id}]</span>
                </div>
                <h2 className="text-xl font-bold">{activeItem.name}</h2>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 rounded-xl bg-[#171a27] text-[#94a3b8] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* TAB SWITCHER: ORIGINAL EVIDENCE vs AI ANALYSIS */}
            <div className="flex border-b border-[rgba(255,255,255,0.06)] gap-4">
              <button
                onClick={() => setDetailTab('original')}
                className={`pb-3 text-xs font-mono font-bold transition-all border-b-2 ${
                  detailTab === 'original' ? 'border-[#7c3aed] text-white' : 'border-transparent text-[#64748b]'
                }`}
              >
                ORIGINAL EVIDENCE (Untouched)
              </button>
              <button
                onClick={() => setDetailTab('ai')}
                className={`pb-3 text-xs font-mono font-bold transition-all border-b-2 ${
                  detailTab === 'ai' ? 'border-[#7c3aed] text-white' : 'border-transparent text-[#64748b]'
                }`}
              >
                AI ANALYSIS & FINDINGS
              </button>
            </div>

            {/* TAB 1: ORIGINAL UNTOUCHED EVIDENCE */}
            {detailTab === 'original' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0a0b0e] border border-[rgba(255,255,255,0.08)] text-center">
                  {activeItem.fileUrl ? (
                    <img src={activeItem.fileUrl} alt="Original Evidence" className="max-h-64 rounded-xl object-contain mx-auto" />
                  ) : (
                    <div className="p-8 text-xs text-[#94a3b8] font-mono space-y-2">
                      <FileText className="h-8 w-8 text-[#7c3aed] mx-auto" />
                      <p>Untouched file stored safely in encrypted vault storage.</p>
                    </div>
                  )}
                </div>

                {/* SHA-256 Cryptographic Fingerprint Card */}
                <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#a78bfa] uppercase">SHA-256 Cryptographic Fingerprint</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(activeItem.sha256Hash)}
                      className="px-2.5 py-1 rounded bg-[#7c3aed]/20 text-[#a78bfa] text-[10px] font-mono hover:bg-[#7c3aed]/30 flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" /> Copy Hash
                    </button>
                  </div>
                  <p className="font-mono text-xs text-white break-all">{activeItem.sha256Hash}</p>
                  <p className="text-[11px] text-[#94a3b8]">
                    This fingerprint confirms that the original evidence file has not been altered since preservation.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: AI ANALYSIS & FINDINGS */}
            {detailTab === 'ai' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-2">
                  <span className="text-[#a78bfa] font-mono font-bold block uppercase text-[10px]">Extracted Text (OCR)</span>
                  <p className="text-[#e2e8f0] leading-relaxed font-mono">{activeItem.ocrText}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-white font-bold block">AI Findings</span>
                  {activeItem.findings.map((f, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#fca5a5] flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                {activeItem.connectedInvestigationName && (
                  <div className="p-4 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#a78bfa] uppercase font-bold block">Connected Investigation</span>
                      <h4 className="font-bold text-white">{activeItem.connectedInvestigationName}</h4>
                    </div>
                    <button
                      onClick={() => { setActiveItem(null); navigate('/app/investigate'); }}
                      className="px-4 py-2 rounded-xl bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#6d28d9]"
                    >
                      Open Investigation &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Chain of Custody History */}
            <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-2 font-mono text-xs">
              <span className="text-white font-bold block">Chain-of-Custody Activity History</span>
              <div className="space-y-1 text-[11px] text-[#94a3b8]">
                {activeItem.activityLog.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-[#a78bfa] font-bold">{log.timestamp}</span>
                    <span>{log.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(activeItem)}
                className="px-4 py-2.5 rounded-xl bg-[#ef4444]/20 text-[#ef4444] text-xs font-bold hover:bg-[#ef4444]/30"
              >
                Delete Permanently
              </button>
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-xs font-bold"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 📥 PRESERVE EVIDENCE UPLOAD MODAL */}
      {showPreserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
          <div className="w-full max-w-xl bg-[#13151f] border border-[#7c3aed]/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <div>
                <span className="text-[10px] font-mono text-[#a78bfa] font-bold uppercase">PRESERVE EVIDENCE</span>
                <h3 className="text-lg font-bold">Upload Original File</h3>
              </div>
              <button
                onClick={() => setShowPreserveModal(false)}
                className="p-2 rounded-xl bg-[#171a27] text-[#94a3b8] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isPreserving ? (
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-[#171a27] border-2 border-dashed border-[#7c3aed]/40 hover:border-[#7c3aed] text-center space-y-3 relative cursor-pointer">
                  <input
                    type="file"
                    onChange={handlePreserveFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="p-3 rounded-2xl bg-[#7c3aed]/15 text-[#a78bfa] w-fit mx-auto">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold">
                    {selectedFileToPreserve ? selectedFileToPreserve.name : 'Drop evidence file here or click to browse'}
                  </h4>
                  <p className="text-xs text-[#94a3b8] font-mono">
                    Screenshot &bull; Video &bull; Audio &bull; PDF &bull; Chat Export
                  </p>
                </div>

                <button
                  onClick={handleStartPreservation}
                  disabled={!selectedFileToPreserve}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-xs font-bold hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" /> Preserve with SHA-256 Hash &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#a78bfa] font-bold pb-2 border-b border-[rgba(255,255,255,0.06)]">
                  <Sparkles className="h-4 w-4 animate-spin" /> Preserving Evidence...
                </div>
                {preserveSteps.map((stepText, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {idx < preserveStepIndex ? (
                      <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0" />
                    ) : idx === preserveStepIndex ? (
                      <div className="h-4 w-4 rounded-full border-2 border-[#7c3aed] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-[#3b4259] shrink-0" />
                    )}
                    <span className={idx <= preserveStepIndex ? 'text-white font-medium' : 'text-[#64748b]'}>
                      {stepText}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ⚠️ DELETE CONFIRMATION MODAL */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#13151f] border border-[#ef4444]/40 rounded-3xl p-6 space-y-6 shadow-2xl text-white">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#ef4444]">Delete Evidence Permanently?</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                This will permanently remove "{deleteConfirmItem.name}" and its SHA-256 integrity hash from your Evidence Vault. This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-xl bg-[#171a27] text-[#94a3b8] text-xs font-bold hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2 rounded-xl bg-[#ef4444] text-white text-xs font-bold hover:bg-[#dc2626]"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
