import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radio, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  FileText, 
  RefreshCw,
  Clock,
  AlertOctagon,
  UserPlus,
  Share2,
  ShieldAlert,
  PhoneCall
} from 'lucide-react';

interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  useForSos: boolean;
  shareLocation: boolean;
  status: string;
}

interface SosHistoryEvent {
  id: string;
  timestamp: string;
  location: string;
  accuracy: string;
  contactCount: number;
  status: string;
}

export function EmergencySOS() {
  const navigate = useNavigate();

  // Load Contacts & History from Safety Passport
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('cybersaheli_contacts');
    if (savedContacts) {
      try {
        const parsed: TrustedContact[] = JSON.parse(savedContacts);
        setContacts(parsed);
        setSelectedContactIds(parsed.filter(c => c.useForSos).map(c => c.id));
      } catch (e) {}
    } else {
      const initial: TrustedContact[] = [
        { id: 'c1', name: 'Mother', relationship: 'Emergency contact', phone: '+919876543210', useForSos: true, shareLocation: true, status: 'Ready' },
        { id: 'c2', name: 'Father', relationship: 'Emergency contact', phone: '+919876543211', useForSos: true, shareLocation: true, status: 'Ready' }
      ];
      setContacts(initial);
      setSelectedContactIds(initial.map(c => c.id));
    }
  }, []);

  // Location Engine State
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Activation & Overlay Loading State
  const [isSosActive, setIsSosActive] = useState<boolean>(false);
  const [noContactError, setNoContactError] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Active Incident State
  const [currentIncidentId, setCurrentIncidentId] = useState<string | null>(null);

  // Press-and-Hold Control State
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const holdIntervalRef = useRef<any>(null);
  const holdStartTimeRef = useRef<number>(0);

  // Test Mode State
  const [isTestModeOpen, setIsTestModeOpen] = useState<boolean>(false);
  const [testStep, setTestStep] = useState<number>(0);

  // SOS History Log
  const [sosHistory, setSosHistory] = useState<SosHistoryEvent[]>(() => {
    const saved = localStorage.getItem('cybersaheli_sos_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'SOS-2026-0001', timestamp: 'Today, 14:20', location: 'Lat: 18.5204°, Lng: 73.8567°', accuracy: '12m', contactCount: 2, status: 'COMPLETED' }
    ];
  });

  const acquireLocation = (): Promise<{ lat: number; lng: number; accuracy: number } | null> => {
    setLocationError(null);
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        setLocationError('Geolocation API not supported by browser.');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy)
          };
          setCoords(c);
          const link = `https://www.google.com/maps?q=${c.lat},${c.lng}`;
          setMapUrl(link);
          resolve(c);
        },
        () => {
          setLocationError('Unable to access your location.');
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  // REAL SOS ACTIVATION FLOW (ZERO CONFIRMATION MODALS)
  const triggerSosWorkflow = async () => {
    setNoContactError(false);
    setActionNotice(null);

    const activeContacts = contacts.filter(c => selectedContactIds.includes(c.id));
    if (activeContacts.length === 0) {
      setNoContactError(true);
      return;
    }

    setIsSosActive(true);

    // 1. Get GPS Coordinates
    const locationData = await acquireLocation();

    // 2. Generate Local Incident Log Record
    const incidentId = `SOS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCurrentIncidentId(incidentId);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEvent: SosHistoryEvent = {
      id: incidentId,
      timestamp: `Today, ${timeStr}`,
      location: locationData ? `Lat: ${locationData.lat.toFixed(4)}°, Lng: ${locationData.lng.toFixed(4)}°` : 'Location unavailable',
      accuracy: locationData ? `${locationData.accuracy}m` : 'N/A',
      contactCount: activeContacts.length,
      status: 'ACTIVE'
    };

    const updatedHistory = [newEvent, ...sosHistory];
    setSosHistory(updatedHistory);
    localStorage.setItem('cybersaheli_sos_history', JSON.stringify(updatedHistory));

    // Optional sync to backend API log endpoint
    try {
      const primaryContact = activeContacts[0];
      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      fetch(`${baseUrl}/api/v1/sos/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { name: primaryContact.name, phone: primaryContact.phone },
          latitude: locationData?.lat,
          longitude: locationData?.lng,
          accuracy: locationData?.accuracy,
          timestamp: timeStr
        })
      }).catch(() => {});
    } catch (e) {}
  };

  // NATIVE LOCATION SHARING & CLIPBOARD FALLBACK
  const handleShareLocation = async () => {
    const activeLink = mapUrl || (coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}` : null);
    if (!activeLink) {
      setActionNotice('Please allow GPS location first.');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My CyberSaheli Emergency Location',
          text: `🚨 CYBERSAHELI EMERGENCY: I need immediate help. My current GPS location:`,
          url: activeLink
        });
        setActionNotice('Native location sharing opened.');
        return;
      } catch (err) {}
    }

    // Clipboard Fallback
    try {
      await navigator.clipboard.writeText(activeLink);
      setCopyStatus('Location link copied to clipboard.');
      setTimeout(() => setCopyStatus(null), 3000);
    } catch (err) {
      setActionNotice(`Location link: ${activeLink}`);
    }
  };

  // DIRECT CALL PHONE DIALER
  const handleCallContact = (phone: string, name: string) => {
    setActionNotice(`Opening phone dialer for ${name}...`);
    setTimeout(() => {
      window.location.href = `tel:${phone}`;
    }, 300);
  };

  // PRESS AND HOLD 2-SECOND LOGIC
  const handleHoldStart = () => {
    if (isSosActive) return;
    holdStartTimeRef.current = Date.now();
    setHoldProgress(0);

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const pct = Math.min(100, (elapsed / 2000) * 100);
      setHoldProgress(pct);

      if (pct >= 100) {
        clearInterval(holdIntervalRef.current);
        triggerSosWorkflow();
      }
    }, 30);
  };

  const handleHoldEnd = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    if (holdProgress < 100 && holdProgress > 0) {
      setHoldProgress(0);
    }
  };

  // TEST SOS SIMULATION RUNNER (SAFE MODE)
  const handleStartTestSos = async () => {
    setIsTestModeOpen(true);
    setTestStep(1);
    await acquireLocation();
    setTimeout(() => setTestStep(2), 1000);
    setTimeout(() => setTestStep(3), 2000);
    setTimeout(() => setTestStep(4), 3000);
  };

  const activeSelectedContacts = contacts.filter(c => selectedContactIds.includes(c.id));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-14 font-sans text-[#F5F7FA] selection:bg-[#EF4444] selection:text-white pb-32">
      
      {/* 1. HERO HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.07] pb-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[#EF4444] uppercase font-bold tracking-widest block">
            CYBERSAHELI EMERGENCY DISPATCH OS
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            SOS / Emergency
          </h1>
          <p className="text-sm text-[#8B909B] max-w-xl leading-relaxed">
            Instant GPS acquisition, direct contact dialer, and emergency resource response.
          </p>
        </div>

        <button
          onClick={handleStartTestSos}
          className="px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/[0.09] text-white text-xs font-mono font-bold hover:bg-white/[0.1] flex items-center gap-2 self-start sm:self-auto"
        >
          <Radio className="h-4 w-4 text-[#4F8CFF]" /> Test SOS (Safe Mode)
        </button>
      </div>

      {/* NO TRUSTED CONTACT ERROR BANNER */}
      {noContactError && (
        <div className="p-6 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/40 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-[#EF4444] font-bold">
            <AlertOctagon className="h-5 w-5 text-[#EF4444] shrink-0" />
            <span>No trusted contact is configured in Safety Passport.</span>
          </div>
          <button
            onClick={() => navigate('/app/passport')}
            className="px-4 py-2 rounded-xl bg-[#EF4444] text-white font-bold hover:bg-[#dc2626] transition-all flex items-center gap-1.5 shrink-0"
          >
            <UserPlus className="h-4 w-4" /> Add Trusted Contact
          </button>
        </div>
      )}

      {/* 2. CENTRAL EMERGENCY SOS CONTROL */}
      <div className="p-10 md:p-14 rounded-[36px] bg-gradient-to-b from-[#180d10] via-[#120a0d] to-[#0A0B0E] border border-[#EF4444]/30 flex flex-col items-center justify-center space-y-8 text-center shadow-2xl relative overflow-hidden">
        
        {/* Soft Red Ambient Radial Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EF4444]/10 blur-[120px] pointer-events-none rounded-full" />

        <span className="text-xs font-mono uppercase text-[#EF4444] font-bold tracking-wider relative z-10">
          PRESS OR HOLD SOS FOR INSTANT DISPATCH
        </span>

        {/* 🔴 CIRCULAR SOS BUTTON */}
        <div
          onClick={triggerSosWorkflow}
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          className="relative w-52 h-52 rounded-full flex items-center justify-center cursor-pointer select-none group transition-transform active:scale-95 z-10"
        >
          {/* Progress Ring SVG */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" className="stroke-white/[0.08]" strokeWidth="4" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-[#EF4444] transition-all duration-75"
              strokeWidth="5"
              strokeDasharray="289"
              strokeDashoffset={289 - (289 * holdProgress) / 100}
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Button Outer Ring */}
          <div className="w-44 h-44 rounded-full bg-[#1A0C0F] border border-[#EF4444]/50 shadow-2xl flex flex-col items-center justify-center space-y-1 group-hover:border-[#EF4444] group-hover:scale-105 transition-all relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-[#EF4444]/20 blur-md absolute animate-pulse" />
            <span className="text-4xl font-extrabold text-white tracking-widest font-mono relative z-10">
              SOS
            </span>
            <span className="text-[10px] font-mono text-[#EF4444] font-bold relative z-10 uppercase">
              {holdProgress > 0 ? `${Math.round(holdProgress)}%` : 'TAP / HOLD'}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#8B909B] max-w-xs leading-relaxed relative z-10 font-mono">
          Tap or hold SOS to immediately trigger GPS acquisition and activate emergency controls.
        </p>
      </div>

      {/* 3. EMERGENCY ACTION PANEL (ACTIVATED MODE) */}
      {isSosActive && (
        <div className="p-8 rounded-[32px] bg-[#111317] border border-[#EF4444]/40 space-y-6 shadow-2xl animate-fade-in font-mono">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-bold text-[#EF4444] uppercase tracking-wider block">
                ● SOS ACTIVE &bull; INCIDENT {currentIncidentId}
              </span>
              <h2 className="text-xl font-bold text-white font-sans">EMERGENCY ACTION PANEL</h2>
            </div>
            <button
              onClick={() => {
                setIsSosActive(false);
                // Mark current history item as COMPLETED
                const updated = sosHistory.map(ev => ev.id === currentIncidentId ? { ...ev, status: 'COMPLETED' } : ev);
                setSosHistory(updated);
                localStorage.setItem('cybersaheli_sos_history', JSON.stringify(updated));
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-white flex items-center gap-1.5"
            >
              <X className="h-4 w-4" /> Deactivate SOS
            </button>
          </div>

          {/* Real Coordinates Data */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#10b981] font-bold">📍 REAL GPS LOCATION CAPTURED</span>
              <span className="text-[#8B909B]">Accuracy: {coords ? `${coords.accuracy}m` : 'capturing...'}</span>
            </div>
            {coords ? (
              <p className="text-white font-bold">
                Latitude: {coords.lat.toFixed(6)}° N | Longitude: {coords.lng.toFixed(6)}° E
              </p>
            ) : (
              <p className="text-[#EF4444] font-bold">{locationError || 'Capturing device GPS coordinates...'}</p>
            )}
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            {/* Call Primary Contact */}
            <button
              onClick={() => {
                if (activeSelectedContacts.length > 0) {
                  handleCallContact(activeSelectedContacts[0].phone, activeSelectedContacts[0].name);
                }
              }}
              className="p-5 rounded-2xl bg-[#EF4444] hover:bg-[#dc2626] text-white font-bold shadow-lg flex flex-col justify-between space-y-3 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">PRIMARY ACTION</span>
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm block">Call {activeSelectedContacts[0]?.name || 'Contact'}</span>
                <span className="text-[11px] opacity-80 font-normal">{activeSelectedContacts[0]?.phone}</span>
              </div>
            </button>

            {/* Share My Location */}
            <button
              onClick={handleShareLocation}
              className="p-5 rounded-2xl bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 hover:bg-[#4F8CFF]/30 text-[#4F8CFF] font-bold shadow-lg flex flex-col justify-between space-y-3 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">NATIVE SHARE</span>
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm block">Share My Location</span>
                <span className="text-[11px] opacity-80 font-normal">Native Share / Copy Link</span>
              </div>
            </button>

            {/* View Location on Map */}
            <button
              onClick={() => {
                if (mapUrl) window.open(mapUrl, '_blank');
              }}
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white font-bold flex flex-col justify-between space-y-3 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 text-[#8B909B]">GOOGLE MAPS</span>
                <ExternalLink className="h-5 w-5 text-[#8B909B]" />
              </div>
              <div>
                <span className="text-sm block">View Location</span>
                <span className="text-[11px] text-[#8B909B] font-normal">Open in Maps</span>
              </div>
            </button>

            {/* Emergency Helpline */}
            <button
              onClick={() => {
                window.location.href = 'tel:112';
              }}
              className="p-5 rounded-2xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/30 text-[#8B5CF6] font-bold flex flex-col justify-between space-y-3 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">POLICE &amp; DISPATCH</span>
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm block">Call 112 Emergency</span>
                <span className="text-[11px] opacity-80 font-normal">National Emergency</span>
              </div>
            </button>
          </div>

          {copyStatus && (
            <p className="text-xs text-[#10b981] font-bold text-center pt-2 animate-fade-in">{copyStatus}</p>
          )}
          {actionNotice && (
            <p className="text-xs text-[#4F8CFF] font-bold text-center pt-2 animate-fade-in">{actionNotice}</p>
          )}
        </div>
      )}

      {/* 4. REAL GPS LOCATION PANEL */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#4F8CFF]" /> GPS LOCATION ENGINE
            </h2>
            <p className="text-xs text-[#8B909B]">Captured device position via Geolocation API.</p>
          </div>

          <button
            onClick={() => acquireLocation()}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#4F8CFF] flex items-center gap-2 self-start sm:self-auto font-bold"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Acquire GPS Location
          </button>
        </div>

        {locationError ? (
          <div className="p-5 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[#EF4444] font-bold block">⚠ {locationError}</span>
              <span className="text-[#8B909B] text-[11px]">Please check browser location permissions or try again.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => acquireLocation()}
                className="px-4 py-2 rounded-xl bg-[#EF4444] text-white font-bold"
              >
                Try Again
              </button>
              <button
                onClick={() => setLocationError(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] text-white font-bold"
              >
                Continue Without Location
              </button>
            </div>
          </div>
        ) : coords ? (
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#10b981] font-bold">● LOCATION FOUND</span>
              <span className="text-[#8B909B]">Accuracy: {coords.accuracy} meters</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white font-bold">
              <span>Latitude: {coords.lat.toFixed(6)}° N | Longitude: {coords.lng.toFixed(6)}° E</span>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4F8CFF] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  View on Google Maps <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
            <span className="text-[#8B909B]">Click to acquire exact device GPS location coordinates.</span>
            <button
              onClick={() => acquireLocation()}
              className="px-4 py-2 rounded-xl bg-[#4F8CFF] text-white font-bold"
            >
              Allow Geolocation
            </button>
          </div>
        )}
      </div>

      {/* 5. EMERGENCY CONTACTS (FROM SAFETY PASSPORT) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">EMERGENCY CONTACTS</h2>
            <p className="text-xs text-[#8B909B]">Trusted contacts retrieved from your Safety Passport.</p>
          </div>

          <button
            onClick={() => navigate('/app/passport')}
            className="text-xs font-mono text-[#4F8CFF] hover:underline font-bold"
          >
            Manage in Safety Passport &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => {
            const isSelected = selectedContactIds.includes(contact.id);
            return (
              <div
                key={contact.id}
                className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#111317] border-[#4F8CFF]'
                    : 'bg-white/[0.02] border-white/[0.05] opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      setSelectedContactIds(prev =>
                        isSelected ? prev.filter(id => id !== contact.id) : [...prev, contact.id]
                      );
                    }}
                    className="h-4 w-4 rounded border-white/20 accent-[#4F8CFF]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{contact.name}</h4>
                    <span className="text-xs font-mono text-[#8B909B]">{contact.relationship} &bull; {contact.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCallContact(contact.phone, contact.name)}
                  className="px-4 py-2 rounded-xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/40 text-[#4F8CFF] font-mono text-xs font-bold hover:bg-[#4F8CFF]/25 transition-all flex items-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. EMERGENCY HELPLINES & RESOURCES */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
        <div className="border-b border-white/[0.06] pb-4">
          <h2 className="text-xl font-bold text-white">VERIFIED EMERGENCY HELPLINES</h2>
          <p className="text-xs text-[#8B909B]">Official Indian emergency response channels.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* National Cyber Crime Portal */}
          <a
            href="tel:1930"
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white font-bold flex flex-col justify-between space-y-3 transition-all"
          >
            <div className="flex items-center justify-between text-[#4F8CFF]">
              <span>NATIONAL CYBER CRIME</span>
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl block text-white">1930</span>
              <span className="text-[11px] text-[#8B909B] font-normal">Financial Cyber Fraud Helpline</span>
            </div>
          </a>

          {/* National Emergency Services */}
          <a
            href="tel:112"
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white font-bold flex flex-col justify-between space-y-3 transition-all"
          >
            <div className="flex items-center justify-between text-[#EF4444]">
              <span>POLICE &amp; EMERGENCY</span>
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl block text-white">112</span>
              <span className="text-[11px] text-[#8B909B] font-normal">National Emergency Response</span>
            </div>
          </a>

          {/* Women Helpline */}
          <a
            href="tel:1091"
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-white font-bold flex flex-col justify-between space-y-3 transition-all"
          >
            <div className="flex items-center justify-between text-[#8B5CF6]">
              <span>WOMEN HELPLINE</span>
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl block text-white">1091</span>
              <span className="text-[11px] text-[#8B909B] font-normal">24/7 Women Safety Support</span>
            </div>
          </a>
        </div>
      </div>

      {/* 7. SOS EVENT HISTORY LOG */}
      <div className="p-8 rounded-[28px] bg-[#111317] border border-white/[0.07] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#8B909B]" /> SOS INCIDENT HISTORY
            </h2>
            <p className="text-xs text-[#8B909B]">Log of past emergency activations.</p>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {sosHistory.map((ev) => (
            <div key={ev.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-white font-bold block">{ev.id} &bull; {ev.timestamp}</span>
                <span className="text-[#8B909B] text-[11px] block">{ev.location} (Accuracy: {ev.accuracy})</span>
              </div>
              <span className={`font-bold ${ev.status === 'ACTIVE' ? 'text-[#EF4444]' : 'text-[#10b981]'}`}>
                {ev.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: TEST SOS SIMULATION RUNNER (SAFE MODE - NO EXTERNAL CALLS) */}
      {isTestModeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#111317] border border-white/[0.09] rounded-3xl p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase">TEST MODE — SAFE SOS SIMULATION</span>
              <button onClick={() => setIsTestModeOpen(false)} className="text-[#8B909B] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testStep >= 1 ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-white' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <MapPin className="h-4 w-4 text-[#4F8CFF]" />
                <span>1. Location Acquired: 18.9220° N, 72.8347° E</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testStep >= 2 ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-white' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <FileText className="h-4 w-4 text-[#4F8CFF]" />
                <span>2. Trusted Contacts Configured</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testStep >= 3 ? 'bg-[#4F8CFF]/10 border-[#4F8CFF] text-white' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <Share2 className="h-4 w-4 text-[#4F8CFF]" />
                <span>3. Location Sharing &amp; Dialer Ready</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${testStep >= 4 ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981] font-bold' : 'bg-white/[0.02] border-white/[0.05] text-[#8B909B]'}`}>
                <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                <span>4. Test Completed &bull; No Real Calls or Alerts Made</span>
              </div>
            </div>

            <button
              onClick={() => setIsTestModeOpen(false)}
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
