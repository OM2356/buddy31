import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import {
  MessageSquare,
  BookOpen,
  Smartphone,
  ShieldAlert,
  HeartPulse,
  Bell,
  AlertTriangle,
  Award,
  Droplets,
  Clock,
  Sparkles,
  PhoneCall,
  Volume2,
} from 'lucide-react';
import { TabKey } from './Navigation';

interface HomeWelcomeProps {
  onNavigate: (tab: TabKey) => void;
  onOpenEmergency: () => void;
}

export const HomeWelcome: React.FC<HomeWelcomeProps> = ({ onNavigate, onOpenEmergency }) => {
  const { language, speak, playTapSound } = useAccessibility();
  const { userProfile } = useAuth();
  const t = getTranslation(language);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return language === 'hi' ? 'शुभ प्रभात' : language === 'mr' ? 'शुभ सकाळ' : 'Good Morning';
    } else if (hour < 17) {
      return language === 'hi' ? 'शुभ दोपहर' : language === 'mr' ? 'शुभ दुपार' : 'Good Afternoon';
    }
    return language === 'hi' ? 'शुभ संध्या' : language === 'mr' ? 'शुभ संध्याकाळ' : 'Good Evening';
  };

  const actionCards = [
    {
      tab: 'chat' as TabKey,
      title: language === 'hi' ? 'बडी से बात करें' : language === 'mr' ? 'बडीशी बोला' : 'Talk with Buddy',
      subtitle:
        language === 'hi'
          ? 'माइक दबाकर बोलें या सवाल लिखें'
          : language === 'mr'
          ? 'माइक दाबून बोला किंवा प्रश्न विचारा'
          : 'Speak with voice or type questions gently',
      icon: MessageSquare,
      bg: 'bg-blue-600',
      text: 'text-white',
      badge: 'Voice AI',
    },
    {
      tab: 'learning' as TabKey,
      title:
        language === 'hi'
          ? 'डिजिटल सीख'
          : language === 'mr'
          ? 'डिजिटल शिक्षण'
          : 'Learn Digital Skills',
      subtitle:
        language === 'hi'
          ? 'व्हाट्सएप, फोन और इंटरनेट आसानी से सीखें'
          : language === 'mr'
          ? 'व्हॉट्सॲप आणि फोन सहजतेने शिका'
          : 'Step-by-step smartphone & WhatsApp tutorials',
      icon: BookOpen,
      bg: 'bg-indigo-600',
      text: 'text-white',
      badge: '9 Modules',
    },
    {
      tab: 'simulator' as TabKey,
      title:
        language === 'hi'
          ? 'फोन सराव सिम्युलेटर'
          : language === 'mr'
          ? 'फोन सराव'
          : 'Phone Practice Sandbox',
      subtitle:
        language === 'hi'
          ? 'बिना डर के मैसेज और कॉल का अभ्यास करें'
          : language === 'mr'
          ? 'मेसेज आणि कॉलचा सुरक्षित सराव करा'
          : 'Practice messaging and video calling safely',
      icon: Smartphone,
      bg: 'bg-emerald-600',
      text: 'text-white',
      badge: 'Interactive',
    },
    {
      tab: 'scamDetector' as TabKey,
      title:
        language === 'hi'
          ? 'धोखाधड़ी जांच'
          : language === 'mr'
          ? 'फसवणूक तपासणी'
          : 'Check a Suspicious Message',
      subtitle:
        language === 'hi'
          ? 'ओटीपी, लॉटरी या बिजली बिल मैसेज की जांच'
          : language === 'mr'
          ? 'बँक ओटीपी आणि सायबर फ्रॉड तपासा'
          : 'Scan unknown SMS, OTP, or lottery claims',
      icon: ShieldAlert,
      bg: 'bg-amber-600',
      text: 'text-white',
      badge: 'Cyber 1930',
    },
    {
      tab: 'wellness' as TabKey,
      title:
        language === 'hi'
          ? 'दैनिक स्वास्थ्य'
          : language === 'mr'
          ? 'दैनिक आरोग्य'
          : 'Daily Wellness & Balance',
      subtitle:
        language === 'hi'
          ? 'गुनगुना पानी, हल्की सैर और गिरने से बचाव'
          : language === 'mr'
          ? 'पाणी, हलके व्यायाम आणि तोल सांभाळणे'
          : 'Hydration tracking, mobility & fall prevention',
      icon: HeartPulse,
      bg: 'bg-teal-600',
      text: 'text-white',
      badge: 'Health',
    },
    {
      tab: 'reminders' as TabKey,
      title:
        language === 'hi'
          ? 'दवा व याददाश्त'
          : language === 'mr'
          ? 'औषध आठवण'
          : 'Daily Reminders',
      subtitle:
        language === 'hi'
          ? 'सुबह-शाम की दवा और डॉक्टर की तारीख'
          : language === 'mr'
          ? 'औषधांच्या वेळा आणि डॉक्टरांची भेट'
          : 'Medicine alarms and daily schedule',
      icon: Bell,
      bg: 'bg-purple-600',
      text: 'text-white',
      badge: 'Chime',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
              {getGreeting()}, {userProfile?.name?.split(' ')[0] || 'Friend'}!
            </span>
            <button
              onClick={() => {
                playTapSound();
                speak(
                  `${getGreeting()}, ${userProfile?.name || 'Friend'}. Welcome to Buddy Elder AI. What would you like to explore today?`
                );
              }}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer"
              title="Listen to welcome message"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {language === 'hi'
              ? 'आपकी हर तकनीकी जरूरत में आपका सच्चा साथी।'
              : language === 'mr'
              ? 'तंत्रज्ञानाच्या जगात तुमचा हक्काचा आणि आपुलकीचा मार्गदर्शक.'
              : 'Your patient companion for digital skills, safety, and healthy ageing.'}
          </h2>

          <p className="text-blue-100 text-base sm:text-xl font-medium leading-relaxed">
            {t.tagline}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => {
                playTapSound();
                onNavigate('chat');
              }}
              className="px-6 py-4 bg-white text-blue-900 hover:bg-blue-50 font-black text-base sm:text-lg rounded-2xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>{t.common.startVoice}</span>
            </button>

            <button
              onClick={() => {
                playTapSound();
                onOpenEmergency();
              }}
              className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 border border-red-400 cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 fill-white stroke-red-600" />
              <span>{t.common.emergencySos}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">Hydration Today</span>
            <h4 className="text-lg font-black text-slate-900">3 of 8 Glasses</h4>
            <p className="text-xs text-slate-500">Next glass recommended in 30 mins</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">Next Reminder</span>
            <h4 className="text-lg font-black text-slate-900">02:00 PM Warm Water</h4>
            <p className="text-xs text-slate-500">Morning BP medicine taken ✅</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-slate-500">Learning Progress</span>
            <h4 className="text-lg font-black text-slate-900">2 Lessons Mastered</h4>
            <p className="text-xs text-slate-500">Touch Gestures & Volume Control</p>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {language === 'hi'
            ? 'आप आज क्या करना चाहेंगे?'
            : language === 'mr'
            ? 'आज आपण काय करू इच्छिता?'
            : 'What would you like to do today?'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {actionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  playTapSound();
                  onNavigate(card.tab);
                }}
                className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-6 text-left shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer flex flex-col justify-between h-56 group"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.bg} ${card.text} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-black rounded-lg uppercase tracking-wider">
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
