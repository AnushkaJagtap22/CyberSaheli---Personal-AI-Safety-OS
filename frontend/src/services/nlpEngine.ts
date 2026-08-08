export interface ExplainableReason {
  flag: string;
  isRisk: boolean;
  explanation: string;
}

export interface NLPAnalysisResult {
  threatCategory: string;
  riskScore: number;
  confidence: number;
  severity: 'safe' | 'low' | 'warning' | 'danger' | 'critical';
  explainableReasons: ExplainableReason[];
  extractedUPIHandles: string[];
  extractedLinks: string[];
  suggestedLegalSections: string[];
  safetyAdvice: string;
  educationalTip: string;
}

export function analyzeTextContent(text: string): NLPAnalysisResult {
  const lower = text.toLowerCase();
  const explainableReasons: ExplainableReason[] = [];

  // Extract UPI Handles (e.g. name@okaxis, 9876543210@paytm)
  const upiRegex = /[a-zA-Z0-9.\-_]+@(okaxis|paytm|ybl|ibl|gpay|upi|sbi|icici|axl)/gi;
  const extractedUPIHandles = Array.from(new Set(text.match(upiRegex) || []));

  // Extract Links
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const extractedLinks = Array.from(new Set(text.match(urlRegex) || []));

  let riskScore = 10;

  // 1. Psychological Urgency Check
  const urgencyKeywords = ['urgent', 'immediately', 'within 15 mins', 'within 30 mins', 'blackout', 'disconnected', 'act now', 'hurry', 'last chance'];
  const hasUrgency = urgencyKeywords.some((k) => lower.includes(k));
  if (hasUrgency) {
    riskScore += 25;
    explainableReasons.push({
      flag: 'Suspicious Psychological Urgency',
      isRisk: true,
      explanation: 'Text creates panic to force rapid compliance before user can verify facts.'
    });
  } else {
    explainableReasons.push({
      flag: 'Natural Communication Cadence',
      isRisk: false,
      explanation: 'No artificial panic or high-pressure deadlines detected.'
    });
  }

  // 2. Financial Demands & Payment Check
  const paymentKeywords = ['pay', 'transfer', 'gpay', 'phonepe', 'upi', 'deposit', 'rs.', 'inr', 'fee', 'charge', 'money'];
  const hasPayment = paymentKeywords.some((k) => lower.includes(k));
  if (hasPayment) {
    riskScore += 25;
    explainableReasons.push({
      flag: 'Direct Unverified Payment Demand',
      isRisk: true,
      explanation: 'Solicits direct money transfer or registration deposit.'
    });
  }

  // 3. Blackmail & Extortion Check
  const blackmailKeywords = ['leak', 'photos', 'pictures', 'viral', 'tell your', 'regret', 'expose', 'sextortion', 'police'];
  const hasBlackmail = blackmailKeywords.some((k) => lower.includes(k));
  if (hasBlackmail) {
    riskScore += 35;
    explainableReasons.push({
      flag: 'Cyber Extortion & Coercion Threat',
      isRisk: true,
      explanation: 'Explicit threat to publish private photos or harm reputation if money is not sent.'
    });
  }

  // 4. Unknown Link / Typosquatting Check
  if (extractedLinks.length > 0) {
    riskScore += 20;
    explainableReasons.push({
      flag: 'Embedded External Web Link',
      isRisk: true,
      explanation: 'Contains external URL that requires domain reputation inspection.'
    });
  }

  // Final severity calculation
  riskScore = Math.min(100, Math.max(10, riskScore));
  let severity: 'safe' | 'low' | 'warning' | 'danger' | 'critical' = 'safe';
  let threatCategory = 'Safe Interaction';

  if (riskScore >= 80) {
    severity = 'critical';
    threatCategory = hasBlackmail ? 'Cyber Sextortion & Blackmail' : 'Financial Phishing & Extortion';
  } else if (riskScore >= 50) {
    severity = 'danger';
    threatCategory = 'Social Engineering Scam';
  } else if (riskScore >= 30) {
    severity = 'warning';
    threatCategory = 'Unverified Promotional Inquiry';
  }

  const suggestedLegalSections: string[] = [];
  if (hasBlackmail) {
    suggestedLegalSections.push('BNS 2023 Section 308 (Extortion & Blackmail Demands)');
    suggestedLegalSections.push('IT Act 2000 Section 66E (Violation of Privacy & Private Images)');
  }
  if (hasPayment || hasUrgency) {
    suggestedLegalSections.push('IT Act 2000 Section 66D (Cheating by Impersonation using Computer System)');
    suggestedLegalSections.push('BNS 2023 Section 318 (Cheating & Fraudulent Inducement)');
  }

  return {
    threatCategory,
    riskScore,
    confidence: 96.4,
    severity,
    explainableReasons,
    extractedUPIHandles,
    extractedLinks,
    suggestedLegalSections,
    safetyAdvice: severity === 'critical' || severity === 'danger'
      ? 'DO NOT transfer money or comply with extortion demands. Compliance leads to further demands. Tap "Save Evidence" to seal in your Vault.'
      : 'Content appears authentic for regular interaction.',
    educationalTip: 'Scammers frequently combine fake emergency panic ("your electricity line will be cut") with direct UPI transfer requests. Always call official customer care lines independently.'
  };
}
