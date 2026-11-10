import { RAGSourceItem } from '../../src/types';

export interface EducationalChunk {
  id: string;
  docTitle: string;
  category: string;
  content: string;
  keywords: string[];
}

export const APPROVED_EDUCATIONAL_CHUNKS: EducationalChunk[] = [
  {
    id: 'chunk-phone-touch',
    docTitle: 'Smartphone Basics & Touch Gestures',
    category: 'Smartphone Basics',
    content:
      'Holding and tapping the screen: Single tap is like gently ringing a doorbell with the soft pad of your index finger or thumb. Do not press too hard. Long press means keeping your finger on an icon for 2 seconds to see more options. Swipe means gently sliding your finger across the glass to turn the page.',
    keywords: ['tap', 'touch', 'screen', 'swipe', 'long press', 'gesture', 'phone', 'hold'],
  },
  {
    id: 'chunk-phone-volume',
    docTitle: 'Phone Buttons & Sound Control',
    category: 'Smartphone Basics',
    content:
      'Volume buttons are located on the side of your phone. Press the upper button to make ringtones and caller voices louder. Press the lower button to soften them. The power button turns the screen on or off with a single brief click.',
    keywords: ['volume', 'loud', 'soft', 'sound', 'buttons', 'power', 'screen lock', 'hear'],
  },
  {
    id: 'chunk-wifi-connect',
    docTitle: 'Connecting to Home Wi-Fi',
    category: 'Internet & Connectivity',
    content:
      'To connect to home Wi-Fi: 1. Swipe down from the top edge of your screen. 2. Look for the fan-shaped Wi-Fi symbol. 3. Tap and hold the Wi-Fi icon. 4. Choose your home name from the list. 5. Enter your home Wi-Fi password carefully. The fan symbol will stay lit when connected.',
    keywords: ['wifi', 'wi-fi', 'internet', 'network', 'connect', 'password', 'online'],
  },
  {
    id: 'chunk-whatsapp-photo',
    docTitle: 'WhatsApp Photo & Voice Note Guide',
    category: 'WhatsApp & Communication',
    content:
      '1. Open WhatsApp by tapping the green chat icon. 2. Tap on your family member name or photo. 3. To send a photo: Tap the paperclip or camera icon at the bottom, select a picture from your gallery, and tap the green arrow to send. 4. To send a voice message: Press and hold the green microphone icon while speaking, then release to send.',
    keywords: ['whatsapp', 'photo', 'picture', 'voice note', 'voice message', 'microphone', 'family', 'chat', 'send'],
  },
  {
    id: 'chunk-whatsapp-video',
    docTitle: 'Making a WhatsApp Video Call',
    category: 'Video Calling',
    content:
      'To make a video call: 1. Open WhatsApp and tap the person you want to see. 2. In the top-right corner, tap the small video camera icon. 3. Hold your phone at eye level so your family can see your face clearly. 4. When you want to hang up, tap the red circle button.',
    keywords: ['video call', 'video', 'camera', 'whatsapp', 'call family', 'see face', 'talk'],
  },
  {
    id: 'chunk-upi-pin-golden-rule',
    docTitle: 'The Golden Rule of UPI Safety (Google Pay, PhonePe, Paytm)',
    category: 'UPI & Banking Safety',
    content:
      'CRITICAL GOLDEN RULE: You ONLY enter your UPI PIN to SEND money or PAY money. You NEVER need to enter your UPI PIN to RECEIVE money. If anyone says "enter your PIN to claim a lottery prize, cashback, or receive money into your account", it is 100% a fraud scam. Immediately hang up.',
    keywords: ['upi', 'upi pin', 'google pay', 'phonepe', 'paytm', 'receive money', 'cashback', 'lottery', 'pin', 'bank'],
  },
  {
    id: 'chunk-otp-protection',
    docTitle: 'Never Share One Time Passwords (OTP)',
    category: 'Online Security',
    content:
      'An OTP (One-Time Password) is a private secret key sent to your phone. Bank managers, electricity board staff, pension officers, and courier delivery agents will NEVER ask for your OTP. Sharing an OTP allows thieves to withdraw money from your bank. Keep it strictly private.',
    keywords: ['otp', 'password', 'one time password', 'bank', 'share', 'cvv', 'fraud', 'secret'],
  },
  {
    id: 'chunk-accessibility-zoom',
    docTitle: 'Making Screen Text Larger and High Contrast',
    category: 'Accessibility Settings',
    content:
      'To make text larger on your Android phone: Open Settings (gear icon), tap "Display", then tap "Font size and display size". Slide the circle to the right to make all letters large, bold, and easy to read without straining your eyes.',
    keywords: ['larger text', 'font size', 'big letters', 'read', 'eyes', 'display', 'settings', 'contrast', 'zoom'],
  },
  {
    id: 'chunk-fall-prevention',
    docTitle: 'Home Fall Prevention & Bedroom Safety',
    category: 'Elderly Wellness & Fall Safety',
    content:
      'Preventing falls at home: 1. Keep a night light on between your bed and the bathroom. 2. Remove loose rugs or carpets that could catch your slippers. 3. Place non-slip rubber mats inside the bathroom. 4. Before standing up from bed, sit still for 30 seconds to let your blood pressure steady.',
    keywords: ['fall', 'slip', 'safety', 'bathroom', 'night light', 'bed', 'dizziness', 'rugs', 'slippers', 'knees'],
  },
  {
    id: 'chunk-emergency-112',
    docTitle: 'Indian National Emergency Helpline 112',
    category: 'Emergency Services',
    content:
      'In India, dialing 112 connects you to all emergency services including police, ambulance, and fire response in one unified call. For online banking fraud or cyber theft, immediately dial 1930 to freeze fraudulent bank transfers.',
    keywords: ['112', '1930', 'emergency', 'police', 'ambulance', 'cyber crime', 'helpline', 'call'],
  },
];

let dynamicKnowledgeStore: EducationalChunk[] = [...APPROVED_EDUCATIONAL_CHUNKS];

export function retrieveEducationalEvidence(query: string, maxResults = 3): RAGSourceItem[] {
  const queryTokens = query
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (queryTokens.length === 0) return [];

  const scored = dynamicKnowledgeStore.map((chunk) => {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.docTitle.toLowerCase();

    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 4;
      if (chunk.keywords.some((kw) => kw.includes(token))) score += 3;
      if (contentLower.includes(token)) score += 1;
    }

    return { chunk, score };
  });

  const matching = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return matching.map((item) => ({
    id: item.chunk.id,
    title: item.chunk.docTitle,
    category: item.chunk.category,
    summary: item.chunk.content.slice(0, 150) + '...',
    content: item.chunk.content,
    confidence: Math.min(0.98, 0.6 + item.score * 0.05),
  }));
}

export function ingestEducationalDocument(
  title: string,
  category: string,
  content: string,
  keywords: string[]
): EducationalChunk {
  const newChunk: EducationalChunk = {
    id: `chunk-custom-${Date.now()}`,
    docTitle: title,
    category,
    content,
    keywords,
  };
  dynamicKnowledgeStore.push(newChunk);
  return newChunk;
}

export function getAllKnowledgeChunks(): EducationalChunk[] {
  return dynamicKnowledgeStore;
}

export function deleteKnowledgeChunk(id: string): boolean {
  const initialLen = dynamicKnowledgeStore.length;
  dynamicKnowledgeStore = dynamicKnowledgeStore.filter((c) => c.id !== id);
  return dynamicKnowledgeStore.length < initialLen;
}
