export interface AccountNode {
  name: string;
  category: 'Email' | 'Social' | 'Messaging' | 'Financial';
  status: 'CRITICAL' | 'NEEDS_ATTENTION' | 'SECURED';
  riskDetail: string;
  recommendedTasks: string[];
}

export interface RecoveryTask {
  id: string;
  title: string;
  plainLanguageReason: string;
  explainabilityPoints: string[];
  category: 'Account' | 'Financial' | 'Privacy' | 'Evidence' | 'Platform';
  priority: 'CRITICAL' | 'HIGH' | 'RECOMMENDED' | 'OPTIONAL';
  estimatedTime: string;
  officialUrl?: string;
  stage: 'preserve' | 'secure' | 'protect' | 'report' | 'monitor';
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  completedBy?: 'user' | 'system';
  completedAt?: string;
  steps: { stepNumber: number; instruction: string; actionLabel: string }[];
}

export interface RecoveryJournalEntry {
  id: string;
  timestamp: string;
  action: string;
  isUserNote?: boolean;
}

export interface RecoveryPlan {
  incidentId: string;
  incidentType: string;
  readinessCompleted: number;
  readinessTotal: number;
  activeStage: 'preserve' | 'secure' | 'protect' | 'report' | 'monitor';
  nextBestAction: RecoveryTask;
  tasks: RecoveryTask[];
  accounts: AccountNode[];
  privacyExposure: { item: string; exposed: boolean }[];
  financialLoss?: { amount: string; type: string; status: 'Reported' | 'Not Reported'; txnId: string; vpa: string };
  history: RecoveryJournalEntry[];
  readinessChecks: { label: string; completed: boolean }[];
  monitoringReminders: { period: string; task: string }[];
  smartQuestion?: { id: string; question: string; options: string[]; answered?: string };
}

