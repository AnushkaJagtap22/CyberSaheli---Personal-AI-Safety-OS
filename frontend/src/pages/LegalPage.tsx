import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Download, FileText, ShieldCheck, ExternalLink } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { generateLegalComplaint } from '../services/legalEngine';

export const LegalPage: React.FC = () => {
  const [report] = useState(
    generateLegalComplaint(
      'Fake Internship Offer & Extortion Demand',
      'Suspect requested Rs 4,999 WFH laptop fee via unverified UPI handle solicit@okaxis and high-risk domain .top.'
    )
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('NATIONAL CYBER CRIME COMPLAINT DOSSIER', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Complaint ID: ${report.caseId}`, 14, 27);
    doc.text(`Complainant: ${report.complainantName}`, 14, 32);

    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);

    doc.setFont('helvetica', 'bold');
    doc.text('FORMAL POLICE COMPLAINT TEXT', 14, 44);
    doc.setFont('helvetica', 'normal');

    const lines = doc.splitTextToSize(report.formalComplaintText, 180);
    doc.text(lines, 14, 50);

    doc.save(`${report.caseId}_FIR_Complaint.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-5xl mx-auto space-y-8 pb-16 font-sans text-[#ffffff] selection:bg-[#4f8cff] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#22d3ee] flex items-center gap-1.5">
            <Scale className="h-4 w-4 text-[#4f8cff]" />
            AI Legal Companion & Police FIR Generator
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Official Cybercrime Complaint Package</h1>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="btn-primary text-xs flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Police FIR PDF
        </button>
      </div>

      {/* Applicable IT Act Provisions */}
      <div className="titanium-card p-8 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-[#ffffff] flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#4f8cff]" />
          Applicable IT Act Legal Provisions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {report.applicableSections.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-1 text-xs">
              <span className="font-extrabold text-[#22d3ee] font-mono block">{sec.section}</span>
              <span className="font-bold text-[#ffffff] block">{sec.offense}</span>
              <span className="text-[#8b909b] text-[11px] block">{sec.punishment}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formal Complaint Draft Box */}
      <div className="titanium-card p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
          <span className="font-bold text-[#ffffff] text-sm flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#f59e0b]" />
            Formal Police Complaint Draft (IT Act Compliant)
          </span>
          <a
            href={report.cybercrimePortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold text-[#22d3ee] hover:underline flex items-center gap-1"
          >
            National Cyber Crime Portal <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <pre className="p-6 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#ffffff] leading-relaxed whitespace-pre-wrap font-medium">
          {report.formalComplaintText}
        </pre>
      </div>

      {/* NCW Official Guidance Box */}
      <div className="p-6 rounded-2xl bg-[#22d3ee]/10 border border-[#22d3ee]/30 text-xs text-[#ffffff] leading-relaxed space-y-1">
        <span className="font-bold text-[#22d3ee] uppercase font-mono block">NCW Official Guidance:</span>
        <p className="text-[#c6c8d1]">{report.ncwGuidance}</p>
      </div>

    </motion.div>
  );
};
