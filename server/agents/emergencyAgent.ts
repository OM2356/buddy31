import { Language } from '../../src/types';
import { AgentContext } from './companionAgent';

export async function runEmergencyAgent(
  _message: string,
  ctx: AgentContext & { emergencyCategory?: string }
): Promise<string> {
  const isMedical = ctx.emergencyCategory === 'medical' || ctx.emergencyCategory === 'fall';

  if (ctx.language === 'hi') {
    return isMedical
      ? `🚨 आपातकालीन सहायता निर्देश:\n\n1. कृपया बिल्कुल शांत रहें और सुरक्षित बैठ या लेट जाएं।\n2. तुरंत 112 या 108 पर कॉल करें।\n3. अपने परिवार या नजदीकी पड़ोसी को आवाज दें।\n\n(बडी ने आपके लिए आपातकालीन नंबर स्क्रीन पर खोल दिए हैं। सहायता के लिए सीधे 112 डायल करें।)`
      : `🚨 आपातकालीन सेवा निर्देश:\n\n1. किसी भी त्वरित आपातकाल के लिए तुरंत 112 डायल करें।\n2. ऑनलाइन साइबर धोखाधड़ी के लिए तुरंत 1930 पर कॉल करें।\n3. वरिष्ठ नागरिक राष्ट्रीय हेल्पलाइन 14567 भी सहायता के लिए उपलब्ध है।`;
  } else if (ctx.language === 'mr') {
    return isMedical
      ? `🚨 तातडीची मदत सूचना:\n\n१. कृपया अजिबात घाबरू नका, सुरक्षितपणे शांत बसा किंवा झोपा.\n२. लगेच ११२ किंवा १०८ डायल करा.\n३. घरातील किंवा जवळच्या व्यक्तीला मदतीसाठी हाक मारा.\n\n(स्क्रीनवरील लाल बटण दाबून तुम्ही थेट ११२ वर कॉल करू शकता.)`
      : `🚨 तातडीची मदत सूचना:\n\n१. कोणत्याही आपत्कालीन संकटासाठी त्वरित ११२ डायल करा.\n२. ऑनलाईन फसवणूक झाली असल्यास लगेच १९३० वर कॉल करा.\n३. ज्येष्ठ नागरिक हेल्पलाइन १४५६७ वरही संपर्क साधू शकता.`;
  }

  return isMedical
    ? `🚨 EMERGENCY GUIDANCE:\n\n1. Please remain calm and do not attempt to rush or move abruptly. Sit or rest safely.\n2. Immediately dial 112 (All-in-One Emergency) or 108 (Ambulance).\n3. Alert a nearby family member or neighbor.\n\n(Buddy has placed direct one-tap call buttons on your screen. Tap Call 112 to connect with emergency operators immediately.)`
    : `🚨 EMERGENCY ASSISTANCE:\n\n1. Dial 112 immediately for urgent police, medical, or fire response.\n2. Dial 1930 immediately for financial cyber fraud or bank theft.\n3. Dial 14567 for the National Elderline (Senior Citizen Helpline).`;
}
