import { Language, RAGSourceItem } from '../../src/types';
import { generateGeminiContent } from '../services/geminiService';
import { AgentContext } from './companionAgent';

export async function runRAGKnowledgeAgent(
  message: string,
  ctx: AgentContext & { ragSources?: RAGSourceItem[] }
): Promise<string> {
  const sourcesText =
    ctx.ragSources && ctx.ragSources.length > 0
      ? ctx.ragSources.map((s) => `[Document: ${s.title}]\n${s.content}`).join('\n\n')
      : 'General Senior Knowledge Base';

  const langPrompt =
    ctx.language === 'hi'
      ? 'उत्तर दिए गए ज्ञान दस्तावेजों के आधार पर सरल हिंदी में दें।'
      : ctx.language === 'mr'
      ? 'उत्तर दिलेल्या माहितीच्या आधारे सोप्या मराठीत द्या.'
      : 'Answer accurately using the verified knowledge sources. Cite the document title.';

  const systemInstruction = `You are Buddy Knowledge & RAG Agent.
Rules:
- Answer senior citizen inquiries regarding verified digital guides, official government facilities (Jeevan Pramaan digital life certificate, DigiLocker, Elderline), and gerontological safety.
- Strictly ground answers in the provided knowledge. Do not invent fake laws or scheme names.
- ${langPrompt}

Retrieved Knowledge Documents:
${sourcesText}`;

  const prompt = `Senior asks: "${message}"\n\nProvide an accurate, grounded answer with source reference:`;

  const aiResponse = await generateGeminiContent({
    prompt,
    systemInstruction,
    temperature: 0.1,
  });

  if (aiResponse) return aiResponse;

  if (ctx.language === 'hi') {
    return `स्वीकृत ज्ञान केंद्र के आधार पर जानकारी:\n\n• जीवन प्रमाण (डिजिटल लाइफ सर्टिफिकेट): वरिष्ठ नागरिक अब घर बैठे अपने स्मार्टफोन या नजदीकी डाकघर/सीएससी केंद्र से चेहरा स्कैन कराकर जीवन प्रमाण पत्र जमा कर सकते हैं।\n• राष्ट्रीय एल्डरलाइन 14567: किसी भी पेंशन या सरकारी सहायता के लिए निःशुल्क सहायता प्रदान करती है।`;
  } else if (ctx.language === 'mr') {
    return `प्रमाणित ज्ञान भांडारातील माहिती:\n\n• जीवन प्रमाण (डिजिटल हयातीचा दाखला): ज्येष्ठ नागरिक आता घरबसल्या स्मार्टफोनद्वारे किंवा जवळच्या पोस्ट ऑफिसमधून चेहरा स्कॅन करून हयातीचा दाखला सादर करू शकतात.\n• राष्ट्रीय एल्डरलाईन १४५६७: पेन्शन व शासकीय योजनांच्या माहितीसाठी विनामूल्य मदत करते.`;
  }
  return `Based on verified senior citizen resources:\n\n• Jeevan Pramaan (Digital Life Certificate): Seniors can submit their annual life certificate from home using facial recognition on a smartphone or through a local post office/CSC centre.\n• National Elderline (14567): Call toll-free across India for pension verification, emotional support, and elder assistance.`;
}
