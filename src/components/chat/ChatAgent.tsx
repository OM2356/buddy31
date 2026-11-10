import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import { speechController } from '../../utils/speech';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { ChatMessage, AgentType, OrchestrationResponse } from '../../types';

export const ChatAgent: React.FC = () => {
  const { language, speak, stopSpeaking, isSpeaking, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'buddy',
      text:
        language === 'hi'
          ? 'नमस्ते जी! मैं आपका प्यारा साथी बडी हूँ। फोन चलाना सीखना हो, कोई संदेहास्पद मैसेज जांचना हो, या बस हल्की-फुल्की बातचीत करनी हो, मैं हमेशा यहाँ हूँ। आप मुझसे क्या पूछना चाहते हैं?'
          : language === 'mr'
          ? 'नमस्कार! मी तुमचा विश्वासू मित्र बडी. स्मार्टफोन कसा वापरायचा, ऑनलाईन फसवणूक कशी ओळखायची किंवा आपुलकीने बोलायचे असल्यास मी नेहमी तयार आहे. आज आपण काय शिकूया?'
          : "Hello! I am Buddy, your patient digital companion. Whether you would like to practice WhatsApp, check a suspicious text message, or simply share a warm chat, I am right here with you. What would you like to explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentUsed: 'companion',
      intent: 'COMPANION',
      verification: {
        status: 'VERIFIED',
        confidenceScore: 0.98,
        citedSources: ['Buddy Elder Care Core Standards'],
        evidenceFound: true,
        notes: 'Standard welcoming greeting grounded in patient eldercare guidelines.',
      },
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<Record<string, boolean>>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    playTapSound();

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userProfile?.uid || 'demo-elder-dadi',
          message: query,
          language,
          requestedAgent: 'auto',
          history: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!res.ok) throw new Error('Server response failed');

      const data: OrchestrationResponse = await res.json();

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'buddy',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentUsed: data.selectedAgent,
        intent: data.intent,
        isEmergency: data.isEmergency,
        verification: data.verification,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, botMsg]);

      // Speak reply automatically if voice was used or user asked
      if (isListening || data.isEmergency) {
        speak(data.reply);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'buddy',
        text:
          language === 'hi'
            ? 'माफ़ कीजिए, थोड़ी देर के लिए संपर्क टूटा था। कृपया अपना सवाल दोबारा पूछें।'
            : language === 'mr'
            ? 'क्षमस्व, थोडा तांत्रिक अडथळा आला होता. कृपया पुन्हा विचारू शकता का?'
            : "I am right here with you. There was a tiny hiccup connecting, but I am ready. Could you ask once more?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentUsed: 'companion',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    playTapSound();
    if (isListening) {
      speechController.stopListening();
      setIsListening(false);
      setVoiceNotice(null);
      return;
    }

    setVoiceNotice('Listening... Please speak slowly and clearly.');
    speechController.startListening(
      language,
      (transcript) => {
        setIsListening(false);
        setVoiceNotice(null);
        if (transcript.trim()) {
          handleSendMessage(transcript.trim());
        }
      },
      (error) => {
        setIsListening(false);
        setVoiceNotice(`Microphone: ${error}`);
        setTimeout(() => setVoiceNotice(null), 4000);
      },
      () => {
        setIsListening(false);
      }
    );
    setIsListening(true);
  };

  const handleFeedback = (msgId: string, rating: 'Good' | 'Needs Improvement') => {
    playTapSound();
    setFeedbackSent((prev) => ({ ...prev, [msgId]: true }));
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interactionId: msgId,
        rating,
      }),
    }).catch(() => {});
  };

  const getAgentLabel = (agent?: AgentType) => {
    switch (agent) {
      case 'education':
        return 'Digital Education Agent';
      case 'safety':
        return 'Safety & Scam Agent';
      case 'wellness':
        return 'Wellness & Health Agent';
      case 'emergency':
        return 'Emergency SOS Agent';
      case 'accessibility':
        return 'Accessibility Agent';
      case 'caregiver':
        return 'Family Coordination Agent';
      case 'knowledge':
        return 'Knowledge & RAG Agent';
      case 'feedback':
        return 'Adaptive Learning Agent';
      case 'verification':
        return 'Verification Agent';
      default:
        return 'Companion Agent';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
              BuddyAgentOrchestrator
            </span>
            <span className="px-3 py-1 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-bold">
              10 Specialist Agents Active
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">{t.chat.title}</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl font-medium">{t.chat.subtitle}</p>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Suggested Questions for Seniors:
        </span>
        <div className="flex flex-wrap gap-2">
          {t.chat.quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-4 py-2.5 bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs transition-all active:scale-98 text-left cursor-pointer"
            >
              💬 {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Status Alert */}
      {voiceNotice && (
        <div className="bg-blue-100 border-2 border-blue-400 text-blue-900 px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-between animate-in fade-in">
          <span>🎙️ {voiceNotice}</span>
          <button
            onClick={() => setVoiceNotice(null)}
            className="text-blue-700 hover:text-blue-900 font-black"
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm min-h-[460px] max-h-[580px] overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isBot = msg.sender === 'buddy';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1.5`}
            >
              {/* Agent Pill Header */}
              {isBot && (
                <div className="flex items-center gap-2 px-1 text-xs text-slate-500 font-bold">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                    {getAgentLabel(msg.agentUsed)}
                  </span>
                  {msg.verification && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold ${
                        msg.verification.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : msg.verification.status === 'SAFETY_OVERRIDE'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                      title={msg.verification.notes}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {msg.verification.status === 'VERIFIED'
                        ? 'Fact-Checked'
                        : msg.verification.status === 'SAFETY_OVERRIDE'
                        ? 'Safety Intercept'
                        : 'General Guidance'}
                    </span>
                  )}
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-3xl p-5 sm:p-6 text-base sm:text-lg leading-relaxed shadow-sm ${
                  isBot
                    ? msg.isEmergency
                      ? 'bg-red-50 text-red-950 border-3 border-red-500'
                      : 'bg-slate-50 text-slate-900 border-2 border-slate-200'
                    : 'bg-blue-600 text-white rounded-br-none shadow-blue-500/20'
                }`}
              >
                <div className="whitespace-pre-wrap font-medium">{msg.text}</div>

                {/* Sources Citation List */}
                {isBot && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 block">
                      Approved References:
                    </span>
                    {msg.sources.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-medium text-blue-700">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{s.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Action Row for Bot Bubble */}
                {isBot && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playTapSound();
                          speak(msg.text);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl font-bold flex items-center gap-1 text-slate-700 transition-colors cursor-pointer"
                        title="Listen to this message"
                      >
                        <Volume2 className="w-4 h-4 text-blue-600" />
                        <span>Listen</span>
                      </button>
                    </div>

                    {/* Feedback Thumbs */}
                    <div className="flex items-center gap-1.5">
                      {feedbackSent[msg.id] ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Feedback recorded
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleFeedback(msg.id, 'Good')}
                            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Helpful explanation"
                          >
                            <ThumbsUp className="w-4 h-4 text-slate-500 hover:text-emerald-600" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'Needs Improvement')}
                            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Too fast or complicated"
                          >
                            <ThumbsDown className="w-4 h-4 text-slate-500 hover:text-rose-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <span className="text-[11px] text-slate-400 px-2 font-medium">{msg.timestamp}</span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-4 rounded-2xl w-fit border border-slate-200">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <span className="text-sm font-bold text-slate-700">
              BuddyAgentOrchestrator selecting specialist...
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar with Voice & Send */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-2.5 sm:p-3 shadow-lg flex items-center gap-2">
        <button
          onClick={toggleVoiceInput}
          className={`p-3.5 sm:p-4 rounded-2xl font-black text-white transition-all shadow-md active:scale-95 cursor-pointer tap-target-senior ${
            isListening
              ? 'bg-rose-600 hover:bg-rose-700 animate-pulse ring-4 ring-rose-300'
              : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
          }`}
          title={isListening ? 'Stop listening' : 'Speak into microphone'}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t.chat.placeholder}
          className="flex-1 px-4 py-3 sm:py-4 text-base sm:text-lg rounded-2xl focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="px-5 sm:px-6 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-slate-300 text-white font-black text-base sm:text-lg rounded-2xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed tap-target-senior"
        >
          <span className="hidden sm:inline">{t.common.send}</span>
          <Send className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 font-medium">{t.chat.disclaimer}</p>
    </div>
  );
};
