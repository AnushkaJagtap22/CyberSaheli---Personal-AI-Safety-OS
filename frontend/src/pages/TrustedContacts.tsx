import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  Radio,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import type { TrustedContact } from '../types';

export const TrustedContacts: React.FC = () => {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTriggeringSOS, setIsTriggeringSOS] = useState(false);
  const [sosResult, setSosResult] = useState<any>(null);

  // New Contact Form
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Family');
  const [phone, setPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const data = await api.getContacts();
    setContacts(data);
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    await api.addContact({
      name,
      relation,
      phone,
      email: contactEmail,
      isEmergencyAlertActive: true
    });

    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setContactEmail('');
    loadContacts();
  };

  const handleDelete = async (id: string) => {
    await api.deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleTriggerSOS = async () => {
    setIsTriggeringSOS(true);
    setSosResult(null);

    try {
      const res = await api.sendSOSAlert("Pune University Campus, Maharshi Karve Rd");
      setSosResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTriggeringSOS(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-12 font-sans"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
            <Sparkles className="h-4 w-4" />
            Emergency Contacts & Silent Alert Beacon
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Trusted Emergency Contacts</h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure trusted family, college helplines, or legal guardians for instant location and threat evidence broadcasts.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Add Trusted Contact
        </button>
      </div>

      {/* Instant Emergency SOS Trigger Section */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wider">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              Silent Panic Alert Active
            </span>
            <h2 className="text-2xl font-extrabold text-white">Emergency SOS Broadcast</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Triggers instant GPS location dispatch, streams live audio capture, and sends sealed evidence links to all {contacts.length} trusted contacts and Cyber Police.
            </p>
          </div>

          <button
            onClick={handleTriggerSOS}
            disabled={isTriggeringSOS}
            className="px-8 py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center gap-3 transition-all hover:scale-105 disabled:opacity-50"
          >
            {isTriggeringSOS ? (
              <>
                <RefreshCw className="h-6 w-6 animate-spin" />
                Broadcasting Emergency SOS...
              </>
            ) : (
              <>
                <AlertTriangle className="h-6 w-6 animate-bounce" />
                TRIGGER SILENT SOS NOW
              </>
            )}
          </button>
        </div>

        {sosResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-slate-950 border border-red-500/50 text-xs text-red-300 space-y-1 font-mono"
          >
            <span className="font-bold text-white block">ALERT DISPATCH SUCCESSFUL</span>
            <p>{sosResult.alertMessage}</p>
          </motion.div>
        )}
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c) => (
          <div key={c.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4 flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">{c.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  {c.relation}
                </span>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <span className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-500" />
                  {c.phone}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  {c.email}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pt-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Emergency Alert Broadcast Active
              </span>
            </div>

            <button
              onClick={() => handleDelete(c.id)}
              className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white">Add Emergency Contact</h3>
            <form onSubmit={handleAddContact} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya Sharma (Sister)"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Relation</label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-purple-500"
                >
                  <option value="Family">Family Member</option>
                  <option value="Friend">Trusted Friend</option>
                  <option value="College Helpline">College Helpline Officer</option>
                  <option value="Legal NGO">Legal NGO Advisor</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98123 45678"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="priya.s@gmail.com"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </motion.div>
  );
};
