import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, SearchCheck, FolderKanban, Lock, LifeBuoy, Radar, BadgeCheck, Radio, Gamepad2, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const commands = [
    { label: 'Go to Dashboard (Daily Safety Hub)', icon: LayoutDashboard, path: '/app' },
    { label: 'Verify Someone (Identity & Risk Audit)', icon: SearchCheck, path: '/app/verify' },
    { label: 'Investigate Incident (AI Co-Investigator)', icon: FolderKanban, path: '/app/investigate' },
    { label: 'Evidence Vault (SHA-256 Storage)', icon: Lock, path: '/app/vault' },
    { label: 'Recovery Center (Post-Incident Actions)', icon: LifeBuoy, path: '/app/recovery' },
    { label: 'AI Risk Radar (Personalized Threat Intelligence)', icon: Radar, path: '/app/risk-radar' },
    { label: 'Safety Passport (OAuth Connections)', icon: BadgeCheck, path: '/app/passport' },
    { label: 'Emergency SOS (Panic & Disguise Mode)', icon: Radio, path: '/app/sos' },
    { label: 'Learning Hub (Interactive Simulators)', icon: Gamepad2, path: '/app/learn' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] rounded-3xl shadow-2xl overflow-hidden font-sans text-[#ffffff]"
        >
          <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <Search className="h-4 w-4 text-[#7c3aed]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search module commands or jump to page..."
                className="w-full bg-transparent text-xs text-[#ffffff] placeholder-[#8b909b] focus:outline-none"
                autoFocus
              />
            </div>
            <button onClick={onClose} className="p-1 rounded-xl hover:bg-[#1e2026] text-[#8b909b]">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
            {filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    navigate(cmd.path);
                    onClose();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-[#171a27] text-xs font-semibold text-[#c6c8d1] hover:text-[#ffffff] transition-all text-left"
                >
                  <Icon className="h-4 w-4 text-[#7c3aed]" />
                  <span>{cmd.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
