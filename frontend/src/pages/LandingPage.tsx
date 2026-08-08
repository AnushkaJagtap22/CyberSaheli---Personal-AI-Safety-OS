import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Lock, 
  Sparkles, 
  SearchCheck, 
  FolderKanban, 
  LifeBuoy, 
  BadgeCheck, 
  Radio
} from 'lucide-react';
import { ProductDemoModal } from '../components/ProductDemoModal';

export function LandingPage() {
  const navigate = useNavigate();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const capabilities = [
    {
      title: 'Verify Someone',
      desc: 'Pre-trust identity audit across domain age, reverse image analysis, and digital footprint history.',
      icon: SearchCheck,
      path: '/app/verify',
      badge: 'PREVENT'
    },
    {
      title: 'AI Investigation',
      desc: 'Apple-level companion workspace that turns chats, screenshots, and URLs into evidence dossiers.',
      icon: FolderKanban,
      path: '/app/investigate',
      badge: 'INVESTIGATE'
    },
    {
      title: 'Evidence Vault',
      desc: 'SHA-256 cryptographically sealed evidence preservation compliant with Section 65B standards.',
      icon: Lock,
      path: '/app/vault',
      badge: 'PROTECT'
    },
    {
      title: 'Recovery Center',
      desc: 'Step-by-step post-incident recovery plans, bank block guides, and police complaint drafts.',
      icon: LifeBuoy,
      path: '/app/recovery',
      badge: 'RECOVER'
    },
    {
      title: 'Safety Passport',
      desc: 'Digital Identity Center tracking connected OAuth accounts and live identity security scores.',
      icon: BadgeCheck,
      path: '/app/passport',
      badge: 'IDENTITY'
    },
    {
      title: 'Emergency SOS',
      desc: '1-Tap instant panic mode with discrete disguise screen and 1930 Cybercrime helpline integration.',
      icon: Radio,
      path: '/app/sos',
      badge: 'SOS'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] font-sans text-[#f9fafb] selection:bg-[#7c3aed] selection:text-white relative overflow-hidden">
      
      {/* Top Navbar */}
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#ffffff]">CyberSaheli</span>
          <span className="text-[10px] font-mono font-bold bg-[#7c3aed]/10 text-[#a78bfa] px-2 py-0.5 rounded-full border border-[#7c3aed]/30">
            PROD READY
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <button
            onClick={() => navigate('/auth')}
            className="text-[#bfc5d1] hover:text-[#ffffff] font-bold transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/app')}
            className="px-5 py-2.5 rounded-2xl bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#6d28d9] transition-all flex items-center gap-1.5 shadow-lg shadow-[#7c3aed]/20"
          >
            Launch Desk <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#a78bfa]">
            <Sparkles className="h-3.5 w-3.5 text-[#a78bfa]" />
            AI CYBER INVESTIGATION PLATFORM FOR WOMEN
          </span>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#ffffff] leading-tight">
            CyberSaheli <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#3b82f6]">
              Personal AI Safety OS
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
            Upload evidence. Understand threats. Protect yourself. Take action.
          </p>
        </motion.div>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => navigate('/app')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white text-sm font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all shadow-[#7c3aed]/20"
          >
            Start Investigation
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsDemoOpen(true)}
            className="px-7 py-3.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.08)] hover:bg-[#22273a] text-white text-sm font-bold flex items-center gap-2 transition-all"
          >
            <Play className="h-4 w-4 text-[#a78bfa]" />
            Watch Demo
          </button>
        </motion.div>
      </section>

      {/* Grid of Capabilities */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(cap.path)}
              className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] hover:border-[#7c3aed]/40 transition-all cursor-pointer space-y-4 shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-[#7c3aed]/15 text-[#a78bfa] group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#1e2334] text-[#a78bfa] border border-[#7c3aed]/20">
                  {cap.badge}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-[#a78bfa] transition-colors">{cap.title}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Product Demo Modal */}
      <ProductDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

    </div>
  );
}
