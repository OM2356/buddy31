import { ScamAnalysisResult } from '../../src/types';
import { generateGeminiContent } from './geminiService';

export async function analyzeSuspiciousMessage(message: string): Promise<ScamAnalysisResult> {
  const lower = message.toLowerCase();

  // Pattern detection
  const patterns: { key: string; weight: number; desc: string }[] = [
    { key: 'otp', weight: 40, desc: 'Requests One-Time Password' },
    { key: 'upi pin', weight: 45, desc: 'Requests UPI PIN entry' },
    { key: 'cvv', weight: 40, desc: 'Requests Card CVV' },
    { key: 'password', weight: 30, desc: 'Requests Bank Password' },
    { key: 'anydesk', weight: 45, desc: 'Requests Remote Device Control' },
    { key: 'teamviewer', weight: 45, desc: 'Requests Remote Device Control' },
    { key: 'rustdesk', weight: 45, desc: 'Requests Remote Device Control' },
    { key: 'apk', weight: 35, desc: 'Prompts installation of unknown APK file' },
    { key: 'electricity', weight: 35, desc: 'Urgent electricity disconnection threat' },
    { key: 'power cut', weight: 35, desc: 'Urgent power cut threat' },
    { key: 'bill will be disconnected', weight: 40, desc: 'Disconnection intimidation' },
    { key: 'lottery', weight: 35, desc: 'Fake prize or lottery promise' },
    { key: 'won', weight: 20, desc: 'Unsolicited winning notification' },
    { key: 'click here', weight: 20, desc: 'Suspicious clickable link' },
    { key: 'http', weight: 20, desc: 'Contains web link' },
    { key: 'kyc', weight: 30, desc: 'Threat of bank account or SIM block for KYC' },
    { key: 'account blocked', weight: 35, desc: 'Threat of immediate account suspension' },
    { key: 'job', weight: 20, desc: 'Work-from-home or easy money scheme' },
    { key: 'ओटीपी', weight: 40, desc: 'Requests OTP (Hindi)' },
    { key: 'यूपीआई', weight: 40, desc: 'Requests UPI (Hindi)' },
    { key: 'लॉटरी', weight: 35, desc: 'Lottery claim (Hindi)' },
    { key: 'विद्युत', weight: 35, desc: 'Electricity cut threat (Hindi)' },
    { key: 'फसवणूक', weight: 40, desc: 'Fraud indicator (Marathi)' },
  ];

  let rawScore = 0;
  const flagged: string[] = [];

  for (const p of patterns) {
    if (lower.includes(p.key)) {
      rawScore += p.weight;
      flagged.push(p.desc);
    }
  }

  const finalScore = Math.min(100, Math.max(5, rawScore));
  const isScam = finalScore >= 45;

  let riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'SAFE';
  if (finalScore >= 80) riskLevel = 'CRITICAL';
  else if (finalScore >= 60) riskLevel = 'HIGH';
  else if (finalScore >= 40) riskLevel = 'MEDIUM';
  else if (finalScore >= 20) riskLevel = 'LOW';

  // AI-assisted explanation if available
  let aiExplanation = '';
  if (isScam) {
    const prompt = `Analyze this message sent to an elderly person: "${message}".
Provide a 2-sentence warning in simple English explaining why it is a scam and what safe step to take immediately.`;
    aiExplanation = await generateGeminiContent({ prompt, temperature: 0.1, timeoutMs: 5000 });
  }

  return {
    isScam,
    riskLevel,
    riskScore: finalScore,
    flaggedKeywords: flagged,
    scamType: isScam
      ? flagged.length > 0
        ? flagged[0]
        : 'Suspicious Unsolicited Intimidation'
      : 'Normal Communication',
    warningMessage: {
      en: isScam
        ? 'DANGER: This message exhibits classic signs of cyber fraud. Do NOT reply or click links.'
        : 'This message does not appear to contain dangerous banking threats, but stay alert.',
      hi: isScam
        ? '⚠️ चेतावनी: यह संदेश धोखाधड़ी (फ्रॉड) का स्पष्ट प्रयास है। किसी भी लिंक पर क्लिक न करें।'
        : 'यह संदेश सामान्य प्रतीत होता है, फिर भी किसी अनजान व्यक्ति से सतर्क रहें।',
      mr: isScam
        ? '⚠️ सावधान: हा संदेश सायबर फसवणुकीचा (फ्रॉड) प्रकार असू शकतो. कोणत्याही लिंकवर क्लिक करू नका.'
        : 'हा संदेश सुरक्षित वाटतो, तरीही अनोळखी व्यक्तीशी सावधगिरी बाळगा.',
    },
    recommendedActions: isScam
      ? [
          {
            en: 'Never share your OTP, UPI PIN, or bank password with anyone.',
            hi: 'अपना बैंक ओटीपी, यूपीआई पिन या पासवर्ड किसी को न बताएं।',
            mr: 'आपला बँक ओटीपी, यूपीआय पिन किंवा पासवर्ड कोणालाही सांगू नका.',
          },
          {
            en: 'Block the sender and delete the message immediately.',
            hi: 'मैसेज भेजने वाले नंबर को ब्लॉक करें और मैसेज हटा दें।',
            mr: 'हा नंबर ब्लॉक करा आणि मेसेज लगेच डिलीट करा.',
          },
          {
            en: 'If any money was transferred, immediately call 1930 (National Cyber Crime Helpline).',
            hi: 'यदि पैसे कट गए हों, तो तुरंत 1930 (राष्ट्रीय साइबर हेल्पलाइन) पर कॉल करें।',
            mr: 'पैसे कापले गेले असल्यास त्वरित १९३० (राष्ट्रीय सायबर हेल्पलाइन) वर कॉल करा.',
          },
        ]
      : [
          {
            en: 'Double check with your family member before clicking any external links.',
            hi: 'किसी भी लिंक को खोलने से पहले अपने बच्चों या परिवार से पुष्टि कर लें।',
            mr: 'कोणतीही लिंक उघडण्यापूर्वी आपल्या कुटुंबीयांशी खात्री करून घ्या.',
          },
        ],
    explanation: {
      en:
        aiExplanation ||
        (isScam
          ? 'Legitimate organizations (banks, government, electricity providers) never demand urgent fee transfers via personal mobile numbers or threaten abrupt service cancellation via SMS.'
          : 'No urgent banking credential demands or remote device access requests were detected in this message.'),
      hi: isScam
        ? 'बैंक, बिजली विभाग या सरकारी संस्थाएं कभी भी फोन या एसएमएस पर तुरंत पैसे भरने या कनेक्शन काटने की धमकी नहीं देतीं।'
        : 'इस संदेश में बैंक पासवर्ड या रिमोट कंट्रोल ऐप का कोई खतरा नहीं पाया गया।',
      mr: isScam
        ? 'बँक किंवा महावितरण कधीही एसएमएसद्वारे तातडीने पैसे मागून वीज कापण्याची धमकी देत नाही.'
        : 'या संदेशात बँक माहिती विचारल्याचा कोणताही धोका आढळला नाही.',
    },
  };
}
