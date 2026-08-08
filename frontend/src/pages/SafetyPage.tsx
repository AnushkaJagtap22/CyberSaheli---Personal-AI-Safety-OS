import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';

export const SafetyPage: React.FC = () => {
  const [connectedServices] = useState([
    { name: 'Google Account (Gmail)', connected: true, link: 'https://myaccount.google.com' },
    { name: 'Instagram DM Safety', connected: true, link: 'https://instagram.com/accounts/privacy' },
    { name: 'LinkedIn Professional Profile', connected: true, link: 'https://linkedin.com/psettings' },
    { name: 'GitHub Code Repositories', connected: true, link: 'https://github.com/settings/security' }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-4xl mx-auto space-y-8 pb-16 font-sans text-[#ffffff] selection:bg-[#4f8cff] selection:text-white"
    >
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#22d3ee] flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#4f8cff]" />
            Practical Security Center
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Identity & Security Audit</h1>
        </div>
      </div>

      {/* Connected Accounts Section */}
      <div className="titanium-card p-8 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-[#ffffff] flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#4f8cff]" />
          Connected Platform Integrations & OAuth Status
        </h3>

        <div className="space-y-3">
          {connectedServices.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#22c55e]" />
                <div>
                  <span className="font-bold text-[#ffffff] block">{srv.name}</span>
                  <span className="text-[#8b909b] text-[11px] font-mono">Protected by Titanium Shield</span>
                </div>
              </div>

              <a
                href={srv.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#4f8cff]/20 text-[#4f8cff] hover:bg-[#4f8cff]/30 font-mono text-[10px] font-bold flex items-center gap-1 border border-[#4f8cff]/30"
              >
                Open Settings <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
