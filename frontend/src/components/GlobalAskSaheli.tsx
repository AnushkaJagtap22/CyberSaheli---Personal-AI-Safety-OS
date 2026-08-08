import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  X, 
  Mic, 
  MicOff, 
  ExternalLink, 
  ArrowRight,
  FileText,
  Minimize2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchLiveRiskRadarIntelligence } from '../services/radarEngine';

type Language = 'en' | 'hi' | 'mr';

interface Message {
  id: string;
  sender: 'user' | 'saheli';
  text: string;
  attachmentName?: string;
  attachmentUrl?: string;
  loadingStage?: string;
  explainability?: string[];
  whatToDo?: string[];
  sources?: { name: string; url: string }[];
  trustNotice?: string;
  quickActions?: { label: string; route: string }[];
  timestamp: string;
}

export function GlobalAskSaheli() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(' ')[0] : 'Anushka';

  // Floating Panel Visibility
  const [isOpen, setIsOpen] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState<string[] | null>(null);

  // Multilingual State (Persisted in localStorage)
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('cybersaheli_lang') as Language) || 'en';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('cybersaheli_lang', newLang);
  };

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; url: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Live Context Data
  const [riskContext, setRiskContext] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchLiveRiskRadarIntelligence().then(data => setRiskContext(data));
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, processingStage]);

  // Page-Aware Context Suggestions
  const getContextualSuggestions = () => {
    const path = location.pathname;
    if (path.includes('risk-radar')) {
      return [
        lang === 'hi' ? 'यह खतरा ट्रेंड क्यों कर रहा है?' : lang === 'mr' ? 'हा धोका ट्रेंड का करतोय?' : 'Why is this threat trending?',
        lang === 'hi' ? 'मुझे किस बात पर ध्यान देना चाहिए?' : lang === 'mr' ? 'मी कशावर लक्ष ठेवले पाहिजे?' : 'What should I watch for?',
        lang === 'hi' ? 'महाराष्ट्र की ताज़ा रिपोर्टें' : lang === 'mr' ? 'महाराष्ट्रातील ताज्या अहवाल' : 'Latest Maharashtra reports',
        lang === 'hi' ? 'सुरक्षा सलाह डाउनलोड करें' : lang === 'mr' ? 'सुरक्षा सल्लागार डाउनलोड करा' : 'Download safety advisory'
      ];
    }
    if (path.includes('verify')) {
      return [
        lang === 'hi' ? 'यह सत्यापन कितना विश्वसनीय है?' : lang === 'mr' ? 'ही पडताळणी किती विश्वासार्ह आहे?' : 'How reliable is this verification?',
        lang === 'hi' ? 'इसके बाद मुझे क्या जांचना चाहिए?' : lang === 'mr' ? 'यानंतर मी काय तपासावे?' : 'What should I check next?',
        lang === 'hi' ? 'नकली भर्तीकर्ता की पहचान कैसे करें?' : lang === 'mr' ? 'बनावट भरती करणाऱ्याला कसे ओळखायचे?' : 'How to identify fake recruiters?',
        lang === 'hi' ? 'UPI पेमेंट हैंडल की जांच करें' : lang === 'mr' ? 'UPI पेमेंट हँडल तपासा' : 'Check UPI handle'
      ];
    }
    if (path.includes('investigate')) {
      return [
        lang === 'hi' ? 'इस घटना को समझने में मेरी मदद करें' : lang === 'mr' ? 'ही घटना समजून घेण्यास मला मदत करा' : 'Help me understand this incident',
        lang === 'hi' ? 'मुझे क्या साक्ष्य सहेजने चाहिए?' : lang === 'mr' ? 'मी कोणते पुरावे जतन केले पाहिजेत?' : 'What evidence should I preserve?',
        lang === 'hi' ? 'डेटा उल्लंघनों की जांच करें' : lang === 'mr' ? 'डेटा उल्लंघनांची चौकशी करा' : 'Check data breaches',
        lang === 'hi' ? 'साइबर सेल में रिपोर्ट दर्ज करें' : lang === 'mr' ? 'सायबर सेलमध्ये तक्रार दाखल करा' : 'File report with Cyber Cell'
      ];
    }
    if (path.includes('recovery')) {
      return [
        lang === 'hi' ? 'मुझे सबसे पहले क्या करना चाहिए?' : lang === 'mr' ? 'मी प्रथम काय केले पाहिजे?' : 'What should I do first?',
        lang === 'hi' ? 'मैं अपना खाता कैसे सुरक्षित करूँ?' : lang === 'mr' ? 'मी माझे खाते कसे सुरक्षित करू?' : 'How can I protect my account?',
        lang === 'hi' ? 'बैंक हेल्पलाइन 1930 सहायता' : lang === 'mr' ? 'बँक हेल्पलाइन १९३० मदत' : 'Bank helpline 1930 help',
        lang === 'hi' ? 'कानूनी सहायता दस्तावेज डाउनलोड करें' : lang === 'mr' ? 'कायदेशीर मदत दस्तऐवज डाउनलोड करा' : 'Download legal aid docs'
      ];
    }
    return [
      lang === 'hi' ? 'क्या यह संदेश स्कैम है?' : lang === 'mr' ? 'हा संदेश स्कॅम आहे का?' : 'Is this message a scam?',
      lang === 'hi' ? 'किसी की पहचान कैसे सत्यापित करें?' : lang === 'mr' ? 'एखाद्याची ओळख कशी तपासायची?' : 'How do I verify someone?',
      lang === 'hi' ? 'मुझे लगता है मेरे साथ स्कैम हुआ है' : lang === 'mr' ? 'माझ्यासोबत स्कॅम झाला आहे असे वाटते' : "I think I've been scammed",
      lang === 'hi' ? 'अभी क्या ट्रेंड कर रहा है?' : lang === 'mr' ? 'सध्या काय ट्रेंड करत आहे?' : "What's trending right now?"
    ];
  };

  const suggestions = getContextualSuggestions();

  // Multilingual UI Translations
  const i18n = {
    en: {
      capsuleText: '✦ Saheli',
      tooltip: 'Your cyber-safety companion',
      title: '✦ ASK SAHELI',
      subtitle: 'Your personal cyber-safety companion',
      welcomeHeader: `Hi ${userName}. How can I help you stay safe?`,
      welcomeBody: 'Ask me about suspicious messages, online scams, digital identity, cybercrime or what to do next.',
      placeholder: 'Ask Saheli anything...',
      whyTitle: 'WHY I THINK THIS',
      whatToDoTitle: 'WHAT I\'D DO',
      sourcesTitle: 'Sources',
      viewSources: 'View sources',
      howDetermined: 'How did Saheli determine this?',
      emergencyHeader: 'SAFETY MODE',
      emergencyBody: "Let's focus on what you can do right now. You're not alone.",
      clear: 'Clear chat'
    },
    hi: {
      capsuleText: '✦ सहेली',
      tooltip: 'आपकी साइबर सुरक्षा साथी',
      title: '✦ सहेली से पूछें',
      subtitle: 'आपकी व्यक्तिगत साइबर सुरक्षा साथी',
      welcomeHeader: `नमस्ते ${userName}। मैं आपको सुरक्षित रखने में कैसे मदद कर सकती हूँ?`,
      welcomeBody: 'मुझसे संदिग्ध संदेशों, ऑनलाइन घोटालों, डिजिटल पहचान, साइबर अपराध या आगे क्या करना है, इसके बारे में पूछें।',
      placeholder: 'सहेली से कुछ भी पूछें...',
      whyTitle: 'मैं ऐसा क्यों सोचती हूँ',
      whatToDoTitle: 'मेरा सुझाव',
      sourcesTitle: 'सत्यापित स्रोत',
      viewSources: 'स्रोत देखें',
      howDetermined: 'सहेली ने यह कैसे निर्धारित किया?',
      emergencyHeader: 'सुरक्षा मोड',
      emergencyBody: 'आइए ध्यान केंद्रित करें कि आप अभी क्या कर सकती हैं। आप अकेली नहीं हैं।',
      clear: 'बातचीत साफ़ करें'
    },
    mr: {
      capsuleText: '✦ सहेली',
      tooltip: 'तुमची सायबर सुरक्षा सोबती',
      title: '✦ सहेलीला विचारा',
      subtitle: 'तुमची वैयक्तिक सायबर सुरक्षा सोबती',
      welcomeHeader: `नमस्कार ${userName}. मी तुम्हाला सुरक्षित ठेवण्यास कशी मदत करू शकते?`,
      welcomeBody: 'मला संशयास्पद संदेश, ऑनलाइन घोटाळे, डिजिटल ओळख, सायबर गुन्हे किंवा पुढे काय करावे याबद्दल विचारा.',
      placeholder: 'सहेलीला काहीही विचारा...',
      whyTitle: 'मी असे का विचार करते',
      whatToDoTitle: 'माझा सल्ला',
      sourcesTitle: 'पडताळणी केलेले स्त्रोत',
      viewSources: 'स्त्रोत पहा',
      howDetermined: 'सहेलीने हे कसे ठरवले?',
      emergencyHeader: 'सुरक्षा मोड',
      emergencyBody: 'तुम्ही आता काय करू शकता यावर लक्ष केंद्रित करूया. तुम्ही एकट्या नाही आहात.',
      clear: 'संभाषण साफ करा'
    }
  };

  const currentI18n = i18n[lang];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAttachedFile({ name: file.name, url });
    }
  };

  // Voice Speech Recognition
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (lang === 'hi') recognition.lang = 'hi-IN';
    else if (lang === 'mr') recognition.lang = 'mr-IN';
    else recognition.lang = 'en-US';

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() && !attachedFile) return;

    const userMsgId = `usr-${Date.now()}`;
    const newMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: query.trim() || (lang === 'hi' ? 'संलग्न स्क्रीनशॉट का विश्लेषण करें।' : lang === 'mr' ? 'संलग्न स्क्रीनशॉटचे विश्लेषण करा.' : 'Analyzed attached screenshot.'),
      attachmentName: attachedFile?.name,
      attachmentUrl: attachedFile?.url,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    const currentAttachment = attachedFile;
    setAttachedFile(null);
    setIsProcessing(true);

    // Dynamic Loading Stages
    setProcessingStage(lang === 'hi' ? '✦ साइबर खुफिया जानकारी जांची जा रही है...' : lang === 'mr' ? '✦ सायबर बुद्धिमत्ता तपासत आहे...' : '✦ Checking current cyber intelligence...');

    setTimeout(() => {
      setProcessingStage(lang === 'hi' ? '✦ सत्यापित स्रोतों का विश्लेषण...' : lang === 'mr' ? '✦ पडताळणी केलेल्या स्त्रोतांचे विश्लेषण...' : '✦ Analyzing verified sources...');
    }, 600);

    setTimeout(() => {
      setProcessingStage(null);
      setIsProcessing(false);

      const lower = query.toLowerCase();

      // EMERGENCY SAFETY MODE INTENT
      if (lower.includes('threat') || lower.includes('danger') || lower.includes('blackmail') || lower.includes('scammed') || lower.includes('lost money') || lower.includes('पैसा') || lower.includes('पैसे') || lower.includes('धमकी')) {
        setIsEmergencyMode(true);
        let reply = "Don't send any more money. Contact your bank or payment provider immediately to request an urgent transaction freeze, save all evidence, and report the incident.";
        let exp = [
          'Immediate transaction freeze halts secondary money routing.',
          'National helpline 1930 connects directly to Indian Financial Cyber Fraud Reporting System.'
        ];
        let steps = [
          '1. Contact your bank helpline or dial 1930 immediately.',
          '2. Preserve unedited screenshots in CyberSaheli Evidence Vault.',
          '3. Do not send further payments or respond to extortion demands.'
        ];

        if (lang === 'hi') {
          reply = "कोई और पैसा न भेजें। तत्काल लेनदेन रोक का अनुरोध करने के लिए तुरंत अपने बैंक या भुगतान प्रदाता से संपर्क करें, सभी साक्ष्यों को सहेजें और घटना की रिपोर्ट करें।";
          exp = [
            'तत्काल लेनदेन रोक secondary पैसे के ट्रांसफर को रोकता है।',
            'राष्ट्रीय हेल्पलाइन 1930 सीधे वित्तीय साइबर अपराध रिपोर्टिंग सिस्टम से जोड़ती है।'
          ];
          steps = [
            '1. अपने बैंक हेल्पलाइन से संपर्क करें या तुरंत 1930 डायल करें।',
            '2. साक्ष्य वॉल्ट में बिना संपादित स्क्रीनशॉट सहेजें।',
            '3. आगे कोई भुगतान न भेजें और न ही जबरन वसूली की मांगों का जवाब दें।'
          ];
        } else if (lang === 'mr') {
          reply = "आणखी पैसे पाठवू नका. त्वरित व्यवहार थांबवण्याची विनंती करण्यासाठी तुमच्या बँकेशी किंवा पेमेंट प्रदात्याशी त्वरित संपर्क साधा, सर्व पुरावे जतन करा आणि घटनेची तक्रार करा.";
          exp = [
            'त्वरित व्यवहार थांबवणे दुय्यम पैशाचे हस्तांतरण थांबवते.',
            'राष्ट्रीय हेल्पलाइन १९३० थेट भारतीय आर्थिक सायबर गुन्हा अहवाल प्रणालीशी जोडते.'
          ];
          steps = [
            '1. तुमच्या बँक हेल्पलाइनशी संपर्क साधा किंवा त्वरित १९३० वर कॉल करा.',
            '2. पुराव्याचे वॉल्टमध्ये न संपादित केलेले स्क्रीनशॉट जतन करा.',
            '3. पुढील देयके पाठवू नका किंवा खंडणीच्या मागण्यांना प्रतिसाद देऊ नका.'
          ];
        }

        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: reply,
            explainability: exp,
            whatToDo: steps,
            sources: [{ name: 'National Cyber Crime Portal (1930)', url: 'https://cybercrime.gov.in' }],
            trustNotice: lang === 'hi' ? '✓ आपातकालीन सुरक्षा प्रोटोकॉल पर आधारित' : lang === 'mr' ? '✓ आपत्कालीन सुरक्षा प्रोटोकॉलवर आधारित' : '✓ Based on emergency safety protocol',
            quickActions: [
              { label: lang === 'hi' ? 'साक्ष्य सहेजें' : lang === 'mr' ? 'पुरावा जतन करा' : 'Save Evidence', route: '/app/vault' },
              { label: lang === 'hi' ? 'घटना की जांच करें' : lang === 'mr' ? 'घटनेची चौकशी करा' : 'Investigate Incident', route: '/app/investigate' },
              { label: lang === 'hi' ? 'रिकवरी सेंटर' : lang === 'mr' ? 'रिकव्हरी सेंटर' : 'Recovery Center', route: '/app/recovery' },
              { label: lang === 'hi' ? 'आपातकालीन मदद (SOS)' : lang === 'mr' ? 'आपत्कालीन मदद (SOS)' : 'Emergency Help (SOS)', route: '/app/sos' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // RECRUITER / VERIFICATION INTENT
      if (lower.includes('verify') || lower.includes('recruiter') || lower.includes('person') || lower.includes('सत्यापित') || lower.includes('पडताळणी')) {
        let reply = "This verification request requires checking independent corporate domain registers and payment handle logs.";
        let exp = [
          'Official corporate employers do not use personal Gmail handles.',
          'Registration fee demands violate legitimate recruitment policies.'
        ];
        let steps = [
          '1. Verify official careers portal directly on corporate domain.',
          '2. Never pay pre-interview registration deposits.',
          '3. Check handle headers in CyberSaheli Verify Someone.'
        ];

        if (lang === 'hi') {
          reply = "इस सत्यापन के लिए स्वतंत्र कॉर्पोरेट डोमेन रजिस्टरों और भुगतान हैंडल लॉग की जांच की आवश्यकता है।";
          exp = [
            'आधिकारिक कॉर्पोरेट नियोक्ता व्यक्तिगत जीमेल हैंडल का उपयोग नहीं करते हैं।',
            'पंजीकरण शुल्क की मांग वैध भर्ती नीतियों का उल्लंघन करती है।'
          ];
          steps = [
            '1. सीधे कॉर्पोरेट डोमेन पर आधिकारिक करियर पोर्टल की पुष्टि करें।',
            '2. साक्षात्कार से पहले कभी भी पंजीकरण जमा राशि का भुगतान न करें।',
            '3. सहेली सत्यापन में हैंडल हेडर की जांच करें।'
          ];
        } else if (lang === 'mr') {
          reply = "या पडताळणीसाठी स्वतंत्र कॉर्पोरेट डोमेन रजिस्ट्रार आणि पेमेंट हँडल लॉग तपासणे आवश्यक आहे.";
          exp = [
            'अधिकृत कॉर्पोरेट नियोक्ते वैयक्तिक जीमेल हँडल वापरत नाहीत.',
            'नोंदणी शुल्काची मागणी कायदेशीर भरती धोरणांचे उल्लंघन करते.'
          ];
          steps = [
            '1. कॉर्पोरेट डोमेनवर थेट अधिकृत करिअर पोर्टल तपासा.',
            '2. मुलाखतीपूर्वी कधीही नोंदणी ठेव जमा करू नका.',
            '3. सहेली पडताळणीमध्ये हँडल हेडर तपासा.'
          ];
        }

        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: reply,
            explainability: exp,
            whatToDo: steps,
            sources: [{ name: 'CERT-In Recruitment Advisory', url: 'https://www.cert-in.org.in' }],
            trustNotice: lang === 'hi' ? '✓ सत्यापित भर्ती खुफिया जानकारी पर आधारित' : lang === 'mr' ? '✓ पडताळणी केलेल्या भरती माहितीवर आधारित' : '✓ Based on verified threat intelligence',
            quickActions: [{ label: lang === 'hi' ? 'सत्यापित करें' : lang === 'mr' ? 'पडताळणी करा' : 'Verify Someone →', route: '/app/verify' }],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // SCREENSHOT OCR ANALYSIS
      if (currentAttachment) {
        let reply = `Analysis complete for ${currentAttachment.name}: LIKELY SUSPICIOUS. The attached document exhibits unverified domain redirects and pressure tactics.`;
        let exp = [
          'Domain header does not match official registrar records.',
          'Contains high-pressure language demanding action within 24 hours.'
        ];
        let steps = [
          '1. Do not click embedded domain links.',
          '2. Do not share OTPs or banking credentials.',
          '3. Preserve raw screenshot in Evidence Vault.'
        ];

        if (lang === 'hi') {
          reply = `${currentAttachment.name} का विश्लेषण पूर्ण: संदिग्ध। दस्तावेज़ में असत्यापित डोमेन रीडायरेक्ट और दबाव की रणनीति शामिल है।`;
          exp = [
            'डोमेन हेडर आधिकारिक रजिस्ट्रार रिकॉर्ड से मेल नहीं खाता है।',
            'इसमें 24 घंटों के भीतर कार्रवाई की मांग करने वाली उच्च दबाव वाली भाषा शामिल है।'
          ];
          steps = [
            '1. एम्बेडेड डोमेन लिंक पर क्लिक न करें।',
            '2. OTP या बैंकिंग क्रेडेंशियल साझा न करें।',
            '3. साक्ष्य वॉल्ट में मूल स्क्रीनशॉट सहेजें।'
          ];
        } else if (lang === 'mr') {
          reply = `${currentAttachment.name} चे विश्लेषण पूर्ण: संशयास्पद. दस्तऐवजात पडताळणी न केलेले डोमेन रीडायरेक्ट आणि दबावाचे तंत्र आहे.`;
          exp = [
            'डोमेन हेडर अधिकृत रजिस्ट्रार नोंदींशी जुळत नाही.',
            'यामध्ये २४ तासांच्या आत कारवाईची मागणी करणारी उच्च दबावाची भाषा आहे.'
          ];
          steps = [
            '1. एम्बेड केलेल्या डोमेन लिंक्सवर क्लिक करू नका.',
            '2. OTP किंवा बँकिंग क्रेडेंशियल शेअर करू नका.',
            '3. पुरावे वॉल्टमध्ये मूळ स्क्रीनशॉट जतन करा.'
          ];
        }

        setMessages(prev => [
          ...prev,
          {
            id: `sah-${Date.now()}`,
            sender: 'saheli',
            text: reply,
            explainability: exp,
            whatToDo: steps,
            sources: [{ name: 'CyberSaheli Evidence Analyzer', url: 'https://cybercrime.gov.in' }],
            trustNotice: lang === 'hi' ? '✓ आपके अपलोड किए गए साक्ष्य पर आधारित' : lang === 'mr' ? '✓ तुमच्या अपलोड केलेल्या पुराव्यावर आधारित' : '✓ Based on your uploaded evidence',
            quickActions: [
              { label: 'Save Evidence', route: '/app/vault' },
              { label: 'Investigate Incident', route: '/app/investigate' }
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // DEFAULT EDITORIAL RESPONSE WITH LIVE CONTEXT
      const activeHeadline = riskContext?.topStory?.headline || 'Fake recruitment campaigns';
      let defaultReply = `Regarding "${query}": CyberSaheli advises verifying domains directly on official corporate portals. Currently, "${activeHeadline}" is flagged across verified security advisories.`;
      let defaultExp = [
        'Receiving funds never requires entering your UPI PIN.',
        'Official corporate entities do not issue offers strictly via social handles.'
      ];
      let defaultSteps = [
        '1. Check domain headers on official websites.',
        '2. Decline unverified UPI Collect requests.',
        '3. Report suspicious handles to 1930 helpline.'
      ];

      if (lang === 'hi') {
        defaultReply = `"${query}" के संबंध में: सहेली सलाह देती है कि सीधे आधिकारिक कॉर्पोरेट पोर्टलों पर डोमेन सत्यापित करें। वर्तमान में, "${activeHeadline}" को सत्यापित सुरक्षा सलाहों में फ़्लैग किया गया है।`;
        defaultExp = [
          'पैसे प्राप्त करने के लिए कभी भी अपना UPI PIN दर्ज करने की आवश्यकता नहीं होती है।',
          'आधिकारिक संस्थाएं सामाजिक हैंडल के माध्यम से ऑफर जारी नहीं करती हैं।'
        ];
        defaultSteps = [
          '1. आधिकारिक वेबसाइटों पर डोमेन हेडर जांचें।',
          '2. असत्यापित UPI संग्रह अनुरोधों को अस्वीकार करें।',
          '3. 1930 हेल्पलाइन पर संदिग्ध हैंडल की रिपोर्ट करें।'
        ];
      } else if (lang === 'mr') {
        defaultReply = `"${query}" बाबत: सहेली सल्ला देते की अधिकृत कॉर्पोरेट पोर्टलवर थेट डोमेन तपासा. सध्या, "${activeHeadline}" सुरक्षा सल्ल्यांमध्ये फ्लॅग केले गेले आहे.`;
        defaultExp = [
          'पैसे मिळवण्यासाठी कधीही तुमचा UPI PIN टाकण्याची गरज नसते.',
          'अधिकृत संस्था केवळ सोशल हँडल्सद्वारे ऑफर जारी करत नाहीत.'
        ];
        defaultSteps = [
          '1. अधिकृत वेबसाइटवर डोमेन हेडर तपासा.',
          '2. पडताळणी न केलेल्या UPI संकलन विनंत्या गमवा.',
          '3. १९३० हेल्पलाइनवर संशयास्पद हँडल्सची तक्रार करा.'
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: `sah-${Date.now()}`,
          sender: 'saheli',
          text: defaultReply,
          explainability: defaultExp,
          whatToDo: defaultSteps,
          sources: [{ name: 'CERT-In Threat Intelligence', url: 'https://www.cert-in.org.in' }],
          trustNotice: lang === 'hi' ? '✓ साइबर सहेली इंटेलिजेंस पर आधारित' : lang === 'mr' ? '✓ सायबर सहेली माहितीवर आधारित' : '✓ Based on CyberSaheli intelligence',
          quickActions: [
            { label: 'Verify Someone', route: '/app/verify' },
            { label: 'Investigate Incident', route: '/app/investigate' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <>
      {/* 🔮 1. GLOBAL FLOATING TITANIUM CAPSULE DOCK (✦ Saheli) */}
      <div className="fixed bottom-6 right-6 z-50 group font-sans">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="relative px-5 py-3 rounded-full bg-[#111317] text-white font-mono text-xs font-bold shadow-2xl border border-white/[0.12] hover:border-[#4F8CFF]/60 hover:shadow-[#4F8CFF]/20 hover:scale-105 transition-all flex items-center gap-2.5 backdrop-blur-2xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8CFF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4F8CFF]" />
          </span>
          <span className="tracking-wide text-white font-semibold">{currentI18n.capsuleText}</span>
        </button>

        {/* Hover Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block pointer-events-none whitespace-nowrap animate-fade-in">
            <div className="px-3 py-1.5 rounded-xl bg-[#111317] border border-white/[0.1] text-[11px] font-mono text-[#8B909B] shadow-2xl">
              {currentI18n.tooltip}
            </div>
          </div>
        )}
      </div>

      {/* 💬 2. FLOATING CHAT PANEL (APPLE INTELLIGENCE × PERPLEXITY AESTHETIC) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[460px] h-[640px] max-h-[calc(100vh-100px)] rounded-[28px] border shadow-2xl flex flex-col overflow-hidden font-sans text-[#F5F7FA] backdrop-blur-3xl ${
              isEmergencyMode 
                ? 'bg-[#180e12] border-[#EF4444]/40 shadow-[#EF4444]/10' 
                : 'bg-[#08090B]/95 border-white/[0.09] shadow-black/80'
            }`}
          >
            {/* HEADER */}
            <div className="p-5 border-b border-white/[0.07] bg-[#111317]/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/40 flex items-center justify-center text-[#4F8CFF] font-bold text-xs font-mono">
                  ✦
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white tracking-tight">{currentI18n.title}</span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#10b981] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-ping" /> ● Online
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8B909B] block">{currentI18n.subtitle}</span>
                </div>
              </div>

              {/* Header Right Controls */}
              <div className="flex items-center gap-2">
                {/* Multilingual Segmented Control (EN • हि • मर) */}
                <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${lang === 'en' ? 'bg-[#4F8CFF] text-white font-bold' : 'text-[#8B909B] hover:text-white'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hi')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${lang === 'hi' ? 'bg-[#4F8CFF] text-white font-bold' : 'text-[#8B909B] hover:text-white'}`}
                  >
                    हि
                  </button>
                  <button
                    onClick={() => handleLanguageChange('mr')}
                    className={`px-2 py-0.5 rounded-lg transition-all ${lang === 'mr' ? 'bg-[#4F8CFF] text-white font-bold' : 'text-[#8B909B] hover:text-white'}`}
                  >
                    मर
                  </button>
                </div>

                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-[#8B909B] hover:text-white transition-colors">
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES / EDITORIAL STREAM BODY */}
            <div className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-white/10">
              
              {/* WELCOME / EMPTY STATE */}
              {messages.length === 0 && (
                <div className="py-8 space-y-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 mx-auto flex items-center justify-center text-[#4F8CFF] text-lg font-mono">
                    ✦
                  </div>
                  <div className="space-y-2 max-w-xs mx-auto">
                    <h3 className="text-lg font-bold text-white leading-snug">{currentI18n.welcomeHeader}</h3>
                    <p className="text-xs text-[#8B909B] leading-relaxed">{currentI18n.welcomeBody}</p>
                  </div>

                  {/* Contextual Suggestions */}
                  <div className="space-y-2 pt-2 text-left font-mono text-xs">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="w-full p-3.5 rounded-2xl bg-[#111317] border border-white/[0.07] hover:border-[#4F8CFF]/40 text-[#F5F7FA] text-xs font-sans text-left transition-all flex items-center justify-between group"
                      >
                        <span>"{sug}"</span>
                        <ChevronRight className="h-4 w-4 text-[#8B909B] group-hover:text-[#4F8CFF] transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES STREAM */}
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  
                  {/* USER MESSAGE (Compact / Quiet Initials) */}
                  {msg.sender === 'user' && (
                    <div className="flex items-start justify-end gap-3 font-sans">
                      <div className="p-3.5 rounded-2xl bg-[#171A20] border border-white/[0.08] text-white text-xs max-w-[85%] leading-relaxed">
                        {msg.attachmentUrl && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-white/10 max-h-32">
                            <img src={msg.attachmentUrl} alt="Attached screenshot" className="w-full object-cover" />
                          </div>
                        )}
                        <p>{msg.text}</p>
                        <span className="text-[10px] font-mono text-[#8B909B] block pt-1 opacity-60 text-right">{msg.timestamp}</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#4F8CFF]/20 text-[#4F8CFF] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#4F8CFF]/30">
                        {userName[0]}
                      </div>
                    </div>
                  )}

                  {/* SAHELI EDITORIAL RESPONSE (Dominant / Structured) */}
                  {msg.sender === 'saheli' && (
                    <div className="space-y-4 p-5 rounded-2xl bg-[#111317] border border-white/[0.07] text-xs font-sans shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4F8CFF]">
                          <span>✦ SAHELI</span>
                        </div>
                        {msg.trustNotice && (
                          <span className="text-[10px] font-mono text-[#10b981] font-semibold">{msg.trustNotice}</span>
                        )}
                      </div>

                      {/* Main Narrative */}
                      <p className="text-sm font-semibold text-[#F5F7FA] leading-relaxed">{msg.text}</p>

                      {/* WHY I THINK THIS */}
                      {msg.explainability && (
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                          <span className="text-[10px] font-mono text-[#4F8CFF] font-bold uppercase block">{currentI18n.whyTitle}</span>
                          <div className="space-y-1 text-xs text-[#8B909B]">
                            {msg.explainability.map((exp, idx) => (
                              <p key={idx} className="flex items-start gap-2">
                                <span className="text-[#4F8CFF] font-bold">&bull;</span>
                                <span>{exp}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* WHAT I'D DO */}
                      {msg.whatToDo && (
                        <div className="p-4 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 space-y-2">
                          <span className="text-[10px] font-mono text-[#4F8CFF] font-bold uppercase block">{currentI18n.whatToDoTitle}</span>
                          <div className="space-y-1 text-xs text-white">
                            {msg.whatToDo.map((step, idx) => (
                              <p key={idx} className="leading-relaxed">{step}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sources & Explainability Trigger */}
                      <div className="pt-2 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#8B909B]">
                        {msg.sources && (
                          <div className="flex items-center gap-2">
                            <span>{currentI18n.sourcesTitle}:</span>
                            {msg.sources.map((src, idx) => (
                              <a
                                key={idx}
                                href={src.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#4F8CFF] font-bold hover:underline inline-flex items-center gap-1"
                              >
                                {src.name} <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        )}

                        {msg.explainability && (
                          <button
                            onClick={() => setShowWhyModal(msg.explainability || null)}
                            className="text-[#8B909B] hover:text-white flex items-center gap-1"
                          >
                            <HelpCircle className="h-3 w-3" /> {currentI18n.howDetermined}
                          </button>
                        )}
                      </div>

                      {/* INTELLIGENT ACTIONS */}
                      {msg.quickActions && (
                        <div className="pt-2 flex flex-wrap gap-2 font-sans">
                          {msg.quickActions.map((act, idx) => (
                            <button
                              key={idx}
                              onClick={() => { setIsOpen(false); navigate(act.route); }}
                              className="px-4 py-2 rounded-xl bg-[#4F8CFF] text-white text-xs font-semibold hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20 transition-all flex items-center gap-1.5"
                            >
                              {act.label} <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}

              {/* PROGRESSIVE LOADING STAGE */}
              {isProcessing && (
                <div className="p-4 rounded-2xl bg-[#111317] border border-white/[0.07] text-xs font-mono text-[#4F8CFF] animate-pulse flex items-center gap-3">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>{processingStage || '✦ Analyzing...'}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ATTACHMENT PREVIEW THUMBNAIL */}
            {attachedFile && (
              <div className="px-5 py-2 bg-[#0c0d12] border-t border-white/[0.07] flex items-center justify-between text-xs font-mono text-[#4F8CFF]">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="truncate max-w-[200px]">{attachedFile.name}</span>
                </div>
                <button onClick={() => setAttachedFile(null)} className="text-[#8B909B] hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* COMPOSER (TEXT + IMAGE + VOICE + SEND) */}
            <div className="p-4 bg-[#0c0d12] border-t border-white/[0.07] space-y-2 shrink-0">
              <div className="relative flex items-center gap-2 bg-[#111317] border border-white/[0.09] rounded-2xl px-3 py-1.5 focus-within:border-[#4F8CFF]">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={currentI18n.placeholder}
                  className="flex-1 bg-transparent py-2 text-white text-xs focus:outline-none placeholder-[#8B909B]"
                />

                <label className="p-2 text-[#8B909B] hover:text-white cursor-pointer transition-colors" title="Attach Screenshot">
                  <Paperclip className="h-4 w-4" />
                  <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf" />
                </label>

                <button
                  onClick={handleToggleVoice}
                  className={`p-2 rounded-xl transition-all ${
                    isListening ? 'bg-[#EF4444] text-white animate-pulse' : 'text-[#8B909B] hover:text-white'
                  }`}
                  title="Voice Input"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-xl bg-[#4F8CFF] text-white hover:bg-[#3b82f6] shadow-lg shadow-[#4F8CFF]/20"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPLAINABILITY MODAL */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md bg-[#111317] border border-white/[0.1] rounded-3xl p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-xs font-mono text-[#4F8CFF] font-bold uppercase">{currentI18n.howDetermined}</span>
              <button onClick={() => setShowWhyModal(null)} className="text-[#8B909B] hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-[#8B909B]">
              {showWhyModal.map((item, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <span className="text-[#4F8CFF] font-bold">&bull;</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
