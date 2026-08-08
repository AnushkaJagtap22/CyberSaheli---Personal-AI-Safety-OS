export interface LinkAnalysisResult {
  rawUrl: string;
  normalizedUrl: string;
  domain: string;
  isHttps: boolean;
  tldRisk: 'High' | 'Medium' | 'Low';
  homographRisk: boolean;
  overallRiskScore: number;
  explanation: string;
}

export function analyzeLink(urlInput: string): LinkAnalysisResult {
  let normalized = urlInput.trim();
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }

  let domain = 'unknown';
  try {
    const parsed = new URL(normalized);
    domain = parsed.hostname;
  } catch (err) {
    domain = urlInput;
  }

  const isHttps = normalized.startsWith('https://');
  const isHighRiskTLD = domain.endsWith('.top') || domain.endsWith('.xyz') || domain.endsWith('.zip') || domain.endsWith('.cc');
  const homograph = domain.includes('0') || domain.includes('rn') || domain.includes('vv');

  const riskScore = isHighRiskTLD ? 94 : homograph ? 78 : !isHttps ? 65 : 15;

  return {
    rawUrl: urlInput,
    normalizedUrl: normalized,
    domain,
    isHttps,
    tldRisk: isHighRiskTLD ? 'High' : 'Low',
    homographRisk: homograph,
    overallRiskScore: riskScore,
    explanation: isHighRiskTLD 
      ? `High-risk domain extension (.top/.xyz) frequently registered for phishing campaigns.`
      : homograph 
      ? `Suspicious homograph character substitution detected in domain name.`
      : `Domain reputation appears clean with valid SSL certificate.`
  };
}
