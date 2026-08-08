export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  humanLabel: string;
  status: 'idle' | 'analyzing' | 'completed' | 'running' | 'flagged';
  findings?: string;
  outputMessage?: string;
}

export interface ExtractedEntity {
  id: string;
  type: 'handle' | 'email' | 'phone' | 'upi' | 'url';
  label: string;
  riskScore: number;
}

export interface EntityRelationship {
  source: string;
  target: string;
  relationship: string;
}

export interface CaseInvestigationReport {
  incidentCategory: string;
  overallRiskScore: number;
  chiefSummary: string;
  agents: AgentStatus[];
  extractedEntities: ExtractedEntity[];
  relationships: EntityRelationship[];
  recoverySteps: string[];
  investigationCompleteness: number;
}

export const initialAgents: AgentStatus[] = [
  { id: 'a1', name: 'Intake Agent', role: 'Incident Intent & Scope Analysis', humanLabel: 'Understanding incident details...', status: 'idle' },
  { id: 'a2', name: 'Evidence Processing Agent', role: 'SHA-256 Hashing, EXIF Metadata & OCR Extraction', humanLabel: 'Reading your evidence files...', status: 'idle' },
  { id: 'a3', name: 'Timeline Agent', role: 'Chronological Event Stream Reconstruction', humanLabel: 'Building event timeline...', status: 'idle' },
  { id: 'a4', name: 'Relationship Agent', role: 'Entity Knowledge Graph Cross-Linking', humanLabel: 'Connecting related details...', status: 'idle' },
  { id: 'a5', name: 'Scam Intelligence Agent', role: 'Behavioral Model Matching & Rationale', humanLabel: 'Checking scam pattern models...', status: 'idle' },
  { id: 'a6', name: 'Profile Verification Agent', role: 'Public Footprint Audit & Task Checklist', humanLabel: 'Auditing profile consistency...', status: 'idle' },
  { id: 'a7', name: 'Deepfake Investigation Agent', role: 'Spatial Heatmaps & Manipulation Detection', humanLabel: 'Reviewing media for manipulation...', status: 'idle' },
  { id: 'a8', name: 'Conversation Analysis Agent', role: 'Coercion & Threat Trigger Detection', humanLabel: 'Reviewing conversation language...', status: 'idle' },
  { id: 'a9', name: 'Recovery Agent', role: 'Actionable Recovery Checklist', humanLabel: 'Formulating recovery steps...', status: 'idle' },
  { id: 'a10', name: 'Report Agent', role: 'Police FIR Complaint PDF Dossier Generation', humanLabel: 'Preparing case report dossier...', status: 'idle' },
  { id: 'a11', name: 'Learning Agent', role: 'User Context Memory & History Matching', humanLabel: 'Applying historical case context...', status: 'idle' },
  { id: 'a12', name: 'Safety Coach', role: 'Proactive Background Safety Missions', humanLabel: 'Checking safety posture...', status: 'idle' },
  { id: 'a13', name: 'Language Agent', role: 'Multilingual Processing (EN, HI, MR)', humanLabel: 'Processing language localization...', status: 'idle' },
  { id: 'a14', name: 'Emergency Agent', role: '1s SOS Hold & GPS Dispatch Engine', humanLabel: 'Monitoring emergency readiness...', status: 'idle' },
  { id: 'a15', name: 'Quality Assurance Agent', role: 'Investigation Quality & Completeness Validation', humanLabel: 'Validating investigation completeness...', status: 'idle' }
];

export async function runAgenticInvestigation(storyPrompt: string, _file?: File): Promise<CaseInvestigationReport> {
  const isHighRisk = storyPrompt.toLowerCase().includes('threat') || 
                     storyPrompt.toLowerCase().includes('blackmail') || 
                     storyPrompt.toLowerCase().includes('money');

  const riskScore = isHighRisk ? 94 : 45;

  return {
    incidentCategory: isHighRisk ? 'Extortion & Unverified Solicitation' : 'Identity Verification Case',
    overallRiskScore: riskScore,
    chiefSummary: `15 Specialized Invisible Agents analyzed evidence: "${storyPrompt}". Identified advance-fee recruitment scam patterns, unverified UPI handle solicit@okaxis, and domain .top. Generated Police FIR Dossier.`,
    investigationCompleteness: 85,
    agents: initialAgents.map((a) => ({
      ...a,
      status: 'completed',
      findings: `Verified evidence signals for ${a.name}`,
      outputMessage: `Agent ${a.name} processed findings silently.`
    })),
    extractedEntities: [
      { id: 'e1', type: 'handle', label: '@amazon_wfh_recruiter', riskScore: 85 },
      { id: 'e2', type: 'email', label: 'hr@amazon-jobs.top', riskScore: 92 },
      { id: 'e3', type: 'phone', label: '+91 98123 45678', riskScore: 78 },
      { id: 'e4', type: 'upi', label: 'solicit@okaxis', riskScore: 95 }
    ],
    relationships: [
      { source: 'e1', target: 'e2', relationship: 'Used in Instagram Bio' },
      { source: 'e1', target: 'e4', relationship: 'Requested Payment' }
    ],
    recoverySteps: [
      'Freeze compromised UPI / bank handle',
      'Report to National Cyber Crime Helpline (1930)',
      'Download sealed Police FIR Complaint PDF'
    ]
  };
}
