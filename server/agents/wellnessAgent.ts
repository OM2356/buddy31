import { Language } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';
import { AgentContext } from './companionAgent';

export async function runWellnessAgent(message: string, ctx: AgentContext): Promise<string> {
  const langPrompt =
    ctx.language === 'hi'
      ? 'सरल हिंदी में गुनगुने पानी, हल्की सैर और जोड़ों की सुरक्षा के बारे में बताएं। स्पष्ट लिखें कि यह डॉक्टर का विकल्प नहीं है।'
      : ctx.language === 'mr'
      ? 'सोप्या मराठीत कोमट पाणी, हलके स्ट्रेचिंग आणि तोल सांभाळण्याबद्दल मार्गदर्शन करा. वैद्यकीय उपचारांसाठी डॉक्टरांचा सल्ला घेण्यास सांगा.'
      : 'Provide gentle healthy ageing tips (hydration, posture, balance, sleep). Always include a gentle disclaimer that this is educational and not medical advice.';

  const systemInstruction = `You are Buddy Wellness Agent.
Rules:
- Give gentle, soothing advice on hydration (sipping warm water), gentle ankle/knee circles, posture, and fall-safe bedroom habits.
- STRICT MEDICAL BOUNDARY: Never diagnose conditions or prescribe medicines. Always advise consulting their primary physician for persistent pain.
- Keep recommendations simple and low-strain.
- ${langPrompt}`;

  const prompt = `Senior asks about wellness / daily health: "${message}"\n\nProvide gentle wellness encouragement and fall-safe advice:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.3,
  });

  if (aiResponse) return aiResponse;

  // Fallback
  if (ctx.language === 'hi') {
    return `स्वास्थ्य के लिए एक आसान और सुखद सुझाव:\n\n1. दिनभर में थोड़े-थोड़े समय पर गुनगुना पानी पीते रहें।\n2. सुबह बिस्तर से उठने से पहले 30 सेकंड आराम से बैठें, ताकि चक्कर न आए।\n3. कुर्सी पर बैठकर पंजों को धीरे-धीरे गोल घुमाएं, इससे पैरों में रक्त संचार अच्छा रहता है।\n\n(ध्यान दें: किसी भी लगातार दर्द या अस्वस्थता के लिए अपने डॉक्टर से जरूर परामर्श लें।)`;
  } else if (ctx.language === 'mr') {
    return `निरोगी आयुष्यासाठी सोप्या आणि उपयुक्त सवयी:\n\n१. दिवसभरात वेळोवेळी थोडे थोडे कोमट पाणी प्या.\n२. सकाळी उठल्यावर लगेच उभे न राहता ३० सेकंद शांत बसा, ज्यामुळे चक्कर येणार नाही.\n३. बसल्या बसल्या पायाचे घोटे हळुवार गोल फिरवा, ज्यामुळे गुडघ्यांना आराम मिळतो.\n\n(महत्त्वाची नोंद: कोणत्याही दुखण्यासाठी आपल्या कौटुंबिक डॉक्टरांचा सल्ला नक्की घ्या.)`;
  }
  return `Here are gentle wellness tips for your day:\n\n1. Sip a glass of warm water to stay comfortably hydrated.\n2. Before getting out of bed, sit upright for 30 seconds to let your balance settle smoothly.\n3. While seated in a comfortable chair, gently roll your ankles in slow circles to keep your joints loose and relaxed.\n\n(Note: This is general healthy ageing guidance. Please consult your family doctor for medical care.)`;
}
