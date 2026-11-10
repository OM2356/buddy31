import { AgentType, UserIntent } from '../../src/types';
import { evaluateEmergencyPriority } from '../services/safetyService';

export interface ClassifiedIntentResult {
  intent: UserIntent;
  recommendedAgent: AgentType;
  isEmergency: boolean;
  emergencyCategory?: string;
  confidence: number;
  reasoning: string;
}

export function classifyUserIntent(text: string): ClassifiedIntentResult {
  // 1. Emergency Check (Highest priority zero-delay override)
  const emergencyCheck = evaluateEmergencyPriority(text);
  if (emergencyCheck.isEmergency) {
    return {
      intent: 'EMERGENCY',
      recommendedAgent: 'emergency',
      isEmergency: true,
      emergencyCategory: emergencyCheck.emergencyCategory,
      confidence: 1.0,
      reasoning: `Emergency phrase identified: "${emergencyCheck.matchedKeywords.join(', ')}"`,
    };
  }

  const lower = text.toLowerCase().trim();

  // 2. Safety and Scam Detection
  const scamKeywords = [
    'otp',
    'one time password',
    'upi pin',
    'cvv',
    'atm pin',
    'lottery',
    'won prize',
    'cashback prize',
    'anydesk',
    'teamviewer',
    'rustdesk',
    'electricity cut',
    'bill pending',
    'bank account blocked',
    'kyc update',
    'apk link',
    'fake call',
    'scam',
    'fraud',
    'ओटीपी',
    'यूपीआई पिन',
    'लॉटरी',
    'धोखा',
    'खाता बंद',
    'फसवणूक',
  ];

  if (scamKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'SAFETY_SCAM',
      recommendedAgent: 'safety',
      isEmergency: false,
      confidence: 0.95,
      reasoning: 'Detected potential scam, OTP, or financial risk keyword.',
    };
  }

  // 3. Accessibility Agent (Font size, contrast, volume, screen zoom)
  const accessibilityKeywords = [
    'font size',
    'large text',
    'larger letters',
    'big letters',
    'bigger letters',
    'letters bigger',
    'text bigger',
    'bigger text',
    'make text',
    'make letters',
    'text size',
    'screen zoom',
    'high contrast',
    'hard to read',
    'cannot see',
    'cannot hear',
    'louder',
    'increase volume',
    'dark mode',
    'अक्षर बड़े',
    'दिखाई नहीं दे रहा',
    'आवाज बढ़ाएं',
    'अक्षरे मोठी',
    'कमी ऐकू येते',
  ];

  if (accessibilityKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'ACCESSIBILITY',
      recommendedAgent: 'accessibility',
      isEmergency: false,
      confidence: 0.92,
      reasoning: 'User requested accessibility adjustments (font, contrast, volume).',
    };
  }

  // 4. Digital Education Agent (Phone, WhatsApp, internet, email, UPI, photos, video call)
  const educationKeywords = [
    'how to',
    'how do i',
    'teach me',
    'learn',
    'whatsapp',
    'photo',
    'picture',
    'video call',
    'smartphone',
    'touch screen',
    'tap',
    'swipe',
    'email',
    'gmail',
    'wifi',
    'wi-fi',
    'internet',
    'download',
    'google pay',
    'phonepe',
    'paytm',
    'send message',
    'voice message',
    'कदम',
    'सिखाएं',
    'व्हाट्सएप',
    'फोटो कैसे भेजें',
    'इंटरनेट',
    'सराव',
    'कसे करायचे',
    'व्हॉट्सॲप',
  ];

  if (educationKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'EDUCATION',
      recommendedAgent: 'education',
      isEmergency: false,
      confidence: 0.9,
      reasoning: 'User requested digital technology step-by-step guidance.',
    };
  }

  // 5. Wellness Agent (Water, walk, stretch, medicine, fall safety, knees, sleep)
  const wellnessKeywords = [
    'water',
    'drink',
    'hydration',
    'exercise',
    'stretch',
    'walking',
    'knee',
    'back pain',
    'sleep',
    'nap',
    'medicine',
    'blood pressure',
    'sugar',
    'fall',
    'dizziness',
    'health',
    'पानी',
    'दवा',
    'व्यायाम',
    'घुटने',
    'नींद',
    'तोल',
    'आरोग्य',
    'औषध',
    'चालणे',
  ];

  if (wellnessKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'WELLNESS',
      recommendedAgent: 'wellness',
      isEmergency: false,
      confidence: 0.88,
      reasoning: 'Query relates to daily healthy ageing, mobility, or hydration.',
    };
  }

  // 6. Caregiver Agent (Family, daughter, son, caregiver, progress, report)
  const caregiverKeywords = [
    'caregiver',
    'family report',
    'daughter',
    'son',
    'grandson',
    'granddaughter',
    'share progress',
    'caregiver dashboard',
    'परिवार',
    'बेटा',
    'बेटी',
    'कुटुंब',
    'काळजीवाहक',
  ];

  if (caregiverKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'CAREGIVER',
      recommendedAgent: 'caregiver',
      isEmergency: false,
      confidence: 0.85,
      reasoning: 'Query relates to family connection or caregiver monitoring.',
    };
  }

  // 7. Knowledge & RAG Agent (Government schemes, pension, Jeevan Pramaan, documents)
  const knowledgeKeywords = [
    'pension',
    'jeevan pramaan',
    'life certificate',
    'digilocker',
    'senior citizen scheme',
    'government',
    'rules',
    'पेंशन',
    'सरकारी योजना',
    'जीवन प्रमाण',
    'पेन्शन',
  ];

  if (knowledgeKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'KNOWLEDGE_RAG',
      recommendedAgent: 'knowledge',
      isEmergency: false,
      confidence: 0.86,
      reasoning: 'Query matches government or verified educational knowledge records.',
    };
  }

  // 8. Feedback & Adaptive Learning Agent
  const feedbackKeywords = [
    'too fast',
    'too slow',
    'did not understand',
    'too complicated',
    'very easy',
    'good explanation',
    'explain again',
    'समझ नहीं आया',
    'बहुत तेज',
    'पुन्हा सांगा',
    'समजले नाही',
  ];

  if (feedbackKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'FEEDBACK',
      recommendedAgent: 'feedback',
      isEmergency: false,
      confidence: 0.87,
      reasoning: 'User giving direct feedback on explanation pace or comprehension.',
    };
  }

  // 9. Fact verification inquiry
  const verificationKeywords = [
    'is this true',
    'fact check',
    'are you sure',
    'can you verify',
    'सच है क्या',
    'खरे आहे का',
  ];

  if (verificationKeywords.some((kw) => lower.includes(kw))) {
    return {
      intent: 'VERIFICATION',
      recommendedAgent: 'verification',
      isEmergency: false,
      confidence: 0.85,
      reasoning: 'User asked for source verification or fact-checking.',
    };
  }

  // 10. Default: Companion Agent (Greetings, warm chat, general conversation)
  return {
    intent: 'COMPANION',
    recommendedAgent: 'companion',
    isEmergency: false,
    confidence: 0.8,
    reasoning: 'Warm everyday companionship and conversational assistance.',
  };
}
