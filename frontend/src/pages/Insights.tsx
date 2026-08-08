import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Volume2, 
  VolumeX, 
  TrendingUp,
  Globe
} from 'lucide-react';
import { i18n } from '../i18n/i18n';
import type { LanguageCode } from '../i18n/i18n';

export const Insights: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(i18n.getLanguage());
  const [isSpeaking, setIsSpeaking] = useState(false);

  const narrationTexts: Record<LanguageCode, string> = {
    en: "CyberSaheli Insights Overview. Your safety score is 95 out of 100. Fourteen threats were neutralized this month, including 12 phishing URLs and 2 fake Instagram profiles. Zero active vulnerabilities detected.",
    hi: "साइबरसहेली विश्लेषण अवलोकन। आपका सुरक्षा स्कोर 100 में से 95 है। इस महीने 14 खतरों को बेअसर कर दिया गया है।",
    mr: "सायबरसहेली विश्लेषण अहवाल. तुमचा सुरक्षा स्कोर 100 पैकी 95 आहे. या महिन्यात 14 धोके यशस्वीपणे रोखले गेले आहेत."
  };

  const handleToggleVoiceNarration = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToSay = narrationTexts[selectedLanguage];
        const utterance = new SpeechSynthesisUtterance(textToSay);

        if (selectedLanguage === 'hi') utterance.lang = 'hi-IN';
        else if (selectedLanguage === 'mr') utterance.lang = 'mr-IN';
        else utterance.lang = 'en-US';

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setSelectedLanguage(lang);
    i18n.setLanguage(lang);
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-16 font-sans text-[#232323] selection:bg-[#5b6b47] selection:text-white"
    >
      {/* Header with Language Selector & Voice Narration */}
      <div className="border-b border-[#e4decb] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5b6b47] flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4 text-[#c96a4a]" />
            Premium Analytics & Voice Narration
          </span>
          <h1 className="text-3xl font-extrabold text-[#232323] tracking-tight mt-1">Insights & Audit</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-[#fffdf8] border border-[#e4decb] rounded-2xl p-1 text-xs">
            <Globe className="h-3.5 w-3.5 text-[#5b6b47] ml-2" />
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all ${selectedLanguage === 'en' ? 'bg-[#5b6b47] text-white' : 'text-[#66605a]'}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all ${selectedLanguage === 'hi' ? 'bg-[#5b6b47] text-white' : 'text-[#66605a]'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => handleLanguageChange('mr')}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all ${selectedLanguage === 'mr' ? 'bg-[#5b6b47] text-white' : 'text-[#66605a]'}`}
            >
              मराठी
            </button>
          </div>

          {/* Voice Narration Button */}
          <button
            onClick={handleToggleVoiceNarration}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md flex items-center gap-2 transition-all ${
              isSpeaking ? 'bg-[#a34739] text-white animate-pulse' : 'bg-[#5b6b47] hover:bg-[#465437] text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isSpeaking ? 'Stop Narration' : 'Narrate Insights'}
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-md space-y-1">
          <span className="text-[10px] text-[#66605a] uppercase font-mono block">Weekly Safety Summary</span>
          <div className="text-4xl font-extrabold text-[#5b6b47]">95/100</div>
          <span className="text-[11px] text-[#7c9a6d] font-bold flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> +4% Improvement
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-md space-y-1">
          <span className="text-[10px] text-[#66605a] uppercase font-mono block">Threats Neutralized</span>
          <div className="text-4xl font-extrabold text-[#c96a4a]">14</div>
          <span className="text-[11px] text-[#66605a]">12 Links & 2 Profiles</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-md space-y-1">
          <span className="text-[10px] text-[#66605a] uppercase font-mono block">Learning Progress</span>
          <div className="text-4xl font-extrabold text-[#c8a86b]">100%</div>
          <span className="text-[11px] text-[#5b6b47] font-bold">2 Scenarios Completed</span>
        </div>
      </div>

      {/* Minimal Threat Category Distribution Bar */}
      <div className="p-6 rounded-3xl bg-[#fffdf8] border border-[#e4decb] shadow-xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5b6b47] block">Threat Category Distribution</span>
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-bold text-[#232323]">Phishing & Job Offer Scams</span>
              <span className="font-mono text-[#66605a]">70%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#f1ece2] overflow-hidden">
              <div className="h-full bg-[#5b6b47] rounded-full w-[70%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-bold text-[#232323]">Impersonation & Fake Profiles</span>
              <span className="font-mono text-[#66605a]">20%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#f1ece2] overflow-hidden">
              <div className="h-full bg-[#c96a4a] rounded-full w-[20%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-bold text-[#232323]">Audio Deepfake Calls</span>
              <span className="font-mono text-[#66605a]">10%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#f1ece2] overflow-hidden">
              <div className="h-full bg-[#c8a86b] rounded-full w-[10%]" />
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};
