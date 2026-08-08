import Tesseract from 'tesseract.js';

export interface ProcessedEntity {
  type: 'email' | 'phone' | 'url' | 'upi' | 'date';
  value: string;
}

export interface ProcessedEvidence {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  sha256Hash: string;
  uploadedAt: string;
  ocrText?: string;
  extractedEntities: ProcessedEntity[];
  riskScore: number;
  status: 'processed' | 'analyzing';
}

// SHA-256 Hash Generator
async function calculateSHA256(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Regex Entity Extractor
function extractEntitiesFromText(text: string): ProcessedEntity[] {
  const entities: ProcessedEntity[] = [];

  // Emails
  const emails: string[] = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  emails.forEach((e) => entities.push({ type: 'email', value: e }));

  // Indian Phone Numbers
  const phones: string[] = text.match(/(?:\+91[\-\s]?)?[6-9]\d{9}/g) || [];
  phones.forEach((p) => entities.push({ type: 'phone', value: p }));

  // UPI Handles
  const upis: string[] = text.match(/[a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+/g) || [];
  upis.filter((u) => !emails.includes(u)).forEach((u) => entities.push({ type: 'upi', value: u }));

  // URLs
  const urls: string[] = text.match(/https?:\/\/[^\s]+/g) || [];
  urls.forEach((u) => entities.push({ type: 'url', value: u }));

  return entities;
}

export const evidenceProcessor = {
  processFile: async (file: File): Promise<ProcessedEvidence> => {
    const sha256 = await calculateSHA256(file);

    let ocrText = '';
    if (file.type.startsWith('image/')) {
      try {
        const result = await Tesseract.recognize(file, 'eng');
        ocrText = result.data.text;
      } catch (err) {
        console.warn('OCR processing skipped:', err);
      }
    }

    const textToScan = `${file.name} ${ocrText}`;
    const entities = extractEntitiesFromText(textToScan);

    const hasHighRiskDomain = textToScan.includes('.top') || textToScan.includes('.xyz') || textToScan.includes('solicit');
    const riskScore = hasHighRiskDomain ? 92 : entities.length > 0 ? 74 : 25;

    return {
      id: `ev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      fileSize: file.size,
      sha256Hash: sha256,
      uploadedAt: new Date().toISOString(),
      ocrText: ocrText || undefined,
      extractedEntities: entities,
      riskScore,
      status: 'processed'
    };
  }
};
