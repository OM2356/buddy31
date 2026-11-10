import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';
import {
  Smartphone,
  Send,
  Image,
  Mic,
  Video,
  Phone,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  CheckCheck,
  PhoneOff,
} from 'lucide-react';

interface SimulatedMessage {
  id: string;
  sender: 'me' | 'family';
  text: string;
  time: string;
  type?: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

export const PhoneSimulator: React.FC = () => {
  const { language, playTapSound } = useAccessibility();
  const t = getTranslation(language);

  const [messages, setMessages] = useState<SimulatedMessage[]>([
    {
      id: 'sim-1',
      sender: 'family',
      text:
        language === 'hi'
          ? 'नमस्ते दादी जी! आज आपके घुटनों का दर्द कैसा है? क्या आपने सुबह गुनगुना पानी पिया?'
          : language === 'mr'
          ? 'नमस्कार आजी! आज तब्येत कशी आहे? सकाळी औषध आणि कोमट पाणी घेतलेत का?'
          : 'Hello Dadi! How are your knees feeling today? Did you drink warm water this morning?',
      time: '10:00 AM',
      type: 'text',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [simulatedVoiceRecording, setSimulatedVoiceRecording] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    playTapSound();

    const newMsg: SimulatedMessage = {
      id: `sim-${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate gentle family reply after 1.5 seconds
    setTimeout(() => {
      const replies = {
        hi: 'वाह दादी जी! आपने खुद से मेसेज भेजा, बहुत बढ़िया! हम सब बहुत खुश हैं! ❤️',
        mr: 'छान आजी! तुम्ही स्वतःहून मेसेज पाठवलात, खूप अभिमान वाटतो! ❤️',
        en: 'So lovely to receive your message! You did it completely on your own! ❤️',
      };
      setMessages((prev) => [
        ...prev,
        {
          id: `sim-reply-${Date.now()}`,
          sender: 'family',
          text: replies[language] || replies.en,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        },
      ]);
    }, 1500);
  };

  const handleSendVoiceSim = () => {
    playTapSound();
    setSimulatedVoiceRecording(true);
    setTimeout(() => {
      setSimulatedVoiceRecording(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `sim-v-${Date.now()}`,
          sender: 'me',
          text: '▶ 0:08 (Simulated Voice Note)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'voice',
        },
      ]);
    }, 2000);
  };

  const handleSendPhoto = (photoName: string, emoji: string) => {
    playTapSound();
    setShowPhotoPicker(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `sim-img-${Date.now()}`,
        sender: 'me',
        text: `${emoji} ${photoName}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'image',
      },
    ]);
  };

  const handleReset = () => {
    playTapSound();
    setMessages([
      {
        id: 'sim-init',
        sender: 'family',
        text:
          language === 'hi'
            ? 'नमस्ते दादी! नया संदेश भेजकर अभ्यास करें।'
            : language === 'mr'
            ? 'नमस्कार आजी! नवीन मेसेज पाठवून सराव करा.'
            : 'Hello Dadi! Send a new message to practice.',
        time: '10:00 AM',
        type: 'text',
      },
    ]);
    setInCall(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
            Safe Smartphone Sandbox
          </span>
          <span className="px-3 py-1 bg-emerald-300 text-emerald-950 rounded-full text-xs font-black">
            Zero Charges & Safe
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.simulator.title}</h2>
        <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-2xl mt-1">
          {t.simulator.subtitle}
        </p>
      </div>

      {/* Simulator instructions alert */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-900 text-sm font-bold">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>{t.simulator.instruction}</span>
        </div>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-white border border-emerald-400 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Chat
        </button>
      </div>

      {/* Interactive Smartphone Shell */}
      <div className="max-w-md mx-auto bg-slate-900 p-4 rounded-[42px] shadow-2xl border-4 border-slate-700">
        {/* Phone Notch & Speaker */}
        <div className="flex justify-center mb-3">
          <div className="w-28 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-8 h-1.5 rounded-full bg-slate-700"></div>
          </div>
        </div>

        {/* Screen Container */}
        <div className="bg-[#e5ddd5] rounded-[32px] overflow-hidden flex flex-col h-[560px] border border-slate-300">
          {/* WhatsApp Style Top App Bar */}
          <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-black text-emerald-900 border border-white">
                ❤️
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Family (Rohan & Priya)</h4>
                <span className="text-[11px] text-emerald-200">Online</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playTapSound();
                  setInCall(true);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title={t.simulator.tapToCall}
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  playTapSound();
                  setInCall(true);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title="Practice Audio Call"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* In-Call Screen Overlay */}
          {inCall ? (
            <div className="flex-1 bg-slate-900 text-white p-6 flex flex-col items-center justify-between">
              <div className="text-center mt-6 space-y-2">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-4xl shadow-xl animate-pulse">
                  👨‍👩‍👦
                </div>
                <h3 className="text-xl font-bold">Family Video Call Practice</h3>
                <p className="text-emerald-400 text-sm font-semibold">Connected (00:24)</p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl text-center text-xs text-slate-300 max-w-xs">
                {t.simulator.inCallNotice}
              </div>

              <button
                onClick={() => {
                  playTapSound();
                  setInCall(false);
                }}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-base rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <PhoneOff className="w-5 h-5" />
                <span>{t.simulator.endCall}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m) => {
                  const isMe = m.sender === 'me';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-xs ${
                          isMe
                            ? 'bg-[#dcf8c6] text-slate-900 rounded-tr-none'
                            : 'bg-white text-slate-900 rounded-tl-none'
                        }`}
                      >
                        {m.type === 'voice' ? (
                          <div className="flex items-center gap-2 font-bold text-emerald-800">
                            <Mic className="w-4 h-4 text-emerald-600" />
                            <span>{m.text}</span>
                          </div>
                        ) : m.type === 'image' ? (
                          <div className="space-y-1">
                            <div className="text-2xl">{m.text.slice(0, 2)}</div>
                            <span className="font-semibold text-xs">{m.text.slice(2)}</span>
                          </div>
                        ) : (
                          <p className="leading-snug">{m.text}</p>
                        )}
                        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500">
                          <span>{m.time}</span>
                          {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {simulatedVoiceRecording && (
                  <div className="bg-emerald-100 border border-emerald-400 p-3 rounded-2xl text-center text-xs font-bold text-emerald-800 animate-pulse flex items-center justify-center gap-2">
                    <Mic className="w-4 h-4 text-emerald-600 animate-bounce" />
                    <span>Recording practice voice note... Release to send!</span>
                  </div>
                )}
              </div>

              {/* Photo Picker Popup */}
              {showPhotoPicker && (
                <div className="bg-white p-3 border-t border-slate-300 flex justify-around text-xs font-bold">
                  <button
                    onClick={() => handleSendPhoto('Garden Rose', '🌹')}
                    className="p-2 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1"
                  >
                    <span className="text-xl">🌹</span>
                    <span>Rose</span>
                  </button>
                  <button
                    onClick={() => handleSendPhoto('Morning Tea', '☕')}
                    className="p-2 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1"
                  >
                    <span className="text-xl">☕</span>
                    <span>Chai</span>
                  </button>
                  <button
                    onClick={() => handleSendPhoto('Grandchildren', '👧👦')}
                    className="p-2 hover:bg-slate-100 rounded-xl flex flex-col items-center gap-1"
                  >
                    <span className="text-xl">👧👦</span>
                    <span>Family</span>
                  </button>
                </div>
              )}

              {/* Bottom WhatsApp Input Bar */}
              <div className="p-2 bg-[#f0f0f0] border-t border-slate-300 flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setShowPhotoPicker(!showPhotoPicker)}
                  className="p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                  title="Simulate Photo from Gallery"
                >
                  <Image className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.simulator.typeSimulated}
                  className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm border border-slate-300 focus:outline-none text-slate-800"
                />

                {inputText.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-[#128c7e] text-white rounded-full hover:bg-[#075e54] transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSendVoiceSim}
                    className="p-2.5 bg-[#128c7e] text-white rounded-full hover:bg-[#075e54] transition-colors shadow-sm cursor-pointer"
                    title={t.simulator.sendVoiceSim}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
