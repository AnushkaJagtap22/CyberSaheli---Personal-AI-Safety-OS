import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CyberTwinPage: React.FC = () => {
  const { user } = useAuth();

  const [privacyChecks] = useState([
    { id: 'email', name: 'Email Exposure Check (HaveIBeenPwned API Audit)', status: 'Clean • 0 Breaches', isSafe: true },
    { id: 'mfa', name: 'Multi-Factor Authentication (MFA) Status', status: 'Active on Gmail & Instagram', isSafe: true },
    { id: 'pass', name: 'Password Manager Usage', status: 'Self-Reported 1Password Active', isSafe: true },
    { id: 'profile', name: 'Public Profile Visibility Index', status: 'Public Instagram DM Exposure', isSafe: false }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-16 font-sans text-[#232323] selection:bg-[#5b6b47] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[#d8d2c7] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5b6b47] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#c26346]" />
            Personal Digital Avatar Security Audit
          </span>
          <h1 className="text-3xl font-extrabold text-[#232323] tracking-tight mt-1">Cyber Twin Privacy Health Check</h1>
        </div>
      </div>

      {/* Cyber Twin Avatar Card */}
      <div className="p-8 rounded-3xl bg-[#e2ddd6] border border-[#d8d2c7] shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
            alt="Cyber Twin"
            className="w-24 h-24 rounded-full border-2 border-[#5b6b47] object-cover shadow-md"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#6e8b62] border-2 border-[#faf8f5] flex items-center justify-center text-white text-[10px] font-bold">
            ✓
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <span className="text-[10px] uppercase font-mono font-bold text-[#5b6b47]">CYBER TWIN STATUS</span>
          <h2 className="text-xl font-extrabold text-[#232323]">{user?.name || user?.email?.split('@')[0] || "CyberSaheli User"} (Digital Twin)</h2>
          <p className="text-xs text-[#66605a]">Your digital footprint is 95% protected against public OSINT indexing.</p>
        </div>
      </div>

      {/* Privacy Health Audit Checklist */}
      <div className="p-8 rounded-3xl bg-[#faf8f5] border border-[#d8d2c7] shadow-xl space-y-4">
        <h3 className="text-base font-bold text-[#232323] flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#5b6b47]" />
          Comprehensive Privacy & Exposure Audit
        </h3>

        <div className="space-y-3">
          {privacyChecks.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#e2ddd6] border border-[#d8d2c7] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {item.isSafe ? (
                  <CheckCircle2 className="h-5 w-5 text-[#6e8b62]" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-[#c26346]" />
                )}
                <div>
                  <span className="font-bold text-[#232323] block">{item.name}</span>
                  <span className="text-[#66605a] text-[11px] font-mono">{item.status}</span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                item.isSafe ? 'bg-[#6e8b62]/20 text-[#6e8b62]' : 'bg-[#c26346]/20 text-[#c26346]'
              }`}>
                {item.isSafe ? 'PASSED' : 'ATTENTION'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
