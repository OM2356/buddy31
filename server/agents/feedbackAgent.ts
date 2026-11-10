import { Language } from '../../src/types';
import { AgentContext } from './companionAgent';

export async function runFeedbackAgent(message: string, ctx: AgentContext): Promise<string> {
  const lower = message.toLowerCase();
  const isTooFast = lower.includes('fast') || lower.includes('तेज') || lower.includes('जलद');
  const isConfused = lower.includes('understand') || lower.includes('समझ') || lower.includes('समजले');

  if (ctx.language === 'hi') {
    if (isTooFast || isConfused) {
      return `मैं आपकी बात पूरी तरह समझ गया। आपकी सुविधा ही सबसे महत्वपूर्ण है।\n\n1. अब से मैं और भी धीमे और छोटे-छोटे वाक्यों में समझाऊंगा।\n2. आप जब चाहें मुझे किसी भी बात को दोबारा समझाने के लिए कह सकते हैं।\n3. क्या आप चाहते हैं कि हम वही कदम एक-एक करके फिर से दोहराएं?`;
    }
    return `आपकी प्रतिक्रिया के लिए बहुत-बहुत धन्यवाद! मैं हमेशा आपके सुझावों से सीखकर अपनी गति और भाषा को आपके अनुकूल बनाता रहूँगा।`;
  } else if (ctx.language === 'mr') {
    if (isTooFast || isConfused) {
      return `मी तुमची अडचण पूर्णपणे समजून घेतली आहे. तुमची सोय हीच माझी प्राथमिकता आहे.\n\n१. यापुढे मी आणखी सावकाश आणि अगदी छोट्या शब्दांत समजावून सांगेन.\n२. तुम्हाला न समजलेला भाग मी कितीही वेळा पुन्हा सांगायला तयार आहे.\n३. आपण आधीची पायरी पुन्हा एकदा सावकाश पाहूया का?`;
    }
    return `तुमच्या मोलाच्या प्रतिसादाबद्दल मनःपूर्वक धन्यवाद! मी तुमच्या सल्ल्यानुसार माझ्या बोलण्याचा वेग आणि पद्धत नेहमी सुधारत राहीन.`;
  }

  if (isTooFast || isConfused) {
    return `Thank you so much for letting me know! Your comfort is the most important thing.\n\n1. I will slow down my pace and use even shorter, simpler steps.\n2. Please remember that you can ask me to repeat any step as many times as you like.\n3. Would you like to review the previous step again gently?`;
  }
  return `Thank you so much for your feedback! I am continually adapting my explanations and pace to keep technology enjoyable and stress-free for you.`;
}
