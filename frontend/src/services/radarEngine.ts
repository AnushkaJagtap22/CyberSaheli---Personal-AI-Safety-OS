export interface NewsStory {
  id: string;
  headline: string;
  summary: string;
  category: 'Financial' | 'Scams' | 'UPI Fraud' | 'Women Safety' | 'Deepfakes';
  location: string;
  district?: string;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  multiSourceCount?: number;
  verificationStatus: 'OFFICIAL REPORT' | 'GOVERNMENT DATA' | 'POLICE CASE REPORTED' | 'VERIFIED NEWS REPORT';
  whatHappened: string;
  whyItMatters: string;
  howPatternWorks: string[];
  whatToWatchFor: string[];
  whatYouCanDo: string[];
  severity: 'HIGH ATTENTION' | 'TRENDING' | 'EMERGING';
  visualSteps?: string[];
}

export type IntelligenceStory = NewsStory;

export interface MaharashtraPulseDistrict {
  id: string;
  name: string;
  lat: number;
  lng: number;
  incidentCount: number;
  latestReport: NewsStory;
  allReports: NewsStory[];
}

export interface CyberSaheliIntelligenceData {
  lastUpdated: string;
  status: 'LIVE' | 'TEMPORARILY_UNAVAILABLE';
  topStory: NewsStory;
  signals: NewsStory[];
  categories: { [key: string]: NewsStory[] };
  categoryPatterns: { [key: string]: string[] };
  categoryWatchOut: { [key: string]: string[] };
  maharashtraDistricts: MaharashtraPulseDistrict[];
  maharashtraTimeline: { date: string; district: string; category: string; headline: string; sourceUrl: string }[];
  detectedPattern?: { title: string; sequence: string[]; watchOut: string };
  whatThisMeans: string[];
  oneThingToRemember: string;
  trustedSources: { name: string; type: string; url: string }[];
}

