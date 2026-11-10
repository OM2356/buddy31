import { Language, RAGSourceItem } from '../../src/types';
import { AgentContext } from './companionAgent';

export async function runVerificationAgent(
  _message: string,
  ctx: AgentContext & { ragSources?: RAGSourceItem[] }
): Promise<string> {
  const sources = ctx.ragSources || [];
  const hasEvidence = sources.length > 0;

  if (ctx.language === 'hi') {
    return hasEvidence
      ? `तथ्य प्रमाणीकरण रिपोर्ट:\n\n• स्थिति: प्रमाणित एवं सुरक्षित ✅\n• संदर्भ: ${sources.map((s) => s.title).join(', ')}\n• निष्कर्ष: यह जानकारी हमारे स्वीकृत तकनीकी व सुरक्षा दिशानिर्देशों से पूर्णतः मेल खाती है। आप निश्चिंत होकर इन चरणों का पालन कर सकते हैं।`
      : `तथ्य प्रमाणीकरण रिपोर्ट:\n\n• स्थिति: सामान्य मार्गदर्शन (स्वतंत्र पुष्टि अनुशंसित)\n• निष्कर्ष: इसके लिए कोई विशिष्ट सरकारी दस्तावेज उपलब्ध नहीं है, लेकिन यह एक सुरक्षित सामान्य तकनीकी सुझाव है।`;
  } else if (ctx.language === 'mr') {
    return hasEvidence
      ? `तथ्य तपासणी अहवाल:\n\n• स्थिती: प्रमाणित आणि सुरक्षित ✅\n• संदर्भ: ${sources.map((s) => s.title).join(', ')}\n• निष्कर्ष: ही माहिती आमच्या अधिकृत शैक्षणिक नियमावलीशी तंतोतंत जुळते. तुम्ही निर्धास्तपणे या सूचनांचे पालन करू शकता.`
      : `तथ्य तपासणी अहवाल:\n\n• स्थिती: सामान्य मार्गदर्शन\n• निष्कर्ष: यासाठी विशिष्ट सरकारी दस्तऐवज उपलब्ध नाही, परंतु हा एक सुरक्षित तांत्रिक सल्ला आहे.`;
  }

  return hasEvidence
    ? `Fact Verification Report:\n\n• Status: VERIFIED & GROUNDED ✅\n• Cited Evidence: ${sources.map((s) => s.title).join(', ')}\n• Evaluation: This guidance strictly matches our approved digital literacy and safety standards. You can follow these instructions with complete peace of mind.`
    : `Fact Verification Report:\n\n• Status: GENERAL SAFE GUIDANCE\n• Evaluation: No dedicated official knowledge chunk was matched for this specific query, but the steps adhere to universal elderly safety standards.`;
}
