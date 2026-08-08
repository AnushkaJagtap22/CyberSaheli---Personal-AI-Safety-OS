import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Mail, 
  Sparkles,
  RefreshCw,
  Globe,
  Share2
} from 'lucide-react';
import { api } from '../services/api';
import type { BackgroundCheckResult } from '../types';

export const BackgroundCheck: React.FC = () => {
  const [platform, setPlatform] = useState<'Instagram' | 'LinkedIn' | 'Twitter/X' | 'Telegram' | 'Email/Phone'>('Instagram');
  const [targetHandle, setTargetHandle] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [checkResult, setCheckResult] = useState<BackgroundCheckResult | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetHandle.trim()) return;

    setIsAuditing(true);
    setCheckResult(null);

    try {
      const res = await api.backgroundCheck(targetHandle, platform);
      setCheckResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12"
    >
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
          <Sparkles className="h-4 w-4" />
          Profile Forensics & Identity Audit
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Background Check AI</h1>
        <p className="text-sm text-slate-400 mt-1">
          Verify online profiles, social media handles, and emails for bot followers, copied avatars, and romance/job scam impersonators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <form onSubmit={handleAudit} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Platform / Handle Type
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs font-medium">
                {[
                  { id: 'Instagram', label: 'Instagram', icon: Share2 },
                  { id: 'LinkedIn', label: 'LinkedIn', icon: Globe },
                  { id: 'Twitter/X', label: 'Twitter/X', icon: Globe },
                  { id: 'Telegram', label: 'Telegram', icon: Send },
                  { id: 'Email/Phone', label: 'Email/Phone', icon: Mail }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as any)}
                    className={`py-3 px-2 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      platform === p.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <p.icon className="h-4 w-4" />
                    <span className="text-[11px] truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Username Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Username, Email or Phone
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={targetHandle}
                  onChange={(e) => setTargetHandle(e.target.value)}
                  placeholder="e.g. @alex_wealth_official or hr@career-portal.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            {/* Quick Demo Handles */}
            <div>
              <span className="text-xs text-slate-400">Try sample profiles:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => { setPlatform('Instagram'); setTargetHandle('@crypto_king_invest_bot'); }}
                  className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                >
                  Fake Crypto Bot Profile
                </button>
                <button
                  type="button"
                  onClick={() => { setPlatform('LinkedIn'); setTargetHandle('anushka-jagtap-verified'); }}
                  className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                >
                  Legitimate Professional
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuditing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Running Neural Forensics Audit...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Perform Background Check
                </>
              )}
            </button>
          </form>

        </div>

        {/* Right Audit Results Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {!checkResult && !isAuditing && (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
              <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 w-fit mx-auto">
                <UserCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Identity Audit Ready</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter any social media handle or email on the left. CyberSaheli will evaluate reverse image avatar matches, bot follower ratios, account creation dates, and trust index.
              </p>
            </div>
          )}

          {isAuditing && (
            <div className="p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-base font-bold text-white">Auditing Digital Footprint</h3>
              <p className="text-xs text-slate-400">Comparing profile picture against 10M+ stock avatars & inspecting follower graph metrics...</p>
            </div>
          )}

          {checkResult && !isAuditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
            >
              {/* Profile Overview & Score */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono">{checkResult.platform} • {checkResult.target}</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {checkResult.isFakeProfile ? 'Fake / High Risk Profile' : 'Authentic Organic Profile'}
                  </h3>
                  <span className="text-xs text-slate-400">{checkResult.accountAgeEstimate}</span>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-extrabold ${checkResult.trustScore < 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {checkResult.trustScore}<span className="text-xs font-normal text-slate-500">/100</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Trust Index</span>
                </div>
              </div>

              {/* Forensic Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Bot Follower Likelihood</span>
                  <span className={`font-bold text-sm ${checkResult.botFollowerLikelihood > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {checkResult.botFollowerLikelihood}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Avatar Image Check</span>
                  <span className={`font-bold text-sm ${checkResult.isAvatarCopied ? 'text-red-400' : 'text-emerald-400'}`}>
                    {checkResult.isAvatarCopied ? 'Copied Stock Image' : 'Unique Image'}
                  </span>
                </div>
              </div>

              {/* Red Flags & Positive Signals */}
              {checkResult.redFlags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Fraud Red Flags ({checkResult.redFlags.length})
                  </span>
                  <div className="space-y-2">
                    {checkResult.redFlags.map((flag, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {checkResult.positiveSignals.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Positive Authenticity Signals
                  </span>
                  <div className="space-y-2">
                    {checkResult.positiveSignals.map((sig, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explainable AI Explanation */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-300 block mb-1">Explainable AI Forensic Verdict:</span>
                {checkResult.explanation}
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </motion.div>
  );
};
