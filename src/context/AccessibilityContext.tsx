import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, FontSize } from '../types';
import { speechController } from '../utils/speech';

interface AccessibilityContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  speechSpeed: number;
  setSpeechSpeed: (speed: number) => void;
  speak: (text: string, customLang?: Language, customSpeed?: number) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  playTapSound: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('buddy_lang') as Language) || 'en';
    }
    return 'en';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('buddy_font_size') as FontSize) || 'large'; // Default to large for elder ease
    }
    return 'large';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('buddy_high_contrast') === 'true';
    }
    return false;
  });

  const [speechSpeed, setSpeechSpeedState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const val = parseFloat(localStorage.getItem('buddy_speech_speed') || '0.9');
      return isNaN(val) ? 0.9 : val;
    }
    return 0.9;
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('buddy_lang', lang);
    }
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('buddy_font_size', size);
    }
  };

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('buddy_high_contrast', String(val));
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const setSpeechSpeed = (speed: number) => {
    const clamped = Math.max(0.65, Math.min(1.3, speed));
    setSpeechSpeedState(clamped);
    if (typeof window !== 'undefined') {
      localStorage.setItem('buddy_speech_speed', String(clamped));
    }
  };

  const speak = (text: string, customLang?: Language, customSpeed?: number) => {
    const langToUse = customLang || language;
    const speedToUse = customSpeed !== undefined ? customSpeed : speechSpeed;
    setIsSpeaking(true);
    speechController
      .speak(text, langToUse, speedToUse)
      .finally(() => {
        setIsSpeaking(false);
      });
  };

  const stopSpeaking = () => {
    speechController.stopSpeaking();
    setIsSpeaking(false);
  };

  const playTapSound = () => {
    if (typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // gentle warm chime
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  // Sync document root classes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    if (fontSize === 'normal') root.classList.add('font-size-normal');
    else if (fontSize === 'large') root.classList.add('font-size-large');
    else if (fontSize === 'extra-large') root.classList.add('font-size-xlarge');
  }, [highContrast, fontSize]);

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        speechSpeed,
        setSpeechSpeed,
        speak,
        stopSpeaking,
        isSpeaking,
        playTapSound,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
