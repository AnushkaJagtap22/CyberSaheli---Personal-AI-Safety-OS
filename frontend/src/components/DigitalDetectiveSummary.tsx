import React from 'react';
import { ShieldCheck, Info, CheckCircle2, FileCheck } from 'lucide-react';
import type { CyberCase } from '../services/caseEngine';

interface DigitalDetectiveSummaryProps {
  activeCase?: CyberCase;
  language?: 'en' | 'hi' | 'mr';
}

export const DigitalDetectiveSummary: React.FC<DigitalDetectiveSummaryProps> = ({ language = 'en' }) => {
  const getLocalizedText = () => {
    if (language === 'hi') {
      return {
        title: 'लाइव जांच रिपोर्ट',
        assessmentTitle: 'वर्तमान मूल्यांकन:',
        assessment: 'उपलब्ध साक्ष्य कई चेतावनी संकेतों का सुझाव देते हैं जिनकी सावधानीपूर्वक पुष्टि आवश्यक है।',
        whyTitle: 'हम ऐसा क्यों सोचते हैं:',
        why1: '• नियुक्ति से पहले शुल्क का अनुरोध',
        why2: '• तत्काल समय सीमा और दबाव की भाषा',
        why3: '• आधिकारिक कॉर्पोरेट डोमेन का अभाव',
        actionTitle: 'अगला सर्वोत्तम कदम:',
        action: 'भुगतान करने से पहले आधिकारिक कॉर्पोरेट पोर्टल के माध्यम से भर्तीकर्ता की पहचान सत्यापित करें।',
        progressTitle: 'मामले की प्रगति और स्वास्थ्य:',
        exportBtn: 'केस फ़ाइल डाउनलोड करें'
      };
    } else if (language === 'mr') {
      return {
        title: 'थेट तपास अहवाल',
        assessmentTitle: 'सध्याचे मूल्यमापन:',
        assessment: 'उपलब्ध पुरावे अनेक धोक्याचे इशारे दर्शवतात ज्यांची काळजीपूर्वक पडताळणी करणे आवश्यक आहे.',
        whyTitle: 'आम्ही असे का मानतो:',
        why1: '• कामावर घेण्यापूर्वी शुल्काची मागणी',
        why2: '• तातडीची मुदत आणि दबावाची भाषा',
        why3: '• अधिकृत कॉर्पोरेट डोमेनचा अभाव',
        actionTitle: 'पुढील सर्वोत्तम पाऊल:',
        action: 'पैसे भरण्यापूर्वी अधिकृत कंपनी पोर्टलद्वारे भरतीकर्त्याची ओळख तपासा.',
        progressTitle: 'प्रकरणाची प्रगती आणि आरोग्य:',
        exportBtn: 'केस फाईल डाउनलोड करा'
      };
    } else {
      return {
        title: 'Live Investigation Panel',
        assessmentTitle: 'Current Assessment:',
        assessment: 'The available evidence suggests multiple warning signs that deserve careful verification.',
        whyTitle: 'Why We Think This:',
        why1: '• Payment requested before onboarding contract',
        why2: '• Urgent deadline and coercion language detected',
        why3: '• No verifiable employer corporate domain found',
        actionTitle: 'Recommended Next Step:',
        action: 'Verify recruiter identity via official corporate portal before making any payment.',
        progressTitle: 'Case Progress & Health:',
        exportBtn: 'Export Case File PDF'
      };
    }
  };

  const text = getLocalizedText();

  return (
    <div className="titanium-card p-6 space-y-5 font-sans text-[#ffffff] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22d3ee] flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#4f8cff]" />
          {text.title}
        </span>
        <span className="text-[10px] text-[#22c55e] font-mono font-bold">LIVE ANALYSIS</span>
      </div>

      {/* Current Assessment */}
      <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] space-y-1.5 text-xs">
        <span className="font-bold text-[#4f8cff] font-mono uppercase text-[10px] flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-[#22d3ee]" /> {text.assessmentTitle}
        </span>
        <p className="text-[#c6c8d1] leading-relaxed font-medium">
          {text.assessment}
        </p>
      </div>

      {/* PREMIUM FEATURE 1: Why We Think This (AI Reasoning Transparency) */}
      <div className="space-y-1.5 text-xs">
        <span className="font-bold text-[#ffffff] font-mono uppercase text-[10px] block">{text.whyTitle}</span>
        <ul className="space-y-1 text-[#c6c8d1]">
          <li className="flex items-start gap-1.5 font-medium">{text.why1}</li>
          <li className="flex items-start gap-1.5 font-medium">{text.why2}</li>
          <li className="flex items-start gap-1.5 font-medium">{text.why3}</li>
        </ul>
      </div>

      {/* Recommended Next Step */}
      <div className="p-4 rounded-2xl bg-[#4f8cff]/15 border border-[#4f8cff]/30 text-xs space-y-1">
        <span className="font-bold text-[#4f8cff] uppercase font-mono text-[10px] block">{text.actionTitle}</span>
        <p className="text-[#ffffff] font-medium leading-relaxed">
          {text.action}
        </p>
      </div>

      {/* Case Progress & Health Indicator */}
      <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8b909b] font-bold uppercase text-[10px] flex items-center gap-1">
            <FileCheck className="h-3.5 w-3.5 text-[#22d3ee]" /> {text.progressTitle}
          </span>
          <span className="font-extrabold text-[#22d3ee]">80%</span>
        </div>
        
        <div className="space-y-1 text-[11px] font-mono">
          <div className="flex items-center justify-between text-[#c6c8d1]">
            <span>• Evidence Organized</span>
            <span className="text-[#22c55e] font-bold">✓ Complete</span>
          </div>
          <div className="flex items-center justify-between text-[#c6c8d1]">
            <span>• Timeline Built</span>
            <span className="text-[#22c55e] font-bold">✓ Complete</span>
          </div>
          <div className="flex items-center justify-between text-[#c6c8d1]">
            <span>• Identity Verification</span>
            <span className="text-[#f59e0b] font-bold">Pending</span>
          </div>
        </div>
      </div>

      {/* Export Case File Button */}
      <button
        onClick={() => alert("Police FIR Complaint PDF Dossier Exported Successfully!")}
        className="w-full btn-primary text-xs flex items-center justify-center gap-2 py-3"
      >
        <CheckCircle2 className="h-4 w-4" />
        {text.exportBtn}
      </button>

    </div>
  );
};
