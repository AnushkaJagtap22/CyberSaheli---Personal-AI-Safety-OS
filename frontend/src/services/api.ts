import type {
  ThreatScan,
  BackgroundCheckResult,
  DeepfakeScanResult,
  DMAnalysisResult,
  SafeLinkResult,
  JobVerificationResult,
  EvidenceItem,
  CyberComplaint,
  TrustedContact,
  UserProfile,
  AdminAnalytics,
  SecurityAchievement
} from '../types';

// Seed user data for Anushka Jagtap
const MOCK_USER: UserProfile = {
  id: 'usr_saheli_001',
  name: 'Anushka Jagtap',
  email: 'anushka.jagtap@cybersaheli.org',
  role: 'Student | AI & Cybersecurity Enthusiast',
  platformRole: 'Primary User',
  profileStatus: 'Verified User',
  safetyScore: 92,
  streakDays: 14,
  totalScans: 42,
  threatsPrevented: 9,
  evidenceSavedCount: 3,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

let mockEvidenceStore: EvidenceItem[] = [
  {
    id: 'ev_001',
    title: 'WhatsApp_Chat_Export_Extortion.txt',
    category: 'Scam',
    threatLevel: 'danger',
    source: 'WhatsApp DM',
    description: 'User requested urgent money transfer under guise of recruitment clearance tax.',
    timestamp: '2026-08-05T14:32:00Z',
    encryptionHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    tags: ['JobScam', 'Extortion', 'WhatsApp'],
    isArchived: false,
  },
  {
    id: 'ev_002',
    title: 'UPI_Payment_Receipt_5000.png',
    category: 'Phishing',
    threatLevel: 'critical',
    source: 'UPI Transfer',
    description: 'Bank transaction proof sent to solicit@okaxis.',
    timestamp: '2026-08-05T09:15:00Z',
    encryptionHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    tags: ['PaymentProof', 'UPI'],
    isArchived: false,
  },
  {
    id: 'ev_003',
    title: 'Instagram_Impersonation_Profile_Screenshot.png',
    category: 'Harassment',
    threatLevel: 'warning',
    source: 'Instagram Profile',
    description: 'Fake profile claiming to represent recruitment agency.',
    timestamp: '2026-08-02T11:20:00Z',
    encryptionHash: 'c701b2a3f789d2e1b4567890abcdef1234567890abcdef1234567890abcdef12',
    tags: ['Impersonation', 'Screenshot'],
    isArchived: false,
  }
];

let mockComplaintsStore: CyberComplaint[] = [
  {
    id: 'cmp_1001',
    incidentType: 'Financial Fraud & Online Job Impersonation',
    complainantName: 'Anushka Jagtap',
    contactNumber: '+91 98765 43210',
    email: 'anushka.jagtap@cybersaheli.org',
    suspectDetails: 'UPI: solicit@okaxis, Domain: hr-amazon-jobs.top',
    incidentDate: '2026-08-05',
    description: 'The suspect approached via WhatsApp claiming to be an Amazon HR manager. Demanded Rs 5,000 payment via UPI ID solicit@okaxis.',
    relevantSections: ['IT Act 2000 Section 66D', 'BNS 2023 Section 318'],
    evidenceIds: ['ev_001', 'ev_002'],
    status: 'Generated',
    createdAt: '2026-08-05T10:00:00Z',
  }
];

let mockContactsStore: TrustedContact[] = [];

export const achievementsData: SecurityAchievement[] = [
  { id: 'ach_1', title: 'Shield Initiate', description: 'Ran your first AI threat scan', iconName: 'ShieldCheck', isUnlocked: true, unlockedAt: '2026-07-28' },
  { id: 'ach_2', title: 'Scam Buster', description: 'Prevented 5+ financial phishing attempts', iconName: 'Zap', isUnlocked: true, unlockedAt: '2026-08-02' },
  { id: 'ach_3', title: 'Deepfake Detective', description: 'Analyzed synthetic audio/video media', iconName: 'Eye', isUnlocked: true, unlockedAt: '2026-08-04' },
  { id: 'ach_4', title: 'Guardian Angel', description: 'Configured trusted emergency contacts', iconName: 'Users', isUnlocked: true, unlockedAt: '2026-08-05' },
  { id: 'ach_5', title: 'Fortress Vault', description: 'Archived encrypted cyber evidence items', iconName: 'Lock', isUnlocked: true, unlockedAt: '2026-08-06' },
  { id: 'ach_6', title: 'Cyber Defender', description: 'Achieve a 30-day continuous safety streak', iconName: 'Award', isUnlocked: false },
];

export const api = {
  // Auth
  async getCurrentUser(): Promise<UserProfile> {
    return MOCK_USER;
  },

  // Threat Scanner
  async scanThreat(input: { type: string; content: string; file?: File }): Promise<ThreatScan> {
    await new Promise((r) => setTimeout(r, 1200));
    const contentLower = (input.content || input.file?.name || '').toLowerCase();
    const isHighRisk =
      contentLower.includes('upi') ||
      contentLower.includes('otp') ||
      contentLower.includes('urgent') ||
      contentLower.includes('money') ||
      contentLower.includes('solicit');

    const result: ThreatScan = {
      id: `scan_${Date.now()}`,
      type: (input.type as any) || 'text',
      riskScore: isHighRisk ? 92 : 14,
      threatType: isHighRisk ? 'Financial Phishing & Social Engineering' : 'Safe Content',
      confidence: isHighRisk ? 96.4 : 98.1,
      severity: isHighRisk ? 'danger' : 'safe',
      redFlags: isHighRisk
        ? [
            'Asks for immediate financial transfer via unverified channel',
            'Creates psychological urgency ("act within 15 minutes")',
            'Domain / UPI address lacks official verification status',
            'Contains suspicious keyword patterns matched in CyberSaheli database'
          ]
        : [],
      explanation: isHighRisk
        ? 'Saheli AI detected multi-vector phishing indicators. The content leverages panic emotion paired with direct financial requests.'
        : 'Analysis completed. No malicious links, credential harvesters, or scam patterns were detected.',
      recommendation: isHighRisk
        ? 'DO NOT click links or transfer funds. Block the sender immediately and save screenshot to Evidence Vault.'
        : 'Content appears authentic and safe to open.',
      evidenceSaved: isHighRisk,
      createdAt: new Date().toISOString(),
      previewText: input.content.slice(0, 120),
    };

    if (isHighRisk) {
      mockEvidenceStore.unshift({
        id: `ev_${Date.now()}`,
        title: `Threat Scan #${result.id.slice(-4)}`,
        category: 'Scam',
        threatLevel: 'danger',
        source: 'AI Threat Scanner',
        description: input.content || 'Scanned file threat instance',
        timestamp: new Date().toISOString(),
        encryptionHash: `hash_${Math.random().toString(36).substring(2, 12)}`,
        tags: ['ScamScan', 'AutoSaved'],
        isArchived: false,
      });
    }

    return result;
  },

  // Background Check AI
  async backgroundCheck(target: string, platform: string): Promise<BackgroundCheckResult> {
    await new Promise((r) => setTimeout(r, 1500));
    const isFake = target.toLowerCase().includes('fake') || target.toLowerCase().includes('bot') || target.length < 5;

    return {
      target,
      platform: platform as any,
      trustScore: isFake ? 28 : 86,
      isFakeProfile: isFake,
      accountAgeEstimate: isFake ? 'Created 12 days ago' : 'Created 3+ years ago',
      botFollowerLikelihood: isFake ? 84 : 12,
      isAvatarCopied: isFake,
      redFlags: isFake
        ? [
            'Display picture reverse search matches a stock model image',
            'High ratio of bot followers with 0 posts',
            'Bio contains suspicious crypto investment links'
          ]
        : ['Slightly low post engagement relative to follower count'],
      positiveSignals: isFake
        ? []
        : [
            'Linked external official LinkedIn handle verified',
            'Consistent posting activity over 24 months'
          ],
      explanation: isFake
        ? 'Saheli AI multi-point audit indicates high probability of an impersonation bot profile.'
        : 'Profile exhibits healthy organic activity patterns and consistent online digital footprint.',
      recommendation: isFake
        ? 'Exercise extreme caution. Do not share personal phone numbers, home address, or money.'
        : 'Profile appears legitimate for standard interaction.',
      checkedAt: new Date().toISOString(),
    };
  },

  // Deepfake Detector
  async analyzeDeepfake(mediaName: string, mediaType: 'photo' | 'video' | 'audio'): Promise<DeepfakeScanResult> {
    await new Promise((r) => setTimeout(r, 1800));
    const isSynthetic = mediaName.toLowerCase().includes('clone') || mediaName.toLowerCase().includes('fake');

    return {
      mediaName,
      mediaType,
      authenticityScore: isSynthetic ? 18 : 94,
      isManipulated: isSynthetic,
      confidence: 97.2,
      artifactsDetected: isSynthetic
        ? [
            'Spectral voice warping above 4kHz frequency band',
            'Inconsistent temporal eye blinking cadence'
          ]
        : [],
      facialBoundaryHeatmapScore: isSynthetic ? 88.4 : 5.1,
      voiceSynthesisMatch: isSynthetic ? 92.6 : 8.2,
      explanation: isSynthetic
        ? 'Neural network frequency inspection detected neural text-to-speech audio synthesis.'
        : 'Media exhibits organic camera noise and natural biometric consistency.',
      scannedAt: new Date().toISOString(),
    };
  },

  // DM Guardian
  async analyzeDM(chatText: string, chatPlatform: string): Promise<DMAnalysisResult> {
    await new Promise((r) => setTimeout(r, 1100));
    const lower = chatText.toLowerCase();
    const isAbusive = lower.includes('photo') || lower.includes('viral') || lower.includes('pay');

    return {
      chatPlatform: chatPlatform as any,
      threatLevel: isAbusive ? 'critical' : 'safe',
      manipulationScore: isAbusive ? 94 : 12,
      detectedTactic: isAbusive ? 'Blackmail / Cyber Sextortion & Coercion' : 'Casual Conversation',
      dangerLines: isAbusive
        ? [{ text: 'Send money right now', lineNo: 3, reason: 'Explicit blackmail threat' }]
        : [],
      emotionalAbuseRating: isAbusive ? 'Severe' : 'Low',
      suggestedReply: isAbusive
        ? '"I have logged this conversation and reported your account to National Cyber Crime Portal."'
        : '"Thanks for reaching out!"',
      safetyAdvice: isAbusive
        ? 'Do NOT comply with extortion demands. Tap "Save to Evidence Vault" immediately.'
        : 'No hostile speech detected.',
    };
  },

  // Safe Link Scanner
  async scanLink(url: string): Promise<SafeLinkResult> {
    await new Promise((r) => setTimeout(r, 900));
    const isSuspicious = url.includes('deal') || url.includes('free') || !url.startsWith('https');

    return {
      url,
      status: isSuspicious ? 'danger' : 'safe',
      domainAgeDays: isSuspicious ? 4 : 1420,
      isTyposquatting: isSuspicious,
      sslValid: !isSuspicious,
      redirectHops: isSuspicious ? 3 : 1,
      phishingScore: isSuspicious ? 91 : 4,
      threatDetails: isSuspicious
        ? ['Domain registered 4 days ago', 'Typosquatting brand name mimicry']
        : [],
      recommendation: isSuspicious
        ? 'Dangerous phishing URL! Do not input credentials.'
        : 'Link domain is safe and verified.',
    };
  },

  // Job Offer Verifier
  async verifyJob(input: { company: string; details: string }): Promise<JobVerificationResult> {
    await new Promise((r) => setTimeout(r, 1300));
    const lower = (input.company + ' ' + input.details).toLowerCase();
    const isScam = lower.includes('fee') || lower.includes('registration') || lower.includes('part time');

    return {
      companyName: input.company || 'Global Tech Solutions',
      offerType: 'Appointment Letter',
      isLegitimate: !isScam,
      riskScore: isScam ? 89 : 11,
      domainMatch: !isScam,
      upfrontPaymentRequested: isScam,
      scamKeywordsFound: isScam ? ['Registration Fee required'] : [],
      verifiedDomain: isScam ? 'unverified-portal.info' : 'officialcompany.com',
      recommendation: isScam
        ? 'Fake Job Offer Scam! Employers NEVER demand registration fees.'
        : 'Offer details align with standard protocols.',
    };
  },

  // Evidence Vault
  async getEvidence(): Promise<EvidenceItem[]> {
    return [...mockEvidenceStore];
  },

  async addEvidence(item: Omit<EvidenceItem, 'id' | 'timestamp' | 'encryptionHash'>): Promise<EvidenceItem> {
    const newItem: EvidenceItem = {
      ...item,
      id: `ev_${Date.now()}`,
      timestamp: new Date().toISOString(),
      encryptionHash: `sha256_${Math.random().toString(36).substring(2, 16)}`,
    };
    mockEvidenceStore.unshift(newItem);
    return newItem;
  },

  async deleteEvidence(id: string): Promise<void> {
    mockEvidenceStore = mockEvidenceStore.filter((e) => e.id !== id);
  },

  // Complaints
  async getComplaints(): Promise<CyberComplaint[]> {
    return [...mockComplaintsStore];
  },

  async createComplaint(data: Omit<CyberComplaint, 'id' | 'createdAt' | 'status'>): Promise<CyberComplaint> {
    const newComplaint: CyberComplaint = {
      ...data,
      id: `cmp_${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Generated',
    };
    mockComplaintsStore.unshift(newComplaint);
    return newComplaint;
  },

  // Trusted Contacts
  async getContacts(): Promise<TrustedContact[]> {
    return [...mockContactsStore];
  },

  async addContact(contact: Omit<TrustedContact, 'id'>): Promise<TrustedContact> {
    const newC: TrustedContact = {
      ...contact,
      id: `ct_${Date.now()}`,
    };
    mockContactsStore.push(newC);
    return newC;
  },

  async deleteContact(id: string): Promise<void> {
    mockContactsStore = mockContactsStore.filter((c) => c.id !== id);
  },

  async sendSOSAlert(locationSim: string): Promise<{ success: boolean; alertMessage: string; timestamp: string }> {
    await new Promise((r) => setTimeout(r, 800));
    return {
      success: true,
      alertMessage: `[EMERGENCY SOS] CyberSaheli Alert triggered from Lat: 19.0760, Long: 72.8777 (${locationSim}).`,
      timestamp: new Date().toISOString(),
    };
  },

  // Admin
  async getAdminAnalytics(): Promise<AdminAnalytics> {
    return {
      totalUsers: 12480,
      totalScansToday: 1842,
      threatsBlocked: 319,
      activeComplaints: 48,
      threatDistribution: [
        { category: 'Financial Phishing & UPI', count: 42 },
        { category: 'Romance & Profile Impersonation', count: 28 },
        { category: 'Cyber Blackmail & Sextortion', count: 18 },
        { category: 'Deepfake Audio/Video', count: 12 },
      ],
      modelAccuracy: [
        { modelName: 'Saheli-Text-NLP-v2', accuracy: 98.4 },
        { modelName: 'Saheli-Deepfake-Vision', accuracy: 96.1 },
        { modelName: 'Saheli-Profile-Audit-Engine', accuracy: 95.8 },
      ],
      dailyScanTrends: [
        { date: 'Mon', scans: 1200, threats: 180 },
        { date: 'Tue', scans: 1450, threats: 210 },
        { date: 'Wed', scans: 1600, threats: 240 },
        { date: 'Thu', scans: 1842, threats: 319 },
      ],
    };
  },
};
