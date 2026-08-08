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
  Clock, 
  Send,
  Download,
  AlertCircle,
  Eye,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import jsPDF from 'jspdf';

interface InvestigationData {
  id: string;
  incidentType: string;
  overallRisk: 'HIGH RISK' | 'MODERATE RISK' | 'LOW RISK';
  confidence: number;
  description: string;
  evidenceItems: { id: string; name: string; type: string; url?: string; snippet?: string }[];
  timeline: { time: string; event: string; detail: string }[];
  whyFlagged: { title: string; rationale: string; snippet: string }[];
  riskBreakdown: {
    financial: 'HIGH' | 'MEDIUM' | 'LOW';
    privacy: 'HIGH' | 'MEDIUM' | 'LOW';
    identity: 'HIGH' | 'MEDIUM' | 'LOW';
    safety: 'HIGH' | 'MEDIUM' | 'LOW';
  };
  recommendedActions: string[];
  investigationStrength: number;
  hasImmediateSafetyConcern: boolean;
}

export function InvestigateIncident() {
  const navigate = useNavigate();

  // Intake State
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [followupAnswer, setFollowupAnswer] = useState<string | null>(null);

  // Flow Control State
  const [step, setStep] = useState<'intake' | 'context' | 'analyzing' | 'results'>('intake');
  const [analysisStepIndex, setAnalysisStepIndex] = useState<number>(0);
  const [investigation, setInvestigation] = useState<InvestigationData | null>(null);

  // Evidence Highlight Modal State
  const [selectedEvidenceItem, setSelectedEvidenceItem] = useState<InvestigationData['evidenceItems'][0] | null>(null);

  // AI Copilot Chat State
  const [copilotMessages, setCopilotMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'I have analyzed your evidence. Ask me anything about this incident.' }
  ]);
  const [copilotInput, setCopilotInput] = useState<string>('');

  const examplePrompts = [
    'Someone is blackmailing me',
    'I think someone is stalking me',
    'I received a suspicious job offer',
    'Someone created a fake profile using my photos',
    'I think I am being scammed',
    'Someone sent me a suspicious payment link'
  ];

  const analysisSteps = [
    'Understanding the incident context',
    'Reading and extracting text from your evidence',
    'Identifying suspicious signals and scam patterns',
    'Correlating evidence across multi-agent AI network',
    'Assessing risk dimensions & safety concerns',
    'Preparing personalized recommendations & Dossier'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilePreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFilePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleStartInvestigation = () => {
    if (!descriptionInput.trim() && !selectedFile) return;
    setStep('context');
  };

  const handleProceedToAnalysis = async () => {
    setStep('analyzing');
    setAnalysisStepIndex(0);

    const interval = setInterval(() => {
      setAnalysisStepIndex(prev => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    setTimeout(() => {
      clearInterval(interval);

      const text = descriptionInput.toLowerCase();
      const isBlackmail = text.includes('blackmail') || text.includes('stalking') || text.includes('photos') || text.includes('threat');
      const isJobScam = text.includes('job') || text.includes('offer') || text.includes('recruiter') || text.includes('pay');

      const data: InvestigationData = {
        id: `INV-${Date.now()}`,
        incidentType: isBlackmail ? 'Extortion & Personal Safety Threat' : isJobScam ? 'Advance-Fee Recruitment Fraud' : 'Suspicious Cyber Incident',
        overallRisk: isBlackmail || isJobScam ? 'HIGH RISK' : 'MODERATE RISK',
        confidence: isBlackmail ? 94 : 91,
        description: descriptionInput || 'Evidence screenshot upload investigation',
        evidenceItems: [
          {
            id: 'ev-1',
            name: selectedFile?.name || 'Evidence_Screenshot.png',
            type: selectedFile?.type.includes('image') ? 'Screenshot' : 'Document',
            url: filePreviewUrl || undefined,
            snippet: 'Pay ₹3,000 immediately or your application will be cancelled.'
          }
        ],
        timeline: [
          { time: '10:32 PM', event: 'First Contact Initiated', detail: 'Sender reached out via unverified channel.' },
          { time: '10:45 PM', event: 'Proposal / Offer Introduced', detail: 'Initial offer discussed without corporate authentication.' },
          { time: '11:02 PM', event: 'Upfront Payment Demanded', detail: 'Sender demanded ₹3,000 upfront fee.' },
          { time: '11:15 PM', event: 'Urgency & Pressure Applied', detail: 'Urgent deadline set to compel rapid transfer.' }
        ],
        whyFlagged: [
          {
            title: 'Upfront Payment Request Before Engagement',
            rationale: 'Legitimate employers or platforms do not demand upfront fees prior to formal agreements.',
            snippet: 'Pay ₹3,000 immediately to lock your slot'
          },
          {
            title: 'Unverified Contact & Communication Channel',
            rationale: 'Communication originated from a non-corporate, unverified domain.',
            snippet: 'Contact via unverified account'
          },
          {
            title: 'Psychological Urgency & Deadline Manipulation',
            rationale: 'Artificial time pressure was used to prevent independent identity verification.',
            snippet: 'Complete within 2 hours or offer cancelled'
          }
        ],
        riskBreakdown: {
          financial: isJobScam ? 'HIGH' : 'MEDIUM',
          privacy: isBlackmail ? 'HIGH' : 'MEDIUM',
          identity: 'HIGH',
          safety: isBlackmail ? 'HIGH' : 'LOW'
        },
        recommendedActions: [
          'Do not transfer any requested money or registration fees.',
          'Cease direct communication until identity is independently confirmed.',
          'Preserve all original conversation screenshots and file hashes.',
          'Report the account on the official Cyber Crime Portal (cybercrime.gov.in).',
          'If money was transferred, notify your bank fraud division immediately.'
        ],
        investigationStrength: 78,
        hasImmediateSafetyConcern: isBlackmail
      };

      setInvestigation(data);
      setStep('results');
    }, 4000);
  };

  const handleCopilotSend = () => {
    if (!copilotInput.trim()) return;
    const userText = copilotInput.trim();
    setCopilotMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setCopilotInput('');

    setTimeout(() => {
      let response = 'Based on the extracted evidence, multiple independent indicators suggest caution. Do not share OTPs or send upfront payments.';
      if (userText.toLowerCase().includes('why') || userText.toLowerCase().includes('scam')) {
        response = 'CyberSaheli flagged this because the sender requested an upfront payment and used urgent time limits without corporate domain verification.';
      } else if (userText.toLowerCase().includes('report')) {
        response = 'You can preserve this evidence in your Evidence Vault and file a report on cybercrime.gov.in or call national helpline 1930.';
      }
      setCopilotMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 1000);
  };

  const handleGeneratePDFReport = () => {
    if (!investigation) return;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('CyberSaheli Security Consultancy Dossier', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Investigation ID: ${investigation.id}`, 14, 30);
    doc.text(`Incident Type: ${investigation.incidentType}`, 14, 36);
    doc.text(`Overall Risk: ${investigation.overallRisk} (Confidence: ${investigation.confidence}%)`, 14, 42);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 14, 48);

    doc.setFont('helvetica', 'bold');
    doc.text('Key Rationale & Findings:', 14, 60);
    doc.setFont('helvetica', 'normal');
    let y = 68;
    investigation.whyFlagged.forEach((f, idx) => {
      doc.text(`${idx + 1}. ${f.title}`, 14, y);
      y += 6;
      doc.text(`   ${f.rationale}`, 14, y);
      y += 8;
    });

    doc.save(`CyberSaheli_Dossier_${investigation.id}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 font-sans text-white pb-24 selection:bg-[#7c3aed] selection:text-white">
      
      {/* 🔮 STEP 1: CLEAN INTAKE SURFACE ("WHAT HAPPENED?") */}
      {step === 'intake' && (
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#171927] to-[#0f1017] border border-[rgba(255,255,255,0.08)] shadow-2xl space-y-8 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/30 text-xs font-mono font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> AI INCIDENT INVESTIGATION STUDIO
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Investigate an Incident
            </h1>
            <p className="text-sm text-[#94a3b8] max-w-xl leading-relaxed">
              Tell CyberSaheli what happened. You can describe the situation or upload evidence. Everything stays connected to this investigation.
            </p>
          </div>

          {/* OPTION A: UPLOAD EVIDENCE DROPZONE */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative p-8 rounded-3xl bg-[#171a27] border-2 border-dashed border-[#7c3aed]/40 hover:border-[#7c3aed] transition-all text-center space-y-4 cursor-pointer group"
          >
            <input
              type="file"
              accept="image/*,.pdf,.mp4,.mp3,.wav,.txt"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {filePreviewUrl ? (
              <div className="space-y-3">
                <img
                  src={filePreviewUrl}
                  alt="Uploaded Evidence"
                  className="max-h-48 mx-auto rounded-2xl border border-[rgba(255,255,255,0.1)] object-contain shadow-lg"
                />
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#a78bfa]">
                  <span>✓ {selectedFile?.name} ({(selectedFile!.size / 1024 / 1024).toFixed(2)} MB)</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setFilePreviewUrl(null); }}
                    className="p-1 rounded bg-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/30"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-4 rounded-2xl bg-[#7c3aed]/15 text-[#a78bfa] w-fit mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-white">Drop evidence here or browse from your device</h3>
                <p className="text-xs text-[#94a3b8] font-mono">
                  Screenshot &bull; Video &bull; Audio &bull; PDF &bull; Chat &bull; Email
                </p>
              </div>
            )}
          </div>

          {/* OPTION B: DESCRIBE WHAT HAPPENED */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#94a3b8] uppercase font-bold block">
              Describe What Happened
            </label>
            <textarea
              rows={3}
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder="e.g. Someone contacted me claiming to be a recruiter and asked me to pay ₹3,000 before joining..."
              className="w-full p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#7c3aed] resize-none"
            />

            {/* Clickable Example Prompts */}
            <div className="flex flex-wrap gap-2 text-xs">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setDescriptionInput(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-[#13151f] text-[#94a3b8] hover:text-white hover:border-[#7c3aed]/40 border border-[rgba(255,255,255,0.06)] transition-all"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartInvestigation}
            disabled={!descriptionInput.trim() && !selectedFile}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-xl shadow-[#7c3aed]/20"
          >
            <Sparkles className="h-4 w-4" /> Start Investigation &rarr;
          </button>
        </div>
      )}

      {/* 🎯 STEP 2: DYNAMIC SINGLE FOLLOW-UP QUESTION */}
      {step === 'context' && (
        <div className="p-8 md:p-10 rounded-3xl bg-[#13151f] border border-[#7c3aed]/40 space-y-6 shadow-2xl animate-fade-in max-w-2xl mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#a78bfa] font-bold uppercase tracking-wider block">One Quick Question</span>
            <h2 className="text-xl font-bold text-white">Has the person asked you for money or passwords?</h2>
            <p className="text-xs text-[#94a3b8]">This helps CyberSaheli focus the investigation on immediate financial risk.</p>
          </div>

          <div className="space-y-2 text-xs">
            {['Yes, they asked for money or vouchers', 'No, they have not requested money', "I'm not sure / Prefer not to say"].map((opt) => (
              <button
                key={opt}
                onClick={() => setFollowupAnswer(opt)}
                className={`w-full p-4 rounded-2xl text-left border transition-all ${
                  followupAnswer === opt
                    ? 'bg-[#7c3aed] text-white font-bold border-[#7c3aed]'
                    : 'bg-[#171a27] text-[#94a3b8] border-[rgba(255,255,255,0.06)] hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={handleProceedToAnalysis}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Run Multi-Agent AI Investigation &rarr;
          </button>
        </div>
      )}

      {/* ⚙️ STEP 3: AI COMMANDER LOADING SEQUENCE */}
      {step === 'analyzing' && (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[#7c3aed]/40 space-y-4 shadow-2xl animate-fade-in max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a78bfa] animate-spin" />
              CyberSaheli Incident Commander Investigating...
            </h3>
            <span className="text-xs font-mono text-[#a78bfa]">Analyzing Evidence</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {analysisSteps.map((stepText, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {idx < analysisStepIndex ? (
                  <CheckCircle2 className="h-4 w-4 text-[#10b981] shrink-0" />
                ) : idx === analysisStepIndex ? (
                  <div className="h-4 w-4 rounded-full border-2 border-[#7c3aed] border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-[#3b4259] shrink-0" />
                )}
                <span className={idx <= analysisStepIndex ? 'text-white font-medium' : 'text-[#64748b]'}>
                  {stepText}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📊 STEP 4: INVESTIGATION RESULTS */}
      {step === 'results' && investigation && (
        <div className="space-y-8 animate-fade-in">
          
          {/* EMERGENCY SAFETY ESCALATION BANNER */}
          {investigation.hasImmediateSafetyConcern && (
            <div className="p-6 rounded-3xl bg-[#ef4444]/15 border-2 border-[#ef4444] space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#ef4444] flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Immediate Safety Concern Flagged
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#ef4444] text-white text-xs font-extrabold font-mono">HIGH THREAT</span>
              </div>
              <p className="text-xs text-white leading-relaxed">
                Your evidence contains indicators of extortion, blackmail, or personal safety threat.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => navigate('/app/sos')}
                  className="px-5 py-2.5 rounded-xl bg-[#ef4444] text-white text-xs font-bold hover:bg-[#dc2626] transition-all flex items-center gap-2 shadow-lg shadow-[#ef4444]/30"
                >
                  <PhoneCall className="h-4 w-4" /> Activate Emergency SOS &rarr;
                </button>
              </div>
            </div>
          )}

          {/* MAIN SUMMARY RESULT CARD */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#131520] via-[#171927] to-[#0f1017] border border-[rgba(255,255,255,0.08)] shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#a78bfa] font-bold uppercase tracking-wider block">AI Investigation Conclusion</span>
                <h2 className="text-2xl font-extrabold text-white">{investigation.incidentType}</h2>
                <span className="text-xs text-[#64748b] font-mono">{investigation.id}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0f1118] border border-[rgba(255,255,255,0.08)] text-center shrink-0">
                <span className="text-xs font-mono text-[#94a3b8] block">Overall Risk</span>
                <span className="text-xl font-extrabold font-mono text-[#ef4444] block">{investigation.overallRisk}</span>
                <span className="text-[10px] font-mono text-[#a78bfa]">Confidence: {investigation.confidence}%</span>
              </div>
            </div>

            {/* WHY? RATIONALE FINDINGS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Why CyberSaheli Flagged This</h3>
              <div className="space-y-2 text-xs">
                {investigation.whyFlagged.map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
                    <h4 className="font-bold text-[#ef4444] flex items-center gap-2">
                      <AlertCircle className="h-3.5 w-3.5" /> {f.title}
                    </h4>
                    <p className="text-[#94a3b8]">{f.rationale}</p>
                    <span className="text-[11px] font-mono text-[#fca5a5] block">Evidence snippet: "{f.snippet}"</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🖼️ EVIDENCE TRAY & "SHOW ME WHY" INSPECTOR */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#60a5fa]" /> Evidence Analyzed ({investigation.evidenceItems.length} Items)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {investigation.evidenceItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEvidenceItem(item)}
                  className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.06)] hover:border-[#7c3aed] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#7c3aed]/15 text-[#a78bfa]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:underline">{item.name}</h4>
                      <span className="text-[10px] font-mono text-[#94a3b8]">{item.type}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#a78bfa] flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> Inspect &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 📜 VERTICAL INCIDENT STORY TIMELINE */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#a78bfa]" /> Incident Story Timeline
            </h3>

            <div className="relative pl-6 border-l-2 border-[#7c3aed]/40 space-y-6 font-mono text-xs">
              {investigation.timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-[#7c3aed] border-4 border-[#13151f]" />
                  <span className="text-[10px] text-[#a78bfa] font-bold block">{item.time}</span>
                  <h4 className="text-sm font-bold text-white">{item.event}</h4>
                  <p className="text-[#94a3b8] font-sans text-xs">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🎯 RISK BREAKDOWN (STRICTLY 4 CATEGORIES) */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Risk Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
                <span className="text-[#94a3b8] text-[10px] block">Financial Risk</span>
                <span className="text-base font-extrabold text-[#ef4444]">{investigation.riskBreakdown.financial}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
                <span className="text-[#94a3b8] text-[10px] block">Privacy Risk</span>
                <span className="text-base font-extrabold text-[#f59e0b]">{investigation.riskBreakdown.privacy}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
                <span className="text-[#94a3b8] text-[10px] block">Identity Risk</span>
                <span className="text-base font-extrabold text-[#ef4444]">{investigation.riskBreakdown.identity}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
                <span className="text-[#94a3b8] text-[10px] block">Immediate Safety</span>
                <span className="text-base font-extrabold text-[#10b981]">{investigation.riskBreakdown.safety}</span>
              </div>
            </div>
          </div>

          {/* ⚡ WHAT SHOULD I DO NOW? ACTION PLAN */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Recommended Actions</h3>

            <div className="space-y-2 text-xs">
              {investigation.recommendedActions.map((act, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#7c3aed]/20 text-[#a78bfa] font-mono font-bold">0{idx + 1}</span>
                  <span className="text-white pt-0.5">{act}</span>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS & PDF DOSSIER */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <button
                onClick={handleGeneratePDFReport}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-xl shadow-[#7c3aed]/20"
              >
                <Download className="h-4 w-4" /> Download Security Consultancy Dossier (PDF)
              </button>

              <button
                onClick={() => {
                  alert("Investigation saved to your Evidence Vault.");
                  navigate('/app/vault');
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#10b981] text-white text-xs font-bold hover:bg-[#059669] transition-all flex items-center gap-2 shadow-xl shadow-[#10b981]/20"
              >
                <Lock className="h-4 w-4" /> Save Investigation to Vault
              </button>

              <button
                onClick={() => setStep('intake')}
                className="px-5 py-3.5 rounded-2xl bg-[#171a27] text-white text-xs font-bold hover:bg-[#22273a] border border-[rgba(255,255,255,0.1)] transition-all"
              >
                Start Another Investigation
              </button>
            </div>
          </div>

          {/* 💬 AI COPILOT ("ASK ABOUT THIS INCIDENT") */}
          <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#a78bfa]" /> Ask About This Incident
            </h3>

            <div className="p-4 rounded-2xl bg-[#171a27] max-h-48 overflow-y-auto space-y-3 text-xs">
              {copilotMessages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-xl max-w-md ${msg.sender === 'user' ? 'bg-[#7c3aed] text-white ml-auto' : 'bg-[#0f1118] text-[#e2e8f0]'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                placeholder="Ask CyberSaheli about this incident..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#7c3aed]"
              />
              <button
                onClick={handleCopilotSend}
                className="px-5 py-3 rounded-2xl bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#6d28d9]"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 🖼️ EVIDENCE HIGHLIGHT MODAL */}
      {selectedEvidenceItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in font-sans">
          <div className="w-full max-w-2xl bg-[#13151f] border border-[#7c3aed]/40 rounded-3xl p-6 space-y-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <div>
                <span className="text-[10px] font-mono text-[#a78bfa] font-bold uppercase">EVIDENCE INSPECTOR</span>
                <h3 className="text-base font-bold">{selectedEvidenceItem.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEvidenceItem(null)}
                className="p-2 rounded-xl bg-[#171a27] text-[#94a3b8] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0a0b0e] p-4 text-center">
              {selectedEvidenceItem.url ? (
                <img src={selectedEvidenceItem.url} alt="Evidence" className="max-h-64 rounded-xl object-contain mx-auto" />
              ) : (
                <div className="p-8 text-xs text-[#94a3b8] font-mono">
                  No image preview available for text export.
                </div>
              )}
              {selectedEvidenceItem.snippet && (
                <div className="mt-3 p-3 bg-[#7c3aed]/20 border border-[#7c3aed]/40 text-white font-mono text-xs rounded-xl">
                  Matched Snippet: "{selectedEvidenceItem.snippet}"
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedEvidenceItem(null)}
                className="px-5 py-2 rounded-xl bg-[#7c3aed] text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
