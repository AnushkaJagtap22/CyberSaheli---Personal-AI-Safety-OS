export interface BehavioralTimelineEvent {
  day: string;
  stage: string;
  description: string;
  technique: string;
  whyItMatters: string;
}

export interface ScamPatternAnalysis {
  riskScore: number;
  detectedPatterns: string[];
  timeline: BehavioralTimelineEvent[];
}

export function analyzeScamPatterns(_input?: string): ScamPatternAnalysis {
  return {
    riskScore: 88,
    detectedPatterns: [
      'Love Bombing & Rapid Intimacy',
      'Urgency & Emotional Blackmail',
      'Unverified Payment Solicitations',
      'Isolation Tactics'
    ],
    timeline: [
      {
        day: 'Day 1',
        stage: 'Friendly Introduction',
        description: 'Initial polite greeting on Instagram DM.',
        technique: 'Rapport Building',
        whyItMatters: 'Establishes initial contact without raising security red flags.'
      },
      {
        day: 'Day 3',
        stage: 'Frequent Compliments & Love Bombing',
        description: 'Excessive affection and claims of deep emotional bond.',
        technique: 'Love Bombing',
        whyItMatters: 'Lowers psychological defenses and creates emotional dependency.'
      },
      {
        day: 'Day 5',
        stage: 'Requested Private Chat Channel',
        description: 'Insisted on moving conversation from Instagram to private Telegram.',
        technique: 'Isolation Tactics',
        whyItMatters: 'Bypasses platform reporting tools and isolates victim from friends.'
      },
      {
        day: 'Day 8',
        stage: 'Fabricated Financial Emergency',
        description: 'Claimed sudden medical crisis or wallet theft during transit.',
        technique: 'Emergency Panic Simulation',
        whyItMatters: 'Forces victim into urgent emotional decision-making.'
      },
      {
        day: 'Day 9',
        stage: 'Direct Financial Solicitations',
        description: 'Requested Rs 3,500 transfer to third-party UPI handle solicit@okaxis.',
        technique: 'Financial Extortion',
        whyItMatters: 'Primary goal of romance and imposter scam campaigns.'
      },
      {
        day: 'Day 10',
        stage: 'Emotional Blackmail & Threat Escalation',
        description: 'Threatened to end relationship or publish private photos if money is not sent immediately.',
        technique: 'Threat Escalation',
        whyItMatters: 'Coercive extortion designed to prevent victim from taking time to verify.'
      }
    ]
  };
}
