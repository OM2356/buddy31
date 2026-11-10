/**
 * Browser Speech Recognition & Speech Synthesis Utility
 * Fully multilingual: English (en-US / en-IN), Hindi (hi-IN), Marathi (mr-IN)
 */

import { Language } from '../types';

class SpeechController {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = false;
        } catch {
          this.recognition = null;
        }
      }
    }
  }

  isSpeechRecognitionSupported(): boolean {
    return !!this.recognition;
  }

  isSpeechSynthesisSupported(): boolean {
    return !!this.synth;
  }

  speak(text: string, lang: Language = 'en', rate: number = 0.9): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      try {
        this.synth.cancel(); // cancel any active speech

        // Clean out emojis or markdown asterisks that sound awkward when read aloud
        const cleanText = text
          .replace(/[*_#`~[\]]/g, '')
          .replace(/https?:\/\/\S+/g, 'link')
          .trim();

        if (!cleanText) {
          resolve();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = Math.max(0.65, Math.min(1.25, rate));
        utterance.pitch = 1.0;

        const langMap: Record<Language, string> = {
          en: 'en-IN',
          hi: 'hi-IN',
          mr: 'mr-IN',
        };

        const targetLocale = langMap[lang] || 'en-US';
        utterance.lang = targetLocale;

        // Try to pick a voice matching the language or region
        const voices = this.synth.getVoices();
        const voice = voices.find(
          (v) =>
            v.lang.toLowerCase() === targetLocale.toLowerCase() ||
            v.lang.toLowerCase().startsWith(lang) ||
            v.name.toLowerCase().includes(lang === 'hi' ? 'hindi' : lang === 'mr' ? 'marathi' : 'india')
        );

        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        this.synth.speak(utterance);
      } catch {
        resolve();
      }
    });
  }

  stopSpeaking(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
  }

  startListening(
    lang: Language,
    onResult: (transcript: string) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): void {
    if (!this.recognition) {
      onError('Microphone input is not supported by your current browser.');
      return;
    }

    if (this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
    }

    const langMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
    };

    this.recognition.lang = langMap[lang] || 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      if (event.results && event.results.length > 0) {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      const err = event.error || 'Speech recognition error';
      if (err === 'not-allowed') {
        onError('Microphone permission was denied. Please allow microphone access in your browser settings.');
      } else if (err === 'no-speech') {
        onError('No speech detected. Please speak closer to your microphone.');
      } else {
        onError(`Microphone notice: ${err}`);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      onError(err.message || 'Could not start microphone');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }
}

export const speechController = new SpeechController();
