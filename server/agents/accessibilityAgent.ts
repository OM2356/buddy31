import { Language } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';
import { AgentContext } from './companionAgent';

export async function runAccessibilityAgent(message: string, ctx: AgentContext): Promise<string> {
  const langPrompt =
    ctx.language === 'hi'
      ? 'स्क्रीन के अक्षर बड़े करने, गहरा कंट्रास्ट और बोलकर सुनने के बारे में बहुत सरल हिंदी में बताएं।'
      : ctx.language === 'mr'
      ? 'स्क्रीनवरील अक्षरे मोठी करणे, गडद रंग आणि आवाज ऐकण्याबाबत सोप्या मराठीत मार्गदर्शन करा.'
      : 'Explain how to adjust font size, enable high contrast, and use voice reading for comfortable viewing.';

  const systemInstruction = `You are Buddy Accessibility Agent.
Rules:
- Help older adults comfortably adjust their screen so it never strains their eyes or ears.
- Explain:
  1. Font size adjustment (making letters bigger and bolder).
  2. High contrast mode (clear dark background with bright text).
  3. Reading aloud (tapping the speaker icon to listen instead of reading).
- ${langPrompt}`;

  const prompt = `User asks about accessibility / reading / screen clarity: "${message}"\n\nProvide comforting, simple steps to make the screen clear:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.2,
  });

  if (aiResponse) return aiResponse;

  if (ctx.language === 'hi') {
    return `स्क्रीन को साफ और बड़ा देखने के आसान उपाय:\n\n1. स्क्रीन के ऊपर दिए गए 'बड़ा फॉन्ट' बटन को दबाएं, इससे सभी अक्षर बड़े और स्पष्ट हो जाएंगे।\n2. 'गहरा कंट्रास्ट' चालू करें, जिससे अक्षरों और बैकग्राउंड में अंतर साफ नजर आए।\n3. किसी भी संदेश को सुनने के लिए 'बोलकर सुनाएं' (स्पीकर) बटन को दबाएं।`;
  } else if (ctx.language === 'mr') {
    return `स्क्रीनवरील अक्षरे मोठी आणि स्पष्ट पाहण्यासाठी सोपे उपाय:\n\n१. वरील 'मोठी अक्षरे' पर्याय निवडा, ज्यामुळे वाचताना डोळ्यांवर ताण येणार नाही.\n२. 'गडद रंग (कंट्रास्ट)' चालू करा, ज्यामुळे अक्षरे अगदी ठळक दिसतील.\n३. वाचण्याचा कंटाळा आल्यास 'वाचून दाखवा' (स्पीकर) बटण दाबा.`;
  }
  return `Here is how to make your screen comfortable and easy on your eyes:\n\n1. Tap the "Font Size" option at the top to make all letters large and bold.\n2. Switch on "High Contrast" to make text stand out crisply with rich black and white colors.\n3. Whenever you prefer listening rather than reading, simply tap the "Read Aloud" speaker icon beside any message.`;
}
