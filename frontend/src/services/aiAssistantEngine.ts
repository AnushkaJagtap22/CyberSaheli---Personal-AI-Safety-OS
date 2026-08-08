export interface EvidenceItemContext {
  id: string;
  name: string;
  type: string;
  extractedText: string;
  notes: string;
}

export interface EntityItem {
  value: string;
  type: 'domain' | 'email' | 'phone' | 'upi' | 'handle';
  source: string;
}

export interface CaseMemory {
  investigationId: string;
  incidentType: string;
  userPrompt: string;
  uploadedEvidence: EvidenceItemContext[];
  entities: EntityItem[];
  currentFindings: string[];
  conversationHistory: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
}

export interface AssistantStructuredResponse {
  answer: string;
  evidenceUsed: string[];
  reasoning: string[];
  confidence: 'High' | 'Moderate' | 'Needs More Evidence';
  recommendedAction: string[];
  suggestedReplies?: string[];
  missingEvidenceChecklist?: string[];
}

// Default initial memory for Case #104
export function createInitialCaseMemory(incidentText: string, initialFiles: EvidenceItemContext[]): CaseMemory {
  return {
    investigationId: 'CS-INC-2026-104',
    incidentType: 'Recruitment & Advance-Fee Solicitation Scam',
    userPrompt: incidentText || 'Someone asked me to pay ₹5,000 for a recruitment registration fee.',
    uploadedEvidence: initialFiles.length ? initialFiles : [
      {
        id: 'ev-1',
        name: 'WhatsApp_Job_Solicitation.txt',
        type: 'WhatsApp Chat Export',
        extractedText: 'Recruiter: "Congratulations! Lock your Amazon WFH slot by transferring ₹5,000 to UPI solicit@okaxis within 2 hours."',
        notes: 'Explicit request for ₹5,000 registration fee.'
      },
      {
        id: 'ev-2',
        name: 'Payment_Receipt_UPI.png',
        type: 'Payment Screenshot',
        extractedText: 'Paid ₹5,000 to solicit@okaxis. Transaction Ref #TXN9812374. Domain hr-amazon-jobs.top.',
        notes: 'UPI payment receipt to suspect handle solicit@okaxis.'
      }
    ],
    entities: [
      { value: 'hr-amazon-jobs.top', type: 'domain', source: 'Payment Screenshot OCR' },
      { value: 'solicit@okaxis', type: 'upi', source: 'WhatsApp Chat & Receipt' },
      { value: '+91 98123 45678', type: 'phone', source: 'WhatsApp Chat Export' },
      { value: 'hr@amazon-jobs.top', type: 'email', source: 'Job Offer Letter' }
    ],
    currentFindings: [
      'Unverified advance-fee recruitment solicitation pattern detected.',
      'Suspect requested ₹5,000 prior to official interview.',
      'Domain hr-amazon-jobs.top lacks Amazon corporate DNS registration.',
      'UPI ID solicit@okaxis unverified in NPCI corporate merchant directory.'
    ],
    conversationHistory: []
  };
}

// RAG Context Retrieval Engine
export function retrieveContextFromMemory(memory: CaseMemory, query: string): {
  matchedEvidence: EvidenceItemContext[];
  matchedEntities: EntityItem[];
  matchedFindings: string[];
} {
  const queryLower = query.toLowerCase();

  const matchedEvidence = memory.uploadedEvidence.filter(e => 
    queryLower.includes(e.name.toLowerCase()) || 
    queryLower.includes(e.type.toLowerCase()) || 
    e.extractedText.toLowerCase().includes(queryLower) ||
    queryLower.includes('evidence') || queryLower.includes('chat') || queryLower.includes('screenshot') || queryLower.includes('all')
  );

  const matchedEntities = memory.entities.filter(ent => 
    queryLower.includes(ent.value.toLowerCase()) || queryLower.includes(ent.type)
  );

  const matchedFindings = memory.currentFindings.filter(findingItem => 
    findingItem.toLowerCase().includes(queryLower) ||
    queryLower.includes('suspicious') || queryLower.includes('scam') || queryLower.includes('why') || queryLower.includes('reason') || queryLower.includes('finding')
  );

  return {
    matchedEvidence: matchedEvidence.length ? matchedEvidence : memory.uploadedEvidence,
    matchedEntities: matchedEntities.length ? matchedEntities : memory.entities,
    matchedFindings: matchedFindings.length ? matchedFindings : memory.currentFindings
  };
}

