import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw,
  Globe,
  Building
} from 'lucide-react';
import { api } from '../services/api';
import type { SafeLinkResult, JobVerificationResult } from '../types';

export const LinkJobVerifier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'link' | 'job'>('link');

  // Link Scanner state
  const [urlInput, setUrlInput] = useState('');
  const [isScanningLink, setIsScanningLink] = useState(false);
  const [linkResult, setLinkResult] = useState<SafeLinkResult | null>(null);

  // Job Verifier state
  const [companyName, setCompanyName] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [isVerifyingJob, setIsVerifyingJob] = useState(false);
  const [jobResult, setJobResult] = useState<JobVerificationResult | null>(null);

  const handleScanLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsScanningLink(true);
    setLinkResult(null);

    try {
      const res = await api.scanLink(urlInput);
      setLinkResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanningLink(false);
    }
  };

  const handleVerifyJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() && !jobDetails.trim()) return;

    setIsVerifyingJob(true);
    setJobResult(null);

    try {
      const res = await api.verifyJob({ company: companyName, details: jobDetails });
      setJobResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifyingJob(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12 font-sans"
    >
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <Sparkles className="h-4 w-4" />
          Phishing URL & Employment Verification
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Safe Link & Job Verifier</h1>
        <p className="text-sm text-slate-400 mt-1">
          Detect malicious typosquatting phishing links and check work-from-home job offers for upfront registration fee scams.
        </p>
      </div>

      {/* Main Mode Selector Tabs */}
      <div className="flex border-b border-slate-800 max-w-md">
        <button
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'link'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('link')}
        >
          <LinkIcon className="h-4 w-4" />
          Safe Link Scanner
        </button>
        <button
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'job'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('job')}
        >
          <Briefcase className="h-4 w-4" />
          Job Offer Verifier
        </button>
      </div>

      {/* Mode 1: Safe Link Scanner */}
      {activeTab === 'link' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <form onSubmit={handleScanLink} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Paste Suspicious Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://amazon-deal-wfh-hiring-india.top/login"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Sample Links */}
              <div>
                <span className="text-xs text-slate-400">Try sample links:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setUrlInput("http://free-iphone-gift-claim-2026.online/login")}
                    className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                  >
                    Phishing Typosquatting Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrlInput("https://www.google.com")}
                    className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                  >
                    Verified Domain
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isScanningLink}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
              >
                {isScanningLink ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Inspecting Domain & SSL Certificates...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Scan Link Reputation
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {!linkResult && !isScanningLink && (
              <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
                <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Link Scanner Standby</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter any web URL on the left. CyberSaheli inspects domain age, SSL certificate validity, typosquatting mimicking official brands, and redirect hop counts.
                </p>
              </div>
            )}

            {linkResult && !isScanningLink && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">URL AUDIT VERDICT</span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {linkResult.status === 'danger' || linkResult.status === 'critical' ? 'Malicious Phishing URL' : 'Safe Domain'}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    linkResult.status === 'danger' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {linkResult.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Domain Age</span>
                    <span className="font-bold text-white">{linkResult.domainAgeDays} Days</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">SSL Status</span>
                    <span className={`font-bold ${linkResult.sslValid ? 'text-emerald-400' : 'text-red-400'}`}>
                      {linkResult.sslValid ? 'Valid' : 'Untrusted'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 block">Typosquatting</span>
                    <span className={`font-bold ${linkResult.isTyposquatting ? 'text-red-400' : 'text-emerald-400'}`}>
                      {linkResult.isTyposquatting ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                {linkResult.threatDetails.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-red-400">Security Threats Found</span>
                    {linkResult.threatDetails.map((det, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                        • {det}
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-white block mb-1">Recommendation:</span>
                  {linkResult.recommendation}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Job Offer Verifier */}
      {activeTab === 'job' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-6">
            <form onSubmit={handleVerifyJob} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Amazon India or Global Data Solutions"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Job Offer Details / Email / PDF Text
                </label>
                <textarea
                  rows={5}
                  value={jobDetails}
                  onChange={(e) => setJobDetails(e.target.value)}
                  placeholder="Paste details: salary offer, recruiter email, registration fee requested..."
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm leading-relaxed"
                />
              </div>

              {/* Sample Job Scams */}
              <div>
                <span className="text-xs text-slate-400">Try sample job offers:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCompanyName("Amazon WFH HR");
                      setJobDetails("Congratulations! Pay Rs 4,999 security deposit for laptop dispatch. Contact Telegram @amazon_recruiter");
                    }}
                    className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                  >
                    Fake WFH Upfront Deposit Scam
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifyingJob}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
              >
                {isVerifyingJob ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Verifying Hiring Protocols...
                  </>
                ) : (
                  <>
                    <Briefcase className="h-4 w-4" />
                    Verify Job Offer
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {!jobResult && !isVerifyingJob && (
              <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
                <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 w-fit mx-auto">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Job Verifier Standby</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provide company name and offer text on the left. CyberSaheli checks for upfront security fee extortion, unverified recruiter domains, and illegal job scam patterns.
                </p>
              </div>
            )}

            {jobResult && !isVerifyingJob && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">{jobResult.companyName}</span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {jobResult.isLegitimate ? 'Legitimate Corporate Offer' : 'Fraudulent Job Offer Scam'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-extrabold ${jobResult.riskScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {jobResult.riskScore}/100
                    </span>
                    <span className="text-[10px] text-slate-400 block">Scam Risk</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                  <span className="text-slate-400">Upfront Money Requested:</span>
                  <span className={`font-bold ${jobResult.upfrontPaymentRequested ? 'text-red-400' : 'text-emerald-400'}`}>
                    {jobResult.upfrontPaymentRequested ? 'YES (Upfront Fee Scam)' : 'NO (Free Hiring)'}
                  </span>
                </div>

                {jobResult.scamKeywordsFound.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-red-400">Scam Red Flags Identified</span>
                    {jobResult.scamKeywordsFound.map((kw, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                        • {kw}
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-white block mb-1">Recommendation:</span>
                  {jobResult.recommendation}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

    </motion.div>
  );
};
