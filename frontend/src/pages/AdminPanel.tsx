import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PhoneCall, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';
import type { AdminAnalytics } from '../types';

export const AdminPanel: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const data = await api.getAdminAnalytics();
    setAnalytics(data);
  };

  const nationalHelplines = [
    { name: 'National Cyber Crime Helpline', number: '1930', desc: 'Financial fraud & immediate banking hold' },
    { name: 'National Commission for Women (NCW)', number: '7827170170', desc: '24/7 Helpline for cyber harassment & safety' },
    { name: 'Women Emergency Helpline', number: '1091', desc: 'Police emergency response & assistance' },
    { name: 'Cyber Crime Online Portal', number: 'cybercrime.gov.in', desc: 'Official Govt cyber crime report portal' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12 font-sans"
    >
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
            <Sparkles className="h-4 w-4" />
            National Command & Cyber Crime Analytics
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin & Cyber Cell Command Panel</h1>
          <p className="text-sm text-slate-400 mt-1">
            Platform wide threat analytics, neural model evaluation scores, active complaints queue, and helpline dispatch directory.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
          Admin Role: Dr. Cyber Command
        </div>
      </div>

      {/* Analytics Overview Metric Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Users</span>
            <div className="text-3xl font-extrabold text-white mt-2">{analytics.totalUsers.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-400 font-medium">+14% growth</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 font-semibold uppercase">Daily AI Scans</span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-2">{analytics.totalScansToday.toLocaleString()}</div>
            <span className="text-[11px] text-slate-400">Peak hour 8 PM - 11 PM</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 font-semibold uppercase">Threats Neutralized</span>
            <div className="text-3xl font-extrabold text-purple-400 mt-2">{analytics.threatsBlocked}</div>
            <span className="text-[11px] text-purple-400">High severity</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 font-semibold uppercase">Active Complaints Drafted</span>
            <div className="text-3xl font-extrabold text-amber-400 mt-2">{analytics.activeComplaints}</div>
            <span className="text-[11px] text-amber-400">Pending Police Filing</span>
          </div>
        </div>
      )}

      {/* Main Grid: Model Performance & Helplines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Neural Model Performance (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Model Performance Metrics */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Cpu className="h-5 w-5 text-indigo-400" />
                AI Model Accuracy & Benchmark Metrics
              </h3>
              <span className="text-xs text-slate-400">On-Device Inference</span>
            </div>

            {analytics && (
              <div className="space-y-4">
                {analytics.modelAccuracy.map((m, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold text-slate-300">
                      <span>{m.modelName}</span>
                      <span className="text-emerald-400 font-mono">{m.accuracy}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full" style={{ width: `${m.accuracy}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Threat Category Distribution */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              National Cyber Threat Breakdown
            </h3>

            {analytics && (
              <div className="space-y-3 text-xs">
                {analytics.threatDistribution.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">{t.category}</span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-600/20 text-purple-300 font-mono font-bold">
                      {t.count}% of total
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: National Helplines Directory (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-emerald-400" />
              Official Indian Cyber Safety Helplines
            </h3>

            <div className="space-y-3">
              {nationalHelplines.map((h, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{h.name}</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
                      {h.number}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
