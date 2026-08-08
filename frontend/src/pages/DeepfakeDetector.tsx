import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Image as ImageIcon, 
  Mic, 
  Upload, 
  AlertTriangle, 
  Sparkles,
  RefreshCw,
  Eye,
  Activity
} from 'lucide-react';
import { api } from '../services/api';
import type { DeepfakeScanResult } from '../types';

export const DeepfakeDetector: React.FC = () => {
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'audio'>('photo');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DeepfakeScanResult | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileName = selectedFileName || `${mediaType}_sample_test_01.mp4`;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await api.analyzeDeepfake(fileName, mediaType);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
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
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
          <Sparkles className="h-4 w-4" />
          Neural Synthetic Forensics Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Deepfake & Voice Clone Detector</h1>
        <p className="text-sm text-slate-400 mt-1">
          Detect face swaps, neural voice clones, diffusion image edits, and video manipulation with spatial heatmap analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input & Scanner Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <form onSubmit={handleAnalyze} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            
            {/* Media Type Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Media Artifact Type
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                {[
                  { id: 'photo', label: 'Photo / Image', icon: ImageIcon },
                  { id: 'video', label: 'Video Frame', icon: Video },
                  { id: 'audio', label: 'Voice Audio', icon: Mic }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMediaType(m.id as any)}
                    className={`py-3 px-2 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      mediaType === m.id
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <m.icon className="h-4 w-4" />
                    <span className="text-xs">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload Box */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Upload {mediaType.toUpperCase()} File
              </label>
              <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-slate-950 transition-colors cursor-pointer relative overflow-hidden">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                {/* Animated scanline visual overlay */}
                <div className="animate-scanline" />

                <Upload className="h-10 w-10 text-cyan-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-200">
                  {selectedFileName || `Select ${mediaType} or drag and drop`}
                </p>
                <p className="text-xs text-slate-500 mt-1">Supports MP4, WAV, MP3, PNG, JPG (Max 50MB)</p>
              </div>
            </div>

            {/* Quick Demo Pre-set Files */}
            <div>
              <span className="text-xs text-slate-400">Try sample test files:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => { setMediaType('audio'); setSelectedFileName('whatsapp_voice_clone_urgent_bail.wav'); }}
                  className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                >
                  Synthetic Voice Clone
                </button>
                <button
                  type="button"
                  onClick={() => { setMediaType('photo'); setSelectedFileName('profile_face_swap_edit.jpg'); }}
                  className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                >
                  Deepfake Face Swap
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 font-bold text-white shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Inspecting Spectral & Biometric Artifacts...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Analyze Deepfake Authenticity
                </>
              )}
            </button>
          </form>

        </div>

        {/* Audit Results & Spectral Breakdown (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {!result && !isAnalyzing && (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center space-y-4">
              <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 w-fit mx-auto">
                <Activity className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Neural Inspector Ready</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload a audio note, video clip, or photo. Saheli AI inspects high-frequency phase discrepancies, irregular lip boundary pixels, and voice synthesis signatures.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-base font-bold text-white">Scanning Media Layers</h3>
              <p className="text-xs text-slate-400">Computing 256-point facial landmark heatmaps and spectral Mel-frequency cepstral coefficients...</p>
            </div>
          )}

          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5"
            >
              {/* Authenticity Overview */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono">{result.mediaType.toUpperCase()} • {result.mediaName}</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {result.isManipulated ? 'AI Synthetic / Deepfake Detected' : 'Authentic Unaltered Media'}
                  </h3>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-extrabold ${result.authenticityScore < 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {result.authenticityScore}%
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Authenticity Score</span>
                </div>
              </div>

              {/* Neural Heatmap Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Boundary Artifact Heatmap</span>
                  <span className="font-bold text-white text-sm">{result.facialBoundaryHeatmapScore}/100</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Neural Voice Match</span>
                  <span className="font-bold text-white text-sm">{result.voiceSynthesisMatch}%</span>
                </div>
              </div>

              {/* Artifacts Found */}
              {result.artifactsDetected.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Detected Manipulation Artifacts
                  </span>
                  <div className="space-y-2">
                    {result.artifactsDetected.map((art, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{art}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explainable AI Explanation */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-cyan-300 block mb-1">Explainable Forensic Summary:</span>
                {result.explanation}
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </motion.div>
  );
};
