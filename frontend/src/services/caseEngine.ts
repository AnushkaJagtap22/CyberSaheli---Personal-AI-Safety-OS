import type { ExtractedEntity, EntityRelationship } from './agentOrchestrator';
import { runAgenticInvestigation } from './agentOrchestrator';

export interface CaseDiaryEntry {
  id: string;
  timestamp: string;
  action: string;
  agentName: string;
}

export interface MemoryVaultNote {
  id: string;
  timestamp: string;
  note: string;
}

export interface RecoveryStep {
  id: string;
  step: string;
  completed: boolean;
}

export interface VerificationTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  confidenceGain: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  completed: boolean;
}

export interface CaseHealth {
  evidenceQuality: 'High' | 'Medium' | 'Low';
  timelineStatus: 'Complete' | 'In Progress' | 'Missing Items';
  identityVerification: 'Verified' | 'Pending' | 'High Risk';
  mediaAnalysis: 'Complete' | 'Pending';
  overallHealthScore: number;
}

export interface MissingEvidenceItem {
  item: string;
  whyItMatters: string;
}

export interface EvidenceCompleteness {
  completenessPercentage: number;
  collected: string[];
  missing: MissingEvidenceItem[];
}

export interface CyberCase {
  id: string;
  title: string;
  category: string;
  riskScore: number;
  openedAt: string;
  status: 'active' | 'sealed';
  commandSummary: string;
  entities: ExtractedEntity[];
  relationships: EntityRelationship[];
  diary: CaseDiaryEntry[];
  vaultNotes: MemoryVaultNote[];
  recoverySteps: RecoveryStep[];
  verificationTasks: VerificationTask[];
  caseHealth: CaseHealth;
  completeness: EvidenceCompleteness;
}

const defaultCases: CyberCase[] = [
  {
    id: 'case-9814',
    title: 'Fake Internship Offer & Extortion Demand',
    category: 'Employment Phishing & Extortion',
    riskScore: 94,
    openedAt: '2026-08-04 14:32:00',
    status: 'active',
    commandSummary: 'Suspect requested Rs 4,999 WFH laptop fee via unverified UPI handle solicit@okaxis and high-risk domain .top.',
    entities: [
      { id: 'e1', type: 'handle', label: '@amazon_wfh_recruiter', riskScore: 85 },
      { id: 'e2', type: 'email', label: 'hr@amazon-jobs.top', riskScore: 92 },
      { id: 'e3', type: 'phone', label: '+91 98123 45678', riskScore: 78 },
      { id: 'e4', type: 'upi', label: 'solicit@okaxis', riskScore: 95 },
      { id: 'e5', type: 'url', label: 'http://amazon-verify-account.top', riskScore: 98 }
    ],
    relationships: [
      { source: 'e1', target: 'e2', relationship: 'Used in Instagram Bio' },
      { source: 'e2', target: 'e5', relationship: 'Hosted on Overseas Server' },
      { source: 'e1', target: 'e4', relationship: 'Requested UPI Payment' },
      { source: 'e4', target: 'e3', relationship: 'Linked Phone Number' }
    ],
    diary: [
      { id: 'd1', timestamp: '09:15 AM', action: 'Victim uploaded screenshot evidence', agentName: 'Evidence Intake' },
      { id: 'd2', timestamp: '09:16 AM', action: 'Tesseract OCR extracted 3 phone numbers & UPI handle', agentName: 'OCR Agent' },
      { id: 'd3', timestamp: '09:17 AM', action: 'High risk domain .top identified', agentName: 'Phishing Intel' },
      { id: 'd4', timestamp: '09:18 AM', action: 'Extortion demand & urgency coercion flagged', agentName: 'Blackmail Agent' },
      { id: 'd5', timestamp: '09:20 AM', action: 'Interactive Evidence Canvas topology generated', agentName: 'Stalking Agent' },
      { id: 'd6', timestamp: '09:22 AM', action: 'Police FIR Complaint draft sealed', agentName: 'Legal Guidance' }
    ],
    vaultNotes: [
      { id: 'v1', timestamp: '09:30 AM', note: 'Suspect sent follow-up message on WhatsApp from +91 98123 45678.' },
      { id: 'v2', timestamp: '10:15 AM', note: 'Contacted SBI bank helpline 1930 to freeze transaction.' }
    ],
    recoverySteps: [
      { id: 'r1', step: 'Freeze compromised bank/UPI accounts', completed: true },
      { id: 'r2', step: 'Report incident to National Cyber Crime Portal (1930)', completed: true },
      { id: 'r3', step: 'Change social account passwords & enable MFA', completed: false },
      { id: 'r4', step: 'Inform family & trusted emergency contacts', completed: true }
    ],
    verificationTasks: [
      { id: 'vt1', title: 'Verify official corporate domain', description: 'Ask recruiter to send email from official @amazon.com domain instead of .top', difficulty: 'Easy', confidenceGain: 'High', estimatedTime: '2 mins', completed: false },
      { id: 'vt2', title: 'Compare LinkedIn professional history', description: 'Cross-reference recruiter name on official Amazon LinkedIn page', difficulty: 'Medium', confidenceGain: 'High', estimatedTime: '5 mins', completed: true },
      { id: 'vt3', title: 'Request 1-minute video verification', description: 'Request live video call to confirm identity match with profile avatar', difficulty: 'Hard', confidenceGain: 'High', estimatedTime: '3 mins', completed: false }
    ],
    caseHealth: {
      evidenceQuality: 'High',
      timelineStatus: 'Complete',
      identityVerification: 'Pending',
      mediaAnalysis: 'Complete',
      overallHealthScore: 88
    },
    completeness: {
      completenessPercentage: 75,
      collected: ['WhatsApp Chat Log', 'Extortion Screenshot', 'Phishing URL', 'Recruiter Instagram Handle'],
      missing: [
        { item: 'UPI Payment Transaction ID', whyItMatters: 'Helps bank freeze financial flow & trace beneficiary account.' },
        { item: 'Original Uncompressed Photo EXIF', whyItMatters: 'Provides GPS geolocation coordinates of the suspect device.' }
      ]
    }
  }
];

