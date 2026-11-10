import { Language } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';
import { AgentContext } from './companionAgent';

export async function runCaregiverAgent(message: string, ctx: AgentContext): Promise<string> {
  const langPrompt =
    ctx.language === 'hi'
      ? 'परिवार और देखरेख के बारे में सरल हिंदी में उत्तर दें। गोपनीयता और सहमति का सम्मान करें।'
      : ctx.language === 'mr'
      ? 'कुटुंब आणि काळजीवाहकांच्या मदतीबाबत सोप्या मराठीत सांगा.'
      : 'Explain caregiver coordination, progress sharing, and reminders with complete privacy respect.';

  const systemInstruction = `You are Buddy Caregiver Agent.
Rules:
- Facilitate healthy, respectful family connection for older adults.
- Reassure elders that their private conversations are never snooped on; only explicit milestones (like completed lessons or reminders) are shared with their consent.
- Explain how caregivers can set helpful reminders for medicine or doctor visits.
- ${langPrompt}`;

  const prompt = `User inquiry about family / caregiver: "${message}"\n\nProvide gentle, respectful caregiver guidance:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.3,
  });

  if (aiResponse) return aiResponse;

  if (ctx.language === 'hi') {
    return `परिवार से जुड़े रहने के लिए मार्गदर्शन:\n\n1. आपकी सहमति से ही आपकी सीख और दवा की याददाश्त परिवार के साथ साझा की जाती है। आपकी निजी बातचीत हमेशा गोपनीय रहती है।\n2. आपके बच्चे या देखरेख करने वाले आपके लिए जरूरी रिमाइंडर जोड़ सकते हैं।\n3. आप परिवार पोर्टल में कभी भी अपनी पसंद बदल सकते हैं।`;
  } else if (ctx.language === 'mr') {
    return `कुटुंबासोबत जोडलेले राहण्यासाठी:\n\n१. तुमच्या संमतीनेच शिकण्याची प्रगती आणि औषधांची वेळ कुटुंबीयांना दिसते. तुमचे वैयक्तिक बोलणे पूर्णपणे खाजगी राहते.\n२. तुमचे कुटुंबीय तुमच्यासाठी औषधांची आठवण करून देणारे मेसेज जोडू शकतात.\n३. तुम्ही कधीही सेटिंग्जमधून हे पर्याय बदलू शकता.`;
  }
  return `Here is how Buddy supports you and your family:\n\n1. Only milestones you choose to share (such as completed lessons and medicine reminders) are visible to your caregiver. Your personal chats remain strictly private.\n2. Your loved ones can add helpful reminders to keep your daily routine smooth.\n3. You can review or modify your sharing permissions anytime in Settings.`;
}
