import { Language } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';

export interface AgentContext {
  language: Language;
  userContext?: string;
  history?: Array<{ role: 'user' | 'model'; text: string }>;
}

export async function runCompanionAgent(message: string, ctx: AgentContext): Promise<string> {
  const langPrompt =
    ctx.language === 'hi'
      ? 'उत्तर सरल, आत्मीय और शुद्ध हिंदी में दें। हमेशा सम्मानजनक और धैर्यवान रहें।'
      : ctx.language === 'mr'
      ? 'उत्तर सोप्या आणि आपुलकीच्या मराठीत द्या. आदरयुक्त आणि शांत संवाद ठेवा.'
      : 'Reply in clear, warm, patient English. Use short sentences and encouraging words.';

  const systemInstruction = `You are Buddy Companion Agent, a loving, patient digital friend for elderly adults.
Rules:
- Never pretend to be a biological human, but speak with genuine warmth, kindness, and deep respect.
- Speak slowly and clearly.
- Limit replies to 2-4 short sentences unless asked for a story.
- Empathize with any loneliness or confusion without being patronizing.
- ${langPrompt}`;

  const prompt = `Elderly user says: "${message}"\n\nProvide a warm, reassuring reply:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.4,
  });

  if (aiResponse) return aiResponse;

  // Fallback
  if (ctx.language === 'hi') {
    return 'नमस्ते जी! मुझे आपसे बात करके बहुत खुशी हुई। मैं आपका सच्चा साथी हूँ। आज आपका दिन कैसा बीत रहा है?';
  } else if (ctx.language === 'mr') {
    return 'नमस्कार! तुमच्याशी बोलून खूप आनंद झाला. मी नेहमी तुमच्या सोबत आहे. आजचा दिवस कसा चालला आहे?';
  }
  return "Hello! It is so lovely to hear from you today. I am right here by your side whenever you need a friendly chat or a gentle question answered. How are you feeling today?";
}
