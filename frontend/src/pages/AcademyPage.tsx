import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Volume2 } from 'lucide-react';
import { academyModules } from '../services/academyEngine';
import type { AcademyModule } from '../services/academyEngine';

export const AcademyPage: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [selectedModule] = useState<AcademyModule>(academyModules[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const questionObj = selectedModule.quizQuestions[0];
  const isCorrect = selectedOption === questionObj.correctIndex;

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const textToRead = selectedModule.scenarioDescription[activeLang];
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'mr' ? 'mr-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
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
            <GraduationCap className="h-4 w-4 text-[#4f8cff]" />
            NCW Cyber Saheli Digital Safety Academy
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Interactive Cyber Safety Simulations</h1>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-[#17181c] border border-[rgba(255,255,255,0.08)] rounded-2xl text-xs font-bold font-mono">
          <button
            onClick={() => setActiveLang('en')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${activeLang === 'en' ? 'bg-[#4f8cff] text-white shadow-md' : 'text-[#8b909b] hover:text-[#ffffff]'}`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLang('hi')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${activeLang === 'hi' ? 'bg-[#4f8cff] text-white shadow-md' : 'text-[#8b909b] hover:text-[#ffffff]'}`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setActiveLang('mr')}
            className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${activeLang === 'mr' ? 'bg-[#4f8cff] text-white shadow-md' : 'text-[#8b909b] hover:text-[#ffffff]'}`}
          >
            मराठी
          </button>
        </div>
      </div>

      {/* Scenario Simulation Showcase */}
      <div className="titanium-card p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
          <span className="font-extrabold text-[#ffffff] text-base">{selectedModule.title[activeLang]}</span>
          <button
            onClick={handleSpeech}
            className="px-3.5 py-1.5 rounded-xl bg-[#22d3ee]/20 text-[#22d3ee] hover:bg-[#22d3ee]/30 text-xs font-bold flex items-center gap-1.5 border border-[#22d3ee]/30"
          >
            <Volume2 className="h-4 w-4" />
            Listen Voice Guidance
          </button>
        </div>

        <p className="text-sm text-[#c6c8d1] leading-relaxed font-medium">
          {selectedModule.scenarioDescription[activeLang]}
        </p>
      </div>

      {/* Interactive AI Quiz */}
      <div className="titanium-card p-8 shadow-xl space-y-6">
        <h3 className="text-base font-extrabold text-[#ffffff]">{questionObj.question[activeLang]}</h3>

        <div className="space-y-3">
          {questionObj.options[activeLang].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedOption(idx); setSubmitted(true); }}
              className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all duration-200 ${
                submitted && idx === questionObj.correctIndex
                  ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e]'
                  : submitted && selectedOption === idx
                  ? 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444]'
                  : 'bg-[#111214] border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff] text-[#ffffff]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {submitted && (
          <div className={`p-4 rounded-2xl border text-xs font-bold space-y-1 ${
            isCorrect ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e]' : 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444]'
          }`}>
            <span className="block">{isCorrect ? '✓ Correct Answer!' : '✕ Incorrect'}</span>
            <p className="text-[#c6c8d1] font-medium text-[11px]">{questionObj.explanation[activeLang]}</p>
          </div>
        )}
      </div>

    </motion.div>
  );
};
