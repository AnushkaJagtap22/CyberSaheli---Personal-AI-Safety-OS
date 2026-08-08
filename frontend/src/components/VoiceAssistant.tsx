import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VoiceAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en-US' | 'hi-IN' | 'mr-IN'>('en-US');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const sampleVoicePrompts = [
    { lang: 'English', text: 'Scan this suspicious Instagram profile' },
    { lang: 'Hindi', text: 'यह वेबसाइट सेफ है या फेक?' },
    { lang: 'Marathi', text: 'सायबर तक्रार एफआयआर कशी तयार करावी?' }
  ];

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setTranscript('');
    setAiResponse('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        processVoiceCommand(spokenText);
      };

      recognition.onerror = () => {
        setIsListening(false);
        simulateVoiceProcessing("Check this website for phishing scams.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      setTimeout(() => {
        simulateVoiceProcessing(language === 'hi-IN' ? 'यह वेबसाइट सेफ है या फेक?' : 'Check this profile for fake bot followers.');
        setIsListening(false);
      }, 2000);
    }
  };

  const simulateVoiceProcessing = (spokenText: string) => {
    setTranscript(spokenText);
    processVoiceCommand(spokenText);
  };

  const processVoiceCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();
    let reply = '';

    if (lower.includes('website') || lower.includes('url') || lower.includes('लिंक') || lower.includes('वेबसाईट')) {
      reply = language === 'hi-IN'
        ? "साइबरसहेली एआई वेबसाइट स्कैन कर रही है। संदिग्ध लिंक स्कैनर खोला जा रहा है।"
        : language === 'mr-IN'
        ? "सायबरसहेली एआय वेबसाइट तपासत आहे. संशयास्पद लिंक स्कॅनर उघडत आहे."
        : "CyberSaheli AI is opening the Safe Link Scanner to audit the domain reputation.";
      navigate('/app/link-job-verifier');
    } else if (lower.includes('profile') || lower.includes('instagram') || lower.includes('प्रोफाइल')) {
      reply = language === 'hi-IN'
        ? "बैकग्राउंड चेक एआई शुरू किया जा रहा है। कृपया इंस्टाग्राम यूजरनेम दर्ज करें।"
        : "Launching Background Check AI for profile forensics.";
      navigate('/app/background-check');
    } else if (lower.includes('fir') || lower.includes('complaint') || lower.includes('तक्रार') || lower.includes('शिकायत')) {
      reply = language === 'hi-IN'
        ? "साइबर सेल शिकायत जनरेटर खोला जा रहा है।"
        : "Opening Cyber Cell Complaint & FIR Generator.";
      navigate('/app/complaint');
    } else {
      reply = language === 'hi-IN'
        ? "साइबरसहेली एआई सक्रिय है। मैं आपकी क्या सुरक्षा सहायता कर सकती हूँ?"
        : "CyberSaheli AI is active. How can I assist your online safety today?";
    }

    setAiResponse(reply);
    speakResponse(reply);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 rounded-full bg-[#4f8cff] text-white shadow-2xl shadow-[#4f8cff]/40 hover:scale-110 transition-all duration-200 flex items-center justify-center border border-white/10"
        >
          <Mic className="h-6 w-6 text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d3ee] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22d3ee]"></span>
          </span>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 rounded-3xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] backdrop-blur-2xl shadow-2xl p-6 space-y-5 text-[#ffffff] font-sans"
          >
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#22d3ee]" />
                <span className="font-bold text-sm text-[#ffffff]">Multilingual Voice Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#8b909b] hover:text-[#ffffff]">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex justify-between items-center bg-[#111214] p-1.5 rounded-2xl border border-[rgba(255,255,255,0.08)] text-xs font-mono font-bold">
              {[
                { code: 'en-US', label: 'English' },
                { code: 'hi-IN', label: 'हिंदी' },
                { code: 'mr-IN', label: 'मराठी' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                    language === lang.code ? 'bg-[#4f8cff] text-white shadow-md' : 'text-[#8b909b] hover:text-[#ffffff]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Glowing Orb Animation */}
            <div className="py-6 text-center space-y-4">
              <button
                onClick={handleToggleListening}
                className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isListening
                    ? 'bg-[#4f8cff] shadow-[0_0_35px_rgba(79,140,255,0.6)] border-2 border-[#22d3ee]'
                    : 'bg-[#111214] hover:bg-[#1c1e23] border border-[rgba(255,255,255,0.08)] text-[#8b909b]'
                }`}
              >
                {isListening ? (
                  <Mic className="h-10 w-10 text-white animate-pulse" />
                ) : (
                  <MicOff className="h-10 w-10 text-[#8b909b]" />
                )}
              </button>
              <p className="text-xs text-[#8b909b] font-medium">
                {isListening ? 'Listening in ' + (language === 'hi-IN' ? 'Hindi' : language === 'mr-IN' ? 'Marathi' : 'English') + '...' : 'Tap Orb to Speak Natural Voice Command'}
              </p>
            </div>

            {/* Transcript & Response Area */}
            {transcript && (
              <div className="p-3.5 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-xs space-y-1">
                <span className="text-[#8b909b] font-mono block text-[10px] uppercase font-bold">You Said:</span>
                <p className="text-[#c6c8d1] italic">&quot;{transcript}&quot;</p>
              </div>
            )}

            {aiResponse && (
              <div className="p-3.5 rounded-2xl bg-[#4f8cff]/15 border border-[#4f8cff]/30 text-xs space-y-1">
                <span className="text-[#4f8cff] font-bold block flex items-center gap-1">
                  <Volume2 className="h-3.5 w-3.5 text-[#22d3ee]" />
                  Saheli AI Response:
                </span>
                <p className="text-[#ffffff] font-medium">{aiResponse}</p>
              </div>
            )}

            {/* Sample Command Shortcuts */}
            <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 font-mono">
              <span className="text-[10px] uppercase font-bold text-[#8b909b] block mb-1">Try Spoken Commands:</span>
              <div className="space-y-1 text-xs">
                {sampleVoicePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => simulateVoiceProcessing(p.text)}
                    className="w-full text-left p-2 rounded-xl bg-[#111214] hover:bg-[#1c1e23] text-[#8b909b] hover:text-[#ffffff] transition-colors text-[11px] truncate block"
                  >
                    • &quot;{p.text}&quot; ({p.lang})
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
