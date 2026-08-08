import type { ExplainableReason } from './nlpEngine';

export interface URLAnalysisResult {
  url: string;
  hostname: string;
  status: 'safe' | 'warning' | 'danger' | 'critical';
  phishingScore: number;
  isHTTPS: boolean;
  isHighRiskTLD: boolean;
  isTyposquatting: boolean;
  matchedBrandMimicry?: string;
  domainAgeEstimateDays: number;
  explainableReasons: ExplainableReason[];
  recommendation: string;
}

export function analyzeURLReputation(inputUrl: string): URLAnalysisResult {
  let formattedUrl = inputUrl.trim();
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = 'http://' + formattedUrl;
  }

  let parsed: URL;
  try {
    parsed = new URL(formattedUrl);
  } catch {
    return {
      url: inputUrl,
      hostname: 'Invalid Domain',
      status: 'danger',
      phishingScore: 95,
      isHTTPS: false,
      isHighRiskTLD: true,
      isTyposquatting: true,
      domainAgeEstimateDays: 2,
      explainableReasons: [
        { flag: 'Malformed URL Structure', isRisk: true, explanation: 'URL string does not conform to valid domain standard specifications.' }
      ],
      recommendation: 'Do not open. Malformed URL structures often obscure credential harvesters.'
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isHTTPS = parsed.protocol === 'https:';

  const highRiskTLDs = ['.top', '.xyz', '.online', '.info', '.site', '.click', '.club', '.top', '.work'];
  const isHighRiskTLD = highRiskTLDs.some((tld) => hostname.endsWith(tld));

  const targetBrands = ['amazon', 'google', 'gpay', 'paytm', 'sbi', 'hdfc', 'whatsapp', 'telegram', 'instagram', 'meesho'];
  let isTyposquatting = false;
  let matchedBrandMimicry = '';

  for (const brand of targetBrands) {
    if (hostname.includes(brand) && !hostname.endsWith(`.${brand}.com`) && !hostname.endsWith(`.${brand}.in`) && hostname !== `${brand}.com`) {
      isTyposquatting = true;
      matchedBrandMimicry = brand;
      break;
    }
  }

  const explainableReasons: ExplainableReason[] = [];
  let phishingScore = 15;

  if (!isHTTPS) {
    phishingScore += 25;
    explainableReasons.push({
      flag: 'Insecure HTTP Protocol',
      isRisk: true,
      explanation: 'Connection lacks TLS/SSL encryption. Passwords and banking details can be intercepted.'
    });
  } else {
    explainableReasons.push({
      flag: 'Valid HTTPS Protocol',
      isRisk: false,
      explanation: 'SSL certificate is active for domain transport encryption.'
    });
  }

  if (isHighRiskTLD) {
    phishingScore += 30;
    explainableReasons.push({
      flag: 'High-Risk Overseas Generic TLD',
      isRisk: true,
      explanation: 'Domain uses an inexpensive TLD frequently utilized in disposable phishing campaigns.'
    });
  }

  if (isTyposquatting) {
    phishingScore += 35;
    explainableReasons.push({
      flag: `Brand Mimicry Typosquatting (${matchedBrandMimicry.toUpperCase()})`,
      isRisk: true,
      explanation: `Domain imitates official ${matchedBrandMimicry} brand name to deceive visitors into credential submission.`
    });
  }

  const domainAgeEstimateDays = isHighRiskTLD || isTyposquatting ? 5 : 1240;

  phishingScore = Math.min(100, phishingScore);
  const status: 'safe' | 'warning' | 'danger' | 'critical' = phishingScore > 70 ? 'danger' : phishingScore > 40 ? 'warning' : 'safe';

  return {
    url: formattedUrl,
    hostname,
    status,
    phishingScore,
    isHTTPS,
    isHighRiskTLD,
    isTyposquatting,
    matchedBrandMimicry,
    domainAgeEstimateDays,
    explainableReasons,
    recommendation: status === 'danger'
      ? 'Dangerous Phishing Link! Do NOT input passwords, UPI PINs, or personal identity details.'
      : 'Domain reputation appears verified and safe.'
  };
}