// RAG Assistant Orchestrator
export async function queryAIAssistant(
  memory: CaseMemory,
  userQuery: string
): Promise<AssistantStructuredResponse> {
  const queryLower = userQuery.toLowerCase();
  const context = retrieveContextFromMemory(memory, userQuery);

  // Processing latency simulation
  await new Promise((r) => setTimeout(r, 1200));

  const evidenceNames = memory.uploadedEvidence.map(e => `✓ ${e.name}`);

  // INTENT 1: "Should I reply?" / "Write a safe reply"
  if (queryLower.includes('reply') || queryLower.includes('respond') || queryLower.includes('write')) {
    return {
      answer: `Based on your uploaded WhatsApp conversation and chat log context, you should pause further communication with the suspect (+91 98123 45678). If they continue pressuring you, use one of the non-escalating responses below.`,
      evidenceUsed: evidenceNames,
      reasoning: [
        'The suspect is creating psychological urgency ("lock slot within 2 hours").',
        'Replying or arguing with scammers often leads to heightened pressure or coercion.',
        'Pausing communication allows official verification through corporate channels.'
      ],
      confidence: 'High',
      recommendedAction: [
        'Do not send any further money or financial OTPs.',
        'Copy and send one of the suggested safe responses below if needed.',
        'Block the contact if they escalate to harassment.'
      ],
      suggestedReplies: [
        "I have paused communication while my legal advisor verifies this recruitment request through Amazon Corporate.",
        "Please forward formal appointment documentation on official corporate letterhead to my email.",
        "I am logging all messages for verification and will not engage in financial transfers."
      ]
    };
  }

  // INTENT 2: "Explain why this image looks suspicious" / "Explain screenshot"
  if (queryLower.includes('image') || queryLower.includes('screenshot') || queryLower.includes('photo') || queryLower.includes('pic')) {
    return {
      answer: `Analysis of your uploaded screenshot ("Payment_Receipt_UPI.png") reveals multiple red flags. The image shows a ₹5,000 transfer to an unverified personal UPI handle (solicit@okaxis) paired with an unofficial domain (hr-amazon-jobs.top).`,
      evidenceUsed: [
        '✓ Payment_Receipt_UPI.png (OCR Text & Metadata)',
        '✓ WhatsApp_Job_Solicitation.txt'
      ],
      reasoning: [
        'OCR text extracted from screenshot shows UPI VPA solicit@okaxis, which is a personal handle rather than a corporate merchant VPA.',
        'The domain referenced in the header (hr-amazon-jobs.top) is registered on a high-risk TLD (.top) registered < 30 days ago.',
        'Corporate hiring processes do not issue payment QR codes for interview scheduling.'
      ],
      confidence: 'High',
      recommendedAction: [
        'Keep the original screenshot file sealed in your Evidence Vault.',
        'Provide the transaction reference number #TXN9812374 to your bank\'s fraud desk.',
        'Do not delete the original image file as it serves as legal Section 65B evidence.'
      ]
    };
  }

  // INTENT 3: "Summarize everything" / "Case summary"
  if (queryLower.includes('summarize') || queryLower.includes('summary') || queryLower.includes('overview') || queryLower.includes('everything')) {
    return {
      answer: `Executive Case Summary for Investigation #${memory.investigationId}: You were targeted by a recruitment fee scam. The suspect impersonated Amazon HR over WhatsApp and coerced a ₹5,000 payment to UPI ID solicit@okaxis for a fake WFH position.`,
      evidenceUsed: evidenceNames,
      reasoning: [
        `Incident Category: ${memory.incidentType}`,
        'Identified Suspect Entities: hr-amazon-jobs.top, solicit@okaxis, +91 98123 45678',
        'Key Findings: Unverified UPI, brand impersonation, advance-fee solicitation.'
      ],
      confidence: 'High',
      recommendedAction: [
        'Generate and download the Police FIR Complaint PDF (1930 Helpline format).',
        'Contact bank emergency fraud desk to request lien mark on transaction #TXN9812374.',
        'Share case summary link with your trusted contact.'
      ]
    };
  }

  // INTENT 4: "What evidence is still missing?"
  if (queryLower.includes('missing') || queryLower.includes('need') || queryLower.includes('strengthen')) {
    return {
      answer: `To strengthen this investigation and maximize your bank chargeback / 1930 police complaint odds, additional verification documents are recommended.`,
      evidenceUsed: evidenceNames,
      reasoning: [
        'Current evidence covers chat log and payment screenshot.',
        'Additional bank statements or email headers provide immutable proof for cybercrime investigators.'
      ],
      confidence: 'Moderate',
      recommendedAction: [
        'Upload your official bank account statement showing the ₹5,000 debit line item.',
        'Upload the original offer letter PDF if received via email.',
        'Upload any additional email header text.'
      ],
      missingEvidenceChecklist: [
        '✓ Official Bank Transaction Statement (PDF / Image)',
        '✓ Original Offer Letter PDF or Email Headers',
        '✓ Complete Unedited WhatsApp Chat Export (.txt)',
        '✓ Call Logs Screenshot showing suspect number'
      ]
    };
  }

  // DEFAULT DYNAMIC RAG QUERY RESPONSE
  return {
    answer: `Based on your active investigation context ("${memory.userPrompt}"), Saheli AI analyzed ${context.matchedEvidence.length} evidence files and ${context.matchedEntities.length} identified suspect entities. The suspect is using advance-fee coercion tactics.`,
    evidenceUsed: context.matchedEvidence.map(e => `✓ ${e.name}`),
    reasoning: context.matchedFindings,
    confidence: 'High',
    recommendedAction: [
      'Do not send any further funds or financial PINs.',
      'File formal complaint on National Cyber Crime Portal (1930 Helpline).',
      'Preserve all files in your CyberSaheli Evidence Vault.'
    ]
  };
}
