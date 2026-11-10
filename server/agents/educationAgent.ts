import { Language, RAGSourceItem } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';
import { AgentContext } from './companionAgent';

export async function runEducationAgent(
  message: string,
  ctx: AgentContext & { ragSources?: RAGSourceItem[] }
): Promise<string> {
  const langPrompt =
    ctx.language === 'hi'
      ? 'उत्तर सरल, स्पष्ट हिंदी में दें। तकनीकी शब्दों को रोजमर्रा के उदाहरणों (जैसे घंटी बजाना) से समझाएं।'
      : ctx.language === 'mr'
      ? 'उत्तर अत्यंत सोप्या मराठीत द्या. पायरी १, पायरी २ अशा मोजक्या आणि सुटसुटीत शब्दांत मार्गदर्शन करा.'
      : 'Explain in simple, step-by-step numbered steps (1., 2., 3.). Avoid technical jargon. Use physical analogies like pressing a doorbell gently.';

  const evidence = ctx.ragSources && ctx.ragSources.length > 0
    ? `\nApproved Educational Evidence:\n${ctx.ragSources.map((s) => `- ${s.title}: ${s.content}`).join('\n')}`
    : '';

  const systemInstruction = `You are Buddy Digital Education Agent, an expert in teaching elderly adults how to use smartphones, WhatsApp, UPI, video calls, and computers.
Rules:
- Break instructions into 3-4 numbered steps max.
- Always reassure the user that pressing the wrong button will not break the phone.
- Emphasize the Golden Rule of UPI: Entering a PIN is ONLY to pay, never to receive money.
- ${langPrompt}${evidence}`;

  const prompt = `Senior asks: "${message}"\n\nProvide simple step-by-step instructions:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.2,
  });

  if (aiResponse) return aiResponse;

  // Fallback
  if (ctx.language === 'hi') {
    return `यह बहुत आसान है, बिल्कुल चिंता मत कीजिए:\n\n1. फोन की स्क्रीन पर उस आइकन को हल्के से छुएं (जैसे दरवाजे की घंटी बजाते हैं)।\n2. स्क्रीन को ऊपर या नीचे करने के लिए उंगली को कांच पर धीरे से सरकाएं।\n3. अगर कुछ समझ न आए, तो फोन के नीचे वाला गोल या तीर का बटन दबाकर वापस आ जाएं।`;
  } else if (ctx.language === 'mr') {
    return `हे अगदी सोपे आहे, काळजी करण्याचे काहीही कारण नाही:\n\n१. स्क्रीनवरील चिन्हाला हलकेच स्पर्श करा (जसे आपण घराची बेल हलकेच वाजवतो).\n२. स्क्रीन वर-खाली करण्यासाठी बोट काचेवर हळुवार सरकवा.\n३. काही चुकले तरी घाबरू नका, खालचे मधले बटण दाबून पुन्हा सुरुवातीला या.`;
  }
  return `Here is the simplest way to do it, step-by-step:\n\n1. Gently tap the icon on your screen with the pad of your finger (like pressing a doorbell softly).\n2. If you need to see more, slide your finger smoothly up or down the glass.\n3. Remember: you cannot break your phone by exploring. If you ever feel lost, tap the round Home button at the bottom to return to safety.`;
}
