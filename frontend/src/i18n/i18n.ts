export type LanguageCode = 'en' | 'hi' | 'mr';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  home: string;
  aiWorkspace: string;
  safetyPassport: string;
  safetyRecords: string;
  scamSimulator: string;
  insights: string;
  profile: string;
  emergencySOS: string;
  startInvestigation: string;
  exploreDemo: string;
  safetyScore: string;
  threatsNeutralized: string;
  evidenceVault: string;
  startScan: string;
  language: string;
  english: string;
  hindi: string;
  marathi: string;
}

const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: 'CyberSaheli',
    tagline: 'Your AI Cyber Defense Companion',
    home: 'Home',
    aiWorkspace: 'AI Workspace',
    safetyPassport: 'Safety Passport',
    safetyRecords: 'Safety Records',
    scamSimulator: 'Scam Simulator',
    insights: 'Insights & Audit',
    profile: 'Profile & Settings',
    emergencySOS: 'Emergency SOS',
    startInvestigation: 'Start Investigation',
    exploreDemo: 'Explore Demo',
    safetyScore: 'Safety Score',
    threatsNeutralized: 'Threats Neutralized',
    evidenceVault: 'Evidence Vault',
    startScan: 'Start AI Scan',
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    marathi: 'मराठी'
  },
  hi: {
    appName: 'साइबरसहेली',
    tagline: 'आपका एआई साइबर सुरक्षा साथी',
    home: 'मुख्य पृष्ठ',
    aiWorkspace: 'एआई कार्यस्थल',
    safetyPassport: 'सुरक्षा पासपोर्ट',
    safetyRecords: 'सुरक्षा रिकॉर्ड',
    scamSimulator: 'स्कैम सिमुलेटर',
    insights: 'विश्लेषण और ऑडिट',
    profile: 'प्रोफाइल और सेटिंग्स',
    emergencySOS: 'आपातकालीन एसओएस',
    startInvestigation: 'जांच शुरू करें',
    exploreDemo: 'डेमो देखें',
    safetyScore: 'सुरक्षा स्कोर',
    threatsNeutralized: 'रोके गए खतरे',
    evidenceVault: 'साक्ष्य वॉल्ट',
    startScan: 'एआई स्कैन शुरू करें',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    marathi: 'मराठी'
  },
  mr: {
    appName: 'सायबरसहेली',
    tagline: 'तुमचा एआय सायबर संरक्षण साथीदार',
    home: 'मुख्यपृष्ठ',
    aiWorkspace: 'एआय कार्यक्षेत्र',
    safetyPassport: 'सुरक्षा पासपोर्ट',
    safetyRecords: 'सुरक्षा नोंदी',
    scamSimulator: 'स्कॅम सिम्युलेटर',
    insights: 'विश्लेषण आणि ऑडिट',
    profile: 'प्रोफाइल आणि सेटिंग्ज',
    emergencySOS: 'आणीबाणी एसओएस',
    startInvestigation: 'तपास सुरू करा',
    exploreDemo: 'डेमो पहा',
    safetyScore: 'सुरक्षा स्कोर',
    threatsNeutralized: 'रोखलेले धोके',
    evidenceVault: 'पुरावा वॉल्ट',
    startScan: 'एआई स्कॅन सुरू करा',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    marathi: 'मराठी'
  }
};

let currentLang: LanguageCode = 'en';
const listeners: Set<() => void> = new Set();

export const i18n = {
  getLanguage: (): LanguageCode => currentLang,
  setLanguage: (lang: LanguageCode) => {
    currentLang = lang;
    listeners.forEach((cb) => cb());
  },
  t: (): TranslationDictionary => translations[currentLang],
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }
};
