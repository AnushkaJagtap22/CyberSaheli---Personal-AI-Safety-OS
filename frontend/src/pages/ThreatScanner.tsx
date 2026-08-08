import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Upload, 
  FileText, 
  Link as LinkIcon, 
  Mail, 
  FileCheck, 
  QrCode, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import type { ThreatScan } from '../types';
import { useAuth } from '../context/AuthContext';

export const ThreatScanner: React.FC = () => {
  const { updateUserStats } = useAuth();
  const [scanType, setScanType] = useState<'text' | 'image' | 'url' | 'email' | 'pdf' | 'qr'>('text');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ThreatScan | null>(null);

  const sampleScenarios = [
    { label: 'UPI Extortion Scam', text: 'ALERT: Your electricity power line will be disconnected in 30 mins! Transfer Rs 4,999 to GPay 9876543210 immediately to prevent blackout.' },
    { label: 'Romance Scam', text: 'My darling, I sent a gift package containing $50,000 cash and gold watches from UK. Customs held it in Mumbai. Pay Rs 25,000 tax to clear.' },
    { label: 'Part-Time Job Scam', text: 'Amazon Online Hiring! Earn Rs 3,000 daily by liking YouTube videos. Deposit Rs 1,999 refundable registration fee to start now.' },
    { label: 'Safe Message', text: 'Hi Anushka, please confirm if we are still meeting at 4 PM for the project presentation.' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRunScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await api.scanThreat({
        type: scanType,
        content: inputText || selectedFile?.name || '',
        file: selectedFile || undefined
      });
      setScanResult(res);
      updateUserStats(1, res.severity === 'danger' || res.severity === 'critical' ? 1 : 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
            <Sparkles className="h-4 w-4" />
            Explainable AI Defense Engine
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Threat Scanner</h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze screenshots, messages, emails, URLs, PDFs & QR codes for harassment, financial scams, or extortion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Model v2.4 Active
          </span>
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Scan Input Type Tabs */}
          <div className="p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-3 sm:grid-cols-6 gap-1 text-xs font-semibold">
            {[
              { id: 'text', label: 'Text', icon: FileText },
              { id: 'image', label: 'Image', icon: Upload },
              { id: 'url', label: 'URL', icon: LinkIcon },
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'pdf', label: 'PDF', icon: FileCheck },
              { id: 'qr', label: 'QR', icon: QrCode },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setScanType(tab.id as any)}
                className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  scanType === tab.id
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Input Area */}
          <form onSubmit={handleRunScan} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
            
            {scanType === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Paste Suspicious Chat or Message
                </label>
                <textarea
                  rows={5}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste WhatsApp chat, SMS text, or social media DM content..."
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm leading-relaxed"
                />
              </div>
            )}

            {scanType === 'image' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Upload Screenshot / Photo
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-purple-500/50 rounded-2xl p-8 text-center bg-slate-950 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-200">
                    {selectedFile ? selectedFile.name : 'Click or Drag & Drop screenshot here'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            )}

            {scanType === 'url' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Paste Suspicious Web Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="https://gpay-refund-claim-2026.online/login"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
              </div>
            )}

            {scanType === 'email' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Paste Email Body / Sender Address
                </label>
                <textarea
                  rows={5}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="From: hr@amazon-jobs-india.top&#10;Subject: Urgent Appointment Letter..."
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            )}

            {scanType === 'pdf' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Upload Offer Letter / PDF File
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-purple-500/50 rounded-2xl p-8 text-center bg-slate-950 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FileCheck className="h-10 w-10 text-indigo-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-200">
                    {selectedFile ? selectedFile.name : 'Select or drop PDF document'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Extracts text and checks embedded malicious links</p>
                </div>
              </div>
            )}

            {scanType === 'qr' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Paste QR Code String or Upload Image
                </label>
                <div className="relative">
                  <QrCode className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="upi://pay?pa=scammer@okaxis&am=5000&tn=Refund"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Quick Demo Scenario Switcher */}
            <div>
              <span className="text-xs text-slate-400">Try sample threat prompts:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {sampleScenarios.map((sc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setScanType('text');
                      setInputText(sc.text);
                    }}
                    className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isScanning}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 font-bold text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Running Explainable AI Audit...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 fill-white" />
                  Run AI Threat Audit
                </>
              )}
            </button>
          </form>

        </div>

        {/* Right Audit Results Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {!scanResult && !isScanning && (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
              <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 w-fit mx-auto">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Awaiting Content Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide content on the left panel and click &quot;Run AI Threat Audit&quot;. CyberSaheli will evaluate risk score, severity level, red flags, and automatically preserve evidence into your Vault.
              </p>
            </div>
          )}

          {isScanning && (
            <div className="p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-base font-bold text-white">Analyzing Neural Features</h3>
              <p className="text-xs text-slate-400">Inspecting panic keywords, UPI handles, domain age, and psychological extortion patterns...</p>
            </div>
          )}

          {scanResult && !isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
            >
              {/* Risk Level Badge & Score */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono">SCAN RESULT #{scanResult.id.slice(-6)}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{scanResult.threatType}</h3>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-extrabold ${scanResult.riskScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {scanResult.riskScore}<span className="text-xs font-normal text-slate-500">/100</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Confidence: {scanResult.confidence}%</span>
                </div>
              </div>

              {/* Red Flags List */}
              {scanResult.redFlags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Detected Threat Red Flags
                  </span>
                  <div className="space-y-2">
                    {scanResult.redFlags.map((flag, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explainable AI Reason */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-purple-300 block mb-1">Explainable AI Audit:</span>
                {scanResult.explanation}
              </div>

              {/* Safety Recommendation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white block">Recommended Action:</span>
                <p>{scanResult.recommendation}</p>
              </div>

              {/* Vault Auto Sync Status */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  Auto-saved to Evidence Vault
                </span>
                <span className="text-purple-400 hover:underline cursor-pointer">View Vault &rarr;</span>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </motion.div>
  );
};
