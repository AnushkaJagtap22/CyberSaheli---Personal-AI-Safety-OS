import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  X, 
  Radio, 
  FileText,
  UserCheck,
  Phone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  method: 'Call' | 'SMS';
  useForSos: boolean;
  shareLocation: boolean;
  status: 'Ready' | 'Pending';
}

interface SecretDoc {
  id: string;
  label: string;
  value: string;
  isRevealed: boolean;
}

export function SafetyPassport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.name || 'Anushka Jagtap';

  // Contact State (persisted in localStorage)
  const [contacts, setContacts] = useState<TrustedContact[]>(() => {
    const saved = localStorage.getItem('cybersaheli_contacts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'c1', name: 'Mother', relationship: 'Emergency contact', phone: '+91 98765 43210', method: 'Call', useForSos: true, shareLocation: true, status: 'Ready' },
      { id: 'c2', name: 'Father', relationship: 'Emergency contact', phone: '+91 98765 43211', method: 'Call', useForSos: true, shareLocation: true, status: 'Ready' },
      { id: 'c3', name: 'Friend (Sneha)', relationship: 'Trusted contact', phone: '+91 98765 43212', method: 'Call', useForSos: true, shareLocation: true, status: 'Ready' },
      { id: 'c4', name: 'Police / Helpline 112', relationship: 'Emergency service', phone: '112', method: 'Call', useForSos: true, shareLocation: false, status: 'Ready' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cybersaheli_contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Emergency Message State
  const [emergencyMessage, setEmergencyMessage] = useState<string>(() => {
    return localStorage.getItem('cybersaheli_sos_msg') || 'I may need help. Please check my location and contact me immediately.';
  });
  const [isEditingMsg, setIsEditingMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('cybersaheli_sos_msg', emergencyMessage);
  }, [emergencyMessage]);

  // Location Sharing & Preferences State
  const [preferredMethod, setPreferredMethod] = useState<'Call' | 'SMS'>('Call');
  const [preferredLang, setPreferredLang] = useState<'English' | 'हिन्दी' | 'मराठी'>('English');
  const [shareLocationOnSos, setShareLocationOnSos] = useState<boolean>(true);

  // Masked Secrets State
  const [secretDocs, setSecretDocs] = useState<SecretDoc[]>([
    { id: 'd1', label: 'Emergency Medical Info', value: 'Blood Group O+ • Allergy: None • Dr. Mehta +91-98200-11223', isRevealed: false },
    { id: 'd2', label: 'Identity Document Ref', value: 'Aadhaar Ref: XXXX-XXXX-4892 (Stored in Vault)', isRevealed: false },
    { id: 'd3', label: 'Insurance Policy Reference', value: 'Health Policy #HC-992018-IND (Emergency Claims Active)', isRevealed: false },
    { id: 'd4', label: 'Vault Master Recovery Key', value: 'CS-VAULT-KEY-9920-X882-P910', isRevealed: false }
  ]);

  const toggleRevealSecret = (id: string) => {
    setSecretDocs(prev => prev.map(d => d.id === id ? { ...d, isRevealed: !d.isRevealed } : d));
  };

  // Add Contact Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactMethod, setNewContactMethod] = useState<'Call' | 'SMS'>('Call');
  const [newUseForSos, setNewUseForSos] = useState(true);
  const [newShareLocation, setNewShareLocation] = useState(true);

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    const item: TrustedContact = {
      id: `c-${Date.now()}`,
      name: newContactName.trim(),
      relationship: newContactRelation.trim() || 'Trusted contact',
      phone: newContactPhone.trim(),
      method: newContactMethod,
      useForSos: newUseForSos,
      shareLocation: newShareLocation,
      status: 'Ready'
    };
    setContacts(prev => [...prev, item]);
    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
    setIsAddModalOpen(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Test SOS Modal State
  const [isTestSosModalOpen, setIsTestSosModalOpen] = useState(false);
  const [testSosStep, setTestSosStep] = useState(0);

  const handleRunTestSos = () => {
    setIsTestSosModalOpen(true);
    setTestSosStep(1);
    setTimeout(() => setTestSosStep(2), 1000);
    setTimeout(() => setTestSosStep(3), 2000);
    setTimeout(() => setTestSosStep(4), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-14 font-sans text-[#F5F7FA] selection:bg-[#4F8CFF] selection:text-white pb-32">
      
      {/* 1. PAGE HERO */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/[0.07] pb-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[#8B909B] uppercase font-bold tracking-widest block">
            CYBERSAHELI SAFETY PASSPORT
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Safety Passport
          </h1>
          <p className="text-sm text-[#8B909B] max-w-xl leading-relaxed">
            Keep the information that matters most ready when you need help.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-mono text-xs font-bold">
          <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
          <span>✓ Safety setup active</span>
        </div>
      </div>

      {/* 2. PREMIUM PASSPORT CARD (APPLE WALLET STYLED TITANIUM PASS) */}
      <div className="p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-[#13151D] via-[#171924] to-[#0D0E14] border border-white/[0.12] shadow-2xl relative overflow-hidden space-y-8 group hover:border-[#4F8CFF]/40 transition-all">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4F8CFF]/10 blur-[90px] pointer-events-none rounded-full" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 text-[#4F8CFF]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block">Cyber<span className="text-[#a78bfa]">Saheli</span></span>
              <span className="text-[10px] font-mono text-[#8B909B] uppercase font-bold block -mt-1">DIGITAL SAFETY IDENTITY</span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-mono font-bold border border-[#10b981]/30">
            ● Emergency ready
          </span>
        </div>

        {/* User Identity Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#8B909B] uppercase">PASSPORT HOLDER</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{userName}</h3>
            <span className="text-xs text-[#4F8CFF] font-mono block">Verified CyberSaheli Passport</span>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs text-[#8B909B] bg-white/[0.02] p-4 rounded-2xl border border-white/[0.04]">
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#8B909B]">Trusted contacts</span>
              <span className="text-sm font-bold text-white block pt-0.5">{contacts.length} Ready</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#8B909B]">Emergency setup</span>
              <span className="text-sm font-bold text-[#10b981] block pt-0.5">Complete</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#8B909B] relative z-10">
          <span>ID: CS-PASS-2026-8840</span>
          <span>Last updated: Today</span>
        </div>
      </div>

      {/* 3. SAFETY READINESS */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">SAFETY READINESS</h2>
            <p className="text-xs text-[#8B909B]">Actionable readiness checklist for your emergency safety setup.</p>
          </div>
          <span className="text-xs font-mono text-[#10b981] font-bold">4 / 5 Ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
            <span className="text-white">Trusted contacts added ({contacts.length})</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
            <span className="text-white">SOS workflow configured</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
            <span className="text-white">Recovery information ready</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
            <span className="text-white">Evidence vault available</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-[#8B909B]">Complete your optional preferences anytime.</span>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#4F8CFF]/20 text-[#4F8CFF] border border-[#4F8CFF]/30 text-xs font-semibold hover:bg-[#4F8CFF] hover:text-white transition-all flex items-center gap-1.5"
          >
            Continue setup &rarr;
          </button>
        </div>
      </div>

      {/* 4. PEOPLE I TRUST (CONTACT MANAGEMENT) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">PEOPLE I TRUST</h2>
            <p className="text-xs text-[#8B909B]">Trusted individuals notified during emergency SOS.</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-semibold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add trusted contact
          </button>
        </div>

        {contacts.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#111317] border border-white/[0.07] text-center space-y-3">
            <UserCheck className="h-8 w-8 text-[#8B909B] mx-auto" />
            <p className="text-xs text-[#8B909B]">You haven't added a trusted contact yet.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#4F8CFF] text-white text-xs font-bold"
            >
              Add your first contact
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-5 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-white/[0.15] transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 text-[#4F8CFF] font-bold text-sm font-mono flex items-center justify-center shrink-0">
                    {contact.name[0]}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{contact.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[#8B909B] text-[10px] font-mono">
                        {contact.relationship}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#8B909B] block">{contact.method} &bull; {contact.useForSos ? 'SOS Active' : 'Normal'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#10b981] font-bold">● {contact.status}</span>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-2 rounded-xl text-[#8B909B] hover:text-[#EF4444] hover:bg-white/[0.06] transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove Contact"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. MY EMERGENCY PLAN & SAFE TEST SOS */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">MY EMERGENCY PLAN</h2>
            <p className="text-xs text-[#8B909B]">Configured action sequence when SOS is activated.</p>
          </div>

          <button
            onClick={handleRunTestSos}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] text-white text-xs font-mono hover:bg-white/[0.1] border border-white/[0.08] flex items-center gap-2"
          >
            <Radio className="h-4 w-4 text-[#4F8CFF]" /> Test SOS &rarr;
          </button>
        </div>

        {/* Sequence Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-[#4F8CFF] font-bold block">1. GET LOCATION</span>
            <p className="text-[#8B909B] font-sans">Acquires GPS coordinates of device.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-[#4F8CFF] font-bold block">2. PREPARE ACTIONS</span>
            <p className="text-[#8B909B] font-sans">Enables location share &amp; map link.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-[#4F8CFF] font-bold block">3. PHONE DIALER</span>
            <p className="text-[#8B909B] font-sans">Opens device dialer for contact.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <span className="text-[#10b981] font-bold block">4. INCIDENT LOGGED</span>
            <p className="text-[#8B909B] font-sans">Stores timestamped incident record.</p>
          </div>
        </div>
      </div>

      {/* 6. EMERGENCY MESSAGE */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <h3 className="text-xs font-mono text-[#8B909B] uppercase font-bold">EMERGENCY MESSAGE PREVIEW</h3>
          <button
            onClick={() => setIsEditingMsg(prev => !prev)}
            className="text-xs font-mono text-[#4F8CFF] hover:underline font-bold"
          >
            {isEditingMsg ? 'Save message' : 'Edit message'}
          </button>
        </div>

        {isEditingMsg ? (
          <textarea
            value={emergencyMessage}
            onChange={(e) => setEmergencyMessage(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[#08090B] border border-[#4F8CFF] text-white text-sm focus:outline-none"
            rows={3}
          />
        ) : (
          <p className="text-sm font-sans text-white p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] leading-relaxed italic">
            "{emergencyMessage}"
          </p>
        )}
      </div>

      {/* 7. LOCATION & PREFERENCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Location Preferences */}
        <div className="p-6 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-xs font-mono text-[#8B909B] uppercase font-bold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#4F8CFF]" /> LOCATION SHARING
            </h3>
            <span className="text-xs font-mono text-[#10b981] font-bold">● Configured</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
              <span>Allow location sharing during SOS</span>
              <button
                onClick={() => setShareLocationOnSos(prev => !prev)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold transition-all ${
                  shareLocationOnSos ? 'bg-[#10b981] text-white' : 'bg-white/[0.1] text-[#8B909B]'
                }`}
              >
                {shareLocationOnSos ? 'ON' : 'OFF'}
              </button>
            </div>
            <p className="text-[11px] text-[#8B909B] leading-relaxed">
              Your location is shared only when you activate the configured emergency workflow.
            </p>
          </div>
        </div>

        {/* Emergency Method Preferences */}
        <div className="p-6 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-xs font-mono text-[#8B909B] uppercase font-bold flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#4F8CFF]" /> PREFERRED METHOD
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {(['Call', 'SMS'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setPreferredMethod(m)}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  preferredMethod === m
                    ? 'bg-[#4F8CFF] text-white font-bold'
                    : 'bg-white/[0.04] text-[#8B909B] hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-2">
            <span className="text-[#8B909B]">Message Language:</span>
            <div className="flex gap-2">
              {(['English', 'हिन्दी', 'मराठी'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setPreferredLang(l)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] ${preferredLang === l ? 'text-[#4F8CFF] font-bold' : 'text-[#8B909B]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 8. SAFETY DOCUMENTS & MASKED SECRETS */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#4F8CFF]" /> IMPORTANT INFORMATION
            </h2>
            <p className="text-xs text-[#8B909B]">Securely reference medical and emergency identification details.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secretDocs.map((doc) => (
            <div key={doc.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8B909B] uppercase font-bold">{doc.label}</span>
                <button
                  onClick={() => toggleRevealSecret(doc.id)}
                  className="text-xs font-mono text-[#4F8CFF] hover:underline flex items-center gap-1"
                >
                  {doc.isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {doc.isRevealed ? 'Hide' : 'Reveal'}
                </button>
              </div>

              <p className="text-xs font-mono text-white pt-1">
                {doc.isRevealed ? doc.value : '••••••••••••••••••••••••••••••••'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. QUICK ACTIONS */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-mono text-[#8B909B] uppercase tracking-wider">QUICK ACTIONS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <button
            onClick={handleRunTestSos}
            className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/40 text-white font-bold flex items-center justify-between group transition-all"
          >
            <span>Test SOS</span>
            <Radio className="h-4 w-4 text-[#4F8CFF] group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/40 text-white font-bold flex items-center justify-between group transition-all"
          >
            <span>Manage Contacts</span>
            <Plus className="h-4 w-4 text-[#4F8CFF] group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => setIsEditingMsg(true)}
            className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/40 text-white font-bold flex items-center justify-between group transition-all"
          >
            <span>Edit Plan</span>
            <FileText className="h-4 w-4 text-[#4F8CFF] group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/app/recovery')}
            className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/40 text-white font-bold flex items-center justify-between group transition-all"
          >
            <span>Recovery Center</span>
            <ArrowRight className="h-4 w-4 text-[#4F8CFF] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* 10. PRIVACY STATEMENT */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-[#8B909B] space-y-2">
        <span className="text-white font-bold uppercase block font-sans">YOUR DATA PRIVACY</span>
        <p className="font-sans leading-relaxed text-[#8B909B]">
          Your Safety Passport contains personal safety preferences. Emergency sharing occurs strictly through configured actions.
        </p>
        <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-[#10b981]">
          <span>✓ Encrypted where supported</span>
          <span>✓ You control your information</span>
          <span>✓ Zero unauthorized tracking</span>
        </div>
      </div>

      {/* MODAL 1: ADD CONTACT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#111317] border border-white/[0.09] rounded-3xl p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white">Add Trusted Contact</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#8B909B] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Contact Name</label>
                <input
                  type="text"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Sister / Rahul"
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Relationship</label>
                <input
                  type="text"
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  placeholder="e.g. Trusted friend"
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Phone Number</label>
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Preferred Method</label>
                <div className="flex gap-2">
                  {(['Call', 'SMS'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setNewContactMethod(m)}
                      className={`flex-1 py-2 rounded-xl border transition-all ${
                        newContactMethod === m ? 'bg-[#4F8CFF] text-white border-[#4F8CFF]' : 'bg-[#08090B] text-[#8B909B] border-white/[0.08]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <span>Use for SOS Workflow</span>
                <button
                  onClick={() => setNewUseForSos(prev => !prev)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                    newUseForSos ? 'bg-[#10b981] text-white' : 'bg-white/[0.1] text-[#8B909B]'
                  }`}
                >
                  {newUseForSos ? 'YES' : 'NO'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <span>Share Location on Emergency</span>
                <button
                  onClick={() => setNewShareLocation(prev => !prev)}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                    newShareLocation ? 'bg-[#10b981] text-white' : 'bg-white/[0.1] text-[#8B909B]'
                  }`}
                >
                  {newShareLocation ? 'YES' : 'NO'}
                </button>
              </div>
            </div>

            <button
              onClick={handleAddContact}
              className="w-full py-3 rounded-xl bg-[#4F8CFF] text-white text-xs font-bold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20"
            >
              Save contact
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: SAFE TEST SOS MODAL */}
      {isTestSosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#111317] border border-white/[0.09] rounded-3xl p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase">SAFE SOS TEST SIMULATION</span>
              <button onClick={() => setIsTestSosModalOpen(false)} className="text-[#8B909B] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testSosStep >= 1 ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-white' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <MapPin className="h-4 w-4 text-[#4F8CFF]" />
                <span>1. Location Acquired: 18.9220° N, 72.8347° E</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testSosStep >= 2 ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-white' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <FileText className="h-4 w-4 text-[#4F8CFF]" />
                <span>2. Emergency Message Formatted</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testSosStep >= 3 ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-white' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <Phone className="h-4 w-4 text-[#4F8CFF]" />
                <span>3. Preferred App ({preferredMethod}) Ready</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testSosStep >= 4 ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981] font-bold' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                <span>4. Test Completed &bull; No Real Distress Alert Sent</span>
              </div>
            </div>

            <button
              onClick={() => setIsTestSosModalOpen(false)}
              className="w-full py-3 rounded-xl bg-white/[0.06] text-white text-xs font-bold hover:bg-white/[0.1]"
            >
              Close test runner
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