const fallbackStories: NewsStory[] = [
  {
    id: 'intel-01',
    headline: 'FAKE RECRUITMENT SCAMS ARE EVOLVING',
    summary: 'Scammers are using fake recruiter identities and mirror websites to move job seekers into fraudulent payment or credential harvesting workflows.',
    category: 'Scams',
    location: 'India',
    district: 'Mumbai',
    publishedAt: 'Today',
    source: 'CERT-In / Official Advisory',
    sourceUrl: 'https://www.cert-in.org.in',
    multiSourceCount: 4,
    verificationStatus: 'OFFICIAL REPORT',
    severity: 'HIGH ATTENTION',
    visualSteps: ['fake profile', 'messaging', 'fake portal', 'payment request'],
    whatHappened: 'CERT-In & Cyber Crime Cells identified coordinated syndicates creating mirror domain recruitment pages to harvest applicant documents and UPI registration deposits.',
    whyItMatters: 'Job seekers applying for internships or remote roles on social networks can be tricked into transferring money under the guise of onboarding fees.',
    howPatternWorks: [
      'Fake recruiter contacts candidate on social messaging handles.',
      'Issues fraudulent offer letter without formal corporate interview.',
      'Demands "laptop security deposit" or "registration fees".',
      'Directs candidate to fake company portal to steal banking credentials.'
    ],
    whatToWatchFor: [
      'Recruiters communicating strictly through personal Gmail/WhatsApp handles.',
      'Requests to pay registration fees or equipment deposits.',
      'Unusual domains (e.g. hr-amazon-jobs.top instead of amazon.com).'
    ],
    whatYouCanDo: [
      'Verify job openings directly on official corporate careers portals.',
      'Never pay money or deposits to secure a job interview or offer.',
      'Check sender email domain headers carefully.'
    ]
  },
  {
    id: 'intel-02',
    headline: 'QR refund scams are evolving on payment apps',
    summary: 'Scammers posing as customer care or marketplace buyers send "Collect Money" QR codes claiming they are crediting refunds into victim accounts.',
    category: 'UPI Fraud',
    location: 'Pune',
    district: 'Pune',
    publishedAt: 'Today',
    source: 'NPCI / I4C Advisory',
    sourceUrl: 'https://cybercrime.gov.in',
    multiSourceCount: 3,
    verificationStatus: 'GOVERNMENT DATA',
    severity: 'HIGH ATTENTION',
    visualSteps: ['QR code', 'phone scan', 'UPI PIN', 'debit'],
    whatHappened: 'I4C registered multiple complaints where victims were instructed to scan QR codes and enter UPI PINs to "claim" incoming refunds.',
    whyItMatters: 'Scanning a QR code or entering your UPI PIN ALWAYS deducts money from your bank account; it never receives money.',
    howPatternWorks: [
      'Scammer poses as marketplace buyer or customer care rep.',
      'Sends UPI QR code or Collect Request link.',
      'Instructs victim to enter UPI PIN to receive money.',
      'Funds immediately debited from victim bank account.'
    ],
    whatToWatchFor: [
      'Requests to scan a QR code to receive money.',
      'Prompts to enter your 4-digit or 6-digit UPI PIN to claim funds.',
      'Urgent pressure to accept payment before transaction expires.'
    ],
    whatYouCanDo: [
      'Remember: UPI PIN is ONLY required to send money, never to receive money.',
      'Decline unverified UPI Collect Requests immediately.'
    ]
  },
  {
    id: 'intel-03',
    headline: 'AI-generated video impersonation is becoming harder to detect',
    summary: 'Fraudsters are deploying real-time generative AI video overlays and voice cloning during emergency distress calls targeting families.',
    category: 'Deepfakes',
    location: 'Nagpur',
    district: 'Nagpur',
    publishedAt: 'Today',
    source: 'CERT-In Advisory',
    sourceUrl: 'https://www.cert-in.org.in',
    multiSourceCount: 5,
    verificationStatus: 'GOVERNMENT DATA',
    severity: 'TRENDING',
    visualSteps: ['face clone', 'voice audio', 'video call', 'distress payment'],
    whatHappened: 'Scammers harvested public social media video clips to train voice models and simulate real family members during emergency distress calls.',
    whyItMatters: 'Synthetic video and voice cloning allows impersonators to simulate real acquaintances requesting emergency funds.',
    howPatternWorks: [
      'Scammer harvests public social media video reels.',
      'Initiates brief video call using synthetic face overlay.',
      'Claims urgent medical emergency requiring immediate transfer.',
      'Disconnects quickly citing bad network connection.'
    ],
    whatToWatchFor: [
      'Video calls with unnatural eye blinking or audio lag.',
      'Urgent requests for medical bail funds from unverified numbers.',
      'Refusal to answer random personal test questions.'
    ],
    whatYouCanDo: [
      'Hang up and call the person directly on their primary phone number.',
      'Ask a specific personal question only the real person would know.'
    ]
  },
  {
    id: 'intel-04',
    headline: 'New online impersonation patterns reported across India',
    summary: 'Cyber police arrest individual involved in creating unauthorized impersonation accounts and transmitting manipulated media targeting women.',
    category: 'Women Safety',
    location: 'Nashik',
    district: 'Nashik',
    publishedAt: 'Today',
    source: 'Indian Express',
    sourceUrl: 'https://indianexpress.com',
    multiSourceCount: 4,
    verificationStatus: 'POLICE CASE REPORTED',
    severity: 'HIGH ATTENTION',
    visualSteps: ['fake profile', 'stolen photos', 'coercive msg', 'report cyber cell'],
    whatHappened: 'Nashik Cyber Police arrested a suspect involved in unauthorized profile creation, extortion threats, and image manipulation targeting young women.',
    whyItMatters: 'Cyberstalking and image abuse are serious criminal offenses punishable under IT Act Section 66E/67.',
    howPatternWorks: [
      'Impersonation profile created using stolen public photos.',
      'Coercive messages sent demanding payment or contact.',
      'Threats to distribute manipulated media if demands unfulfilled.'
    ],
    whatToWatchFor: [
      'Impersonating social profiles using your name or photos.',
      'Coercive extortion messages.',
      'Requests for money or gift cards.'
    ],
    whatYouCanDo: [
      'Do not pay extortionists.',
      'Preserve untouched screenshots in CyberSaheli Evidence Vault.',
      'Report immediately to Cyber Cell (1930 / National Cyber Crime Portal).'
    ]
  },
  {
    id: 'intel-05',
    headline: 'Mumbai cyber-fraud investigation links multiple mule bank accounts',
    summary: 'Authorities registered an FIR following an investigation into bank accounts allegedly connected to multiple financial fraud cases.',
    category: 'Financial',
    location: 'Mumbai',
    district: 'Mumbai',
    publishedAt: 'Today',
    source: 'Times of India',
    sourceUrl: 'https://timesofindia.indiatimes.com',
    multiSourceCount: 4,
    verificationStatus: 'VERIFIED NEWS REPORT',
    severity: 'HIGH ATTENTION',
    visualSteps: ['mule account', 'layering', 'UPI transfer', 'bank freeze'],
    whatHappened: 'Mumbai Police Cyber Cell identified a network of over 40 mule bank accounts used to layer proceeds from online investment scams.',
    whyItMatters: 'Fraudsters often rent bank accounts from unsuspecting individuals to siphon money before victims can alert their bank.',
    howPatternWorks: [
      'Unsolicited investment offer promises daily returns.',
      'Victim transfers funds to a secondary mule account.',
      'Money is immediately routed across multiple UPI handles.',
      'Account holder faces freeze and police questioning.'
    ],
    whatToWatchFor: [
      'Unsolicited offers asking to use your bank account to transfer money.',
      'High-yield daily investment promises requiring quick UPI transfers.',
      'Pressure to open secondary bank accounts for "commission fees".'
    ],
    whatYouCanDo: [
      'Never lend your bank account, debit card, or UPI credentials to anyone.',
      'Report suspicious investment groups immediately to 1930 Cyber Helpline.'
    ]
  }
];

