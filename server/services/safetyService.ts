import { Language } from '../../src/types';

export interface EmergencyEvaluation {
  isEmergency: boolean;
  emergencyCategory?: 'medical' | 'fall' | 'crime' | 'general';
  matchedKeywords: string[];
}

export interface SafetyCheckResult {
  isSafe: boolean;
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH_RISK_SCAM' | 'EMERGENCY' | 'PROMPT_INJECTION';
  flaggedKeywords: string[];
  sanitizedText: string;
  emergencyEvaluation: EmergencyEvaluation;
  recommendedAgentName?: string;
}

const EMERGENCY_TERMS: Record<string, 'medical' | 'fall' | 'crime' | 'general'> = {
  // English
  'chest pain': 'medical',
  'heart attack': 'medical',
  'cannot breathe': 'medical',
  'difficulty breathing': 'medical',
  'fell down': 'fall',
  'i fell': 'fall',
  'i have fallen': 'fall',
  'cannot get up': 'fall',
  'bleeding heavily': 'medical',
  'unconscious': 'medical',
  'ambulance': 'medical',
  'call 112': 'general',
  'police': 'crime',
  'fire in house': 'general',
  'stroke': 'medical',

  // Hindi
  'छाती में दर्द': 'medical',
  'सांस नहीं आ रही': 'medical',
  'गिर गया': 'fall',
  'गिर गई': 'fall',
  'उठ नहीं पा रहा': 'fall',
  'उठ नहीं पा रही': 'fall',
  'बेहोश': 'medical',
  'खून बह रहा है': 'medical',
  'एम्बुलेंस': 'medical',
  'पुलिस': 'crime',
  'आपातकाल': 'general',

  // Marathi
  'छातीत दुखणे': 'medical',
  'श्वास घेण्यास त्रास': 'medical',
  'पडलो': 'fall',
  'पडले': 'fall',
  'उठता येत नाही': 'fall',
  'रक्त येत आहे': 'medical',
  'रुग्णवाहिका': 'medical',
  'तातडीची मदत': 'general',
};

const SCAM_PATTERNS = [
  'otp',
  'one time password',
  'upi pin',
  'cvv',
  'atm pin',
  'netbanking password',
  'bank password',
  'anydesk',
  'teamviewer',
  'rustdesk',
  'electricity will be cut',
  'power cut tonight',
  'lottery prize',
  'won 25 lakh',
  'won 50 lakh',
  'click link to verify kyc',
  'apk download',
  'part time job 5000 daily',
  'ओटीपी',
  'यूपीआई पिन',
  'लॉटरी लगी है',
  'बिजली का कनेक्शन कटेगा',
  'केवायसी अपडेट',
  'पिन सांगा',
];

const PROMPT_INJECTION_PATTERNS = [
  'ignore previous instructions',
  'disregard earlier instructions',
  'reveal system prompt',
  'show me your prompt',
  'system override',
  'you are now dan',
  'jailbreak',
];

export function evaluateEmergencyPriority(text: string): EmergencyEvaluation {
  const lower = text.toLowerCase();
  const matched: string[] = [];
  let category: 'medical' | 'fall' | 'crime' | 'general' = 'general';

  for (const [term, cat] of Object.entries(EMERGENCY_TERMS)) {
    if (lower.includes(term.toLowerCase())) {
      matched.push(term);
      category = cat;
    }
  }

  return {
    isEmergency: matched.length > 0,
    emergencyCategory: matched.length > 0 ? category : undefined,
    matchedKeywords: matched,
  };
}

export function sanitizeAndMaskPII(text: string): string {
  let sanitized = text;

  // Mask 16-digit credit/debit card numbers
  sanitized = sanitized.replace(/\b(?:\d[ -]*?){13,16}\b/g, '[CARD NUMBER REDACTED]');

  // Mask 4 to 6 digit OTP / PIN codes if preceded by keywords
  sanitized = sanitized.replace(/(otp|pin|code)[\s:]*(\d{4,6})/gi, '$1: [CONFIDENTIAL CODE MASKED]');

  return sanitized;
}

export function evaluateSafetyAndPrompt(text: string, _language: Language = 'en'): SafetyCheckResult {
  const lower = text.toLowerCase();
  const emergency = evaluateEmergencyPriority(text);

  // 1. Emergency check
  if (emergency.isEmergency) {
    return {
      isSafe: false,
      riskLevel: 'EMERGENCY',
      flaggedKeywords: emergency.matchedKeywords,
      sanitizedText: text,
      emergencyEvaluation: emergency,
      recommendedAgentName: 'Emergency Agent',
    };
  }

  // 2. Prompt injection check
  const matchedInjection = PROMPT_INJECTION_PATTERNS.filter((pattern) => lower.includes(pattern));
  if (matchedInjection.length > 0) {
    return {
      isSafe: false,
      riskLevel: 'PROMPT_INJECTION',
      flaggedKeywords: matchedInjection,
      sanitizedText: '[BLOCKED_UNSAFE_QUERY]',
      emergencyEvaluation: emergency,
    };
  }

  // 3. Scam and financial credential extraction check
  const matchedScams = SCAM_PATTERNS.filter((pattern) => lower.includes(pattern));
  if (matchedScams.length > 0) {
    return {
      isSafe: false,
      riskLevel: 'HIGH_RISK_SCAM',
      flaggedKeywords: matchedScams,
      sanitizedText: sanitizeAndMaskPII(text),
      emergencyEvaluation: emergency,
      recommendedAgentName: 'Safety Agent',
    };
  }

  return {
    isSafe: true,
    riskLevel: 'SAFE',
    flaggedKeywords: [],
    sanitizedText: sanitizeAndMaskPII(text),
    emergencyEvaluation: emergency,
  };
}
