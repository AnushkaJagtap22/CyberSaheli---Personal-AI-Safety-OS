import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';

interface ProtectionSphereProps {
  status?: 'safe' | 'investigating' | 'warning';
  score?: number;
  onClick?: () => void;
}

export const ProtectionSphere: React.FC<ProtectionSphereProps> = ({
  status = 'safe',
  score = 95,
  onClick
}) => {

  const getSphereGradient = () => {
    switch (status) {
      case 'investigating': return 'from-[#c47a5a] via-[#2e4a3f] to-[#d7c39c]';
      case 'warning': return 'from-[#c18a4c] via-[#a64b45] to-[#c47a5a]';
      default: return 'from-[#708d72] via-[#2e4a3f] to-[#d7c39c]';
    }
  };

  const getGlowColor = () => {
    switch (status) {
      case 'investigating': return 'rgba(196, 122, 90, 0.4)';
      case 'warning': return 'rgba(193, 138, 76, 0.4)';
      default: return 'rgba(112, 141, 114, 0.4)';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none cursor-pointer" onClick={onClick}>
      
      {/* Living Ambient Light Aura */}
      <div 
        className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-1000" 
        style={{ background: getGlowColor() }} 
      />

      {/* Orbiting Particle Ring */}
      <div className="absolute w-64 h-64 rounded-full border border-[#2e4a3f]/20 pointer-events-none animate-spin" style={{ animationDuration: '25s' }}>
        <div className="absolute top-0 left-1/2 w-2.5 h-2.5 rounded-full bg-[#d7c39c] shadow-md -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-[#c47a5a] shadow-md -translate-x-1/2" />
      </div>

      {/* Living Protection Sphere */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`relative w-56 h-56 rounded-full bg-gradient-to-tr ${getSphereGradient()} p-1 shadow-2xl animate-sphere-breathe flex items-center justify-center overflow-hidden`}
      >
        {/* Inner Ceramic Surface */}
        <div className="w-full h-full rounded-full bg-[#fdfcf9] flex flex-col items-center justify-center text-center p-4 backdrop-blur-md">
          {status === 'warning' ? (
            <AlertTriangle className="h-7 w-7 text-[#a64b45] mb-1 animate-pulse" />
          ) : status === 'investigating' ? (
            <Sparkles className="h-7 w-7 text-[#c47a5a] mb-1 animate-spin" style={{ animationDuration: '8s' }} />
          ) : (
            <ShieldCheck className="h-7 w-7 text-[#2e4a3f] mb-1" />
          )}

          <span className="text-5xl font-extrabold text-[#1f1f1f] tracking-tight">{score}</span>
          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#2e4a3f] mt-1">
            {status === 'investigating' ? 'INVESTIGATING' : status === 'warning' ? 'WARNING' : 'PROTECTED'}
          </span>
          <span className="text-[9px] text-[#676767] font-mono mt-0.5">Living Protection Sphere</span>
        </div>
      </motion.div>
    </div>
  );
};
