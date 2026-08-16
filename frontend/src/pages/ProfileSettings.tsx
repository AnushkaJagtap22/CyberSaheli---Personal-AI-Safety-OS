import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Globe, 
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  User,
  Phone,
  Plus,
  Trash2,
  Save,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileSettings: React.FC = () => {
  const { user, updateUserProfile } = useAuth();

  // Editable Profile States
  const [name, setName] = useState(user?.name || user?.email?.split('@')[0] || 'CyberSaheli User');
  const [role, setRole] = useState(user?.role || 'Verified Cyber Safety User');
  const [language, setLanguage] = useState(user?.language || 'English');
  const [theme, setTheme] = useState(user?.theme || 'Midnight Titanium');
  const [isSaved, setIsSaved] = useState(false);

  // Trusted Contacts State
  const [contacts, setContacts] = useState<{ id: string; name: string; relation: string; phone: string }[]>([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    setContacts(prev => [
      ...prev,
      {
        id: `ct-${Date.now()}`,
        name: newContactName,
        relation: newContactRelation || 'Emergency Contact',
        phone: newContactPhone
      }
    ]);
    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
  };

  const handleRemoveContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      role,
      language,
      theme
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user || {}, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "CyberSaheli_Personal_Safety_Data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="max-w-5xl mx-auto space-y-8 pb-16 font-sans text-[#ffffff] selection:bg-[#7c3aed] selection:text-white"
    >
      {/* 1. HEADER */}
      <div className="border-b border-[rgba(255,255,255,0.08)] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-[#a78bfa] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#7c3aed]" />
            PERSONAL SAFETY OS PROFILE
          </span>
          <h1 className="text-3xl font-extrabold text-[#ffffff] tracking-tight mt-1">Profile & Settings</h1>
        </div>

        <button
          onClick={handleDownloadData}
          className="px-4 py-2.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs font-bold hover:bg-[#22273a] transition-all flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4 text-[#60a5fa]" />
          Export Personal Data (JSON)
        </button>
      </div>

      {/* 2. USER AVATAR & ACCOUNT INFORMATION CARD */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#13151f] via-[#171927] to-[#0f1017] border border-[rgba(255,255,255,0.08)] shadow-2xl flex flex-col sm:flex-row items-center gap-8">
        <div className="relative">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-[#7c3aed] object-cover shadow-2xl"
          />
          <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#10b981] text-white border-2 border-[#13151f]" title="Identity Verified">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h2 className="text-2xl font-extrabold text-[#ffffff]">{name}</h2>
            <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 text-[10px] font-mono font-extrabold">
              VERIFIED USER
            </span>
          </div>

          <p className="text-xs text-[#94a3b8] font-mono">{role} &bull; Primary User</p>
          <p className="text-[11px] text-[#64748b] font-mono">{user?.email}</p>
        </div>
      </div>

      {/* 3. DYNAMIC SECURITY STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#94a3b8] font-bold block">Active Investigations</span>
          <span className="text-2xl font-extrabold text-[#ffffff] font-mono">1 Active Case</span>
          <span className="text-xs text-[#60a5fa] font-semibold block pt-1">Case #104 Monitored</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#94a3b8] font-bold block">Evidence Stored</span>
          <span className="text-2xl font-extrabold text-[#ffffff] font-mono">{user?.evidenceSavedCount || 3} Files</span>
          <span className="text-xs text-[#10b981] font-semibold block pt-1">✓ Cryptographically Sealed</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#94a3b8] font-bold block">Reports Generated</span>
          <span className="text-2xl font-extrabold text-[#ffffff] font-mono">1 Police FIR Report</span>
          <span className="text-xs text-[#a78bfa] font-semibold block pt-1">✓ Court Ready Dossier</span>
        </div>
      </div>

      {/* 4. LINKED ACCOUNTS CARD */}
      <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#10b981]" />
          Verified Linked Professional Accounts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.linkedin.com/in/anushkajagtap/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#171a27] border border-[#10b981]/40 flex items-center justify-between hover:border-[#10b981] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#10b981]/15 text-[#10b981]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">LinkedIn</span>
                <span className="text-[11px] text-[#10b981] font-mono">Connected &bull; Verified</span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-[#60a5fa]" />
          </a>

          <a
            href="https://github.com/AnushkaJagtap229503353458"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#171a27] border border-[#10b981]/40 flex items-center justify-between hover:border-[#10b981] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#10b981]/15 text-[#10b981]">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">GitHub</span>
                <span className="text-[11px] text-[#10b981] font-mono">Connected &bull; Verified</span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-[#60a5fa]" />
          </a>
        </div>
      </div>

      {/* 5. EDITABLE PROFILE FORM */}
      <form onSubmit={handleSaveProfile} className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-[#7c3aed]" />
          Account & Preference Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#7c3aed]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Role / Profession</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#7c3aed]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#94a3b8] uppercase flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#60a5fa]" /> Preferred Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#7c3aed]"
            >
              <option value="English">English (Global)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Marathi">Marathi (मराठी)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#94a3b8] uppercase flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5 text-[#a78bfa]" /> System Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#7c3aed]"
            >
              <option value="Midnight Titanium">Midnight Titanium (Dark)</option>
              <option value="Apple Light">Apple Glass (Light)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
          {isSaved ? (
            <span className="text-xs font-bold text-[#10b981] flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Profile Updated Successfully
            </span>
          ) : (
            <span className="text-xs text-[#94a3b8]">Changes save instantly to your session.</span>
          )}

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#7c3aed] text-white text-xs font-bold hover:bg-[#6d28d9] transition-all flex items-center gap-2 shadow-lg shadow-[#7c3aed]/20"
          >
            <Save className="h-4 w-4" /> Save Profile Settings
          </button>
        </div>
      </form>

      {/* 6. TRUSTED EMERGENCY CONTACTS MANAGER */}
      <div className="p-8 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#10b981]" />
              Trusted Emergency Contacts
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">Contacts added here are notified during 1-click Emergency SOS triggers.</p>
          </div>
          <span className="text-xs font-mono text-[#10b981]">{contacts.length} Contacts</span>
        </div>

        {/* Contact Addition Form */}
        <form onSubmit={handleAddContact} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Contact Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#10b981]"
          />
          <input
            type="text"
            placeholder="Relation (e.g. Sister, Friend)"
            value={newContactRelation}
            onChange={(e) => setNewContactRelation(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#10b981]"
          />
          <input
            type="tel"
            placeholder="Phone Number (+91...)"
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.1)] text-white text-xs focus:outline-none focus:border-[#10b981]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-2xl bg-[#10b981] text-white text-xs font-bold hover:bg-[#059669] transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Add Contact
          </button>
        </form>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#171a27] text-center border border-[rgba(255,255,255,0.04)] text-xs text-[#94a3b8]">
            No emergency contacts added yet. Add trusted friends or family above.
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{c.name}</h4>
                  <p className="text-[11px] text-[#94a3b8]">{c.relation} &bull; {c.phone}</p>
                </div>
                <button
                  onClick={() => handleRemoveContact(c.id)}
                  className="p-2 rounded-xl text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#1f2334] transition-colors"
                  title="Remove Contact"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </motion.div>
  );
};
