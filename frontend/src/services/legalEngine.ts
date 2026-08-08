export interface ITActProvision {
  section: string;
  offense: string;
  punishment: string;
}

export interface LegalComplaintReport {
  caseId: string;
  complainantName: string;
  date: string;
  applicableSections: ITActProvision[];
  formalComplaintText: string;
  ncwGuidance: string;
  cybercrimePortalUrl: string;
}

export function generateLegalComplaint(caseTitle: string, summary: string): LegalComplaintReport {
  return {
    caseId: `LEGAL-${Math.floor(1000 + Math.random() * 9000)}`,
    complainantName: 'Anushka Sharma',
    date: new Date().toLocaleDateString(),
    applicableSections: [
      { section: 'IT Act Section 66D', offense: 'Cheating by personation using computer resource', punishment: 'Imprisonment up to 3 years and fine up to Rs 1 lakh' },
      { section: 'IT Act Section 66E', offense: 'Violation of privacy / publishing private images without consent', punishment: 'Imprisonment up to 3 years and fine up to Rs 2 lakh' },
      { section: 'IPC Section 507', offense: 'Criminal intimidation by anonymous communication', punishment: 'Imprisonment up to 2 years' }
    ],
    formalComplaintText: `To,
The Officer-in-Charge,
National Cyber Crime Reporting Portal / Local Cyber Crime Police Station.

SUBJECT: FORMAL COMPLAINT REGARDING ONLINE IMPERSONATION, EXTORTION, AND CYBER HARASSMENT UNDER IT ACT 2000.

Respected Sir/Madam,

I am filing this official complaint regarding an online cybercrime incident titled "${caseTitle}".

INCIDENT SUMMARY:
${summary}

FORENSIC EVIDENCE ATTACHED:
1. Cryptographic SHA-256 Hashes of uploaded chat screenshots & payment solicitations.
2. Extracted Suspect Handles: @amazon_wfh_recruiter, UPI Handle: solicit@okaxis.
3. Timestamped minute-by-minute investigation log.

APPLICABLE LEGAL PROVISIONS:
- Section 66D of Information Technology Act 2000 (Impersonation)
- Section 66E of Information Technology Act 2000 (Privacy Violation)
- Section 507 of Indian Penal Code (Criminal Intimidation)

I request your urgent intervention to freeze the suspect UPI accounts and register an official FIR.

Yours Sincerely,
Anushka Sharma`,
    ncwGuidance: 'The National Commission for Women (NCW) operates a dedicated 24/7 Helpline for women facing cyberstalking, harassment, and financial coercion (7827170170).',
    cybercrimePortalUrl: 'https://cybercrime.gov.in'
  };
}
