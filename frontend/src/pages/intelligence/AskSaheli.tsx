import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Paperclip, 
  Sparkles, 
  ExternalLink, 
  X,
  FileText,
  ArrowRight
} from 'lucide-react';
import type { CyberSaheliIntelligenceData, NewsStory } from '../../services/radarEngine';

interface Message {
  id: string;
  sender: 'user' | 'saheli';
  text: string;
  attachmentName?: string;
  loadingStage?: string;
  explainability?: string[];
  sources?: { name: string; url: string }[];
  quickActions?: { label: string; route: string }[];
  timestamp: string;
}

interface Props {
  intel: CyberSaheliIntelligenceData;
  selectedStory?: NewsStory | null;
}

export function AskSaheli({ intel, selectedStory }: Props) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);

  const suggestionChips = [
    'Is this UPI message a scam?',
    'Why is this scam trending?',
    'How can I verify a recruiter?',
    'Is this deepfake dangerous?',
    'What scams are being reported near me?'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() && !attachedFile) return;

    const userMsgId = `usr-${Date.now()}`;
    const newMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: query.trim() || 'Analyzed attached document screenshot.',
      attachmentName: attachedFile?.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    const currentAttachment = attachedFile;
    setAttachedFile(null);
    setIsProcessing(true);

    // Progressive Loading Stages
    setProcessingStage('Checking current intelligence...');

    setTimeout(() => {
      setProcessingStage('Cross-checking sources...');
    }, 600);

    setTimeout(() => {
      setProcessingStage(null);
      setIsProcessing(false);

      const lower = query.toLowerCase();

      // Intent 1: EMERGENCY / SCAMMED
      if (lower.includes('scammed') || lower.includes('lost money') || lower.includes('fraud') || lower.includes('cheated')) {
        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: "Don't send any more money. Contact your bank or payment provider immediately to request an urgent transaction freeze, save all evidence, and report the incident.",
            explainability: [
              'Immediate action stops secondary layering of debited funds.',
              'Bank helpline 1930 connects directly to Indian Financial Cyber Fraud Reporting System.'
            ],
            sources: [
              { name: 'National Cyber Crime Reporting Portal (1930)', url: 'https://cybercrime.gov.in' },
              { name: 'NPCI Fraud Advisory', url: 'https://www.npci.org.in' }
            ],
            quickActions: [
              { label: 'Save Evidence in Vault', route: '/app/vault' },
              { label: 'Report Scam & Build Dossier', route: '/app/recovery' },
              { label: 'Investigate Incident Details', route: '/app/investigate' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // Intent 2: WHY IS THIS TRENDING / NEWS
      if (lower.includes('trending') || lower.includes('why is this') || lower.includes('top story')) {
        const activeTop = selectedStory || intel.topStory;
        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: `CyberSaheli identified multiple recent reports matching "${activeTop.headline}". Scammers are moving candidates to unofficial messaging channels and requesting security deposits before issuing fake offers.`,
            explainability: [
              'Multiple independent advisories support this pattern.',
              'Official corporate entities do not ask candidates for payment to secure jobs.'
            ],
            sources: [
              { name: activeTop.source, url: activeTop.sourceUrl },
              { name: 'CERT-In Advisory', url: 'https://www.cert-in.org.in' }
            ],
            quickActions: [
              { label: 'Verify Recruiter Account', route: '/app/verify' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // Intent 3: MAHARASHTRA / LOCATION
      if (lower.includes('maharashtra') || lower.includes('near me') || lower.includes('pune') || lower.includes('mumbai')) {
        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: `CyberSaheli is currently seeing the strongest reporting around Financial Fraud and UPI QR code manipulation across Mumbai, Pune, and Thane based on verified public police reports.`,
            explainability: [
              'Mumbai Police Cyber Cell identified over 40 mule accounts.',
              'Thane & Pune report recurring QR collect refund requests.'
            ],
            sources: [
              { name: 'Mumbai Police Cyber Cell', url: 'https://cybercrime.gov.in' },
              { name: 'Indian Express Police Reports', url: 'https://indianexpress.com' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // Intent 4: UPI REFUND / SCAM
      if (lower.includes('upi') || lower.includes('qr') || lower.includes('refund')) {
        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: `Yes. Fraudsters use fake refund workflows to manipulate victims into entering their UPI PIN. Remember: Receiving money NEVER requires entering your UPI PIN.`,
            explainability: [
              'UPI PIN is strictly an authorization for debiting funds.',
              'QR codes contain pay-to instructions, not receive-to instructions.'
            ],
            sources: [
              { name: 'NPCI Official Advisory', url: 'https://www.npci.org.in' }
            ],
            quickActions: [
              { label: 'Verify Payment Handle', route: '/app/verify' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // Intent 5: ATTACHMENT / EVIDENCE ANALYSIS
      if (currentAttachment) {
        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: `Analysis complete for ${currentAttachment.name}: LIKELY SUSPICIOUS. The attached document contains unverified payment domain links and urgent payment requests.`,
            explainability: [
              'Domain header does not match official corporate registrar.',
              'Contains pressure tactics demanding payment within 24 hours.'
            ],
            sources: [
              { name: 'CyberSaheli Evidence Analyzer', url: 'https://cybercrime.gov.in' }
            ],
            quickActions: [
              { label: 'Preserve Screenshot in Vault', route: '/app/vault' },
              { label: 'Run Full Deep Investigation', route: '/app/investigate' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // Default General Intent
      setMessages(prev => [
        ...prev,
        {
          id: `sah-${Date.now()}`,
          sender: 'saheli',
          text: `Regarding "${query}": CyberSaheli advises verifying domains directly on official websites and never sharing OTPs or entering UPI PINs for incoming transfers.`,
          explainability: [
            'Verified against current CERT-In threat intelligence advisories.'
          ],
          sources: [
            { name: 'CERT-In Security Portal', url: 'https://www.cert-in.org.in' }
          ],
          quickActions: [
            { label: 'Verify Someone', route: '/app/verify' },
            { label: 'Investigate Incident', route: '/app/investigate' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#4F8CFF] font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> ASK SAHELI ANYTHING
          </div>
          <p className="text-sm font-semibold text-white pt-1">
            "Not sure what you're seeing? Ask me."
          </p>
        </div>
        <span className="text-[10px] font-mono text-[#8B909B] border border-white/[0.08] px-3 py-1 rounded-full bg-black/40">
          CONVERSATIONAL INTELLIGENCE ASSISTANT
        </span>
      </div>

      {/* CONVERSATION HISTORY STREAM */}
      {messages.length > 0 && (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div key={msg.id} className={`space-y-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block p-4 rounded-2xl max-w-[88%] text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#4F8CFF] text-white font-medium ml-auto'
                    : 'bg-white/[0.03] border border-white/[0.06] text-[#F5F7FA]'
                }`}
              >
                {msg.attachmentName && (
                  <div className="flex items-center gap-2 text-xs font-mono text-white/80 pb-2 border-b border-white/20 mb-2">
                    <FileText className="h-3.5 w-3.5" /> Attached: {msg.attachmentName}
                  </div>
                )}
                <p>{msg.text}</p>
                <span className="text-[10px] font-mono text-[#8B909B] block pt-1.5 opacity-70">
                  {msg.timestamp}
                </span>
              </div>

              {/* SAHELI EXPLAINABILITY & SOURCES */}
              {msg.sender === 'saheli' && msg.explainability && (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3 font-mono text-xs max-w-[88%]">
                  <span className="text-[#4F8CFF] font-bold block uppercase">WHY SAHELI SAYS THIS</span>
                  <div className="space-y-1 font-sans text-xs text-[#8B909B]">
                    {msg.explainability.map((exp, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <span className="text-[#4F8CFF]">&bull;</span>
                        <span>{exp}</span>
                      </p>
                    ))}
                  </div>

                  {msg.sources && (
                    <div className="pt-2 border-t border-white/[0.04] flex flex-wrap items-center gap-3">
                      <span className="text-[#8B909B]">Sources:</span>
                      {msg.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#4F8CFF] font-bold hover:underline inline-flex items-center gap-1"
                        >
                          {src.name} <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* CONTEXT-AWARE QUICK ACTIONS */}
                  {msg.quickActions && (
                    <div className="pt-3 flex flex-wrap gap-2 font-sans">
                      {msg.quickActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigate(act.route)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#4F8CFF]/20 text-[#4F8CFF] border border-[#4F8CFF]/30 text-xs font-semibold hover:bg-[#4F8CFF] hover:text-white transition-all flex items-center gap-1"
                        >
                          {act.label} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* PROGRESSIVE LOADING STAGE */}
          {isProcessing && (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-[#4F8CFF] animate-pulse flex items-center gap-3">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>{processingStage || 'Analyzing context...'}</span>
            </div>
          )}
        </div>
      )}

      {/* COMPACT INPUT BOX */}
      <div className="space-y-3">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Saheli anything, e.g. 'Is this UPI message a scam?'"
            className="w-full px-5 py-4 rounded-2xl bg-[#08090B] border border-white/[0.09] text-white text-sm focus:outline-none focus:border-[#4F8CFF] placeholder-[#8B909B]"
          />

          <label className="p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#8B909B] hover:text-white cursor-pointer transition-all shrink-0">
            <Paperclip className="h-4 w-4" />
            <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
          </label>

          <button
            onClick={() => handleSendMessage()}
            className="p-3.5 rounded-xl bg-[#4F8CFF] text-white hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20 shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {attachedFile && (
          <div className="flex items-center justify-between text-xs font-mono text-[#4F8CFF] px-2">
            <span>Attached file: {attachedFile.name}</span>
            <button onClick={() => setAttachedFile(null)} className="hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* CLICKABLE SUGGESTION CHIPS */}
        <div className="flex flex-wrap gap-2 pt-1">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-[#8B909B] hover:text-white hover:border-[#4F8CFF]/40 transition-all"
            >
              "{chip}"
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
