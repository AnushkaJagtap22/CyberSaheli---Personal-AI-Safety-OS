import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { RelationshipGraph } from '../components/RelationshipGraph';
import { LiveAgentPanel } from '../components/LiveAgentPanel';

export const InvestigationBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'graph' | 'agents' | 'explainability'>('dossier');

  const sampleEntities = [
    { id: 'e1', type: 'handle' as const, label: '@amazon_wfh_recruiter', riskScore: 88 },
    { id: 'e2', type: 'email' as const, label: 'hr@amazon-wfh-jobs.top', riskScore: 92 },
    { id: 'e3', type: 'phone' as const, label: '+91 98765 43210', riskScore: 75 },
    { id: 'e4', type: 'upi' as const, label: 'solicit@okaxis', riskScore: 95 },
    { id: 'e5', type: 'url' as const, label: 'http://amazon-verify-account.top', riskScore: 98 },
    { id: 'e6', type: 'upi' as const, label: 'Ref: SBI-PAY-881920', riskScore: 60 },
  ];

  const sampleRelationships = [
    { source: 'e1', target: 'e2', relationship: 'Used in Bio' },
    { source: 'e2', target: 'e5', relationship: 'Hosted on Domain' },
    { source: 'e1', target: 'e4', relationship: 'Demanded Payment' },
    { source: 'e4', target: 'e3', relationship: 'Linked Mobile' },
    { source: 'e4', target: 'e6', relationship: 'Transaction Record' }
  ];

  const explainableQA = [
    {
      question: "Why was this profile classified as a High-Risk Scam?",
      answer: "The profile @amazon_wfh_recruiter claims affiliation with Amazon India, but its contact email domain 'amazon-wfh-jobs.top' was registered only 4 days ago under an unverified privacy proxy. Additionally, the UPI handle solicit@okaxis has 14 prior fraud reports registered on National Cyber Crime Portal.",
      confidence: 96
    },
    {
      question: "What manipulation techniques were detected in the conversation?",
      answer: "Love bombing & rapid intimacy building (Day 1-3), followed by artificial time pressure ('Pay within 2 hours or job offer expires'), and financial extortion demanding ₹4,999 security deposit for laptop dispatch.",
      confidence: 92
    },
    {
      question: "Is there evidence of Deepfake media misuse?",
      answer: "Yes. The profile image contains synthetic GAN facial artifacts (asymmetrical iris reflections, inconsistent ear geometry), indicating the avatar picture was generated via AI face synthesis rather than being a real person.",
      confidence: 89
    },
    {
      question: "What legal Sections of Indian Penal Code & IT Act apply here?",
      answer: "IT Act Section 66D (Cheating by impersonation using computer resource), IT Act Section 66E (Privacy violation), and IPC Section 507 (Criminal intimidation by anonymous communication).",
      confidence: 98
    },
    {
      question: "What are the recommended immediate next steps?",
      answer: "1) Freeze UPI handle solicit@okaxis by calling 1930 Cyber Helpline. 2) Block +91 98765 43210 on WhatsApp. 3) Download the sealed FIR dossier PDF below and submit to your local cyber crime cell.",
      confidence: 99
    }
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("NATIONAL CYBER CRIME INVESTIGATION DOSSIER", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Case ID: CS-2026-98142 | Date: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text("Platform: CyberSaheli Autonomous AI Digital Forensics System", 14, 33);

    doc.setLineWidth(0.5);
    doc.line(14, 37, 196, 37);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("1. EXECUTIVE SUMMARY", 14, 45);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const summaryText = "Investigation confirms an organized Employment Phishing & Extortion attempt targeting job seekers. Suspect impersonated corporate HR demanding upfront security fee via unverified UPI handle solicit@okaxis.";
    const splitSummary = doc.splitTextToSize(summaryText, 180);
    doc.text(splitSummary, 14, 52);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("2. EXTRACTED EVIDENCE ENTITIES", 14, 75);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    sampleEntities.forEach((ent, idx) => {
      doc.text(`• [${ent.type.toUpperCase()}] ${ent.label} (Risk Score: ${ent.riskScore}/100)`, 14, 83 + (idx * 6));
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("3. APPLICABLE LEGAL PROVISIONS", 14, 130);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("• IT Act 2000 Section 66D - Cheating by Personation", 14, 138);
    doc.text("• IT Act 2000 Section 66E - Violation of Privacy", 14, 144);
    doc.text("• IPC Section 507 - Criminal Intimidation by Anonymous Communication", 14, 150);

    doc.save("CyberSaheli_Case_Dossier_CS-98142.pdf");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-16 font-sans text-[#f9fafb] selection:bg-[#6c8cff] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[#282c3a] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#4fd1c5] flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#6c8cff]" />
            Master Cyber Investigation Dossier
          </span>
          <h1 className="text-3xl font-extrabold text-[#f9fafb] tracking-tight mt-1">Case #CS-2026-98142</h1>
          <p className="text-xs text-[#94a3b8] font-mono mt-0.5">Subject: Fake Job Offer & Extortion Campaign • Status: Critical Risk (94/100)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded-xl bg-[#6c8cff] hover:bg-[#5777ea] text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download className="h-4 w-4" />
            Export FIR Dossier PDF
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-[#111319] border border-[#282c3a] rounded-2xl text-xs font-bold font-mono">
        <button
          onClick={() => setActiveTab('dossier')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'dossier' ? 'bg-[#6c8cff] text-white shadow-md' : 'text-[#94a3b8] hover:text-[#f9fafb]'}`}
        >
          Executive Dossier
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'graph' ? 'bg-[#6c8cff] text-white shadow-md' : 'text-[#94a3b8] hover:text-[#f9fafb]'}`}
        >
          Entity Relationship Graph
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'agents' ? 'bg-[#6c8cff] text-white shadow-md' : 'text-[#94a3b8] hover:text-[#f9fafb]'}`}
        >
          12 Specialist AI Agents
        </button>
        <button
          onClick={() => setActiveTab('explainability')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'explainability' ? 'bg-[#6c8cff] text-white shadow-md' : 'text-[#94a3b8] hover:text-[#f9fafb]'}`}
        >
          Explainable AI Q&A
        </button>
      </div>

      {/* TAB 1: EXECUTIVE DOSSIER */}
      {activeTab === 'dossier' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#111319] border border-[#282c3a] shadow-xl space-y-4">
            <h3 className="text-base font-bold text-[#f9fafb] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#6c8cff]" />
              Executive Case Summary
            </h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed font-medium">
              Autonomous multi-agent investigation confirmed an organized Employment Phishing & Extortion attempt targeting job seekers. Suspect impersonated Amazon India HR recruiters using handle <span className="text-[#6c8cff] font-bold">@amazon_wfh_recruiter</span> and unverified overseas domain <span className="text-[#6c8cff] font-bold">amazon-wfh-jobs.top</span>.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: ENTITY RELATIONSHIP GRAPH */}
      {activeTab === 'graph' && (
        <RelationshipGraph entities={sampleEntities} relationships={sampleRelationships} />
      )}

      {/* TAB 3: 12 AGENTS STATUS */}
      {activeTab === 'agents' && (
        <LiveAgentPanel statuses={[]} />
      )}

      {/* TAB 4: EXPLAINABLE AI Q&A */}
      {activeTab === 'explainability' && (
        <div className="p-6 rounded-3xl bg-[#111319] border border-[#282c3a] shadow-xl space-y-4">
          <h3 className="text-base font-bold text-[#f9fafb] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#4fd1c5]" />
            Explainable AI Forensic Intelligence
          </h3>

          <div className="space-y-4">
            {explainableQA.map((qa, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#181b24] border border-[#282c3a] space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-[#f9fafb]">
                  <span className="flex items-center gap-2 text-sm">
                    <HelpCircle className="h-4 w-4 text-[#6c8cff]" />
                    {qa.question}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#4fd1c5]/20 text-[#4fd1c5] font-mono text-[10px]">
                    Confidence {qa.confidence}%
                  </span>
                </div>
                <p className="text-[#94a3b8] leading-relaxed font-medium pl-6">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </motion.div>
  );
};
