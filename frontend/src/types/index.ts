export type RiskLevel = 'safe' | 'low' | 'warning' | 'danger' | 'critical';

export interface ThreatScan {
  id: string;
  type: 'image' | 'text' | 'url' | 'email' | 'qr' | 'pdf';
  riskScore: number; // 0 - 100
  threatType: string; // e.g. "UPI Scam", "Job Scam", "Romance Scam", "Harassment", "Deepfake"
  confidence: number;
  severity: RiskLevel;
  redFlags: string[];
  explanation: string;
  recommendation: string;
  evidenceSaved: boolean;
  createdAt: string;
  previewText?: string;
  fileUrl?: string;
}

export interface BackgroundCheckResult {
  target: string;
  platform: 'Instagram' | 'LinkedIn' | 'Twitter/X' | 'Telegram' | 'Facebook' | 'Email/Phone';
  trustScore: number; // 0 - 100
  isFakeProfile: boolean;
  accountAgeEstimate: string;
  botFollowerLikelihood: number;
  isAvatarCopied: boolean;
  redFlags: string[];
  positiveSignals: string[];
  explanation: string;
  recommendation: string;
  checkedAt: string;
}

export interface DeepfakeScanResult {
  mediaName: string;
  mediaType: 'photo' | 'video' | 'audio';
  authenticityScore: number; // 0 - 100
  isManipulated: boolean;
  confidence: number;
  artifactsDetected: string[];
  facialBoundaryHeatmapScore: number;
  voiceSynthesisMatch: number;
  explanation: string;
  scannedAt: string;
}

export interface DMAnalysisResult {
  chatPlatform: 'WhatsApp' | 'Instagram' | 'Telegram' | 'SMS' | 'Messenger';
  threatLevel: RiskLevel;
  manipulationScore: number;
  detectedTactic: string; // e.g., "Sextortion / Blackmail", "Financial Urgency", "Grooming"
  dangerLines: { text: string; lineNo: number; reason: string }[];
  emotionalAbuseRating: 'Low' | 'Moderate' | 'High' | 'Severe';
  suggestedReply: string;
  safetyAdvice: string;
}

export interface SafeLinkResult {
  url: string;
  status: RiskLevel;
  domainAgeDays: number;
  isTyposquatting: boolean;
  sslValid: boolean;
  redirectHops: number;
  phishingScore: number;
  threatDetails: string[];
  recommendation: string;
}

export interface JobVerificationResult {
  companyName: string;
  offerType: 'Appointment Letter' | 'Freelance Project' | 'Work From Home' | 'Loan Offer';
  isLegitimate: boolean;
  riskScore: number;
  domainMatch: boolean;
  upfrontPaymentRequested: boolean;
  scamKeywordsFound: string[];
  verifiedDomain: string;
  recommendation: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: 'Scam' | 'Harassment' | 'Deepfake' | 'Phishing' | 'Stalking' | 'Other';
  threatLevel: RiskLevel;
  source: string;
  description: string;
  timestamp: string;
  encryptionHash: string;
  tags: string[];
  fileAttachment?: string;
  isArchived: boolean;
}

export interface CyberComplaint {
  id: string;
  incidentType: string;
  complainantName: string;
  contactNumber: string;
  email: string;
  suspectDetails: string;
  incidentDate: string;
  description: string;
  relevantSections: string[]; // e.g. "IT Act Sec 66D", "IPC 354D Stalking"
  evidenceIds: string[];
  status: 'Draft' | 'Generated' | 'Submitted' | 'Archived';
  pdfUrl?: string;
  createdAt: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  isEmergencyAlertActive: boolean;
}

export interface SecurityAchievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  platformRole?: string;
  profileStatus?: string;
  safetyScore: number; // 0 - 100
  streakDays: number;
  totalScans: number;
  threatsPrevented: number;
  evidenceSavedCount: number;
  avatarUrl?: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalScansToday: number;
  threatsBlocked: number;
  activeComplaints: number;
  threatDistribution: { category: string; count: number }[];
  modelAccuracy: { modelName: string; accuracy: number }[];
  dailyScanTrends: { date: string; scans: number; threats: number }[];
}
