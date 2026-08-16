import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  SearchCheck, 
  FolderKanban, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Clock,
  UserCheck,
  Plus,
  FileSearch,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Language = 'en' | 'hi' | 'mr';

export function Dashboard() {
  const { user } = useAuth();
  const [lang, setLang] = useState<Language>('en');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Real-time clock update timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const userName = user?.name ? user.name.split(' ')[0] : (user?.email ? user.email.split('@')[0] : 'User');
  const hour = currentTime.getHours();

  // Time-based salutation logic
  const getGreetingText = () => {
    if (hour >= 5 && hour < 12) {
      return { en: 'Good Morning', hi: 'सुप्रभात', mr: 'शुभ सकाळ' };
    } else if (hour >= 12 && hour < 17) {
      return { en: 'Good Afternoon', hi: 'शुभ दोपहर', mr: 'शुभ दुपार' };
    } else if (hour >= 17 && hour < 21) {
      return { en: 'Good Evening', hi: 'शुभ संध्या', mr: 'शुभ संध्याकाळ' };
    } else {
      return { en: 'Good Night', hi: 'शुभ रात्रि', mr: 'शुभ रात्री' };
    }
  };

  const currentSalutation = getGreetingText()[lang];

  // Localized Date Formatting (e.g. Friday • 7 August 2026)
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString(lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US', options);

  // Contextual Subtitles
  const contextSubtitles = {
    en: `Your recruitment scam investigation is ready. Your digital identity looks secure today with no active threat alerts.`,
    hi: `आपकी भर्ती घोटाले की जांच जारी रखने के लिए तैयार है। आपकी डिजिटल सुरक्षा आज सुरक्षित है।`,
    mr: `तुमची भरती घोटाळा तपासणी पुन्हा सुरू करण्यासाठी तयार आहे. आज तुमची डिजिटल सुरक्षा सुरक्षित आहे.`
  };

  // AI Daily Brief Bullet Points
  const dailyBriefBullets = {
    en: [
      'No suspicious activity detected in connected accounts.',
      `User account (${user?.email || 'active session'}) verified successfully.`,
      '3 new CERT-In cyber advisories added to AI Risk Radar.',
      'Last security scan completed 2 minutes ago.'
    ],
    hi: [
      'कनेक्ट किए गए खातों में कोई संदिग्ध गतिविधि नहीं पाई गई।',
      `उपयोगकर्ता खाता (${user?.email || 'सक्रिय सत्र'}) सफलतापूर्वक सत्यापित।`,
      'एआई रिस्क रडार में 3 नई CERT-In सलाहें जोड़ी गईं।',
      'अंतिम सुरक्षा स्कैन 2 मिनट पहले पूरा हुआ।'
    ],
    mr: [
      'कनेक्ट केलेल्या खात्यांमध्ये कोणतीही संशयास्पद क्रिया आढळली नाही.',
      `वापरकर्ता खाते (${user?.email || 'सक्रिय सत्र'}) यशस्वीरित्या सत्यापित.`,
      'एआय रिस्क रडारमध्ये ३ नवीन CERT-In सूचना जोडल्या.',
      'शेवटचे सुरक्षा स्कॅन २ मिनिटांपूर्वी पूर्ण झाले.'
    ]
  };

  // Mock active investigations
  const activeInvestigations = [
    {
      id: 'case-104',
      title: 'Dating App Solicitation & Impersonation',
      updated: '2 hours ago',
      evidenceCount: 3,
      status: 'Active Investigation',
      riskLevel: 'High'
    }
  ];

  // Security reminders
  const reminders = [
    {
      id: 1,
      title: 'WhatsApp Two-Step Verification',
      desc: 'Protect against SIM swap and unauthorized login attempts.',
      actionText: 'Review Passport',
      link: '/app/passport'
    },
    {
      id: 2,
      title: 'Verify Matrimony Contact',
      desc: 'Unverified profile requesting direct UPI transfer for emergency.',
      actionText: 'Verify Identity',
      link: '/app/verify'
    }
  ];

  // Recent activity feed
  const recentActivities = [
    { id: 'act-1', text: `Verified OAuth Session for ${user?.email || 'CyberSaheli User'}`, time: 'Today', status: 'Verified' },
    { id: 'act-[#]', text: `Security Audit Active for UID: ${user?.id || 'usr_active'}`, time: 'Today', status: 'Verified' },
    { id: 'act-3', text: 'Secured 3 items in Evidence Vault with SHA-256 Hashes', time: '2 days ago', status: 'Sealed' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans pb-16">
      
      {/* 🔮 APPLE-STYLE DYNAMIC HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12141c] via-[#171923] to-[#0f1017] p-8 border border-[rgba(255,255,255,0.08)] shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Date & Language Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#a78bfa] font-bold uppercase tracking-wider">
              {formattedDate}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" /> 🟢 Protected
            </span>
          </div>

          {/* 1-Click Multilingual Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0f1118] border border-[rgba(255,255,255,0.08)] font-mono text-[11px]">
            <Globe className="h-3.5 w-3.5 text-[#a78bfa] ml-1.5" />
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${lang === 'en' ? 'bg-[#7c3aed] text-white font-bold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-lg transition-all ${lang === 'hi' ? 'bg-[#7c3aed] text-white font-bold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('mr')}
              className={`px-2.5 py-1 rounded-lg transition-all ${lang === 'mr' ? 'bg-[#7c3aed] text-white font-bold' : 'text-[#94a3b8] hover:text-white'}`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Hero Greeting & Health Ring */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {currentSalutation}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#3b82f6]">{userName} 👋</span>
            </h1>
            <p className="text-sm text-[#94a3b8] max-w-xl leading-relaxed">
              {contextSubtitles[lang]}
            </p>
          </div>

          {/* Safety Health Ring */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0f1118]/80 border border-[rgba(255,255,255,0.08)] backdrop-blur-xl shrink-0">
            <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#10b981] p-1">
              <div className="flex items-center justify-center h-full w-full rounded-full bg-[#0f1118]">
                <span className="text-xl font-extrabold text-white font-mono">{user?.safetyScore || 92}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-[#94a3b8] font-medium block">Safety Health Score</span>
              <span className="text-sm font-bold text-[#10b981] flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="h-4 w-4" /> Strong Protection
              </span>
              <span className="text-[11px] text-[#64748b] block mt-0.5">Verified Profile Active</span>
            </div>
          </div>
        </div>

        {/* AI Daily Safety Briefing Box */}
        <div className="p-5 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#a78bfa] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#7c3aed]" /> Today's AI Safety Brief
            </span>
            <span className="text-[10px] font-mono text-[#64748b]">Live Sync</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#cbd5e1]">
            {dailyBriefBullets[lang].map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Actions Bar */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase text-[#94a3b8] font-bold tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          
          <Link 
            to="/app/investigate" 
            className="group p-4 rounded-2xl bg-[#151722] border border-[rgba(255,255,255,0.08)] hover:border-[#7c3aed]/50 hover:bg-[#1a1d2b] transition-all flex flex-col justify-between space-y-3"
          >
            <div className="p-2.5 rounded-xl bg-[#7c3aed]/15 text-[#a78bfa] w-fit">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#a78bfa] transition-colors">+ Start New Investigation</h3>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Conversational AI</p>
            </div>
          </Link>

          <Link 
            to="/app/verify" 
            className="group p-4 rounded-2xl bg-[#151722] border border-[rgba(255,255,255,0.08)] hover:border-[#3b82f6]/50 hover:bg-[#1a1d2b] transition-all flex flex-col justify-between space-y-3"
          >
            <div className="p-2.5 rounded-xl bg-[#3b82f6]/15 text-[#60a5fa] w-fit">
              <SearchCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#60a5fa] transition-colors">Verify a Profile</h3>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">Pre-trust identity check</p>
            </div>
          </Link>

          <Link 
            to="/app/investigate" 
            className="group p-4 rounded-2xl bg-[#151722] border border-[rgba(255,255,255,0.08)] hover:border-[#10b981]/50 hover:bg-[#1a1d2b] transition-all flex flex-col justify-between space-y-3"
          >
            <div className="p-2.5 rounded-xl bg-[#10b981]/15 text-[#10b981] w-fit">
              <FileSearch className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#10b981] transition-colors">Analyze a Screenshot</h3>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">OCR & Vision audit</p>
            </div>
          </Link>

          <Link 
            to="/app/vault" 
            className="group p-4 rounded-2xl bg-[#151722] border border-[rgba(255,255,255,0.08)] hover:border-[#a78bfa]/50 hover:bg-[#1a1d2b] transition-all flex flex-col justify-between space-y-3"
          >
            <div className="p-2.5 rounded-xl bg-[#a78bfa]/15 text-[#a78bfa] w-fit">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#a78bfa] transition-colors">Open Evidence Vault</h3>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">SHA-256 Storage</p>
            </div>
          </Link>

          <Link 
            to="/app/sos" 
            className="group p-4 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/20 hover:border-[#ef4444]/50 hover:bg-[#ef4444]/15 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="p-2.5 rounded-xl bg-[#ef4444]/20 text-[#ef4444] w-fit">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#ef4444] transition-colors">Emergency SOS</h3>
              <p className="text-[10px] text-[#fca5a5] mt-0.5">Instant lock & hotline</p>
            </div>
          </Link>

        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Active Investigations & Reminders */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Investigations */}
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-[#3b82f6]" />
                Active Investigations
              </h2>
              <Link to="/app/investigate" className="text-xs font-semibold text-[#3b82f6] hover:underline">
                Open Workspace &rarr;
              </Link>
            </div>

            {activeInvestigations.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl bg-[#1a1d2b] border border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30">
                      {inv.riskLevel} Risk
                    </span>
                    <span className="text-xs text-[#94a3b8] flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Updated {inv.updated}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{inv.title}</h3>
                  <p className="text-xs text-[#94a3b8]">{inv.evidenceCount} evidence files attached &bull; Multi-Agent Analysis Ready</p>
                </div>
                <Link
                  to="/app/investigate"
                  className="px-4 py-2 rounded-xl bg-[#7c3aed] text-white text-xs font-semibold hover:bg-[#6d28d9] transition-all text-center self-start sm:self-auto shrink-0"
                >
                  Resume Co-Investigator
                </Link>
              </div>
            ))}
          </div>

          {/* Security Reminders */}
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#a78bfa]" />
              Proactive Security Reminders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.map((rem) => (
                <div key={rem.id} className="p-4 rounded-2xl bg-[#171a27] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#a78bfa]" />
                      {rem.title}
                    </h4>
                    <p className="text-xs text-[#94a3b8] mt-1">{rem.desc}</p>
                  </div>
                  <Link
                    to={rem.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#a78bfa] hover:text-white transition-colors"
                  >
                    {rem.actionText} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Trusted Contacts & Recent Activity */}
        <div className="space-y-6">
          
          {/* Trusted Contacts */}
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[#10b981]" />
                Trusted Emergency Contacts
              </h2>
              <Link to="/app/profile" className="text-xs font-semibold text-[#10b981] hover:underline">
                Manage
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[#171a27] text-center border border-[rgba(255,255,255,0.04)] space-y-2">
              <p className="text-xs text-[#94a3b8]">No trusted contacts added yet.</p>
              <Link to="/app/profile" className="inline-block text-xs font-bold text-[#10b981] hover:underline">
                + Add Emergency Contact
              </Link>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="p-6 rounded-3xl bg-[#13151f] border border-[rgba(255,255,255,0.08)] space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#60a5fa]" />
              Recent Safety Activity
            </h2>

            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className="p-3 rounded-xl bg-[#171a27] border border-[rgba(255,255,255,0.04)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white font-medium">{act.text}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                    <span>{act.time}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1e2330] text-[#94a3b8]">
                      {act.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
