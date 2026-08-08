import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  X, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  SearchCheck, 
  FolderKanban, 
  Radar, 
  BadgeCheck, 
  Radio, 
  FileText, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';

interface ProductDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  caption: string;
  icon: any;
  content: React.ReactNode;
}

export const ProductDemoModal: React.FC<ProductDemoModalProps> = ({ isOpen, onClose }) => {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Keyboard Navigation & Shortcuts (Space = Play/Pause, Esc = Close, Arrow keys = Next/Prev)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
      if (e.key === 'ArrowRight') {
        setCurrentScene(prev => (prev < scenes.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentScene(prev => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Automatic Scene Advance Timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentScene(prev => {
        if (prev < scenes.length - 1) return prev + 1;
        setIsPlaying(false);
        return prev;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const scenes: Scene[] = [
    {
      id: 0,
      title: 'Opening Keynote',
      subtitle: 'Built for Women. Powered by Explainable AI.',
      caption: 'CyberSaheli is a personal AI cyber safety companion that stays with a woman before, during, and after an incident.',
      icon: ShieldCheck,
      content: (
        <div className="flex flex-col items-center justify-center space-y-6 text-center py-12">
          <div className="p-5 rounded-3xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white shadow-2xl animate-pulse">
            <ShieldCheck className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-white">CyberSaheli</h2>
            <p className="text-lg text-[#a78bfa] font-mono">AI CYBER SAFETY OPERATING SYSTEM</p>
            <p className="text-sm text-[#94a3b8] max-w-md mx-auto leading-relaxed">
              Personalized protection lifecycle: Prevent &rarr; Verify &rarr; Investigate &rarr; Recover &rarr; Learn
            </p>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: 'Verify Someone',
      subtitle: 'Identity & Risk Audit Engine',
      caption: 'Inputting a profile or link triggers multi-agent verification across domain age, reverse images, and digital footprints.',
      icon: SearchCheck,
      content: (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6 w-full max-w-xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
            <span className="text-xs font-mono text-[#a78bfa] font-bold">VERIFY SOMEONE DEMO</span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 font-bold">
              Trust Score: 82%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] font-mono text-[#e2e8f0]">
              Input: https://linkedin.com/in/suspect-recruiter
            </div>

            <div className="p-4 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 space-y-2 text-[#fde68a]">
              <span className="font-bold block">Why flagged?</span>
              <p>✓ LinkedIn profile verified &bull; ⚠ Reverse image found on external stock sites &bull; ⚠ Limited domain history.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Investigation Workspace',
      subtitle: 'Apple-Level Single Stream Companion',
      caption: 'Upload evidence and CyberSaheli quietly guides you without stress or developer console clutter.',
      icon: FolderKanban,
      content: (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[#7c3aed]/40 space-y-6 w-full max-w-xl mx-auto shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#a78bfa] uppercase font-bold">Progressive Intake</span>
            <h3 className="text-xl font-bold text-white">Tell me what happened.</h3>
          </div>
          <div className="p-4 rounded-2xl bg-[#171a27] text-xs text-[#a78bfa] font-mono animate-pulse">
            ✓ Reading screenshots & chat files... Checking official company domain & UPI handle...
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Proactive AI Conversation',
      subtitle: 'Context-Aware AI Partner',
      caption: 'Instead of waiting silently, CyberSaheli suggests clear next steps based on extracted payment signals.',
      icon: ShieldCheck,
      content: (
        <div className="p-6 rounded-3xl bg-[#171a27] border border-[rgba(255,255,255,0.08)] space-y-4 w-full max-w-xl mx-auto shadow-2xl">
          <div className="text-xs text-[#e2e8f0] leading-relaxed">
            "I've reviewed the uploaded WhatsApp conversation. The payment request appears unusually early. Would you like me to verify the UPI handle (solicit@okaxis) as well?"
          </div>
          <div className="flex gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-[#7c3aed] text-white font-bold">[Verify Everything]</span>
            <span className="px-3 py-1.5 rounded-xl bg-[#1f2334] text-[#94a3b8]">[Skip]</span>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Interactive Evidence Graph',
      subtitle: 'Constellation Entity Relationship Mapping',
      caption: 'Visualizes connections between suspect emails, phone numbers, websites, UPI VPAs, and social media handles.',
      icon: ShieldCheck,
      content: (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] text-center space-y-6 w-full max-w-xl mx-auto shadow-2xl">
          <span className="text-xs font-mono text-[#60a5fa] font-bold uppercase">Entity Relationship Constellation</span>
          <div className="flex items-center justify-center gap-4 text-xs font-mono">
            <span className="p-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.08)] text-white">Email</span>
            <span className="text-[#a78bfa]">&rarr;</span>
            <span className="p-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.08)] text-white">Phone</span>
            <span className="text-[#a78bfa]">&rarr;</span>
            <span className="p-3 rounded-2xl bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444]">Fake UPI</span>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'AI Explainability & WOW Factor',
      subtitle: 'Transparent Reasoning & Rationale',
      caption: 'Every risk score is backed by plain-English explanation of why the evidence was flagged.',
      icon: ShieldCheck,
      content: (
        <div className="p-6 rounded-3xl bg-[#ef4444]/10 border border-[#ef4444]/30 space-y-4 w-full max-w-xl mx-auto shadow-2xl text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#ef4444]">Why This Was Flagged</span>
            <span className="font-mono text-[#ef4444]">Confidence: 94%</span>
          </div>
          <ul className="space-y-1.5 text-[#fca5a5]">
            <li>✓ Fake Recruiter Domain (hr-amazon-jobs.top)</li>
            <li>✓ Payment Requested Prior to Official Interview</li>
            <li>✓ Unverified Personal UPI Handle (solicit@okaxis)</li>
          </ul>
        </div>
      )
    },
    {
      id: 6,
      title: 'AI Risk Radar',
      subtitle: 'Personalized Live Threat Intelligence',
      caption: 'Real-time threat feed ingesting advisories from CERT-In, PIB, CISA, BleepingComputer, and The Hacker News.',
      icon: Radar,
      content: (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4 w-full max-w-xl mx-auto shadow-2xl text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Today's Cyber Risk Index</span>
            <span className="font-mono text-[#f59e0b]">Medium (58 / 100)</span>
          </div>
          <p className="text-[#94a3b8]">Live CERT-In Alert: Recruitment scams impersonating tech enterprises increasing (+23%).</p>
        </div>
      )
    },
    {
      id: 7,
      title: 'Safety Passport',
      subtitle: 'Digital Identity Center',
      caption: 'Displays connected OAuth platforms like LinkedIn and GitHub with real clickable links.',
      icon: BadgeCheck,
      content: (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4 w-full max-w-xl mx-auto shadow-2xl text-xs">
          <span className="font-mono text-[#10b981] font-bold uppercase block">Identity Shield Secure &bull; 96%</span>
          <div className="flex gap-3">
            <span className="px-3 py-2 rounded-xl bg-[#171a27] text-white border border-[rgba(255,255,255,0.06)]">LinkedIn: Verified</span>
            <span className="px-3 py-2 rounded-xl bg-[#171a27] text-white border border-[rgba(255,255,255,0.06)]">GitHub: Verified</span>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: 'Emergency SOS',
      subtitle: 'Instant Disguise & Panic Hotline',
      caption: '1-Tap emergency mode immediately captures location and opens official cyber crime helpline triggers.',
      icon: Radio,
      content: (
        <div className="p-8 rounded-3xl bg-[#ef4444]/15 border border-[#ef4444]/40 space-y-4 w-full max-w-xl mx-auto shadow-2xl text-xs text-center">
          <span className="font-mono text-[#ef4444] font-bold uppercase block animate-pulse">EMERGENCY SOS ACTIVE</span>
          <p className="text-white font-bold">1930 Cybercrime Helpline & Live Location Sync Ready</p>
        </div>
      )
    },
    {
      id: 9,
      title: 'Security Consultancy PDF Report',
      subtitle: 'Court-Ready Dossier Export',
      caption: 'Generates professional PDF dossiers complete with cover page, timeline, SHA-256 evidence hashes, and digital signatures.',
      icon: FileText,
      content: (
        <div className="p-8 rounded-3xl bg-[#13151f] border border-[#7c3aed]/40 space-y-4 w-full max-w-xl mx-auto shadow-2xl text-xs">
          <span className="font-mono text-[#a78bfa] font-bold uppercase block">CyberSaheli Expert Dossier</span>
          <p className="text-[#e2e8f0]">Confidential Case #CS-104 &bull; Includes Section 65B SHA-256 Evidence Hashes.</p>
        </div>
      )
    },
    {
      id: 10,
      title: 'Closing Keynote',
      subtitle: 'Don\'t just detect scams. Understand them. Investigate them. Stop them.',
      caption: 'CyberSaheli is ready to protect women across every stage of online life.',
      icon: ShieldCheck,
      content: (
        <div className="flex flex-col items-center justify-center space-y-6 text-center py-10">
          <div className="p-4 rounded-3xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white shadow-2xl">
            <ShieldCheck className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">CyberSaheli</h2>
          <p className="text-sm text-[#a78bfa] font-mono">YOUR AI CYBER SAFETY COMPANION</p>
        </div>
      )
    }
  ];

  const currentSceneObj = scenes[currentScene];
  const IconComponent = currentSceneObj.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl font-sans text-white">
        
        {/* Main Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#0d0e12] border border-[rgba(255,255,255,0.1)] rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[600px]"
        >
          
          {/* Top Bar Header */}
          <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30">
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{currentSceneObj.title}</h3>
                <p className="text-xs text-[#94a3b8] font-mono">{currentSceneObj.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline px-3 py-1 rounded-full text-[11px] font-mono bg-[#171a27] text-[#94a3b8]">
                Scene {currentScene + 1} of {scenes.length}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#171a27] hover:bg-[#22273a] text-[#94a3b8] hover:text-white transition-colors"
                title="Close (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Main Stage Interactive Preview */}
          <div className="p-8 flex-1 flex flex-col justify-center items-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {currentSceneObj.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Captions & Subtitles Bar */}
          <div className="px-8 py-4 bg-[#13151f] border-t border-[rgba(255,255,255,0.06)] text-center text-xs text-[#cbd5e1] font-mono">
            💬 {currentSceneObj.caption}
          </div>

          {/* Bottom Player Controls & Scrubbing Timeline */}
          <div className="p-6 border-t border-[rgba(255,255,255,0.08)] bg-[#0a0b0e] space-y-4">
            
            {/* Timeline Progress Bar */}
            <div className="flex gap-1.5 w-full">
              {scenes.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => { setCurrentScene(idx); setIsPlaying(false); }}
                  className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                    idx === currentScene
                      ? 'bg-gradient-to-r from-[#7c3aed] to-[#3b82f6]'
                      : idx < currentScene
                      ? 'bg-[#7c3aed]/50'
                      : 'bg-[#1f2334]'
                  }`}
                />
              ))}
            </div>

            {/* Play / Pause / Volume Controls */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition-all shadow-md flex items-center gap-1.5 font-bold"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-[#171a27] text-[#94a3b8] hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <span className="text-[#64748b] font-mono text-[10px] hidden sm:inline">
                  Press [Space] to Pause &bull; [Esc] to Exit
                </span>
              </div>

              {/* Next / Previous Scene Steppers */}
              <div className="flex items-center gap-2 font-mono">
                <button
                  disabled={currentScene === 0}
                  onClick={() => { setCurrentScene(prev => prev - 1); setIsPlaying(false); }}
                  className="p-2 rounded-xl bg-[#171a27] disabled:opacity-30 text-white hover:bg-[#22273a]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  disabled={currentScene === scenes.length - 1}
                  onClick={() => { setCurrentScene(prev => prev + 1); setIsPlaying(false); }}
                  className="p-2 rounded-xl bg-[#171a27] disabled:opacity-30 text-white hover:bg-[#22273a]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
