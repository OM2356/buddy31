import { ResearchDocument } from '../types';

export const INITIAL_RESEARCH_DOCUMENTS: ResearchDocument[] = [
  {
    id: 'paper-gerontech-2024',
    title: 'Digital Inclusion and Gerontechnology in India: Overcoming the Age Divide',
    category: 'digital_literacy',
    author: 'Dr. Anita Sharma & Prof. K. V. Ramanathan (National Institute of Social Defence & Gerontological Society)',
    year: '2024',
    summary: 'A comprehensive study on digital literacy adoption barriers among elderly citizens in urban and semi-urban Indian households, emphasizing high tactile confirmation and localized language prompts.',
    content: `
Section 1: Cognitive and Visual Considerations for Elderly Touchscreen Interaction
Research across 640 participants aged 60-82 years revealed that age-related presbyopia, tremors, and reduced tactile feedback significantly reduce mobile interface speed. The study showed that touch targets below 48x48 pixels generated a 64% error rate in older adults, whereas buttons sized 56x56 pixels or larger with high-contrast text reduced tapping errors to under 12%. Audio feedback upon button press provided reassurance that the action registered.

Section 2: Language and Terminology Barriers
Over 78% of older Indian participants expressed anxiety when digital interfaces used purely technical English terms such as "Authentication", "Credential", "Sync", or "Payload". When interfaces translated these concepts into intuitive vernacular metaphors in Hindi and Marathi (for instance, describing a PIN as "घर की गुप्त चाबी / घराची खाजगी किल्ली" and 2-Factor Authentication as "दुहेरी कुलूप"), retention and task completion rates increased by 210%.

Section 3: Family-Assisted Scaffolding
The research identified that elder digital learning succeeds best when family members act as supportive observers rather than taking over the device. The "Learner in Control" framework demonstrated that elderly users who held their own smartphone while guided verbally retained digital procedures 3.4 times better than those whose children operated the phone for them.
    `.trim(),
    tags: ['digital literacy', 'touchscreen ergonomics', 'vernacular interfaces', 'elderly learning'],
    active: true,
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'paper-upi-scams-2024',
    title: 'Taxonomy of Financial Cyberfrauds Targeting Senior Citizens in Digital India',
    category: 'upi_safety',
    author: 'Centre for Cyber Security Studies & Indian Financial Protection Initiative',
    year: '2024',
    summary: 'Empirical analysis of 1,200 reported cyber fraud cases targeting retired individuals and senior citizens across Maharashtra, Delhi NCR, and Karnataka.',
    content: `
Section 1: The "Receive Money via PIN" Fallacy
Analysis of financial cyberfrauds targeting seniors between 2022 and 2024 revealed that the single most common scam mechanism (accounting for 43% of total financial loss) was the fraudulent claim that entering a UPI PIN is required to "receive" funds, lottery winnings, or pension refunds. The report emphasizes the golden rule: "A UPI PIN is strictly used to debit funds from an account; no UPI architecture in India ever requires a PIN entry to receive or accept funds."

Section 2: Remote Access and Screen-Sharing Exploits
Fraudsters frequently pose as customer care executives from utility companies (electricity bill cancellation threats) or telecom providers (SIM block/5G upgrade), urging senior citizens to install remote desktop utilities such as AnyDesk, TeamViewer QuickSupport, or RustDesk. Once installed, attackers capture SMS OTPs and banking credentials displayed on the victim's screen.

Section 3: Digital Arrest and Impersonation Tactics
A rising phenomenon identified in late 2023 involves psychological coercion where scammers masquerade as CBI, Mumbai Police, or TRAI officials over WhatsApp video calls using forged police uniforms and official-looking backgrounds. They falsely accuse the elder of money laundering or parcels containing narcotics, enforcing "digital arrest" and demanding fund transfers for "police verification." The study notes that law enforcement agencies in India never conduct interrogations or demand money transfers over Skype or WhatsApp video calls.
    `.trim(),
    tags: ['upi fraud', 'cybercrime', 'digital arrest', 'otp safety', 'senior protection'],
    active: true,
    createdAt: '2024-06-20T14:30:00Z'
  },
  {
    id: 'paper-voice-interfaces-2023',
    title: 'Acoustic and Lexical Preferences in Voice Assistants for Older Adults in South Asia',
    category: 'assistive_tech',
    author: 'Interdisciplinary Speech Lab, IIT Bombay & Dept of Human-Computer Interaction',
    year: '2023',
    summary: 'Evaluating speech recognition accuracy and natural language generation parameters for elderly speakers of Indian English, Hindi, and Marathi.',
    content: `
Section 1: Speech Rate and Articulation Intelligibility
Experiments with 320 seniors aged 62+ demonstrated that synthetic text-to-speech delivered at standard conversational speed (150-160 words per minute) resulted in a 41% cognitive drop in comprehension. Lowering the playback rate to 0.75x - 0.85x (approximately 110-125 words per minute) increased sentence recall by 68% and significantly lowered anxiety levels.

Section 2: Code-Mixing and Colloquial Vocabulary
Elderly bilingual speakers in Maharashtra and northern India frequently intersperse English digital nouns (e.g., "message", "button", "screen", "password") with Marathi or Hindi grammatical verbs (e.g., "बटन दाबा", "मेसेज पाठवला"). Voice recognition models calibrated strictly for pure literary Hindi or Marathi failed in 52% of spontaneous elderly queries. Models incorporating everyday conversational Indian code-mixing achieved over 94% intent detection accuracy.

Section 3: Confirmation and Repetition Protocols
Seniors showed a strong preference (92% positive rating) for explicit step confirmations ("Step 1 is complete. Shall we proceed to Step 2?") rather than continuous unbroken explanations. Immediate visual transcription of what the voice assistant heard allowed elders with hearing impairments or accent variations to verify their query before submission.
    `.trim(),
    tags: ['voice assistant', 'speech synthesis', 'marathi', 'hindi', 'accessibility'],
    active: true,
    createdAt: '2023-11-10T09:15:00Z'
  },
  {
    id: 'paper-rbi-ombudsman-2023',
    title: 'Reserve Bank of India Guidelines for Senior Citizen Banking and Grievance Redressal',
    category: 'government_services',
    author: 'Banking Codes and Standards Board of India & Consumer Financial Protection Group',
    year: '2023',
    summary: 'Compendium of institutional protections, Zero Liability policies, and doorstep banking provisions established for senior citizens in India.',
    content: `
Section 1: RBI Circular on Doorstep Banking for Elderly and Differently Abled
Under RBI Master Circular DBR.No.Leg.BC.96/09.07.005/2017-18, banks are mandated to provide basic banking facilities including cash pickup and delivery, cheque pick-up, submission of Form 15G/15H, and digital life certificate (Jeevan Pramaan) verification at the residence of senior citizens aged 70 years and above.

Section 2: Zero Liability Framework for Unauthorized Electronic Transactions
As per RBI notification RBI/2017-18/15, when an unauthorized electronic transaction occurs due to third-party breach or system fraud where the customer has not shared credentials, the customer possesses ZERO LIABILITY if the transaction is reported within three working days. Even in contributory negligence where credentials were manipulated under deception, immediate reporting to the National Cybercrime Portal (Helpline 1930) within the golden hour enables law enforcement to freeze intermediary nodal merchant accounts.

Section 3: Senior Citizen Life Certificate (Jeevan Pramaan) Digital Adoption
Every year in November, pensioners in India must submit their Annual Life Certificate. The Ministry of Personnel has authorized Face Authentication via the Jeevan Pramaan Android app using Aadhaar-linked biometrics, eliminating the requirement for elderly pensioners to travel physically to bank branches or post offices.
    `.trim(),
    tags: ['rbi guidelines', 'pension', 'jeevan pramaan', 'doorstep banking', 'zero liability'],
    active: true,
    createdAt: '2023-09-05T11:00:00Z'
  }
];
