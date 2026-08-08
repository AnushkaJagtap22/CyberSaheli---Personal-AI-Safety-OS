import React, { useState } from 'react';
import { MapPin, ShieldAlert, Activity } from 'lucide-react';

interface CityThreat {
  city: string;
  state: string;
  threatLevel: 'High' | 'Moderate' | 'Critical';
  activeScams: number;
  topScamType: string;
  recentTrends: string;
}

export const ThreatMap: React.FC = () => {
  const cities: CityThreat[] = [
    { city: 'Pune', state: 'Maharashtra', threatLevel: 'Critical', activeScams: 342, topScamType: 'UPI Fraud & Sextortion', recentTrends: 'Fake college admission deposit calls active near campus areas.' },
    { city: 'Mumbai', state: 'Maharashtra', threatLevel: 'High', activeScams: 812, topScamType: 'Instagram Impersonation', recentTrends: 'Deepfake investment celebrity ads targeting Telegram users.' },
    { city: 'Bengaluru', state: 'Karnataka', threatLevel: 'High', activeScams: 654, topScamType: 'Fake WFH Tech Jobs', recentTrends: 'Laptop deposit scams pretending to be Amazon/Flipkart recruiters.' },
    { city: 'Delhi NCR', state: 'Delhi', threatLevel: 'Critical', activeScams: 920, topScamType: 'Power Disconnection SMS', recentTrends: 'Urgent electricity bill blackout APK malware links.' },
    { city: 'Hyderabad', state: 'Telangana', threatLevel: 'Moderate', activeScams: 410, topScamType: 'Phishing URLs', recentTrends: 'Typosquatting banking links sent via WhatsApp groups.' }
  ];

  const [selectedCity, setSelectedCity] = useState<CityThreat>(cities[0]);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6 font-sans text-zinc-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-cyan-400" />
            Anonymized Regional Heatmap
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">National Cyber Incident Threat Map</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
          Live Data Stream Active
        </span>
      </div>

      {/* City Selector Grid & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* City Buttons */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">Select Metro Region:</span>
          {cities.map((c) => {
            const isSelected = c.city === selectedCity.city;
            return (
              <button
                key={c.city}
                onClick={() => setSelectedCity(c)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`h-4 w-4 ${c.threatLevel === 'Critical' ? 'text-red-400' : 'text-amber-400'}`} />
                  <div>
                    <span className="text-xs font-bold block">{c.city}, {c.state}</span>
                    <span className="text-[10px] text-zinc-500">{c.topScamType}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  c.threatLevel === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {c.activeScams} Reported
                </span>
              </button>
            );
          })}
        </div>

        {/* City Threat Forensic Panel */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
            <div>
              <span className="text-[10px] uppercase font-mono text-purple-400">REGIONAL AUDIT</span>
              <h3 className="text-lg font-bold text-white">{selectedCity.city} Metro Threat Profile</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
              {selectedCity.threatLevel} Threat Severity
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block mb-1">Active Incidents</span>
              <span className="text-xl font-extrabold text-white">{selectedCity.activeScams}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block mb-1">Primary Vector</span>
              <span className="text-xs font-bold text-purple-300">{selectedCity.topScamType}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-1">
            <span className="text-purple-300 font-bold flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5 text-cyan-400" />
              Recent Police Cyber Cell Trend Alert:
            </span>
            <p className="text-zinc-300">{selectedCity.recentTrends}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
