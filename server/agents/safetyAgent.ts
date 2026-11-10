import { Language } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';
import { AgentContext } from './companionAgent';

export async function runSafetyAgent(message: string, ctx: AgentContext): Promise<string> {
  const langPrompt =
    ctx.language === 'hi'
      ? 'साफ और कड़े शब्दों में हिंदी में समझाएं कि अपना बैंक ओटीपी या यूपीआई पिन कभी किसी को न बताएं। राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 का उल्लेख करें।'
      : ctx.language === 'mr'
      ? 'स्पष्ट मराठीत सांगा की बँक ओटीपी, यूपीआय पिन किंवा पासवर्ड कधीही कोणाला सांगू नये. राष्ट्रीय सायबर हेल्पलाइन १९३० वर संपर्क साधण्याचा सल्ला द्या.'
      : 'Explain clearly that this may be a scam. State the golden rule: NEVER share OTP, UPI PIN, or passwords. Mention National Cyber Crime Helpline 1930.';

  const systemInstruction = `You are Buddy Safety & Scam Detection Agent.
Rules:
- NEVER ask the user for their PIN, OTP, password, or bank details.
- If the user mentions someone asking for an OTP, UPI PIN, electricity bill payment link, or lottery prize: WARN THEM IMMEDIATELY.
- Give 3 immediate safe steps: 1. Do not share codes, 2. Disconnect/delete, 3. Call 1930 or your bank if money was lost.
- ${langPrompt}`;

  const prompt = `Senior asks about safety / suspicious message: "${message}"\n\nProvide an urgent safety explanation and clear instructions:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.1,
  });

  if (aiResponse) return aiResponse;

  // Fallback
  if (ctx.language === 'hi') {
    return `⚠️ कृपया तुरंत सावधान हो जाइए!\n\n1. किसी को भी अपना बैंक ओटीपी (OTP), यूपीआई पिन या पासवर्ड बिल्कुल न बताएं।\n2. बैंक या बिजली विभाग कभी भी फोन पर आपसे पिन नहीं मांगते।\n3. फोन काट दें और किसी भी लिंक पर क्लिक न करें। अगर कोई शंका हो, तो तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर फोन करें।`;
  } else if (ctx.language === 'mr') {
    return `⚠️ कृपया ताबडतोब सावध व्हा!\n\n१. कोणालाही आपला बँक ओटीपी (OTP), यूपीआय पिन किंवा पासवर्ड कधीही सांगू नका.\n२. बँक अधिकारी किंवा महावितरण कधीही फोनवर गुप्त पिन मागत नाहीत.\n३. लगेच फोन कट करा. फसवणूक झाली असल्यास त्वरित राष्ट्रीय सायबर गुन्हे हेल्पलाइन १९३० वर संपर्क साधा.`;
  }
  return `⚠️ WARNING: Please be very cautious!\n\n1. NEVER share your Bank OTP, UPI PIN, or password with anyone, even if they claim to be a bank manager or government officer.\n2. You only enter a UPI PIN to SEND money, never to receive money or lottery prizes.\n3. Disconnect the call or delete the message immediately. If money was deducted, call the National Cyber Helpline 1930 without delay.`;
}
