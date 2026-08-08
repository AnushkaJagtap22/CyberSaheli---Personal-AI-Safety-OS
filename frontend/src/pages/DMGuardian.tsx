import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  AlertTriangle, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw,
  MessageCircle
} from 'lucide-react';
import { api } from '../services/api';
import type { DMAnalysisResult } from '../types';

export const DMGuardian: React.FC = () => {
  const [platform, setPlatform] = useState<'WhatsApp' | 'Instagram' | 'Telegram' | 'SMS' | 'Messenger'>('WhatsApp');
  const [chatText, setChatText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DMAnalysisResult | null>(null);
  const [copiedReply, setCopiedReply] = useState(false);

  const sampleChats = [
    {
      title: 'Extortion / Sextortion Chat',
      text: `[10:14 AM] Sender: Hey I have your private photos.
[10:15 AM] Sender: Pay Rs 20,000 to my UPI right now.
[10:16 AM] Sender: If you don't send money right now, I will leak these pictures to all your college friends.
[10:17 AM] Sender: Don't tell your parents or police or you will regret it.`
    },
    {
      title: 'Romance / Financial Coercion',
      text: `[02:30 PM] Alex: Baby I am stuck at Dubai airport customs with 500k USD.
[02:32 PM] Alex: Transfer 45,000 INR to the customs officer GooglePay account immediately.
[02:35 PM] Alex: If you loved me you would do this right now!`
    }
  ];

  const handleAnalyzeDM = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const res = await api.analyzeDM(chatText, platform);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyReply = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.suggestedReply);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12 font-sans"
    >
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
          <Sparkles className="h-4 w-4" />
          Chat Manipulation & Extortion Guardian
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">DM Guardian</h1>
        <p className="text-sm text-slate-400 mt-1">
          Paste WhatsApp, Telegram, or Instagram chat logs to detect blackmail, sextortion, emotional abuse, and isolation tactics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chat Input Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <form onSubmit={handleAnalyzeDM} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
            
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Chat Platform
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs font-medium">
                {['WhatsApp', 'Instagram', 'Telegram', 'SMS', 'Messenger'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p as any)}
                    className={`py-2.5 px-2 rounded-xl border transition-all ${
                      platform === p
                        ? 'bg-pink-600/20 border-pink-500 text-pink-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Content Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Paste Chat Transcript / Messages
              </label>
              <textarea
                rows={7}
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Paste conversation lines here..."
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm leading-relaxed"
              />
            </div>

            {/* Quick Demo Pre-set Chats */}
            <div>
              <span className="text-xs text-slate-400">Try sample chat transcripts:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {sampleChats.map((sc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setChatText(sc.text)}
                    className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 font-bold text-white shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Inspecting Chat Tactics...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4" />
                  Analyze Chat Safety
                </>
              )}
            </button>
          </form>

        </div>

        {/* Results & Legal Advice Column (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {!analysis && !isAnalyzing && (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
              <div className="p-4 rounded-full bg-pink-500/10 text-pink-400 w-fit mx-auto">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">DM Guardian Standby</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste chat text on the left to extract extortion threats, coercion tactics, emotional abuse level, and get a legal response draft to shut down harassers.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-base font-bold text-white">Analyzing Psychological Coercion</h3>
              <p className="text-xs text-slate-400">Classifying blackmail, financial panic triggers, and isolation statements...</p>
            </div>
          )}

          {analysis && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
            >
              {/* Threat Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono">{analysis.chatPlatform} CHAT AUDIT</span>
                  <h3 className="text-xl font-bold text-white mt-1">{analysis.detectedTactic}</h3>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    analysis.threatLevel === 'critical' || analysis.threatLevel === 'danger'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {analysis.threatLevel.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">Emotional Abuse: {analysis.emotionalAbuseRating}</span>
                </div>
              </div>

              {/* Dangerous Highlighted Lines */}
              {analysis.dangerLines.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Extortion & Blackmail Lines Identified
                  </span>
                  <div className="space-y-2">
                    {analysis.dangerLines.map((line, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 space-y-1">
                        <p className="text-xs font-bold text-red-200 font-mono">&quot;{line.text}&quot;</p>
                        <span className="text-[11px] text-red-400 block">• {line.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Advice */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400 block">Safety Protocol Advice:</span>
                <p>{analysis.safetyAdvice}</p>
              </div>

              {/* Legal Reply Generator Box */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">Recommended Legal Defense Reply</span>
                  <button
                    onClick={handleCopyReply}
                    className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedReply ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedReply ? 'Copied' : 'Copy Text'}
                  </button>
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {analysis.suggestedReply}
                </p>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </motion.div>
  );
};
