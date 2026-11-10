import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { getTranslation } from '../../utils/translations';
import {
  Heart,
  Volume2,
  VolumeX,
  Type,
  SunMoon,
  AlertTriangle,
  User,
  ShieldCheck,
  Globe,
  Sliders,
} from 'lucide-react';
import { Language, UserRole } from '../../types';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency, onOpenAuth }) => {
  const {
    language,
    setLanguage,
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    isSpeaking,
    stopSpeaking,
    playTapSound,
  } = useAccessibility();

  const { userProfile, switchDemoRole } = useAuth();
  const t = getTranslation(language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-rose-400 stroke-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  {t.appName}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Senior Safe
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 truncate max-w-[200px] sm:max-w-md">
                {t.subName}
              </p>
            </div>
          </div>

          {/* Accessibility & Role Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    playTapSound();
                    setLanguage(lang);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    language === lang
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label={`Switch language to ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'}`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                </button>
              ))}
            </div>

            {/* Font Size Selector */}
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  playTapSound();
                  setFontSize('normal');
                }}
                className={`px-2 py-1 rounded-lg text-xs font-bold ${
                  fontSize === 'normal' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => {
                  playTapSound();
                  setFontSize('large');
                }}
                className={`px-2.5 py-1 rounded-lg text-sm font-black ${
                  fontSize === 'large' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => {
                  playTapSound();
                  setFontSize('extra-large');
                }}
                className={`px-3 py-1 rounded-lg text-base font-black ${
                  fontSize === 'extra-large' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => {
                playTapSound();
                toggleHighContrast();
              }}
              className={`p-2.5 sm:p-3 rounded-xl border font-bold text-sm flex items-center justify-center transition-all ${
                highContrast
                  ? 'bg-yellow-400 text-black border-black font-extrabold shadow'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Toggle High Contrast"
              aria-label="Toggle High Contrast"
            >
              <SunMoon className="w-5 h-5" />
            </button>

            {/* Audio Stop Button if actively speaking */}
            {isSpeaking && (
              <button
                onClick={() => {
                  playTapSound();
                  stopSpeaking();
                }}
                className="animate-pulse px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow"
                title="Stop audio reading"
              >
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Stop Audio</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="relative group">
              <button
                onClick={onOpenAuth}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 text-slate-800 transition-colors"
                title="Manage Account or Switch Role"
              >
                <User className="w-4 h-4 text-blue-600" />
                <span className="capitalize hidden lg:inline">
                  {userProfile?.role === 'elder'
                    ? 'Senior Mode'
                    : userProfile?.role === 'caregiver'
                    ? 'Family Mode'
                    : 'Admin'}
                </span>
              </button>
            </div>

            {/* HIGH-VISIBILITY SOS BUTTON */}
            <button
              onClick={() => {
                playTapSound();
                onOpenEmergency();
              }}
              className="relative px-3 sm:px-4 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-red-500/30 flex items-center gap-2 border-2 border-red-500 transition-transform cursor-pointer"
              aria-label="Emergency SOS button"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <AlertTriangle className="w-5 h-5 fill-white stroke-red-600" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