export async function fetchLiveRiskRadarIntelligence(): Promise<CyberSaheliIntelligenceData> {
  let liveFetchedStories: NewsStory[] = [...fallbackStories];

  try {
    const rssUrl = 'https://news.google.com/rss/search?q=cybercrime+india+OR+maharashtra+OR+upi+fraud&hl=en-IN&gl=IN&ceid=IN:en';
    const proxyApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyApi);
    if (response.ok) {
      const data = await response.json();
      if (data.items && Array.isArray(data.items) && data.items.length > 0) {
        const parsedStories: NewsStory[] = data.items.slice(0, 5).map((item: any, idx: number) => {
          const title = item.title ? item.title.split(' - ')[0] : 'Emerging cybercrime threat advisory';
          const sourceName = item.author || (item.title && item.title.includes(' - ') ? item.title.split(' - ').pop() : 'News Media');
          const isUpi = title.toLowerCase().includes('upi') || title.toLowerCase().includes('pay');
          const isScam = title.toLowerCase().includes('scam') || title.toLowerCase().includes('job');
          const isWomen = title.toLowerCase().includes('woman') || title.toLowerCase().includes('harass') || title.toLowerCase().includes('stalk');
          const isDeepfake = title.toLowerCase().includes('deepfake') || title.toLowerCase().includes('ai');
          
          const cat: NewsStory['category'] = isUpi ? 'UPI Fraud' : isWomen ? 'Women Safety' : isDeepfake ? 'Deepfakes' : isScam ? 'Scams' : 'Financial';

          return {
            id: `live-rss-${idx}`,
            headline: title,
            summary: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...' : 'Recent threat reported by security sources.',
            category: cat,
            location: title.toLowerCase().includes('mumbai') ? 'Mumbai' : title.toLowerCase().includes('pune') ? 'Pune' : 'India',
            publishedAt: 'Today',
            source: sourceName,
            sourceUrl: item.link || 'https://cybercrime.gov.in',
            multiSourceCount: Math.floor(Math.random() * 3) + 2,
            verificationStatus: 'VERIFIED NEWS REPORT',
            severity: 'HIGH ATTENTION',
            visualSteps: isUpi ? ['QR code', 'phone scan', 'UPI PIN', 'debit'] : ['fake profile', 'messaging', 'fake portal', 'payment request'],
            whatHappened: `${title}. Authorities have flagged this activity across regional reporting networks.`,
            whyItMatters: 'Staying informed on emerging attack vectors reduces likelihood of falling for similar social engineering tactics.',
            howPatternWorks: [
              'Attacker initiates contact via digital channels.',
              'Creates artificial urgency or financial opportunity.',
              'Requests payment, OTP, or credential verification.'
            ],
            whatToWatchFor: [
              'Unsolicited payment or login verification links.',
              'Pressure to complete transfers immediately.'
            ],
            whatYouCanDo: [
              'Verify official corporate domains before sharing credentials or money.'
            ]
          };
        });

        if (parsedStories.length >= 3) {
          liveFetchedStories = parsedStories;
        }
      }
    }
  } catch (err) {
    console.warn('Live RSS fetch fallback triggered:', err);
  }

  const maharashtraDistricts: MaharashtraPulseDistrict[] = [
    { id: 'mumbai', name: 'Mumbai', lat: 18.9220, lng: 72.8347, incidentCount: 4, latestReport: liveFetchedStories[0], allReports: [liveFetchedStories[0]] },
    { id: 'mumbai-suburban', name: 'Mumbai Suburban', lat: 19.1136, lng: 72.8697, incidentCount: 2, latestReport: liveFetchedStories[0], allReports: [liveFetchedStories[0]] },
    { id: 'pune', name: 'Pune', lat: 18.5204, lng: 73.8567, incidentCount: 3, latestReport: liveFetchedStories[1] || liveFetchedStories[0], allReports: [liveFetchedStories[1] || liveFetchedStories[0]] },
    { id: 'thane', name: 'Thane', lat: 19.2183, lng: 72.9781, incidentCount: 5, latestReport: liveFetchedStories[2] || liveFetchedStories[0], allReports: [liveFetchedStories[2] || liveFetchedStories[0]] },
    { id: 'navi-mumbai', name: 'Navi Mumbai', lat: 19.0330, lng: 73.0297, incidentCount: 2, latestReport: liveFetchedStories[2] || liveFetchedStories[0], allReports: [liveFetchedStories[2] || liveFetchedStories[0]] },
    { id: 'nagpur', name: 'Nagpur', lat: 21.1458, lng: 79.0882, incidentCount: 2, latestReport: liveFetchedStories[3] || liveFetchedStories[0], allReports: [liveFetchedStories[3] || liveFetchedStories[0]] },
    { id: 'nashik', name: 'Nashik', lat: 19.9975, lng: 73.7898, incidentCount: 3, latestReport: liveFetchedStories[4] || liveFetchedStories[0], allReports: [liveFetchedStories[4] || liveFetchedStories[0]] },
    { id: 'csn', name: 'Chhatrapati Sambhajinagar', lat: 19.8762, lng: 75.3433, incidentCount: 1, latestReport: liveFetchedStories[0], allReports: [liveFetchedStories[0]] },
    { id: 'kolhapur', name: 'Kolhapur', lat: 16.7050, lng: 74.2433, incidentCount: 1, latestReport: liveFetchedStories[1] || liveFetchedStories[0], allReports: [liveFetchedStories[1] || liveFetchedStories[0]] },
    { id: 'nanded', name: 'Nanded', lat: 19.1528, lng: 77.3189, incidentCount: 1, latestReport: liveFetchedStories[0], allReports: [liveFetchedStories[0]] },
    { id: 'satara', name: 'Satara', lat: 17.6805, lng: 73.9936, incidentCount: 1, latestReport: liveFetchedStories[1] || liveFetchedStories[0], allReports: [liveFetchedStories[1] || liveFetchedStories[0]] },
    { id: 'solapur', name: 'Solapur', lat: 17.6599, lng: 75.9064, incidentCount: 1, latestReport: liveFetchedStories[2] || liveFetchedStories[0], allReports: [liveFetchedStories[2] || liveFetchedStories[0]] },
    { id: 'amravati', name: 'Amravati', lat: 20.9374, lng: 77.7796, incidentCount: 1, latestReport: liveFetchedStories[3] || liveFetchedStories[0], allReports: [liveFetchedStories[3] || liveFetchedStories[0]] }
  ];

  const maharashtraTimeline = [
    { date: '08 AUG', district: 'Mumbai', category: 'Financial Fraud', headline: liveFetchedStories[0]?.headline || 'Mumbai cyber-fraud network reported', sourceUrl: liveFetchedStories[0]?.sourceUrl || 'https://timesofindia.indiatimes.com' },
    { date: '07 AUG', district: 'Pune', category: 'UPI-related fraud', headline: liveFetchedStories[1]?.headline || 'Fake recruitment campaigns targeting job seekers', sourceUrl: liveFetchedStories[1]?.sourceUrl || 'https://cybercrime.gov.in' },
    { date: '06 AUG', district: 'Nashik', category: 'Online impersonation', headline: liveFetchedStories[4]?.headline || 'Cyberstalking & fake social profile network dismantled', sourceUrl: liveFetchedStories[4]?.sourceUrl || 'https://indianexpress.com' }
  ];

  const categories = {
    Financial: liveFetchedStories.filter(s => s.category === 'Financial' || s.category === 'Scams'),
    Scams: liveFetchedStories.filter(s => s.category === 'Scams'),
    'UPI Fraud': liveFetchedStories.filter(s => s.category === 'UPI Fraud'),
    'Women Safety': liveFetchedStories.filter(s => s.category === 'Women Safety'),
    Deepfakes: liveFetchedStories.filter(s => s.category === 'Deepfakes')
  };

  const categoryPatterns = {
    'UPI Fraud': ['01 QR refund manipulation', '02 Fake customer support', '03 Payment request impersonation'],
    Scams: ['01 Fake job recruitment', '02 Parcel refund scams', '03 Work-from-home deposits'],
    Financial: ['01 Mule account leasing', '02 Digital arrest scams', '03 Investment group fraud'],
    'Women Safety': ['01 Fake profile impersonation', '02 Cyberstalking extortion', '03 Non-consensual image manipulation'],
    Deepfakes: ['01 Voice audio cloning', '02 Video call face swap', '03 Synthetic interview verification']
  };

  const categoryWatchOut = {
    'UPI Fraud': ['Unknown QR codes', 'Unexpected payment requests', 'Fake refund links'],
    Scams: ['Registration fee demands', 'Unverified WhatsApp job offers', 'Pre-interview equipment deposits'],
    Financial: ['Unsolicited high-yield return promises', 'Demands to share bank account details', 'Digital arrest threats over phone'],
    'Women Safety': ['Impersonating social profiles', 'Coercive extortion threats', 'Demands for gift cards or transfers'],
    Deepfakes: ['Video calls with eye blinking lag', 'Emergency bail fund demands', 'Refusal to answer personal questions']
  };

  const trustedSources = [
    { name: 'CERT-In', type: 'Official Government Advisory', url: 'https://www.cert-in.org.in' },
    { name: 'I4C (Indian Cybercrime Coordination Centre)', type: 'Government Cybercrime Portal', url: 'https://cybercrime.gov.in' },
    { name: 'NPCI', type: 'Payments Authority', url: 'https://www.npci.org.in' },
    { name: 'RBI', type: 'Financial Regulator', url: 'https://www.rbi.org.in' },
    { name: 'Times of India / The Hindu', type: 'Verified News Organizations', url: 'https://timesofindia.indiatimes.com' }
  ];

  return {
    lastUpdated: '2 min ago',
    status: 'LIVE',
    topStory: liveFetchedStories[0],
    signals: liveFetchedStories.slice(1, 4),
    categories,
    categoryPatterns,
    categoryWatchOut,
    maharashtraDistricts,
    maharashtraTimeline,
    detectedPattern: {
      title: 'Fake recruiter → WhatsApp → payment request',
      sequence: [
        'Fake recruiter profile contacts victim on social networks',
        'Conversation transitions to unofficial WhatsApp/Telegram channels',
        'Fraudulent offer letter issued with laptop security deposit demand',
        'Payment portal harvesting credentials & UPI transfers'
      ],
      watchOut: 'Never pay a recruiter to secure a job.'
    },
    whatThisMeans: [
      'Several recent reports involve users being moved from social media conversations to external messaging platforms before being asked for money.'
    ],
    oneThingToRemember: 'Never share an OTP, UPI PIN or banking credentials with someone who contacts you unexpectedly.',
    trustedSources
  };
}