export function buildDynamicRecoveryPlan(incidentType: string = 'Recruitment Scam'): RecoveryPlan {
  const isRecruitmentScam = incidentType.toLowerCase().includes('job') || incidentType.toLowerCase().includes('recruitment');
  const isFinancial = incidentType.toLowerCase().includes('financial') || isRecruitmentScam;

  const tasks: RecoveryTask[] = [
    {
      id: 'task-1',
      title: 'Secure your email account',
      plainLanguageReason: 'Your email may be used to recover other accounts connected to this incident.',
      explainabilityPoints: [
        'Your primary email is connected to multiple affected handles.',
        'Account password recovery across services depends on this email.',
        'Evidence suggests increased risk of secondary credential resets.'
      ],
      category: 'Account',
      priority: 'CRITICAL',
      estimatedTime: '~3 minutes',
      officialUrl: 'https://myaccount.google.com/security',
      stage: 'secure',
      status: 'pending',
      steps: [
        { stepNumber: 1, instruction: 'Open your email security dashboard in a new tab.', actionLabel: 'Open Official Settings →' },
        { stepNumber: 2, instruction: 'Change your password to a new passphrase you haven\'t used elsewhere.', actionLabel: 'I\'ve Changed Password' },
        { stepNumber: 3, instruction: 'Review active sessions and sign out of any devices you don\'t recognize.', actionLabel: 'I\'ve Reviewed Sessions' },
        { stepNumber: 4, instruction: 'Enable Two-Factor Authentication (2FA) via Authenticator app.', actionLabel: 'I\'ve Enabled 2FA' }
      ]
    },
    {
      id: 'task-2',
      title: 'Preserve conversation evidence before blocking',
      plainLanguageReason: 'Saving untouched screenshots and conversation exports in your Evidence Vault ensures you retain proof if the sender deletes their account.',
      explainabilityPoints: [
        'Conversation history contains critical timestamps and handle references.',
        'Preserving hashes prevents evidence loss if sender deletes account.'
      ],
      category: 'Evidence',
      priority: 'CRITICAL',
      estimatedTime: '~2 minutes',
      stage: 'preserve',
      status: 'completed',
      completedBy: 'system',
      completedAt: '12:42 PM',
      steps: [
        { stepNumber: 1, instruction: 'Do not delete or clear the chat history.', actionLabel: 'Understood' },
        { stepNumber: 2, instruction: 'Save full conversation screenshots into your CyberSaheli Evidence Vault.', actionLabel: 'Preserved in Vault' }
      ]
    },
    {
      id: 'task-3',
      title: 'Report impersonating account on platform',
      plainLanguageReason: 'Reporting the handle notifies platform trust teams so they can take down the fake profile before others are targeted.',
      explainabilityPoints: [
        'Reporting notifies trust & safety teams for swift account takedown.',
        'Prevents further unauthorized outreach to your contacts.'
      ],
      category: 'Platform',
      priority: 'HIGH',
      estimatedTime: '~4 minutes',
      officialUrl: 'https://help.instagram.com/408330442594618',
      stage: 'report',
      status: 'pending',
      steps: [
        { stepNumber: 1, instruction: 'Open the profile of the suspicious account.', actionLabel: 'Open Profile' },
        { stepNumber: 2, instruction: 'Tap Options (...) and select Report -> Impersonation / Scam.', actionLabel: 'I\'ve Reported Account' }
      ]
    },
    {
      id: 'task-4',
      title: 'Notify bank fraud division & 1930 Helpline',
      plainLanguageReason: 'Promptly notifying your bank within the golden hour maximizes chances of freezing fraudulent UPI transfers.',
      explainabilityPoints: [
        'Bank notification within the golden hour optimizes freeze probability.',
        '1930 Cyber Crime Helpline registers official UTR dispute.'
      ],
      category: 'Financial',
      priority: 'CRITICAL',
      estimatedTime: '~5 minutes',
      stage: 'secure',
      status: 'pending',
      steps: [
        { stepNumber: 1, instruction: 'Call your bank 24/7 fraud helpline immediately.', actionLabel: 'Called Bank' },
        { stepNumber: 2, instruction: 'Provide UTR reference number and recipient UPI handle.', actionLabel: 'Provided UTR Details' },
        { stepNumber: 3, instruction: 'File a complaint on National Cyber Crime Portal (1930).', actionLabel: 'Filed 1930 Complaint' }
      ]
    },
    {
      id: 'task-5',
      title: 'Review connected third-party app permissions',
      plainLanguageReason: 'Unused third-party apps connected to your social handles can retain background access tokens.',
      explainabilityPoints: [
        'Connected third-party apps retain API permissions in background.',
        'Cleaning OAuth tokens prevents persistent unauthorized access.'
      ],
      category: 'Privacy',
      priority: 'RECOMMENDED',
      estimatedTime: '~3 minutes',
      stage: 'protect',
      status: 'pending',
      steps: [
        { stepNumber: 1, instruction: 'Open Account Permissions and remove unauthorized apps.', actionLabel: 'Cleaned Permissions' }
      ]
    }
  ];

  const readinessCompleted = tasks.filter(t => t.status === 'completed').length + 3;
  const readinessTotal = 6;
  const nextBestAction = tasks.find(t => t.status !== 'completed') || tasks[0];

  return {
    incidentId: 'INV-2041',
    incidentType,
    readinessCompleted,
    readinessTotal,
    activeStage: 'secure',
    nextBestAction,
    tasks,
    accounts: [
      { name: 'Email', category: 'Email', status: 'CRITICAL', riskDetail: 'May affect account recovery', recommendedTasks: ['Change password', 'Enable 2FA'] },
      { name: 'Instagram', category: 'Social', status: 'NEEDS_ATTENTION', riskDetail: 'Review active sessions & handle', recommendedTasks: ['Report account', 'Review sessions'] },
      { name: 'WhatsApp', category: 'Messaging', status: 'SECURED', riskDetail: 'Chat export preserved in Vault', recommendedTasks: ['Security PIN active'] },
      { name: 'Payments', category: 'Financial', status: 'NEEDS_ATTENTION', riskDetail: 'Review UPI transactions', recommendedTasks: ['Notify bank', 'File 1930 report'] }
    ],
    privacyExposure: [
      { item: 'Phone Number', exposed: true },
      { item: 'Primary Email', exposed: true },
      { item: 'Home Address', exposed: false },
      { item: 'Identity Document', exposed: true }
    ],
    financialLoss: isFinancial ? {
      amount: '₹4,999',
      type: 'UPI Transfer',
      status: 'Not Reported',
      txnId: 'UTR394820194820',
      vpa: 'solicit@okaxis'
    } : undefined,
    history: [
      { id: 'h-1', timestamp: '12:42 PM', action: 'Evidence preserved' },
      { id: 'h-2', timestamp: '12:51 PM', action: 'Password changed' },
      { id: 'h-3', timestamp: '12:56 PM', action: '2FA enabled' },
      { id: 'h-4', timestamp: '01:02 PM', action: 'Account reported' }
    ],
    readinessChecks: [
      { label: 'Evidence preserved in Vault', completed: true },
      { label: 'Primary email secured', completed: true },
      { label: 'Two-Factor Authentication (2FA) active', completed: true },
      { label: 'Impersonating account reported', completed: true },
      { label: 'Financial fraud reported to bank', completed: false },
      { label: 'Unverified sessions revoked', completed: false }
    ],
    monitoringReminders: [
      { period: 'Next 24 Hours', task: 'Monitor bank statement for unauthorized pending holds' },
      { period: 'Next 3 Days', task: 'Check status of Cyber Crime Helpline 1930 complaint' },
      { period: 'Next 7 Days', task: 'Perform routine security review on primary accounts' }
    ],
    smartQuestion: {
      id: 'sq-1',
      question: 'Did you enter your password on the suspicious link you received?',
      options: ['Yes, I entered it', 'No, I did not enter it', "I'm not sure"]
    }
  };
}
