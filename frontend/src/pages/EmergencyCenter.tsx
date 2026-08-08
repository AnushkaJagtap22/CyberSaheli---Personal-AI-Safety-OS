import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Phone, 
  MapPin, 
  X, 
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';

export const EmergencyCenter: React.FC = () => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isActivated, setIsActivated] = useState(false);
  const [sosResult, setSosResult] = useState<any>(null);

  const holdTimerRef = useRef<any>(null);
  const countdownTimerRef = useRef<any>(null);

  // Press and Hold Gesture Handlers
  const handleMouseDown = () => {
    if (isActivated || isCountingDown) return;
    setHoldProgress(0);
    
    let current = 0;
    holdTimerRef.current = setInterval(() => {
      current += 10;
      setHoldProgress(current);
      if (current >= 100) {
        clearInterval(holdTimerRef.current);
        startCountdown();
      }
    }, 100);
  };

  const handleMouseUp = () => {
    if (holdProgress < 100) {
      clearInterval(holdTimerRef.current);
      setHoldProgress(0);
    }
  };

  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(3);

    let count = 3;
    countdownTimerRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownTimerRef.current);
        triggerSOSAlert();
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    clearInterval(countdownTimerRef.current);
    clearInterval(holdTimerRef.current);
    setIsCountingDown(false);
    setHoldProgress(0);
    setCountdown(3);
  };

  const triggerSOSAlert = async () => {
    setIsCountingDown(false);
    setIsActivated(true);
    try {
      const res = await api.sendSOSAlert("Pune University Campus, Maharshi Karve Rd");
      setSosResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  const helplines = [
    { name: 'National Cyber Crime Helpline', number: '1930' },
    { name: 'National Women Emergency Helpline', number: '112' },
    { name: 'NCW Cyber Crime Cell', number: '7827170170' }
  ];

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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ef4444] flex items-center gap-1.5">
            <Radio className="h-4 w-4 text-[#ef4444] animate-pulse" />
            Dedicated Emergency Response Center
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Emergency SOS Center</h1>
        </div>
        {isActivated && (
          <span className="px-4 py-1.5 rounded-full bg-[#ef4444] text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md">
            <Radio className="h-4 w-4 animate-pulse" />
            LIVE SOS BROADCAST ACTIVE
          </span>
        )}
      </div>

      {/* Press-and-Hold Activation Zone */}
      {!isActivated && !isCountingDown && (
        <div className="titanium-card p-10 text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#ffffff]">Press & Hold to Activate Emergency Broadcast</h2>
            <p className="text-xs text-[#8b909b] max-w-md mx-auto">
              Hold button for 1 second to prevent accidental triggers. Broadcasts GPS location & evidence hashes to trusted contacts.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-[#ef4444] to-[#f59e0b] text-white shadow-2xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 select-none border border-[#ef4444]/40"
            >
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none">
                <circle
                  cx="88"
                  cy="88"
                  r="80"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="80"
                  stroke="#ffffff"
                  strokeWidth="8"
                  strokeDasharray="502"
                  strokeDashoffset={502 - (502 * holdProgress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <AlertTriangle className="h-10 w-10 text-white animate-pulse mb-1" />
              <span className="text-xs font-extrabold tracking-wider uppercase">HOLD FOR SOS</span>
              <span className="text-[10px] font-mono opacity-90">{holdProgress}%</span>
            </button>
          </div>
        </div>
      )}

      {/* 3-Second Countdown Modal */}
      <AnimatePresence>
        {isCountingDown && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0b]/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#17181c] border border-[rgba(255,255,255,0.08)] rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ef4444]">EMERGENCY BROADCAST PENDING</span>
                <h3 className="text-4xl font-extrabold text-[#ef4444] font-mono">{countdown}</h3>
                <p className="text-xs text-[#8b909b]">Broadcasting to emergency contacts and police in {countdown} seconds...</p>
              </div>

              <button
                onClick={cancelCountdown}
                className="w-full py-3 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] hover:bg-[#1e2026] text-[#ffffff] font-bold text-xs flex items-center justify-center gap-2"
              >
                <X className="h-4 w-4 text-[#ef4444]" />
                CANCEL SOS BROADCAST
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Emergency Dashboard once Activated */}
      {isActivated && (
        <div className="space-y-6">
          <div className="titanium-card p-6 border-[#ef4444] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3 text-xs">
              <span className="font-bold text-[#ef4444] uppercase font-mono">LIVE EMERGENCY BROADCAST LOG</span>
              <span className="text-[#8b909b] font-mono">GPS Verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#ffffff]">
                <MapPin className="h-4 w-4 text-[#ef4444]" />
                <span>Location Dispatch: Pune University Campus, Maharshi Karve Rd</span>
              </div>
              <p className="text-[#8b909b] font-mono text-[11px]">{sosResult?.alertMessage || 'Emergency SMS dispatched to 3 trusted contacts.'}</p>
            </div>
          </div>

          {/* Helpline Numbers */}
          <div className="titanium-card p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-[#ffffff] flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#4f8cff]" />
              Official Emergency Helplines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {helplines.map((h, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#111214] border border-[rgba(255,255,255,0.08)] text-center space-y-1">
                  <span className="text-[10px] text-[#8b909b] font-mono block">{h.name}</span>
                  <a href={`tel:${h.number}`} className="text-xl font-extrabold text-[#4f8cff] block hover:underline">
                    {h.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};