export const caseEngine = {
  getCases: (): CyberCase[] => defaultCases,
  getCaseById: (id: string): CyberCase | undefined => defaultCases.find((c) => c.id === id) || defaultCases[0],
  
  createCaseFromPrompt: async (promptText: string, file?: File): Promise<CyberCase> => {
    const report = await runAgenticInvestigation(promptText, file);
    const newCase: CyberCase = {
      id: `case-${Math.floor(1000 + Math.random() * 9000)}`,
      title: report.incidentCategory || 'New Cyber Incident Case',
      category: report.incidentCategory,
      riskScore: report.overallRiskScore,
      openedAt: new Date().toLocaleString(),
      status: 'active',
      commandSummary: report.chiefSummary,
      entities: report.extractedEntities,
      relationships: report.relationships,
      diary: [
        { id: `d_${Date.now()}_1`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action: 'Case opened via Incident Command Center', agentName: 'Chief Investigator' },
        { id: `d_${Date.now()}_2`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), action: '8 Autonomous Specialist Agents completed analysis pipeline', agentName: 'Master Orchestrator' }
      ],
      vaultNotes: [],
      recoverySteps: [
        { id: 'r1', step: 'Freeze compromised bank/UPI accounts', completed: false },
        { id: 'r2', step: 'Report incident to National Cyber Crime Portal (1930)', completed: false },
        { id: 'r3', step: 'Change social account passwords & enable MFA', completed: false }
      ],
      verificationTasks: [
        { id: 'vt1', title: 'Verify official corporate domain', description: 'Check if email domain matches official company website.', difficulty: 'Easy', confidenceGain: 'High', estimatedTime: '2 mins', completed: false },
        { id: 'vt2', title: 'Request video verification', description: 'Ask for a 1-minute live video call before sending funds.', difficulty: 'Medium', confidenceGain: 'High', estimatedTime: '3 mins', completed: false }
      ],
      caseHealth: {
        evidenceQuality: 'High',
        timelineStatus: 'In Progress',
        identityVerification: 'Pending',
        mediaAnalysis: 'Complete',
        overallHealthScore: 82
      },
      completeness: {
        completenessPercentage: 65,
        collected: ['Submitted Statement', 'Extracted OCR Text'],
        missing: [
          { item: 'Official Payment Receipt', whyItMatters: 'Establishes financial transaction flow for police FIR.' },
          { item: 'Full Chat Export File', whyItMatters: 'Provides unbroken chronological conversation history.' }
        ]
      }
    };
    defaultCases.unshift(newCase);
    return newCase;
  }
};
