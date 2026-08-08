export interface AcademyModule {
  id: string;
  title: { en: string; hi: string; mr: string };
  category: string;
  durationMinutes: number;
  scenarioDescription: { en: string; hi: string; mr: string };
  quizQuestions: {
    question: { en: string; hi: string; mr: string };
    options: { en: string[]; hi: string[]; mr: string[] };
    correctIndex: number;
    explanation: { en: string; hi: string; mr: string };
  }[];
}

export const academyModules: AcademyModule[] = [
  {
    id: 'mod-1',
    title: {
      en: 'Spotting Fake Internship & Work From Home Scams',
      hi: 'नकली इंटर्नशिप और वर्क फ्रॉम होम फ्रॉड को पहचानें',
      mr: 'खोट्या इंटर्नशिप आणि वर्क फ्रॉम होम घोटाळ्यांना ओळखा'
    },
    category: 'Employment Phishing',
    durationMinutes: 5,
    scenarioDescription: {
      en: 'A recruiter on Instagram offers $450/week remote work but demands Rs 4,999 security fee before sending a laptop.',
      hi: 'इंस्टाग्राम पर एक रिक्रूटटर $450/सप्ताह रिमोट जॉब का अवसर देता है लेकिन लैपटॉप भेजने से पहले ₹4,999 की फीस मांगता है।',
      mr: 'इन्स्टाग्रामवरील रिक्रूटर दरमहा चांगल्या पगाराची नोकरी देतो पण लॅपटॉप पाठवण्यापूर्वी ₹4,999 फी मागतो.'
    },
    quizQuestions: [
      {
        question: {
          en: 'Should a genuine employer ever ask you to pay money to receive a work laptop?',
          hi: 'क्या कोई असली नियोक्ता आपसे लैपटॉप प्राप्त करने के लिए पैसे मांगने का हक रखता है?',
          mr: 'एखाद्या खऱ्या कंपनीने कामाचा लॅपटॉप देण्यासाठी पैसे मागणे योग्य आहे का?'
        },
        options: {
          en: ['Yes, registration fees are normal', 'No, genuine employers never demand fees', 'Only if paid via UPI', 'Yes, if refunded later'],
          hi: ['हां, रजिस्ट्रेशन फीस सामान्य है', 'नहीं, असली नियोक्ता कभी पैसे नहीं मांगते', 'केवल यूपीआई से भुगतान पर', 'हां, अगर बाद में वापस मिले'],
          mr: ['होय, फी सामान्य आहे', 'नाही, खऱ्या कंपन्या कधीही फी मागत नाहीत', 'फक्त UPI द्वारे', 'होय, नंतर परत मिळणार असल्यास']
        },
        correctIndex: 1,
        explanation: {
          en: 'Genuine corporate employers will NEVER ask candidates for money or security deposits.',
          hi: 'असली कॉर्पोरेट कंपनियां उम्मीदवारों से कभी कोई फीस या सुरक्षा जमा नहीं मांगती हैं।',
          mr: 'खऱ्या कंपन्या उमेदवारांकडून कोणतीही फी किंवा सिक्युरिटी डिपॉझिट मागत नाहीत.'
        }
      }
    ]
  }
];
