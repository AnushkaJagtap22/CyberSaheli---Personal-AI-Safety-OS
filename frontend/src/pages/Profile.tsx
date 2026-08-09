import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Edit3, 
  Download, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Users, 
  Smartphone,
  Lock,
  Globe,
  Bell,
  Activity,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  language: string;
  notifications: {
    safety_alerts: boolean;
    learning_reminders: boolean;
    security_updates: boolean;
    emergency_alerts: boolean;
  };
}

export function Profile() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  // Profile Data State (Persisted in localStorage + Synced with Python Backend)
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cybersaheli_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: authUser?.name || 'Anushka Jagtap',
      email: authUser?.email || 'anushka@cybersaheli.org',
      phone: '+91 98765 43210',
      location: 'Pune, Maharashtra',
      language: 'English',
      notifications: {
        safety_alerts: true,
        learning_reminders: true,
        security_updates: true,
        emergency_alerts: true
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('cybersaheli_user_profile', JSON.stringify(profile));
  }, [profile]);

  // Sync with Backend GET /api/v1/profile
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    fetch(`${API_BASE_URL}/api/v1/profile`)
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfile(prev => ({
            ...prev,
            name: data.profile.name || prev.name,
            email: data.profile.email || prev.email,
            phone: data.profile.phone || prev.phone,
            location: data.profile.location || prev.location
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Trusted Contacts State from Safety Passport
  const [contactsCount, setContactsCount] = useState<number>(3);
  useEffect(() => {
    const saved = localStorage.getItem('cybersaheli_contacts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContactsCount(parsed.length);
      } catch (e) {}
    }
  }, []);

  // Edit Profile Drawer Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editLanguage, setEditLanguage] = useState(profile.language);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Danger Zone Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSaveProfile = async () => {
    const updated = {
      ...profile,
      name: editName,
      email: editEmail,
      phone: editPhone,
      location: editLocation,
      language: editLanguage
    };
    setProfile(updated);
    setIsEditModalOpen(false);
    setSaveNotice('✓ Profile updated successfully.');
    setTimeout(() => setSaveNotice(null), 3000);

    // Sync PUT to backend endpoint
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      fetch(`${API_BASE_URL}/api/v1/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          phone: editPhone,
          location: editLocation,
          language: editLanguage
        })
      }).catch(() => {});
    } catch (e) {}
  };

  const handleToggleNotification = (key: keyof UserProfile['notifications']) => {
    setProfile(prev => {
      const updated = {
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: !prev.notifications[key]
        }
      };
      // Sync PUT to backend preferences endpoint
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      fetch(`${API_BASE_URL}/api/v1/profile/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated.notifications)
      }).catch(() => {});
      return updated;
    });
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cybersaheli_profile_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-14 font-sans text-[#F5F7FA] selection:bg-[#4F8CFF] selection:text-white pb-32">
      
      {/* SUCCESS NOTICE POPUP */}
      <AnimatePresence>
        {saveNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 right-8 z-50 px-6 py-3.5 rounded-2xl bg-[#10b981] text-white font-mono font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{saveNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. PROFILE HERO (LARGE PREMIUM DIGITAL SAFETY HEADER) */}
      <div className="p-8 sm:p-10 rounded-[36px] bg-[#111317] border border-white/[0.09] space-y-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Avatar Initials */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] p-0.5 shadow-2xl flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-[22px] bg-[#0D0E14] flex items-center justify-center text-3xl font-extrabold font-mono text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{profile.name}</h1>
                <span className="px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] font-mono text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Profile protected
                </span>
              </div>
              <p className="text-xs font-mono text-[#4F8CFF] font-bold">Level 7 &bull; Cyber Guardian</p>
              <p className="text-xs text-[#8B909B]">Your personal digital safety identity and command center.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setEditName(profile.name);
                setEditEmail(profile.email);
                setEditPhone(profile.phone);
                setEditLocation(profile.location);
                setEditLanguage(profile.language);
                setIsEditModalOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-[#4F8CFF] text-white font-bold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20 transition-all flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" /> Edit Profile
            </button>
            <button
              onClick={() => navigate('/app/passport')}
              className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.09] text-white font-bold hover:bg-white/[0.08] transition-all flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4 text-[#8B5CF6]" /> Privacy
            </button>
          </div>
        </div>
      </div>

      {/* 2. SAFETY LEVEL & PERSONAL SAFETY SCORE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Cyber Safety Level (Connected to Cyber Quest) */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase tracking-wider">CYBER SAFETY LEVEL</span>
            <span className="px-3 py-1 rounded-full bg-[#4F8CFF]/15 text-[#4F8CFF] text-xs font-mono font-bold">LEVEL 7</span>
          </div>

          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white tracking-tight">CYBER GUARDIAN</h3>
              <span className="text-yellow-400 font-bold text-sm">2,450 XP</span>
            </div>

            <div className="w-full h-3 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] rounded-full" style={{ width: '82%' }} />
            </div>

            <div className="flex items-center justify-between text-xs text-[#8B909B] pt-1">
              <span>Progress to Level 8</span>
              <span className="text-white font-bold">550 XP needed</span>
            </div>
          </div>
        </div>

        {/* Personal Safety Score (Calculated Readiness) */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <span className="text-xs font-mono text-[#10b981] font-bold uppercase tracking-wider">YOUR SAFETY READINESS</span>
            <span className="text-2xl font-bold font-mono text-[#10b981]">82%</span>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">ACCOUNT SECURITY</span>
              <span className="text-white font-bold text-base">92%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">PRIVACY</span>
              <span className="text-[#4F8CFF] font-bold text-base">78%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">SCAM AWARENESS</span>
              <span className="text-[#10b981] font-bold text-base">86%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block">EMERGENCY READINESS</span>
              <span className="text-yellow-400 font-bold text-base">74%</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SAFETY PASSPORT & TRUSTED CONTACTS SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Safety Passport Card */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#4F8CFF]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">SAFETY PASSPORT</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-mono font-bold">READY</span>
          </div>

          <div className="space-y-2 text-xs font-mono text-[#8B909B]">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
              <span>Trusted contacts configured ({contactsCount})</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
              <span>Emergency SOS workflow active</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
              <span>Identity &amp; medical vault stored</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/passport')}
            className="w-full py-3.5 rounded-2xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF] font-mono text-xs font-bold hover:bg-[#4F8CFF] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            Manage Safety Passport <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Trusted Contacts Overview */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#8B5CF6]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">TRUSTED CONTACTS</h2>
            </div>
            <span className="text-xs font-mono text-[#8B909B]">{contactsCount} Configured</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
              <span className="text-white font-bold">Mother</span>
              <span className="text-[#10b981]">● Ready for SOS</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
              <span className="text-white font-bold">Father</span>
              <span className="text-[#10b981]">● Ready for SOS</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/passport')}
            className="w-full py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.09] text-white font-mono text-xs font-bold hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
          >
            Manage Contacts <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* 4. PERSONAL INFORMATION */}
      <div className="p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <h2 className="text-lg font-bold text-white font-mono uppercase">PERSONAL INFORMATION</h2>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-xs font-mono text-[#4F8CFF] hover:underline font-bold"
          >
            Edit Information &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[#8B909B] uppercase text-[10px] block">FULL NAME</span>
            <span className="text-white font-bold text-sm block">{profile.name}</span>
          </div>

          <div className="space-y-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[#8B909B] uppercase text-[10px] block">EMAIL ADDRESS</span>
            <span className="text-white font-bold text-sm block">{profile.email}</span>
          </div>

          <div className="space-y-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[#8B909B] uppercase text-[10px] block">PHONE NUMBER</span>
            <span className="text-white font-bold text-sm block">{profile.phone}</span>
          </div>

          <div className="space-y-1 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[#8B909B] uppercase text-[10px] block">LOCATION</span>
            <span className="text-white font-bold text-sm block">{profile.location}</span>
          </div>
        </div>
      </div>

      {/* 5. CYBER QUEST PROGRESS & UNLOCKED ACHIEVEMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Cyber Quest Progress */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#4F8CFF]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">CYBER QUEST PROGRESS</h2>
            </div>
            <span className="text-xs font-mono text-yellow-400 font-bold flex items-center gap-1">
              <Flame className="h-4 w-4" /> 6 Day Streak
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 font-mono text-xs text-center">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block uppercase">LESSONS</span>
              <span className="text-white font-bold text-base">18</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block uppercase">MISSIONS</span>
              <span className="text-[#4F8CFF] font-bold text-base">7</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
              <span className="text-[#8B909B] text-[10px] block uppercase">BADGES</span>
              <span className="text-[#10b981] font-bold text-base">6 / 20</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/learning')}
            className="w-full py-3.5 rounded-2xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF] font-mono text-xs font-bold hover:bg-[#4F8CFF] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            Continue Learning <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#8B5CF6]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">RECENT ACTIVITY</h2>
            </div>
            <span className="text-xs font-mono text-[#8B909B]">Live Feed</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">UPI Scam Detection Mission</span>
                <span className="text-[10px] text-[#8B909B]">Rank S &bull; Perfect Decision</span>
              </div>
              <span className="text-yellow-400 font-bold">+100 XP</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Safety Passport Updated</span>
                <span className="text-[10px] text-[#8B909B]">Trusted contacts verified</span>
              </div>
              <span className="text-[#10b981] font-bold">✓ Synced</span>
            </div>
          </div>
        </div>

      </div>

      {/* 6. ACHIEVEMENTS HORIZONTAL GRID */}
      <div className="p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white font-mono uppercase">UNLOCKED ACHIEVEMENTS</h2>
          </div>

          <button
            onClick={() => navigate('/app/learning')}
            className="text-xs font-mono text-[#4F8CFF] hover:underline font-bold"
          >
            View All Achievements &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          {[
            { icon: '🛡️', title: 'First Defender', desc: 'First safety mission complete', xp: '+100 XP' },
            { icon: '🔎', title: 'Scam Spotter', desc: 'Identified 5 scam indicators', xp: '+150 XP' },
            { icon: '💳', title: 'UPI Guardian', desc: 'UPI safety scenarios clear', xp: '+200 XP' },
            { icon: '🔥', title: 'Consistent Defender', desc: '3-day learning streak', xp: '+300 XP' }
          ].map((badge, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-center">
              <span className="text-3xl block">{badge.icon}</span>
              <h4 className="text-xs font-bold text-white font-sans">{badge.title}</h4>
              <span className="text-[10px] text-[#8B909B] block">{badge.desc}</span>
              <span className="text-yellow-400 font-bold block pt-1">{badge.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. PRIVACY, SECURITY & SESSIONS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Privacy & Security */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#4F8CFF]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">PRIVACY &amp; SECURITY</h2>
            </div>
            <span className="text-xs font-mono text-[#10b981] font-bold">● Protected</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
              <span>Account Security</span>
              <span className="text-[#10b981] font-bold">✓ Verified</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <span className="text-[#8B909B]">Optional</span>
            </div>
          </div>
        </div>

        {/* Devices & Sessions */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[#8B5CF6]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">YOUR DEVICES</h2>
            </div>
            <span className="text-xs font-mono text-[#10b981] font-bold">Active Now</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Windows &bull; Chrome Browser</span>
              <span className="text-[#10b981] font-bold">● Active session</span>
            </div>
            <span className="text-[#8B909B] text-[10px] block">Current Device &bull; Pune, MH</span>
          </div>
        </div>

      </div>

      {/* 8. NOTIFICATION PREFERENCES & LANGUAGE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Notifications */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#4F8CFF]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">NOTIFICATIONS</h2>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { key: 'safety_alerts', label: 'Safety & Risk Radar Alerts' },
              { key: 'learning_reminders', label: 'Learning Reminders' },
              { key: 'security_updates', label: 'Security & System Updates' },
              { key: 'emergency_alerts', label: 'SOS Emergency Alerts' }
            ].map((item) => {
              const isChecked = profile.notifications[item.key as keyof UserProfile['notifications']];
              return (
                <div key={item.key} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                  <span className="text-white font-bold">{item.label}</span>
                  <button
                    onClick={() => handleToggleNotification(item.key as any)}
                    className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                      isChecked ? 'bg-[#10b981] text-white' : 'bg-white/[0.1] text-[#8B909B]'
                    }`}
                  >
                    {isChecked ? 'ON' : 'OFF'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Language & Preferences */}
        <div className="md:col-span-6 p-8 rounded-[32px] bg-[#111317] border border-white/[0.08] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#8B5CF6]" />
              <h2 className="text-lg font-bold text-white font-mono uppercase">LANGUAGE PREFERENCE</h2>
            </div>
          </div>

          <div className="flex gap-3 font-mono text-xs">
            {(['English', 'हिन्दी', 'मराठी'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setProfile(prev => ({ ...prev, language: lang }));
                }}
                className={`flex-1 py-3 rounded-2xl border transition-all ${
                  profile.language === lang
                    ? 'bg-[#4F8CFF] text-white font-bold border-[#4F8CFF]'
                    : 'bg-white/[0.02] border-white/[0.06] text-[#8B909B] hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 9. DANGER ZONE & DATA EXPORT */}
      <div className="p-8 rounded-[32px] bg-[#111317] border border-[#EF4444]/30 space-y-6 shadow-2xl font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <span className="text-xs font-bold text-[#EF4444] uppercase tracking-wider">DANGER ZONE &amp; DATA PRIVACY</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Export My Data</h4>
            <p className="text-[#8B909B] font-sans text-xs">Download a JSON copy of your safety profile and settings.</p>
          </div>

          <button
            onClick={handleExportData}
            className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.09] text-white font-bold hover:bg-white/[0.1] flex items-center gap-2 self-start sm:self-auto"
          >
            <Download className="h-4 w-4 text-[#4F8CFF]" /> Export Data
          </button>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#EF4444]">Delete Account</h4>
            <p className="text-[#8B909B] font-sans text-xs">Permanently remove profile data and reset local safety setup.</p>
          </div>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] font-bold hover:bg-[#EF4444] hover:text-white transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Trash2 className="h-4 w-4" /> Delete Account
          </button>
        </div>
      </div>

      {/* MODAL 1: EDIT PROFILE DRAWER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#111317] border border-white/[0.1] rounded-3xl p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-base font-bold text-white">Edit Personal Profile</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#8B909B] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#8B909B] uppercase font-bold">Preferred Language</label>
                <select
                  value={editLanguage}
                  onChange={(e) => setEditLanguage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#08090B] border border-white/[0.09] text-white focus:outline-none focus:border-[#4F8CFF]"
                >
                  <option value="English">English</option>
                  <option value="हिन्दी">हिन्दी</option>
                  <option value="मराठी">मराठी</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full py-3.5 rounded-xl bg-[#4F8CFF] text-white text-xs font-mono font-bold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#111317] border border-[#EF4444]/40 rounded-3xl p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-[#EF4444] font-bold uppercase">CONFIRM ACCOUNT DELETION</span>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-[#8B909B] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-[#8B909B] leading-relaxed">
              Type <strong className="text-white">DELETE</strong> below to confirm permanent removal of profile data.
            </p>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full p-3 rounded-xl bg-[#08090B] border border-[#EF4444]/40 text-white font-mono text-xs focus:outline-none"
            />

            <button
              disabled={deleteConfirmText !== 'DELETE'}
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className={`w-full py-3.5 rounded-xl text-xs font-mono font-bold transition-all ${
                deleteConfirmText === 'DELETE'
                  ? 'bg-[#EF4444] text-white hover:bg-[#dc2626]'
                  : 'bg-white/[0.06] text-[#8B909B] cursor-not-allowed'
              }`}
            >
              Permanently Delete Account
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
