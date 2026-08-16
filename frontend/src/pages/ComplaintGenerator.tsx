import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Scale
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { api } from '../services/api';
import type { CyberComplaint, EvidenceItem } from '../types';

export const ComplaintGenerator: React.FC = () => {
  const [complaints, setComplaints] = useState<CyberComplaint[]>([]);
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [complainantName, setComplainantName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email] = useState('');
  const [incidentType, setIncidentType] = useState('Financial Scam & Impersonation');
  const [suspectDetails, setSuspectDetails] = useState('Telegram: @amazon_recruiters_in, Email: hr@amazon-jobs-india.top');
  const [incidentDate, setIncidentDate] = useState('2026-08-05');
  const [description, setDescription] = useState('The suspect approached via WhatsApp claiming to be an Amazon HR manager. Sent fraudulent offer letter requiring Rs 4,999 payment via UPI.');
  const [selectedLegalSections, setSelectedLegalSections] = useState<string[]>([
    'IT Act 2000 Section 66D (Cheating by Impersonation using Computer System)',
    'BNS 2023 Section 318 (Cheating & Fraudulent Transfer)'
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const cData = await api.getComplaints();
    const eData = await api.getEvidence();
    setComplaints(cData);
    setEvidenceList(eData);
  };

  const legalSectionOptions = [
    'IT Act 2000 Section 66D (Cheating by Impersonation using Computer System)',
    'IT Act 2000 Section 66E (Violation of Privacy & Publishing Private Images)',
    'IT Act 2000 Section 67 (Publishing Obscene Material Electronically)',
    'BNS 2023 Section 318 (Cheating & Fraudulent Financial Inducement)',
    'BNS 2023 Section 354D (Cyber Stalking & Electronic Harassment)',
    'BNS 2023 Section 308 (Extortion & Blackmail Demands)'
  ];

  const toggleSection = (sec: string) => {
    if (selectedLegalSections.includes(sec)) {
      setSelectedLegalSections(selectedLegalSections.filter((s) => s !== sec));
    } else {
      setSelectedLegalSections([...selectedLegalSections, sec]);
    }
  };

  const handleGenerateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const newC = await api.createComplaint({
        incidentType,
        complainantName,
        contactNumber,
        email,
        suspectDetails,
        incidentDate,
        description,
        relevantSections: selectedLegalSections,
        evidenceIds: evidenceList.slice(0, 2).map((e) => e.id),
      });

      setComplaints((prev) => [newC, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = (complaint: CyberComplaint) => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('NATIONAL CYBER CRIME PORTAL / POLICE FIR COMPLAINT DRAFT', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Prepared via CyberSaheli AI Bodyguard System (Legal Module)', 14, 27);
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 14, 32);

    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);

    doc.setFont('helvetica', 'bold');
    doc.text('1. COMPLAINANT DETAILS', 14, 44);
    doc.setFont('helvetica', 'normal');
    doc.text(`Full Name: ${complaint.complainantName}`, 14, 50);
    doc.text(`Phone: ${complaint.contactNumber}`, 14, 55);
    doc.text(`Email: ${complaint.email}`, 14, 60);

    doc.setFont('helvetica', 'bold');
    doc.text('2. INCIDENT DETAILS', 14, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(`Incident Category: ${complaint.incidentType}`, 14, 76);
    doc.text(`Date of Occurrence: ${complaint.incidentDate}`, 14, 81);
    doc.text(`Suspect Identifiers: ${complaint.suspectDetails}`, 14, 86);

    doc.setFont('helvetica', 'bold');
    doc.text('3. INCIDENT STATEMENT & FACTUAL CHRONOLOGY', 14, 96);
    doc.setFont('helvetica', 'normal');
    const splitDesc = doc.splitTextToSize(complaint.description, 180);
    doc.text(splitDesc, 14, 102);

    const descHeight = splitDesc.length * 6;
    let nextY = 104 + descHeight;

    doc.setFont('helvetica', 'bold');
    doc.text('4. RELEVANT STATUTORY PROVISIONS MAPPED (INDIAN LAW)', 14, nextY);
    doc.setFont('helvetica', 'normal');
    nextY += 6;

    complaint.relevantSections.forEach((sec) => {
      doc.text(`• ${sec}`, 14, nextY);
      nextY += 5;
    });

    nextY += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('5. CRYPTOGRAPHIC EVIDENCE ATTACHMENTS (SHA-256 SEALED)', 14, nextY);
    nextY += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Attached Evidence Count: ${complaint.evidenceIds.length} items logged in CyberSaheli Vault`, 14, nextY);

    nextY += 20;
    doc.text('Complainant Signature: _______________________', 14, nextY);

    doc.save(`CyberSaheli_Complaint_${complaint.id}.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12 font-sans"
    >
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <Sparkles className="h-4 w-4" />
          Automated Legal Cyber Crime Drafting
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Complaint & FIR Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Generate official Cyber Cell complaints mapped to IT Act 2000 & BNS 2023 sections with attached evidence hashes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <form onSubmit={handleGenerateComplaint} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
            
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-emerald-400" />
              Incident & Complainant Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Complainant Full Name</label>
                <input
                  type="text"
                  required
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Incident Category</label>
                <input
                  type="text"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Incident Date</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-300 font-semibold mb-1">Suspect Handles / Numbers / Emails</label>
              <input
                type="text"
                value={suspectDetails}
                onChange={(e) => setSuspectDetails(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-300 font-semibold mb-1">Detailed Incident Chronology</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* Legal Section Checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Applicable Indian Legal Sections
              </label>
              <div className="space-y-2 text-xs">
                {legalSectionOptions.map((sec, idx) => (
                  <label key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedLegalSections.includes(sec)}
                      onChange={() => toggleSection(sec)}
                      className="mt-0.5 accent-emerald-500"
                    />
                    <span className="text-slate-300">{sec}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 font-bold text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all"
            >
              <FileText className="h-4 w-4" />
              Generate Cyber Complaint Draft
            </button>
          </form>

        </div>

        {/* Right Draft Queue & Export Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Generated Complaints ({complaints.length})</h3>
            <span className="text-xs text-slate-400">PDF Ready</span>
          </div>

          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 font-bold">COMPLAINT DRAFT #{c.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    {c.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">{c.incidentType}</h4>
                  <p className="text-xs text-slate-400 mt-1">Complainant: {c.complainantName}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <span className="font-bold text-slate-300 block">Sections Mapped:</span>
                  {c.relevantSections.map((s, i) => (
                    <span key={i} className="block text-emerald-300">• {s.split(' ')[0]} {s.split(' ')[1]} {s.split(' ')[2]}</span>
                  ))}
                </div>

                <button
                  onClick={() => handleDownloadPDF(c)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <Download className="h-4 w-4 text-emerald-400" />
                  Download PDF Report
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
};
